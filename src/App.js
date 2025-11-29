import React, { useState } from 'react';
// Importy z lucide-react (predpokladáme, že sú nainštalované)
import { CheckCircle, AlertTriangle, ShieldCheck, ArrowRight, Search, QrCode } from 'lucide-react';
// Import formulára. MUSÍ SA ZHODOVAŤ S NÁZVOM SÚBORU (napr. leadForms.js)
import { LeadForm } from './leadForms'; 

// ------------------------------------------------------------------
// 1. TYPY A STAVY PRE CELÚ APLIKÁCIU
// ------------------------------------------------------------------
const ViewState = {
    LANDING: 'LANDING',
    FORM: 'FORM',
    QR: 'QR'
};

// ------------------------------------------------------------------
// 2. KOMPONENT LANDING PAGE (Váš pôvodný kód)
// --------------------------------------------------
// Používame komponent LandingView namiesto LandingPage
const LandingView = ({ onNavigate }) => {
    return (
        <div className="space-y-16 animate-fade-in pb-12">
            
            {/* Hero Section */}
            <section className="text-center space-y-8 pt-10">
                <div className="inline-flex items-center space-x-2 bg-gray-800/50 px-4 py-2 rounded-full border border-gray-700 text-sm text-yellow-500 mb-4">
                    <ShieldCheck size={16} />
                    <span>Profesionálne preverovanie nehnuteľností</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent pb-2">
                    Nekupujte mačku<br/> vo vreci.
                </h1>
                
                <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                    Odhalíme skryté vady, právne nezrovnalosti a reálnu trhovú hodnotu vašej budúcej nehnuteľnosti skôr, než podpíšete zmluvu.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                    <button 
                        onClick={() => onNavigate(ViewState.FORM)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg shadow-yellow-500/20 flex items-center justify-center space-x-2"
                    >
                        <span>Mám záujem o preverenie</span>
                        <ArrowRight size={20} />
                    </button>
                    
                    <button 
                        onClick={() => onNavigate(ViewState.QR)}
                        className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-4 px-8 rounded-xl transition-all border border-gray-700 flex items-center justify-center space-x-2"
                    >
                        <QrCode size={20} />
                        <span>Kontaktovať detektíva</span>
                    </button>
                </div>
            </section>

            {/* Features Grid */}
            <section className="grid md:grid-cols-3 gap-8 pt-12">
                <div className="bg-gray-800/40 p-8 rounded-2xl border border-gray-800 hover:border-yellow-500/30 transition-colors">
                    <div className="bg-blue-500/10 w-12 h-12 flex items-center justify-center rounded-lg mb-6 text-blue-400">
                        <Search size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">Technický audit</h3>
                    <p className="text-gray-400">
                        Kontrola vlhkosti, statiky, rozvodov a skrytých závad, ktoré voľným okom neuvidíte.
                    </p>
                </div>

                <div className="bg-gray-800/40 p-8 rounded-2xl border border-gray-800 hover:border-yellow-500/30 transition-colors">
                    <div className="bg-red-500/10 w-12 h-12 flex items-center justify-center rounded-lg mb-6 text-red-400">
                        <AlertTriangle size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">Právna analýza</h3>
                    <p className="text-gray-400">
                        Preverenie tiarch, vecných bremien, exekúcií a správnosti katastrálnych údajov.
                    </p>
                </div>

                <div className="bg-gray-800/40 p-8 rounded-2xl border border-gray-800 hover:border-yellow-500/30 transition-colors">
                    <div className="bg-green-500/10 w-12 h-12 flex items-center justify-center rounded-lg mb-6 text-green-400">
                        <CheckCircle size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">Cenový odhad</h3>
                    <p className="text-gray-400">
                        Nezávislé posúdenie trhovej ceny, aby ste nepreplatili nehnuteľnosť o tisíce eur.
                    </p>
                </div>
            </section>

            {/* Statistics / Trust Section */}
            <section className="bg-gray-950 rounded-3xl p-8 md:p-12 border border-gray-800">
                <div className="grid md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-800">
                    <div className="p-4">
                        <div className="text-4xl font-bold text-yellow-500 mb-2">250+</div>
                        <div className="text-sm text-gray-400">Preverených nehnuteľností</div>
                    </div>
                    <div className="p-4">
                        <div className="text-4xl font-bold text-yellow-500 mb-2">€1.3M</div>
                        <div className="text-sm text-gray-400">Ušetrených klientom</div>
                    </div>
                    <div className="p-4">
                        <div className="text-4xl font-bold text-yellow-500 mb-2">37</div>
                        <div className="text-sm text-gray-400">Odhalených podvodov</div>
                    </div>
                    <div className="p-4">
                        <div className="text-4xl font-bold text-yellow-500 mb-2">100%</div>
                        <div className="text-sm text-gray-400">Nezávislosť</div>
                    </div>
                </div>
            </section>
        </div>
    );
};

// ------------------------------------------------------------------
// 3. KOMPONENT QR KÓD (Placeholder)
// ------------------------------------------------------------------

const QRCodeView = ({ onNavigate }) => {
    return (
        <div className="max-w-md mx-auto p-8 text-center bg-gray-800/50 rounded-xl border border-gray-700 space-y-6 mt-16">
            <QrCode size={64} className="text-yellow-500 mx-auto" />
            <h2 className="text-2xl font-bold text-white">Priamy kontakt s detektívom</h2>
            <p className="text-gray-400">
                Oskenujte tento kód pre okamžité pridanie kontaktu do Vášho telefónu.
            </p>
            {/* V reálnej aplikácii by tu bol vygenerovaný QR kód */}
            <div className="bg-white p-4 rounded-lg inline-block">
                 {/* Zástupný obrázok QR kódu */}
                <img 
                    src="https://placehold.co/200x200/282c34/ffffff?text=QR+Code" 
                    alt="Placeholder QR Code" 
                    className="w-48 h-48 rounded-md"
                />
            </div>
            <button
                onClick={() => onNavigate(ViewState.LANDING)}
                className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
            >
                Späť na úvod
            </button>
        </div>
    );
}

// ------------------------------------------------------------------
// 4. HLAVNÝ KOMPONENT APLIKÁCIE (Router)
// ------------------------------------------------------------------

const App = () => {
    const [view, setView] = useState(ViewState.LANDING);

    const handleNavigate = (targetView) => {
        setView(targetView);
    };

    // Obsah hlavnej časti
    let content;
    switch (view) {
        case ViewState.FORM:
            content = (
                <div className="max-w-4xl mx-auto p-4 md:p-8">
                    <button 
                        onClick={() => handleNavigate(ViewState.LANDING)}
                        className="text-yellow-500 hover:text-yellow-400 mb-6 flex items-center space-x-2 transition-colors"
                    >
                        <ArrowRight size={16} className="rotate-180" />
                        <span>Späť na úvod</span>
                    </button>
                    <LeadForm />
                </div>
            );
            break;
        case ViewState.QR:
            content = (
                <div className="max-w-4xl mx-auto p-4 md:p-8">
                     <button 
                        onClick={() => handleNavigate(ViewState.LANDING)}
                        className="text-yellow-500 hover:text-yellow-400 mb-6 flex items-center space-x-2 transition-colors"
                    >
                        <ArrowRight size={16} className="rotate-180" />
                        <span>Späť na úvod</span>
                    </button>
                    <QRCodeView onNavigate={handleNavigate} />
                </div>
            );
            break;
        case ViewState.LANDING:
        default:
            content = <LandingView onNavigate={handleNavigate} />;
            break;
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white font-sans">
            
            {/* Fix pre font (Tailwind predpokladá, že je k dispozícii) */}
            <style>
                {`
                    @keyframes fade-in {
                        from { opacity: 0; transform: translateY(10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    .animate-fade-in {
                        animation: fade-in 0.5s ease-out forwards;
                    }
                    /* Custom yellow color to match the design */
                    .text-gold-500 { color: #FFC72C; }
                    .bg-gold-500 { background-color: #FFC72C; }
                    .hover:bg-gold-600:hover { background-color: #E6B528; }
                    .shadow-gold-500\\/20 { box-shadow: 0 4px 10px rgba(255, 199, 44, 0.2); }
                `}
            </style>

            <header className="py-4 border-b border-gray-800 sticky top-0 bg-gray-900 z-10">
                <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
                    <div className="text-2xl font-extrabold text-white cursor-pointer" onClick={() => handleNavigate(ViewState.LANDING)}>
                        Realitný<span className="text-yellow-500">Detektív</span>
                    </div>
                    <nav className="hidden sm:flex space-x-6 text-gray-400">
                        <a href="#" onClick={() => handleNavigate(ViewState.LANDING)} className="hover:text-yellow-500 transition-colors">Úvod</a>
                        <a href="#" onClick={() => handleNavigate(ViewState.FORM)} className="hover:text-yellow-500 transition-colors">Objednávka</a>
                        <a href="#" onClick={() => handleNavigate(ViewState.QR)} className="hover:text-yellow-500 transition-colors">Kontakt</a>
                    </nav>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-4">
                {content}
            </main>

            <footer className="mt-16 py-8 border-t border-gray-800 text-center text-sm text-gray-500 bg-gray-950">
                <p>&copy; 2025 Realitný Detektív. Všetky práva vyhradené.</p>
            </footer>
        </div>
    );
};

export default App;
