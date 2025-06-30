import os
import sys
import pandas as pd
import numpy as np
from pymongo import MongoClient
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.multioutput import MultiOutputRegressor
import joblib
from dotenv import load_dotenv

# Extend path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from src.preprocessing import preprocess_data

load_dotenv()

client = MongoClient(os.getenv("MONGO_URI"))
db = client["supplier_db"]
raw_collection = db["raw_data"]

# Load full raw_data
records = list(raw_collection.find())
df = pd.DataFrame(records)
df.drop(columns=["_id"], inplace=True, errors="ignore")

# Drop rows without ground truth
df["supplier_score"] = pd.to_numeric(df["supplier_score"], errors="coerce")
df["supplier_rank"] = pd.to_numeric(df["supplier_rank"], errors="coerce")
df = df.dropna(subset=["supplier_score", "supplier_rank"])

# Load encoders
le_supplier = joblib.load("le_supplier.pkl")
le_product_name = joblib.load("le_product_name.pkl")

# Extend encoder classes
new_suppliers = df["supplier_name"][~df["supplier_name"].isin(le_supplier.classes_)]
if not new_suppliers.empty:
    le_supplier.classes_ = np.append(le_supplier.classes_, new_suppliers.unique())
    joblib.dump(le_supplier, "le_supplier.pkl")

new_products = df["product_name"][~df["product_name"].isin(le_product_name.classes_)]
if not new_products.empty:
    le_product_name.classes_ = np.append(le_product_name.classes_, new_products.unique())
    joblib.dump(le_product_name, "le_product_name.pkl")

# Encode
df["supplier_name"] = le_supplier.transform(df["supplier_name"])
df["product_name"] = le_product_name.transform(df["product_name"])

# Split
X_all = df.drop(columns=["supplier_score", "supplier_rank"])
y_all = df[["supplier_score", "supplier_rank"]]
X_all_processed = preprocess_data(X_all, fit=False)

# Train
model = MultiOutputRegressor(GradientBoostingRegressor())
model.fit(X_all_processed, y_all)
joblib.dump(model, "multioutput_model.pkl")
print("✅ Model trained and saved.")
