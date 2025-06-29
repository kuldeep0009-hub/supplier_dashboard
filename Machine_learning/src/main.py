import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from data_ingestion import load_data
from preprocessing import preprocess_data
from visualization import get_targets, split_data, evaluate_model
from scoring import train_final_model
import joblib
import pandas as pd

def run():
    
    df = load_data()
    X= df.drop(columns=["supplier_score", "supplier_rank"])
    
    X_processed, pipeline = preprocess_data(X, fit=True)


    
    y = get_targets(df)

   
    x_train, x_test, y_train, y_test = split_data(X_processed, y)

    
    model = train_final_model(x_train, y_train)

    y_pred = model.predict(x_test)
    print("📊 Evaluation on Test Set (MAE, RMSE, R²):", evaluate_model(y_test, y_pred))

if __name__ == "__main__":
    run()