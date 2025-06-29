import joblib
from sklearn.multioutput import MultiOutputRegressor
from sklearn.ensemble import AdaBoostRegressor

from sklearn.linear_model import LinearRegression

def train_final_model(x_train,y_train):
    model = MultiOutputRegressor(AdaBoostRegressor(
        estimator=LinearRegression(), 
        n_estimators=100, 
        learning_rate=1.0
    ))
    model.fit(x_train, y_train)
    joblib.dump(model,'model/multioutput_model.pkl')
    return model