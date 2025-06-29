from flask import Flask, request, jsonify
import pandas as pd
import joblib

app = Flask(__name__)

# Load model and pipeline once
model = joblib.load("multioutput_model.pkl")
preprocessing = joblib.load("preprocessing_pipeline.pkl")

# Load saved label encoders
le_supplier = joblib.load("le_supplier.pkl")
le_product = joblib.load("le_product.pkl")
le_supplier_id = joblib.load("le_supplier_id.pkl")
le_product_name = joblib.load("le_product_name.pkl")

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json

    # Convert JSON to DataFrame with one row
    df = pd.DataFrame([data])

    # Check all expected columns exist (according to training data)
    expected_cols = ['unit_cost', 'damaged_on_arrival', 'qc_pass_rate', 'customer_rating_avg',
                     'return_rate', 'supplier_name', 'units_purchased', 'complaint_count',
                     'units_returned', 'product_name', 'product_id', 'supplier_id', 'region',
                     'total_cost', 'delivery_time_days', 'supplier_rank', 'supplier_score']

    # Add missing columns with default 0 (except supplier_score if it is target)
    for col in expected_cols:
        if col not in df.columns:
            if col == 'supplier_score':  # target column, don't add
                continue
            df[col] = 0

    # Encode categorical columns using saved label encoders
    try:
        df['supplier_name'] = le_supplier.transform(df['supplier_name'])
        df['product_id'] = le_product.transform(df['product_id'])
        df['supplier_id'] = le_supplier_id.transform(df['supplier_id'])
        df['product_name'] = le_product_name.transform(df['product_name'])
    except Exception as e:
        return jsonify({"error": f"Label encoding error: {str(e)}"}), 400

    # Preprocess features (onehot + scaler)
    try:
        features = preprocessing.transform(df)
    except Exception as e:
        return jsonify({"error": f"Preprocessing error: {str(e)}"}), 400

    # Predict
    try:
        prediction = model.predict(features)
    except Exception as e:
        return jsonify({"error": f"Prediction error: {str(e)}"}), 500

    # Return predicted supplier_score
    return jsonify({
    "supplier_score": float(prediction[0][0]),
    "supplier_rank": int(prediction[0][1])
})


if __name__ == '__main__':
    app.run(port=5001)