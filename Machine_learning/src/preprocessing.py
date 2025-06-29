import pandas as pd
from sklearn.preprocessing import LabelEncoder, OneHotEncoder, MinMaxScaler
from sklearn.compose import ColumnTransformer
import joblib

#LabelEncoders
le_supplier = LabelEncoder()
le_product = LabelEncoder()
le_supplier_id = LabelEncoder()
le_product_name = LabelEncoder()


def preprocess_data(df: pd.DataFrame, fit=True):
    df = df.copy()
    df.drop(columns=["purchase_date"], inplace=True)


    if fit:
        df["supplier_name"] = le_supplier.fit_transform(df["supplier_name"])
        df["product_id"] = le_product.fit_transform(df["product_id"])
        df["supplier_id"] = le_supplier_id.fit_transform(df["supplier_id"])
        df['product_name'] = le_product_name.fit_transform(df['product_name'])

        
        # Save encoders
        joblib.dump(le_supplier, "le_supplier.pkl")
        joblib.dump(le_product, "le_product.pkl")
        joblib.dump(le_supplier_id, "le_supplier_id.pkl")
        joblib.dump(le_product_name, "le_product_name.pkl")
    else:
        df["supplier_name"] = joblib.load("le_supplier.pkl").transform(df["supplier_name"])
        df["product_id"] = joblib.load("le_product.pkl").transform(df["product_id"])
        df["supplier_id"] = joblib.load("le_supplier_id.pkl").transform(df["supplier_id"])
        df['product_name'] = joblib.load("le_product_name.pkl").transform(df['product_name'])


    # Define features
    onehot_feature = ['region']
    num_feature = df.select_dtypes(exclude='object').columns

    # Transformers
    numeric_transformer = MinMaxScaler()
    oh_transformer = OneHotEncoder(drop='first', sparse_output=False)

    # Column Transformer
    preprocessing = ColumnTransformer(
        transformers=[
            ("onehotencoder", oh_transformer, onehot_feature),
            ("minmaxscaler", numeric_transformer, num_feature)
        ],
        remainder="passthrough"
    )

    if fit:
        preprocessed_data = preprocessing.fit_transform(df)
        joblib.dump(preprocessing, "preprocessing_pipeline.pkl")
        return preprocessed_data, preprocessing
    else:
        loaded_pipeline = joblib.load("preprocessing_pipeline.pkl")
        preprocessed_data = loaded_pipeline.transform(df)
        return preprocessed_data
