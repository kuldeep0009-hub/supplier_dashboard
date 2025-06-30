
import pandas as pd
import numpy as np

import warnings


warnings.filterwarnings("ignore")
def load_data(path='data/best_new2.csv'):
    df=pd.read_csv(path)
    return df