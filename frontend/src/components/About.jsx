import React from 'react';
import { User, Code, Database, Server } from 'lucide-react';

export default function About() {
  return (
    <div className="w-full max-w-4xl mx-auto py-12">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-textMain">About CINEVORA</h2>
        <div className="w-16 h-1 bg-primary mx-auto mb-8"></div>
        <p className="text-lg text-textMuted max-w-2xl mx-auto font-light leading-relaxed">
          CINEVORA is an AI/ML internship project demonstrating the full lifecycle of a machine learning application, from raw data to a production web application.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-card p-10 rounded-2xl shadow-sm border border-black/5 relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
            <Database className="w-32 h-32 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-textMain mb-6">Machine Learning</h3>
          <ul className="space-y-4 text-textMuted text-sm font-light">
            <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Data preprocessing & cleaning</li>
            <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Exploratory data analysis (EDA)</li>
            <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Machine learning regression</li>
            <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Model comparison & tuning</li>
            <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Feature importance analysis</li>
          </ul>
        </div>

        <div className="bg-card p-10 rounded-2xl shadow-sm border border-black/5 relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
            <Server className="w-32 h-32 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-textMain mb-6">Web Development</h3>
          <ul className="space-y-4 text-textMuted text-sm font-light">
            <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Backend API integration (FastAPI)</li>
            <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Modern frontend architecture (React + Vite)</li>
            <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Premium cinematic UI/UX design</li>
            <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Responsive layouts</li>
          </ul>
        </div>
      </div>

      <div className="bg-surface p-10 rounded-2xl border border-black/5 flex flex-col sm:flex-row items-center gap-8">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center border-4 border-primary/20 shadow-sm shrink-0">
          <User className="w-10 h-10 text-primary" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-textMain mb-1">Marwa Osman</h3>
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">Project Author & Developer</p>
          <p className="text-textMuted text-sm leading-relaxed font-light">
            This project was originally developed as a Jupyter Notebook data science exploration and transformed into a full-stack web application. It uses historical movie data from IMDb India to predict rating outcomes.
          </p>
        </div>
      </div>
    </div>
  );
}
