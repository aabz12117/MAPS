import React from 'react';
import { Logo } from './components/Logo';
import { MainInterface } from './components/MainInterface';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center py-10 px-4 md:px-0 relative z-10">
      
      {/* Header */}
      <header className="mb-12 w-full max-w-xl flex flex-col items-center space-y-4">
        <Logo />
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent rounded-full opacity-50"></div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-xl">
         <MainInterface />
      </main>

      {/* Footer */}
      <footer className="mt-16 text-center space-y-2">
        <div className="flex items-center justify-center gap-2 text-dim/40 text-[10px] uppercase tracking-[0.2em] font-mono">
           <span>Secure Connection</span>
           <span className="w-1 h-1 bg-success rounded-full"></span>
           <span>Encrypted</span>
        </div>
        <p className="text-white/5 text-xs font-sans">DARK CODE INTELLIGENCE SYSTEM v2.0</p>
      </footer>


    </div>
  );
}