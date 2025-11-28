import React, { useState } from 'react';

// POZNÁMKA: Tento kód je zjednodušený, aby sa spustil na Verceli
// a zobrazil aspoň základný text. Skutočná funkcionalita (LandingPage, LeadForm)
// by musela byť doprogramovaná.

const App = () => {
  const [view, setView] = useState('LANDING'); 

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <main className="transition-opacity duration-300 ease-in-out p-10">

        <h1 style={{ color: '#00D8FF', fontSize: '2em' }}>
          REALITNÝ DETEKTÍV: PRVÝ KROK
        </h1>
        <p>Aplikácia bola úspešne nasadená na Verceli! Kód je na mieste.</p>
        <p>Pre plnú funkčnosť musíme teraz doplniť obsah a prepojiť formulár.</p>

      </main>
    </div>
  );
};

export default App;