import pandas as pd
from sklearn.preprocessing import OneHotEncoder, MinMaxScaler
from sklearn.compose import ColumnTransformer
import joblib

def preprocess_data(df: pd.DataFrame, fit=True):
    df = df.copy()
    df.drop(columns=["purchase_date"], inplace=True, errors="ignore")  

    #  features
    categorical_features = ["region"]  # only region is one-hot encoded
    numerical_features = df.select_dtypes(include=['int64', 'float64']).columns.tolist()

    # Remove target columns 
    numerical_features = [col for col in numerical_features if col not in ["supplier_score", "supplier_rank"]]

    
    numeric_transformer = MinMaxScaler()
    oh_transformer = OneHotEncoder(drop='first', sparse_output=False)

    # Column Transformer
    preprocessing = ColumnTransformer(
        transformers=[
            ("onehotencoder", oh_transformer, categorical_features),
            ("minmaxscaler", numeric_transformer, numerical_features)
        ],
        remainder="drop"
    )

    if fit:
        preprocessed_data = preprocessing.fit_transform(df)
        joblib.dump(preprocessing, "preprocessing_pipeline.pkl")
    else:
        preprocessing = joblib.load("preprocessing_pipeline.pkl")
        preprocessed_data = preprocessing.transform(df)

    return preprocessed_data
