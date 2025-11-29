import React from 'react';
import { NavProps, ViewState } from '../types';
import { Search, FileText, QrCode, Home } from 'lucide-react';

export const Navigation: React.FC<NavProps> = ({ currentView, setView }) => {
  
  const navItems = [
    { id: ViewState.LANDING, label: 'Domov', icon: Home },
    { id: ViewState.FORM, label: 'Objednať', icon: FileText },
    { id: ViewState.QR, label: 'QR Vizitka', icon: QrCode },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-gray-950/90 backdrop-blur-sm border-b border-gray-800 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div 
            className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => setView(ViewState.LANDING)}
          >
            <div className="bg-gold-500 p-1.5 rounded-lg text-gray-900">
              <Search size={24} strokeWidth={2.5} />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Realitný<span className="text-gold-500">Detektív</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setView(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium ${
                    currentView === item.id
                      ? 'bg-gray-800 text-gold-500 shadow-md ring-1 ring-gray-700'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden space-x-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setView(item.id)}
                  className={`p-2 rounded-lg ${
                     currentView === item.id ? 'text-gold-500 bg-gray-800' : 'text-gray-400'
                  }`}
                >
                  <Icon size={20} />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};
