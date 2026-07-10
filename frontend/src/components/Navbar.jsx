import React from 'react';
import { Film } from 'lucide-react';

export default function Navbar({ currentSection, setCurrentSection }) {
  const sections = ['Home', 'Predict', 'Analytics', 'Model', 'About'];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md z-50 transition-all duration-300 border-b border-black/5 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => setCurrentSection('Home')}>
            <div className="p-1.5 bg-primary/10 rounded-lg mr-3">
              <Film className="h-6 w-6 text-primary" />
            </div>
            <span className="font-bold text-xl tracking-widest text-textMain">CINEVORA</span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {sections.map((section) => (
                <button
                  key={section}
                  onClick={() => setCurrentSection(section)}
                  className={`text-sm font-semibold tracking-wide transition-colors ${
                    currentSection === section
                      ? 'text-primary border-b-2 border-primary py-1'
                      : 'text-textMuted hover:text-textMain py-1 border-b-2 border-transparent'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
