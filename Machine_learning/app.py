import streamlit as st
import pandas as pd
import joblib
from sklearn.preprocessing import MinMaxScaler

# Load dataset and model
df = pd.read_csv("data/best_new2.csv")
df.columns = df.columns.str.strip().str.replace(" ", "_")

model = joblib.load("model/multioutput_model.pkl")

# Features needed for model
feature_cols = [
    "units_purchased", "unit_cost", "delivery_time_days", "qc_pass_rate",
    "customer_rating_avg", "damaged_on_arrival", "complaint_count", "return_rate"
]

# --- UI ---
st.set_page_config(page_title="Supplier Insight")
st.title("🔍 Supplier Insight from Product Name + Region")

product = st.text_input("🛒 Product Name", placeholder="e.g. Manforce Condom")
region = st.text_input("🌍 Region", placeholder="e.g. Delhi NCR")

if st.button("Get Supplier Details"):
    if product and region:
        match = df[
            (df["product_name"].str.lower() == product.lower()) &
            (df["region"].str.lower() == region.lower())
        ]

        if not match.empty:
            match_sorted = match.sort_values(by="supplier_score", ascending=False)
            st.success(f"✅ Found {len(match_sorted)} supplier(s) for this product in the selected region.")
    
            st.dataframe(match_sorted[[
            "supplier_name", 
            "unit_cost", 
            "delivery_time_days", 
            "return_rate", 
            "supplier_score"
    ]])

        else:
            # Predict using average of similar products or regions
            sample_input = df[df["product_name"].str.lower() == product.lower()]
            if sample_input.empty:
                sample_input = df[df["region"].str.lower() == region.lower()]
            if sample_input.empty:
                sample_input = df

            mean_row = sample_input[feature_cols].mean().to_dict()
            mean_features = pd.DataFrame([mean_row])

            scaler = MinMaxScaler()
            scaler.fit(df[feature_cols])
            scaled_input = scaler.transform(mean_features)

            pred_score, pred_rank = model.predict(scaled_input)[0]
            pred_score = round(pred_score, 2)

            st.warning("⚠️ No exact match found. Showing predicted values.")

            st.write("**Supplier Name:**", "Unknown (Predicted)")
            st.write("**Unit Cost:** ₹", round(mean_row["unit_cost"], 2))
            st.write("**Delivery Time (days):**", round(mean_row["delivery_time_days"], 1))
            st.write("**Return Rate:**", round(mean_row["return_rate"], 3))
            st.write("**Predicted Supplier Score:**", pred_score)
    else:
        st.error("❌ Please enter both Product Name and Region.")