import React, { useState } from 'react';
import Home from './components/Home';
import Predict from './components/Predict';
import Analytics from './components/Analytics';
import ModelSection from './components/ModelSection';
import About from './components/About';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const [currentSection, setCurrentSection] = useState('Home');

  const renderSection = () => {
    switch (currentSection) {
      case 'Home': return <Home setCurrentSection={setCurrentSection} />;
      case 'Predict': return <Predict />;
      case 'Analytics': return <Analytics />;
      case 'Model': return <ModelSection />;
      case 'About': return <About />;
      default: return <Home setCurrentSection={setCurrentSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-textMain flex flex-col font-sans relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-surface to-background pointer-events-none -z-10"></div>
      <Navbar currentSection={currentSection} setCurrentSection={setCurrentSection} />
      <main className="flex-grow flex flex-col pt-24 px-4 sm:px-8 max-w-7xl mx-auto w-full pb-16">
        {renderSection()}
      </main>
      <Footer />
    </div>
  );
}

export default App;
