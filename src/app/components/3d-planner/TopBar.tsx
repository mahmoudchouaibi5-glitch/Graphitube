import { Save, Home, Camera, Download, FileJson, Receipt, Menu, X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { getKitchenTranslation } from './translations';
import logoImage from 'figma:asset/6f91f3b908b32fa8844a582da8663295bc35c793.png';
import { useState } from 'react';
import { useNavigate } from 'react-router';

interface TopBarProps {
  onSave: () => void;
  onScreenshot?: () => void;
  onExport?: () => void;
  onRequestQuote?: () => void;
}

export function TopBar({ onSave, onScreenshot, onExport, onRequestQuote }: TopBarProps) {
  const { language } = useLanguage();
  const isRTL = language === 'ar' || language === 'darija';
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className={`bg-white border-b border-gray-200 px-4 md:px-6 py-3 flex items-center justify-between shadow-sm z-50 ${isRTL ? 'flex-row-reverse' : ''}`}>
      {/* Logo */}
      <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
        {/* Graphitube Logo */}
        <div className="h-8 flex items-center">
          <img 
            src={logoImage} 
            alt="Graphitube" 
            className="h-6 md:h-7 w-auto"
          />
        </div>
        <div className="h-5 w-px bg-gray-300" />
        <div className={isRTL ? 'text-right' : ''}>
          <h1 className="text-xs md:text-sm font-bold text-gray-800">
            {getKitchenTranslation(language, 'appName')}
          </h1>
          <p className="text-[9px] text-gray-500 hidden md:block">
            {getKitchenTranslation(language, 'appDescription')}
          </p>
        </div>
      </div>

      {/* Actions - Menu Button */}
      <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''} relative`}>
        <LanguageSwitcher />
        
        {/* Menu Toggle Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg shadow-sm transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          <span className="text-sm font-medium">{getKitchenTranslation(language, 'menu')}</span>
        </button>

        {/* Dropdown Menu */}
        {menuOpen && (
          <div className={`absolute top-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden min-w-[240px] z-50 ${isRTL ? 'left-0' : 'right-0'}`}>
            <div className="py-1">
              {/* Save */}
              <button
                onClick={() => {
                  onSave();
                  setMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-amber-700 hover:bg-amber-50 transition-colors border-b border-gray-100 ${isRTL ? 'flex-row-reverse text-right' : 'text-left'}`}
              >
                <Save className="w-5 h-5" />
                <span className="text-sm font-medium">
                  {getKitchenTranslation(language, 'save')}
                </span>
              </button>

              {/* Screenshot */}
              {onScreenshot && (
                <button
                  onClick={() => {
                    onScreenshot();
                    setMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-blue-700 hover:bg-blue-50 transition-colors border-b border-gray-100 ${isRTL ? 'flex-row-reverse text-right' : 'text-left'}`}
                >
                  <Camera className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    {getKitchenTranslation(language, 'screenshot')}
                  </span>
                </button>
              )}

              {/* Export JSON */}
              {onExport && (
                <button
                  onClick={() => {
                    onExport();
                    setMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-purple-700 hover:bg-purple-50 transition-colors border-b border-gray-100 ${isRTL ? 'flex-row-reverse text-right' : 'text-left'}`}
                >
                  <FileJson className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    {getKitchenTranslation(language, 'exportJson')}
                  </span>
                </button>
              )}

              {/* Request Quote */}
              {onRequestQuote && (
                <button
                  onClick={() => {
                    onRequestQuote();
                    setMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-green-700 hover:bg-green-50 transition-colors border-b border-gray-100 ${isRTL ? 'flex-row-reverse text-right' : 'text-left'}`}
                >
                  <Receipt className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    {getKitchenTranslation(language, 'requestQuote')}
                  </span>
                </button>
              )}

              {/* Home */}
              <a 
                href="/"
                className={`w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors ${isRTL ? 'flex-row-reverse text-right' : 'text-left'}`}
              >
                <Home className="w-5 h-5" />
                <span className="text-sm font-medium">
                  {getKitchenTranslation(language, 'home')}
                </span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}