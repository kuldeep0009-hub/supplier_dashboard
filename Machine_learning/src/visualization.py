import numpy as np
from sklearn.model_selection import train_test_split

def get_targets(df):
    return df[['supplier_rank','supplier_score']]

def split_data(x,y):
    return train_test_split(x,y,random_state=42,test_size=0.30)

def evaluate_model(true,predicted):
    from sklearn.metrics import mean_absolute_error,mean_squared_error,r2_score
    mae=mean_absolute_error(true,predicted)
    rmse=np.sqrt(mean_squared_error(true,predicted))
    r2_square=r2_score(true,predicted)
    return mae,rmse,r2_square