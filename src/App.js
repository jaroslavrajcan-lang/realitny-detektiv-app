import React, { useState } from 'react';
import { ViewState } from './types';
import { Navigation } from './components/Navigation';
import { LandingPage } from './components/LandingPage';
import { LeadForm } from './components/LeadForm';
import { QRCodeSection } from './components/QRCodeSection';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.LANDING);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Navigation currentView={view} setView={setView} />
      
      <main className="flex-grow transition-opacity duration-300 ease-in-out relative">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {view === ViewState.LANDING && (
            <LandingPage onNavigate={setView} />
          )}
          
          {view === ViewState.FORM && (
            <LeadForm />
          )}

          {view === ViewState.QR && (
            <QRCodeSection />
          )}
        </div>
      </main>

      <footer className="bg-gray-950 text-gray-400 py-6 text-center border-t border-gray-800 mt-auto">
        <p>© {new Date().getFullYear()} Realitný Detektív. Všetky práva vyhradené.</p>
      </footer>
    </div>
  );
};

export default App;