import React from 'react';
import { Film, Play, Sparkles } from 'lucide-react';

export default function Home({ setCurrentSection }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] text-center mt-8">
      
      <div className="mb-8 cursor-pointer p-4 bg-white shadow-sm border border-black/5 rounded-2xl group hover:shadow-md transition-all duration-300" onClick={() => setCurrentSection('Predict')}>
        <Film className="h-16 w-16 text-primary group-hover:scale-105 transition-transform" />
      </div>

      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-textMain">
        CINEVORA
      </h1>
      
      <h2 className="text-xl md:text-2xl text-primary font-medium tracking-wide mb-8 uppercase text-sm tracking-[0.2em]">
        AI-Powered Movie Rating Prediction
      </h2>
      
      <p className="max-w-2xl text-lg text-textMuted mb-12 font-light leading-relaxed">
        Discover the rating potential of a movie through machine learning trained on historical IMDb India movie data. Enter the cast, genre, and details to see what our AI predicts.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center">
        <button 
          onClick={() => setCurrentSection('Predict')}
          className="flex items-center justify-center gap-2 btn-primary text-lg w-full sm:w-auto px-8"
        >
          <Sparkles className="w-5 h-5" />
          Predict a Rating
        </button>
        <button 
          onClick={() => setCurrentSection('Model')}
          className="flex items-center justify-center gap-2 btn-secondary text-lg w-full sm:w-auto px-8"
        >
          <Play className="w-5 h-5" />
          Explore the Model
        </button>
      </div>

      {/* How it works minimal step indicators */}
      <div className="mt-24 grid grid-cols-1 sm:grid-cols-4 gap-8 max-w-5xl text-left border-t border-black/5 pt-16">
        <div>
          <div className="text-primary font-light text-3xl mb-3">01</div>
          <h3 className="text-textMain font-bold mb-2 uppercase text-xs tracking-wider">Enter Details</h3>
          <p className="text-sm text-textMuted leading-relaxed">Provide movie cast, genre, and duration.</p>
        </div>
        <div>
          <div className="text-primary font-light text-3xl mb-3">02</div>
          <h3 className="text-textMain font-bold mb-2 uppercase text-xs tracking-wider">Preprocess</h3>
          <p className="text-sm text-textMuted leading-relaxed">Data is encoded and prepared for ML.</p>
        </div>
        <div>
          <div className="text-primary font-light text-3xl mb-3">03</div>
          <h3 className="text-textMain font-bold mb-2 uppercase text-xs tracking-wider">Analyze</h3>
          <p className="text-sm text-textMuted leading-relaxed">Random Forest evaluates historical patterns.</p>
        </div>
        <div>
          <div className="text-primary font-light text-3xl mb-3">04</div>
          <h3 className="text-textMain font-bold mb-2 uppercase text-xs tracking-wider">Predict</h3>
          <p className="text-sm text-textMuted leading-relaxed">Get a realistic predicted IMDb rating.</p>
        </div>
      </div>
    </div>
  );
}
