import React from 'react';
import { Target, Layers, Cpu } from 'lucide-react';

export default function ModelSection() {
  return (
    <div className="w-full max-w-5xl mx-auto py-12">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-textMain">The AI Model</h2>
        <div className="w-16 h-1 bg-primary mx-auto mb-8"></div>
        <p className="text-lg text-textMuted max-w-2xl mx-auto font-light leading-relaxed">
          CINEVORA uses advanced regression techniques to predict a movie's success based on historical data.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="bg-card p-8 rounded-2xl shadow-sm border border-black/5 border-t-4 border-t-primary">
          <Layers className="w-10 h-10 text-primary mb-5" />
          <h3 className="text-lg font-bold text-textMain mb-2">Dataset Overview</h3>
          <p className="text-sm text-textMuted leading-relaxed">Trained on the IMDb India Movies dataset. Features include Year, Duration, Genre, Votes, Director, and lead Actors.</p>
        </div>
        
        <div className="bg-card p-8 rounded-2xl shadow-sm border border-black/5 border-t-4 border-t-primary">
          <Cpu className="w-10 h-10 text-primary mb-5" />
          <h3 className="text-lg font-bold text-textMain mb-2">Preprocessing</h3>
          <p className="text-sm text-textMuted leading-relaxed">Missing values handled gracefully. Categorical features like Director and Actors are target-encoded for optimal learning.</p>
        </div>

        <div className="bg-card p-8 rounded-2xl shadow-sm border border-black/5 border-t-4 border-t-primary">
          <Target className="w-10 h-10 text-primary mb-5" />
          <h3 className="text-lg font-bold text-textMain mb-2">Model Selection</h3>
          <p className="text-sm text-textMuted leading-relaxed">Compared Linear Regression, Gradient Boosting, and Random Forest. The tuned Random Forest Regressor provided the best generalization.</p>
        </div>
      </div>

      <div className="bg-card p-10 rounded-2xl shadow-sm border border-black/5 mb-12">
        <h3 className="text-2xl font-bold text-textMain mb-4">Model Evaluation</h3>
        <p className="text-textMuted mb-8 text-sm font-light">
          Movie rating prediction is a regression problem, where the goal is to predict a continuous numerical value (1.0 - 10.0) rather than a discrete class.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-surface p-8 rounded-xl text-center border border-black/5">
            <div className="text-4xl font-black text-primary mb-2">0.78+</div>
            <div className="text-textMain font-bold text-sm uppercase tracking-wider">R² Score</div>
            <div className="text-xs text-textMuted mt-2 font-light">Variance explained</div>
          </div>
          <div className="bg-surface p-8 rounded-xl text-center border border-black/5">
            <div className="text-4xl font-black text-primary mb-2">0.65</div>
            <div className="text-textMain font-bold text-sm uppercase tracking-wider">MAE</div>
            <div className="text-xs text-textMuted mt-2 font-light">Mean Absolute Error</div>
          </div>
          <div className="bg-surface p-8 rounded-xl text-center border border-black/5">
            <div className="text-4xl font-black text-primary mb-2">0.90</div>
            <div className="text-textMain font-bold text-sm uppercase tracking-wider">RMSE</div>
            <div className="text-xs text-textMuted mt-2 font-light">Root Mean Squared Error</div>
          </div>
        </div>
      </div>

      <div className="bg-card p-10 rounded-2xl shadow-sm border border-black/5">
        <h3 className="text-2xl font-bold text-textMain mb-4">Feature Importance</h3>
        <p className="text-textMuted mb-8 text-sm font-light">
          The Random Forest model identified the following features as having the most significant impact on a movie's predicted rating:
        </p>
        
        <div className="space-y-6">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-textMain font-semibold">Votes (Audience Engagement)</span>
              <span className="text-primary font-bold">High Impact</span>
            </div>
            <div className="w-full bg-surface rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{width: '85%'}}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-textMain font-semibold">Year (Release Context)</span>
              <span className="text-primary font-bold">Medium Impact</span>
            </div>
            <div className="w-full bg-surface rounded-full h-2">
              <div className="bg-primary/80 h-2 rounded-full" style={{width: '60%'}}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-textMain font-semibold">Duration (Length)</span>
              <span className="text-primary font-bold">Medium Impact</span>
            </div>
            <div className="w-full bg-surface rounded-full h-2">
              <div className="bg-primary/60 h-2 rounded-full" style={{width: '45%'}}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
