import pandas as pd
import numpy as np
import os
import joblib
import re
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.ensemble import RandomForestRegressor
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
import category_encoders as ce

def extract_number(text):
    if pd.isna(text):
        return np.nan
    text = str(text)
    # Remove commas
    text = text.replace(',', '')
    match = re.search(r'(\d+)', text)
    if match:
        return float(match.group(1))
    return np.nan

def clean_data(df):
    print("Initial shape:", df.shape)
    
    # Drop rows without Target variable
    df = df.dropna(subset=['Rating']).copy()
    
    # Fill missing Genre with 'Unknown'
    df['Genre'] = df['Genre'].fillna('Unknown')
    
    # Extract numerical values
    df['Duration'] = df['Duration'].apply(extract_number)
    df['Year'] = df['Year'].apply(extract_number)
    df['Votes'] = df['Votes'].apply(extract_number)
    
    # Impute missing numericals with median
    duration_median = df['Duration'].median()
    df['Duration'] = df['Duration'].fillna(duration_median)
    year_median = df['Year'].median()
    df['Year'] = df['Year'].fillna(year_median)
    votes_median = df['Votes'].median()
    df['Votes'] = df['Votes'].fillna(votes_median)
    
    # Drop rows missing essential categorical features
    df = df.dropna(subset=['Director', 'Actor 1', 'Actor 2', 'Actor 3']).copy()
    
    print("Shape after cleaning:", df.shape)
    return df

def build_pipeline():
    # We will use TargetEncoder for high cardinality categorical features
    categorical_features = ['Genre', 'Director', 'Actor 1', 'Actor 2', 'Actor 3']
    numerical_features = ['Year', 'Duration', 'Votes']
    
    # Define preprocessing steps
    # We need to impute 'Unknown' for categorical features just in case of missing values in production
    categorical_transformer = Pipeline(steps=[
        ('imputer', SimpleImputer(strategy='constant', fill_value='Unknown')),
        ('target_encoder', ce.TargetEncoder())
    ])
    
    numerical_transformer = Pipeline(steps=[
        ('imputer', SimpleImputer(strategy='median'))
    ])
    
    preprocessor = ColumnTransformer(
        transformers=[
            ('num', numerical_transformer, numerical_features),
            ('cat', categorical_transformer, categorical_features)
        ])
    
    # Define the model pipeline (Random Forest is the selected model)
    model = Pipeline(steps=[
        ('preprocessor', preprocessor),
        ('regressor', RandomForestRegressor(n_estimators=100, random_state=42))
    ])
    
    return model

def main():
    data_path = '../../IMDb Movies India (1).csv'
    if not os.path.exists(data_path):
        data_path = 'IMDb Movies India (1).csv'
        
    print(f"Loading data from {data_path}...")
    try:
        df = pd.read_csv(data_path, encoding='ISO-8859-1')
    except Exception as e:
        print("Error loading CSV:", e)
        return
        
    df = clean_data(df)
    
    # Define Features and Target
    X = df[['Year', 'Duration', 'Genre', 'Votes', 'Director', 'Actor 1', 'Actor 2', 'Actor 3']]
    y = df['Rating']
    
    # Train-Test Split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    print("Building and training pipeline...")
    pipeline = build_pipeline()
    pipeline.fit(X_train, y_train)
    
    print("Evaluating Model...")
    y_pred = pipeline.predict(X_test)
    rmse = np.sqrt(mean_squared_error(y_test, y_pred))
    mae = mean_absolute_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)
    
    print(f"RMSE: {rmse:.4f}")
    print(f"MAE:  {mae:.4f}")
    print(f"R²:   {r2:.4f}")
    
    # Save Model
    model_dir = '../../models'
    if not os.path.exists(model_dir):
        model_dir = '../models'
        if not os.path.exists(model_dir):
            os.makedirs(model_dir, exist_ok=True)
            
    model_path = os.path.join(model_dir, 'cinevora_model.joblib')
    joblib.dump(pipeline, model_path)
    print(f"Model successfully saved to {model_path}")

if __name__ == '__main__':
    main()
