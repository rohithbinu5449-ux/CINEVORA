import fastapi
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import joblib
import pandas as pd
import os
import re

app = FastAPI(title="CINEVORA API", description="AI-Powered Movie Rating Prediction System")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model_pipeline = None
analytics_data = None
form_options_data = None

class MoviePredictionRequest(BaseModel):
    Year: int = Field(..., description="Release Year")
    Duration: float = Field(..., description="Duration in minutes")
    Genre: str = Field(..., description="Genre")
    Votes: int = Field(..., description="Number of Votes")
    Director: str = Field(..., description="Director")
    Actor_1: str = Field(..., alias="Actor 1", description="First main actor")
    Actor_2: str = Field(..., alias="Actor 2", description="Second main actor")
    Actor_3: str = Field(..., alias="Actor 3", description="Third main actor")

def extract_number(text):
    if pd.isna(text):
        return None
    text = str(text).replace(',', '')
    match = re.search(r'(\d+)', text)
    if match:
        return float(match.group(1))
    return None

@app.on_event("startup")
def startup_event():
    global model_pipeline, analytics_data
    model_path = os.path.join(os.path.dirname(__file__), '../models/cinevora_model.joblib')
    if os.path.exists(model_path):
        model_pipeline = joblib.load(model_path)
        print(f"Model loaded successfully from {model_path}")
        
    data_path = os.path.join(os.path.dirname(__file__), '../../IMDb Movies India (1).csv')
    if not os.path.exists(data_path):
        data_path = 'IMDb Movies India (1).csv'
        
    if os.path.exists(data_path):
        try:
            df = pd.read_csv(data_path, encoding='ISO-8859-1')
            df = df.dropna(subset=['Rating'])
            df['Year'] = df['Year'].apply(extract_number)
            df['Duration'] = df['Duration'].apply(extract_number)
            
            # Precompute analytics to save time
            # 1. Rating Distribution (bins)
            rating_hist, bins = pd.cut(df['Rating'], bins=10, retbins=True)
            rating_dist = rating_hist.value_counts().sort_index()
            dist_data = [{"range": f"{bins[i]:.1f}-{bins[i+1]:.1f}", "count": int(count)} for i, count in enumerate(rating_dist)]
            
            # 2. Avg Rating by Year
            yearly_rating = df.groupby('Year')['Rating'].mean().dropna().tail(20)
            year_data = [{"year": str(int(y)), "rating": round(r, 2)} for y, r in yearly_rating.items()]
            
            # 3. Top Genres
            genre_rating = df.groupby('Genre')['Rating'].mean().sort_values(ascending=False).head(10)
            genre_data = [{"genre": g, "rating": round(r, 2)} for g, r in genre_rating.items() if str(g) != 'nan']
            
            analytics_data = {
                "distribution": dist_data,
                "yearly": year_data,
                "genres": genre_data
            }
            
            # Precompute form options
            global form_options_data
            unique_genres = set()
            for g in df['Genre'].dropna():
                unique_genres.update([x.strip() for x in str(g).split(',')])
            
            unique_directors = df['Director'].dropna().unique().tolist()
            unique_actors = set(df['Actor 1'].dropna()).union(set(df['Actor 2'].dropna())).union(set(df['Actor 3'].dropna()))
            
            form_options_data = {
                "genres": sorted(list(unique_genres)),
                "directors": sorted(unique_directors),
                "actors": sorted(list(unique_actors))
            }
            
        except Exception as e:
            print(f"Error loading analytics data: {e}")

@app.get("/health")
def health_check():
    return {"status": "ok", "model_loaded": model_pipeline is not None}

@app.get("/api/analytics")
def get_analytics():
    if not analytics_data:
        raise HTTPException(status_code=503, detail="Analytics data not available")
    return analytics_data

@app.get("/api/form-options")
def get_form_options():
    if not form_options_data:
        raise HTTPException(status_code=503, detail="Form options data not available")
    return form_options_data

@app.post("/api/predict")
def predict_rating(request: MoviePredictionRequest):
    if model_pipeline is None:
        raise HTTPException(status_code=503, detail="Model is not loaded. Please train the model first.")
        
    try:
        # Convert request to dictionary
        req_dict = request.dict(by_alias=True)
        # Convert dict to DataFrame (model pipeline expects DataFrame)
        df = pd.DataFrame([req_dict])
        
        # Run prediction
        prediction = model_pipeline.predict(df)[0]
        
        # Clamp prediction between 0.0 and 10.0
        prediction_clamped = max(0.0, min(10.0, float(prediction)))
        
        # Determine rating category
        if prediction_clamped < 4.0:
            category = "Low"
        elif prediction_clamped < 6.0:
            category = "Average"
        elif prediction_clamped < 7.0:
            category = "Good"
        elif prediction_clamped < 8.0:
            category = "Very Good"
        else:
            category = "Excellent"
            
        return {
            "predicted_rating": round(prediction_clamped, 1),
            "rating_out_of_10": f"{round(prediction_clamped, 1)} / 10",
            "rating_category": category,
            "message": f"Based on the historical patterns learned from the IMDb India movie dataset, CINEVORA estimates this movie's rating potential at {round(prediction_clamped, 1)} out of 10."
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Prediction failed: {str(e)}")

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
