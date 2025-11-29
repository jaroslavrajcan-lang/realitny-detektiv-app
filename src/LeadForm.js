import React, { useState } from 'react';

// POZNÁMKA: Ikony sme nahradili textovými symbolmi,
// pretože balíček "lucide-react" nie je nainštalovaný.
// ------------------------------------------------------------------
// DÔLEŽITÉ: Tu vložte váš odkaz z Formspree.io pre zasielanie emailov
// Príklad: "https://formspree.io/f/xpzvqrzb"
// ------------------------------------------------------------------
const FORMSPREE_ENDPOINT = "https://formspree.io/f/SEM_VLOZTE_VAS_FORMSPREE_ODKAZ";

// Placeholder pre ikony
const IconSend = ({ size }) => <span style={{fontSize: size === 20 ? '1.2em' : 'inherit'}}>&gt;</span>;
const IconCheck = ({ size }) => <span style={{fontSize: size === 64 ? '2em' : 'inherit'}}>✔</span>;
const IconLoader = ({ size }) => <span className="animate-spin" style={{fontSize: size === 20 ? '1.2em' : 'inherit'}}>⚙</span>;
const IconAlert = ({ size }) => <span style={{fontSize: size === 20 ? '1.2em' : 'inherit'}}>!</span>;


export const LeadForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyUrl: '',
    message: '',
    gdprConsent: false
  });
  
  const [status, setStatus] = useState('IDLE');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.gdprConsent) {
      setErrorMessage("Pre odoslanie musíte súhlasiť so spracovaním osobných údajov.");
      setStatus('ERROR');
      return;
    }

    // Upozornenie, že treba vymeniť odkaz
    if (FORMSPREE_ENDPOINT.includes("SEM_VLOZTE")) {
      alert("Chyba konfigurácie: V súbore LeadForm.js musíte nastaviť váš Formspree odkaz. Formulár nebude odoslaný.");
      return;
    }

    setStatus('SUBMITTING');
    setErrorMessage('');
    
    try {
      const { gdprConsent, ...dataToSend } = formData;
      const payload = {
        ...dataToSend,
        _subject: "Nová objednávka - Realitný Detektív"
      };

      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setStatus('SUCCESS');
      } else {
        const data = await response.json();
        setErrorMessage(data["errors"] ? data["errors"].map(error => error["message"]).join(", ") : "Nastala chyba pri odosielaní. Skúste to prosím znova.");
        setStatus('ERROR');
      }
    } catch (error) {
      setErrorMessage("Nepodarilo sa spojiť so serverom.");
      setStatus('ERROR');
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const fieldValue = type === 'checkbox' ? e.target.checked : value;

    setFormData(prev => ({ ...prev, [name]: fieldValue }));
  };

  // ------------------------------------------------------------------
  // ÚSPEŠNÉ ODOSLANIE
  // ------------------------------------------------------------------

  if (status === 'SUCCESS') {
    return (
      <div style={{ 
          padding: '40px', 
          textAlign: 'center', 
          backgroundColor: '#282c34', // Tmavé pozadie
          borderRadius: '10px',
          border: '2px solid #00D8FF' // Pôvodná farba
      }}>
        <h2 style={{ color: '#00D8FF', fontSize: '24px', marginBottom: '15px' }}>
            <IconCheck size={20} /> Žiadosť úspešne odoslaná!
        </h2>
        <p style={{ color: '#ccc' }}>
          Ďakujeme. Náš detektív vás bude kontaktovať do 24 hodín.
        </p>
         <button 
            onClick={() => {
              setStatus('IDLE');
              setFormData({ name: '', email: '', phone: '', propertyUrl: '', message: '', gdprConsent: false });
            }}
            style={{ marginTop: '20px', color: '#00D8FF', border: 'none', background: 'none', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Odoslať ďalšiu žiadosť
          </button>
      </div>
    );
  }

  // ------------------------------------------------------------------
  // FORMULÁR
  // ------------------------------------------------------------------

  return (
    <div style={{ 
      maxWidth: '600px', 
      margin: '20px auto', 
      backgroundColor: '#282c34', 
      padding: '30px', 
      borderRadius: '10px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '25px', fontSize: '28px', color: '#00D8FF' }}>Objednávka preverenia</h2>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '15px' }}>
        
        {status === 'ERROR' && (
          <div style={{ backgroundColor: 'rgba(255,0,0,0.1)', border: '1px solid #ff0000', color: '#ff8888', padding: '10px', borderRadius: '5px' }}>
            <IconAlert size={20} /> <span style={{ marginLeft: '10px', fontSize: '14px' }}>{errorMessage || "Odoslanie zlyhalo."}</span>
          </div>
        )}

        <label style={labelStyle}>Meno a Priezvisko *</label>
        <input required type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Jozef Novák" style={inputStyle} />

        <label style={labelStyle}>Telefónne číslo *</label>
        <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+421 9xx xxx xxx" style={inputStyle} />

        <label style={labelStyle}>Emailová adresa *</label>
        <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="jozef@email.sk" style={inputStyle} />

        <label style={labelStyle}>Link na nehnuteľnosť (nepovinné)</label>
        <input type="url" name="propertyUrl" value={formData.propertyUrl} onChange={handleChange} placeholder="https://reality.sk/..." style={inputStyle} />

        <label style={labelStyle}>Správa pre detektíva</label>
        <textarea name="message" rows={4} value={formData.message} onChange={handleChange} placeholder="O čo máte konkrétne záujem?" style={{...inputStyle, resize: 'vertical' }}></textarea>

        {/* GDPR Checkbox Sekcia */}
        <div style={{ paddingTop: '10px' }}>
          <label style={{ display: 'flex', alignItems: 'flex-start', cursor: 'pointer', fontSize: '14px', color: '#ccc' }}>
            <input
              required
              type="checkbox"
              name="gdprConsent"
              checked={formData.gdprConsent}
              onChange={handleChange}
              style={{ marginRight: '10px', marginTop: '3px' }}
            />
            <span style={{ lineHeight: '1.4' }}>
              Súhlasím so spracovaním osobných údajov za účelom kontaktovania ohľadom mojej objednávky. *
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={status === 'SUBMITTING' || !formData.gdprConsent}
          style={{ 
            backgroundColor: '#00D8FF', 
            color: 'black', 
            fontWeight: 'bold', 
            padding: '15px', 
            borderRadius: '10px', 
            border: 'none', 
            cursor: (status === 'SUBMITTING' || !formData.gdprConsent) ? 'not-allowed' : 'pointer',
            opacity: (status === 'SUBMITTING' || !formData.gdprConsent) ? 0.6 : 1,
            transition: 'background-color 0.3s, opacity 0.3s',
            boxShadow: '0 2px 10px rgba(0, 216, 255, 0.4)'
          }}
        >
          {status === 'SUBMITTING' ? (
            <><IconLoader size={20} /> <span>Odosielam...</span></>
          ) : (
            <span>Odoslať nezáväznú objednávku <IconSend size={20} /></span>
          )}
        </button>
        
        <p style={{ fontSize: '10px', color: '#777', textAlign: 'center', marginTop: '10px' }}>
          Polia označené hviezdičkou (*) sú povinné.
        </p>
      </form>
    </div>
  );
};

// Štýly pre formulár
const inputStyle = { 
  padding: '12px', 
  borderRadius: '5px', 
  border: '1px solid #444', 
  backgroundColor: '#1c1f24', 
  color: 'white',
  width: '100%',
  boxSizing: 'border-box'
};

const labelStyle = { 
  fontSize: '14px', 
  color: '#00D8FF', 
  marginBottom: '5px' 
};