import React, { useState, useEffect } from 'react';
import { Sparkles, Loader2, Star, Info, Film } from 'lucide-react';
import Autocomplete from './Autocomplete';

export default function Predict() {
  const [formData, setFormData] = useState({
    MovieTitle: '',
    Year: 2023,
    Duration: 120,
    Genre: 'Drama',
    Votes: 1000,
    Director: '',
    Actor_1: '',
    Actor_2: '',
    Actor_3: '',
  });

  const [formOptions, setFormOptions] = useState({ genres: [], directors: [], actors: [] });
  const [loading, setLoading] = useState(false);
  const [optionsLoading, setOptionsLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/form-options');
        if (response.ok) {
          const data = await response.json();
          setFormOptions(data);
        }
      } catch (err) {
        console.error("Failed to load options", err);
      } finally {
        setOptionsLoading(false);
      }
    };
    fetchOptions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData(name, (name === 'Year' || name === 'Duration' || name === 'Votes') ? Number(value) : value);
  };

  const updateFormData = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('http://localhost:8000/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Year: formData.Year,
          Duration: formData.Duration,
          Genre: formData.Genre,
          Votes: formData.Votes,
          Director: formData.Director,
          "Actor 1": formData.Actor_1,
          "Actor 2": formData.Actor_2,
          "Actor 3": formData.Actor_3,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || 'Failed to get prediction');
      }

      const data = await response.json();
      setResult({ ...data, title: formData.MovieTitle || "Untitled Movie" });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-12 flex flex-col md:flex-row gap-12 items-start">
      
      {/* Form Section */}
      <div className="w-full md:w-1/2 bg-card p-8 sm:p-10 rounded-2xl shadow-sm border border-black/5 relative">
        <h2 className="text-2xl font-bold mb-2 text-textMain flex items-center gap-2">
          <Film className="text-primary w-6 h-6" /> Movie Details
        </h2>
        <p className="text-sm text-textMuted mb-8">
          For the most reliable prediction, choose directors and actors available in the training dataset. Feel free to type custom names.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-textMain mb-1.5">Movie Title</label>
            <input 
              type="text" name="MovieTitle" placeholder="e.g. Dilwale Dulhania Le Jayenge"
              value={formData.MovieTitle} onChange={handleChange}
              className="w-full bg-white border border-black/10 rounded-lg px-4 py-3 text-textMain focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all shadow-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-textMain mb-1.5">Release Year</label>
              <input 
                type="number" name="Year" required min="1900" max="2030"
                value={formData.Year} onChange={handleChange}
                className="w-full bg-white border border-black/10 rounded-lg px-4 py-3 text-textMain focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-textMain mb-1.5">Duration (min)</label>
              <input 
                type="number" name="Duration" required min="1" max="500"
                value={formData.Duration} onChange={handleChange}
                className="w-full bg-white border border-black/10 rounded-lg px-4 py-3 text-textMain focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all shadow-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Autocomplete 
              label="Genre" name="Genre" required
              value={formData.Genre} onChange={updateFormData}
              options={formOptions.genres.length > 0 ? formOptions.genres : ['Drama', 'Comedy', 'Action', 'Romance', 'Thriller']}
              placeholder="e.g. Drama"
            />
            <div>
              <label className="block text-sm font-semibold text-textMain mb-1.5">Expected Votes</label>
              <input 
                type="number" name="Votes" required min="0"
                value={formData.Votes} onChange={handleChange}
                className="w-full bg-white border border-black/10 rounded-lg px-4 py-3 text-textMain focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all shadow-sm"
              />
            </div>
          </div>

          <Autocomplete 
            label="Director" name="Director" required
            value={formData.Director} onChange={updateFormData}
            options={formOptions.directors}
            placeholder="e.g. Yash Chopra"
          />

          <Autocomplete 
            label="Actor 1 (Lead)" name="Actor_1" required
            value={formData.Actor_1} onChange={updateFormData}
            options={formOptions.actors}
            placeholder="e.g. Shah Rukh Khan"
          />

          <div className="grid grid-cols-2 gap-4">
            <Autocomplete 
              label="Actor 2" name="Actor_2" required
              value={formData.Actor_2} onChange={updateFormData}
              options={formOptions.actors}
              placeholder="Actor 2"
            />
            <Autocomplete 
              label="Actor 3" name="Actor_3" required
              value={formData.Actor_3} onChange={updateFormData}
              options={formOptions.actors}
              placeholder="Actor 3"
            />
          </div>

          <button 
            type="submit" disabled={loading || optionsLoading}
            className="w-full btn-primary text-lg mt-6 flex items-center justify-center h-14"
          >
            {loading ? <Loader2 className="animate-spin w-6 h-6" /> : <><Sparkles className="w-5 h-5 mr-2" /> Predict Rating</>}
          </button>
        </form>
      </div>

      {/* Result Section */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center sticky top-24">
        {!result && !error && !loading && (
          <div className="text-center text-textMuted p-12 border border-dashed border-black/10 rounded-2xl bg-white/50">
            <Star className="w-16 h-16 mx-auto mb-4 opacity-20" />
            <p className="text-lg font-light">Fill in the movie details and click predict to see the AI's estimation.</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-600 p-6 rounded-2xl w-full border border-red-100 shadow-sm">
            <h3 className="font-bold text-lg mb-2 flex items-center gap-2"><Info className="w-5 h-5"/> Error</h3>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="w-full bg-white p-10 rounded-3xl text-center shadow-lg border border-black/5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-surface via-primary to-surface"></div>
            
            <h3 className="text-sm font-bold text-textMuted mb-2 uppercase tracking-[0.15em]">Predicted Rating For</h3>
            <h2 className="text-2xl font-black text-textMain mb-8">{result.title}</h2>
            
            <div className="flex justify-center items-center my-8">
              <div className="relative w-48 h-48 rounded-full flex items-center justify-center shadow-[inset_0_0_20px_rgba(0,0,0,0.02)]">
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle 
                    cx="50%" cy="50%" r="46%" 
                    className="stroke-surface fill-none" 
                    strokeWidth="6"
                  />
                  <circle 
                    cx="50%" cy="50%" r="46%" 
                    className="stroke-primary fill-none transition-all duration-1000 ease-out" 
                    strokeWidth="6"
                    strokeDasharray="289"
                    strokeDashoffset={289 - (289 * result.predicted_rating / 10)}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="flex flex-col items-center">
                  <div className="text-6xl font-black text-textMain tracking-tighter">{result.predicted_rating.toFixed(1)}</div>
                  <div className="text-xs font-bold text-textMuted uppercase tracking-widest mt-1">out of 10</div>
                </div>
              </div>
            </div>

            <div className="inline-block bg-primary/10 text-primary px-6 py-2 rounded-full font-bold text-sm mb-6 border border-primary/20">
              {result.rating_category}
            </div>

            <p className="text-sm text-textMuted leading-relaxed max-w-sm mx-auto font-light">
              <Info className="inline-block w-4 h-4 mr-1 -mt-0.5" /> This is an ML estimate based on historical patterns in the dataset.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
