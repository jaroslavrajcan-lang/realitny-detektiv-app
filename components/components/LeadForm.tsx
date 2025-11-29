import React, { useState } from 'react';
import { Send, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

// ------------------------------------------------------------------
// DÔLEŽITÉ: Tu vložte váš odkaz z Formspree.io
// Príklad: "https://formspree.io/f/xpzvqrzb"
// ------------------------------------------------------------------
const FORMSPREE_ENDPOINT = "https://formspree.io/f/SEM_VLOZTE_VAS_FORMSPREE_ODKAZ";

export const LeadForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyUrl: '',
    message: '',
    gdprConsent: false // Nový stav pre checkbox
  });
  
  const [status, setStatus] = useState<'IDLE' | 'SUBMITTING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validácia checkboxu (pre istotu, hoci HTML 'required' to rieši tiež)
    if (!formData.gdprConsent) {
      setErrorMessage("Pre odoslanie musíte súhlasiť so spracovaním osobných údajov.");
      setStatus('ERROR');
      return;
    }

    // Kontrola, či užívateľ vymenil odkaz (aby sa predišlo chybám v demu)
    if (FORMSPREE_ENDPOINT.includes("SEM_VLOZTE")) {
      alert("Chyba konfigurácie: V súbore LeadForm.tsx musíte nastaviť váš Formspree odkaz.");
      return;
    }

    setStatus('SUBMITTING');
    
    try {
      // Odosielame dáta (bez gdprConsent booleanu, ten nie je pre server podstatný, podstatné je že prešiel)
      // Pridávame _subject pre krajší e-mail
      const { gdprConsent, ...dataToSend } = formData;
      const payload = {
        ...dataToSend,
        _subject: "Nová objednávka - Realitný Detektív"
      };

      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setStatus('SUCCESS');
      } else {
        const data = await response.json();
        if (Object.prototype.hasOwnProperty.call(data, 'errors')) {
          setErrorMessage(data["errors"].map((error: any) => error["message"]).join(", "));
        } else {
          setErrorMessage("Nastala chyba pri odosielaní. Skúste to prosím znova.");
        }
        setStatus('ERROR');
      }
    } catch (error) {
      setErrorMessage("Nepodarilo sa spojiť so serverom.");
      setStatus('ERROR');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    // Špeciálne spracovanie pre checkbox
    const fieldValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setFormData(prev => ({ ...prev, [name]: fieldValue }));
  };

  if (status === 'SUCCESS') {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in bg-gray-800/30 rounded-2xl border border-gray-800 p-8">
        <div className="bg-green-500/20 p-6 rounded-full text-green-500 mb-6 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
          <CheckCircle2 size={64} />
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">Gratulujem. Vaša žiadosť bola úspešne odoslaná.</h2>
        <p className="text-gray-300 max-w-md text-lg">
          Ďakujeme. Vaše údaje sme prijali. Náš detektív vás bude kontaktovať telefonicky alebo emailom do 24 hodín pre dohodnutie ďalšieho postupu.
        </p>
        <div className="mt-8 pt-8 border-t border-gray-700 w-full max-w-xs">
           <button 
            onClick={() => {
              setStatus('IDLE');
              setFormData({ name: '', email: '', phone: '', propertyUrl: '', message: '', gdprConsent: false });
            }}
            className="text-gold-500 hover:text-gold-400 font-medium hover:underline underline-offset-4 transition-colors"
          >
            Odoslať ďalšiu žiadosť
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">Objednávka preverenia</h2>
        <p className="text-gray-400">
          Vyplňte formulár nižšie a my sa postaráme o zvyšok. Garantujeme diskrétnosť a profesionálny prístup.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800/30 p-8 rounded-2xl border border-gray-800 shadow-xl">
        
        {status === 'ERROR' && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg flex items-start gap-3">
            <AlertCircle size={20} className="mt-0.5 shrink-0" />
            <p className="text-sm">{errorMessage || "Odoslanie zlyhalo."}</p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Meno a Priezvisko *</label>
            <input
              required
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Jozef Novák"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none transition-all placeholder-gray-600"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Telefónne číslo *</label>
            <input
              required
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+421 9xx xxx xxx"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none transition-all placeholder-gray-600"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Emailová adresa *</label>
          <input
            required
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="jozef@email.sk"
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none transition-all placeholder-gray-600"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Link na nehnuteľnosť, ktorú chcete preveriť (nepovinné)</label>
          <input
            type="url"
            name="propertyUrl"
            value={formData.propertyUrl}
            onChange={handleChange}
            placeholder="https://reality.sk/..."
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none transition-all placeholder-gray-600"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Správa pre detektíva</label>
          <textarea
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            placeholder="O čo máte konkrétne záujem? Na čo si dať pozor?"
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none transition-all placeholder-gray-600 resize-none"
          ></textarea>
        </div>

        {/* GDPR Checkbox Sekcia */}
        <div className="pt-2">
          <label className="flex items-start space-x-3 cursor-pointer group">
            <div className="relative flex items-center pt-0.5">
              <input
                required
                type="checkbox"
                name="gdprConsent"
                checked={formData.gdprConsent}
                onChange={handleChange}
                className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-600 bg-gray-900 transition-all checked:border-gold-500 checked:bg-gold-500 hover:border-gold-400"
              />
              <CheckCircle2 
                size={14} 
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[40%] text-gray-900 opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" 
              />
            </div>
            <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors select-none">
              Súhlasím so spracovaním osobných údajov za účelom kontaktovania ohľadom mojej objednávky. *
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={status === 'SUBMITTING' || !formData.gdprConsent}
          className="w-full bg-gold-500 hover:bg-gold-600 disabled:bg-gray-700 disabled:text-gray-500 text-gray-900 font-bold py-4 rounded-xl transition-all shadow-lg shadow-gold-500/20 disabled:shadow-none flex items-center justify-center space-x-2 disabled:cursor-not-allowed transform active:scale-[0.98]"
        >
          {status === 'SUBMITTING' ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              <span>Odosielam...</span>
            </>
          ) : (
            <>
              <span>Odoslať nezáväznú objednávku</span>
              <Send size={20} />
            </>
          )}
        </button>
        
        <p className="text-xs text-gray-600 text-center">
          Polia označené hviezdičkou (*) sú povinné.
        </p>
      </form>
    </div>
  );
};
