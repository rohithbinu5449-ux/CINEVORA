import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-auto py-8 text-center text-textMuted border-t border-white/10 bg-background/80 backdrop-blur-sm">
      <p className="font-semibold text-white tracking-widest mb-2">CINEVORA</p>
      <p className="text-sm">AI-Powered Movie Rating Prediction System</p>
      <p className="text-xs mt-4 text-white/40">Built with Machine Learning and IMDb India movie data.</p>
    </footer>
  );
}
