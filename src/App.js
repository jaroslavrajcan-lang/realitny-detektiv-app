import React from 'react';
import { LeadForm } from './LeadForm'; // Import formulára

// Toto je hlavný komponent Vašej stránky
const App = () => {
  return (
    // Celá stránka
    <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#111', 
        color: 'white', 
        padding: '20px 10px',
        fontFamily: 'sans-serif' 
    }}>
      
      {/* Nadpis a úvodný text */}
      <header style={{ textAlign: 'center', marginBottom: '40px', padding: '10px' }}>
         <h1 style={{ color: '#00D8FF', fontSize: '2.5em', fontWeight: 'bold', marginBottom: '10px' }}>
            REALITNÝ DETEKTÍV
         </h1>
         <p style={{ color: '#ccc', fontSize: '1.2em' }}>
            Objednajte si nezáväzné preverenie nehnuteľnosti, než ju kúpite.
         </p>
      </header>

      <main style={{ padding: '0 10px' }}>
          {/* Tu zobrazíme náš formulár */}
          <LeadForm />
      </main>

      <footer style={{ textAlign: 'center', marginTop: '50px', color: '#777', fontSize: '0.8em' }}>
        <p>Copyright © 2025 Realitný Detektív. Všetky práva vyhradené.</p>
      </footer>

    </div>
  );
};

export default App;
