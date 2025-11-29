import React, { useState, useEffect } from 'react';
import { Smartphone, Download, Share2 } from 'lucide-react';

export const QRCodeSection: React.FC = () => {
  // Defaultne nastavíme placeholder, ale po načítaní stránky (useEffect)
  // sa to zmení na reálnu adresu, na ktorej web beží.
  const [currentUrl, setCurrentUrl] = useState('https://realitny-detektiv.sk');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.origin);
    }
  }, []);

  // Generovanie QR kódu pre aktuálnu URL
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(currentUrl)}&color=1f2937&bgcolor=eab308&margin=10`;

  return (
    <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12 py-12">
      
      <div className="flex-1 space-y-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
          Váš osobný detektív vo vrecku.
        </h2>
        <p className="text-xl text-gray-400 leading-relaxed">
          Naskenujte QR kód a uložte si nás priamo do kontaktov, alebo zdieľajte našu vizitku s priateľmi, ktorí kupujú nehnuteľnosť.
        </p>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-4 text-gray-300">
            <div className="bg-gray-800 p-3 rounded-lg">
              <Smartphone size={24} className="text-gold-500" />
            </div>
            <div>
              <h4 className="font-semibold text-white">Rýchly kontakt</h4>
              <p className="text-sm">Okamžité spojenie cez WhatsApp alebo telefón.</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 text-gray-300">
            <div className="bg-gray-800 p-3 rounded-lg">
              <Share2 size={24} className="text-gold-500" />
            </div>
            <div>
              <h4 className="font-semibold text-white">Zdieľanie</h4>
              <p className="text-sm">Odporučte nás jedným kliknutím.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex justify-center">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-gold-600 to-gold-400 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-white p-8 rounded-xl shadow-2xl transform transition-transform hover:scale-[1.02]">
            <img 
              src={qrUrl} 
              alt="QR Kód Realitný Detektív" 
              className="w-64 h-64 object-contain mix-blend-multiply"
            />
            <div className="text-center mt-4">
              <p className="text-gray-900 font-bold text-lg">SCAN ME</p>
              <p className="text-gray-500 text-sm break-all">{currentUrl.replace(/^https?:\/\//, '')}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
