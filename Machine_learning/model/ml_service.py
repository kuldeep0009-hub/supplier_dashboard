from flask import Flask, request, jsonify
import pandas as pd
import joblib
from pymongo import MongoClient
from dotenv import load_dotenv
import os
import numpy as np

# Setup
load_dotenv()
app = Flask(__name__)
client = MongoClient(os.getenv("MONGO_URI"))
db = client["supplier_db"]
raw_collection = db["raw_data"]
output_collection = db["ml_outputs"]

# Load model and preprocessing
model = joblib.load("multioutput_model.pkl")
preprocessing = joblib.load("preprocessing_pipeline.pkl")
le_supplier = joblib.load("le_supplier.pkl")
le_product_name = joblib.load("le_product_name.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()

    # ✅ Save raw input to raw_data
    raw_collection.insert_one(data)

    # 🔄 Convert to DataFrame
    df = pd.DataFrame([data])

    # ✅ Extend encoders if new class
    if df["supplier_name"].iloc[0] not in le_supplier.classes_:
        le_supplier.classes_ = np.append(le_supplier.classes_, df["supplier_name"].iloc[0])
        joblib.dump(le_supplier, "le_supplier.pkl")

    if df["product_name"].iloc[0] not in le_product_name.classes_:
        le_product_name.classes_ = np.append(le_product_name.classes_, df["product_name"].iloc[0])
        joblib.dump(le_product_name, "le_product_name.pkl")

    # 🔠 Encode
    df["supplier_name"] = le_supplier.transform(df["supplier_name"])
    df["product_name"] = le_product_name.transform(df["product_name"])

    # 🧼 Drop unnecessary if exists
    df.drop(columns=[c for c in ["supplier_score", "supplier_rank"] if c in df.columns], inplace=True)

    # Preprocess
    X = preprocessing.transform(df)

    # Predict
    preds = model.predict(X)
    df["predicted_supplier_score"] = preds[:, 0]
    df["predicted_supplier_rank"] = preds[:, 1].round(0).astype(int)

    # Decode
    df["supplier_name"] = le_supplier.inverse_transform(df["supplier_name"])
    df["product_name"] = le_product_name.inverse_transform(df["product_name"])

    # Save prediction
    output_collection.insert_many(df.to_dict(orient="records"))
    if "_id" in df.columns:
        df["_id"] = df["_id"].astype(str)

    return jsonify({"message": "✅ Saved to raw_data & ml_outputs", "prediction": df.to_dict(orient="records")[0]}), 200

@app.route("/top_suppliers", methods=["GET"])
def get_top_suppliers():
    product_name = request.args.get("product_name", "").strip()
    region = request.args.get("region", "").strip()

    if not product_name or not region:
        return jsonify({"error": "Provide product_name and region in query"}), 400

    query = {
        "product_name": {"$regex": f"^{product_name}$", "$options": "i"},
        "region": {"$regex": f"^{region}$", "$options": "i"}
    }

    results = list(output_collection.find(query).sort("predicted_supplier_score", -1))
    if not results:
        return jsonify({"message": "No matching suppliers found."}), 404

    for r in results:
        r["_id"] = str(r["_id"])

    top_suppliers = [
        {
            "supplier_name": r["supplier_name"],
            "product_name": r["product_name"],
            "region": r["region"],
            "delivery_time_days": r["delivery_time_days"],
            "return_rate": r["return_rate"],
            "unit_cost": r["unit_cost"],
            "qc_pass_rate": r.get("qc_pass_rate"),
            "units_returned": r.get("units_returned"),
            "purchase_date": r.get("purchase_date"),
            "damaged_on_arrival": r.get("damaged_on_arrival"),
            "units_purchased": r.get("units_purchased"),
            "supplier_score": r["predicted_supplier_score"],
            "supplier_rank": r["predicted_supplier_rank"]
        } for r in results
    ]
    return jsonify(top_suppliers), 200

if __name__ == "__main__":
    app.run(port=int(os.getenv("PORT", 5000)), debug=True)
