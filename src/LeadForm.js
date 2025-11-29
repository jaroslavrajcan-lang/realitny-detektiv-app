import React from 'react';
import { ViewState, LandingProps } from '../types';
import { CheckCircle, AlertTriangle, ShieldCheck, ArrowRight, Search } from 'lucide-react';

export const LandingPage: React.FC<LandingProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-16 animate-fade-in pb-12">
      
      {/* Hero Section */}
      <section className="text-center space-y-8 pt-10">
        <div className="inline-flex items-center space-x-2 bg-gray-800/50 px-4 py-2 rounded-full border border-gray-700 text-sm text-gold-500 mb-4">
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
            className="bg-gold-500 hover:bg-gold-600 text-gray-900 font-bold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg shadow-gold-500/20 flex items-center justify-center space-x-2"
          >
            <span>Mám záujem o preverenie</span>
            <ArrowRight size={20} />
          </button>
          
          <button 
            onClick={() => onNavigate(ViewState.QR)}
            className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-4 px-8 rounded-xl transition-all border border-gray-700"
          >
            Kontaktovať detektíva
          </button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid md:grid-cols-3 gap-8 pt-12">
        <div className="bg-gray-800/40 p-8 rounded-2xl border border-gray-800 hover:border-gold-500/30 transition-colors">
          <div className="bg-blue-500/10 w-12 h-12 flex items-center justify-center rounded-lg mb-6 text-blue-400">
            <Search size={24} />
          </div>
          <h3 className="text-xl font-bold mb-3 text-white">Technický audit</h3>
          <p className="text-gray-400">
            Kontrola vlhkosti, statiky, rozvodov a skrytých závad, ktoré voľným okom neuvidíte.
          </p>
        </div>

        <div className="bg-gray-800/40 p-8 rounded-2xl border border-gray-800 hover:border-gold-500/30 transition-colors">
          <div className="bg-red-500/10 w-12 h-12 flex items-center justify-center rounded-lg mb-6 text-red-400">
            <AlertTriangle size={24} />
          </div>
          <h3 className="text-xl font-bold mb-3 text-white">Právna analýza</h3>
          <p className="text-gray-400">
            Preverenie tiarch, vecných bremien, exekúcií a správnosti katastrálnych údajov.
          </p>
        </div>

        <div className="bg-gray-800/40 p-8 rounded-2xl border border-gray-800 hover:border-gold-500/30 transition-colors">
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
            <div className="text-4xl font-bold text-gold-500 mb-2">250+</div>
            <div className="text-sm text-gray-400">Preverených nehnuteľností</div>
          </div>
          <div className="p-4">
            <div className="text-4xl font-bold text-gold-500 mb-2">€1.3M</div>
            <div className="text-sm text-gray-400">Ušetrených klientom</div>
          </div>
          <div className="p-4">
            <div className="text-4xl font-bold text-gold-500 mb-2">37</div>
            <div className="text-sm text-gray-400">Odhalených podvodov</div>
          </div>
          <div className="p-4">
            <div className="text-4xl font-bold text-gold-500 mb-2">100%</div>
            <div className="text-sm text-gray-400">Nezávislosť</div>
          </div>
        </div>
      </section>
    </div>
  );
};
