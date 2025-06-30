# migrate_csv_to_mongo.py

import pandas as pd
from pymongo import MongoClient
import os
from dotenv import load_dotenv

def migrate_csv_to_mongo(csv_path, db_name="supplier_db", collection_name="raw_data"):
    # 🔄 Load .env file
    load_dotenv()

    
    mongo_uri = os.getenv("MONGO_URI")
    if not mongo_uri:
        raise Exception("Could not find MONGO_URI in.env")

  
    client = MongoClient(mongo_uri)
    db = client[db_name]
    collection = db[collection_name]


   
    df = pd.read_csv(csv_path)
    print(f" Loaded {len(df)} records from {csv_path}")


    collection.delete_many({})
    print(f"🧹 Old data cleared from collection: {collection_name}")

    data = df.to_dict(orient="records")
    collection.insert_many(data)
    print(f"🚀 Inserted {len(data)} records into {db_name}.{collection_name}")


if __name__ == "__main__":
    migrate_csv_to_mongo("data/best_new2.csv")  
