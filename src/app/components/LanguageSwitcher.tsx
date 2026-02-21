import { useState, useRef, useEffect } from 'react';
import { Languages } from 'lucide-react';
import { useLanguage, Language } from '../contexts/LanguageContext';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'ar', label: 'عربية', flag: '🇸🇦' },
    { code: 'darija', label: 'دارجة', flag: '🇲🇦' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageSelect = (code: Language) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-colors"
        aria-label="تغيير اللغة"
        aria-expanded={isOpen}
      >
        <Languages className="w-4 h-4 text-amber-700" />
        <span className="text-sm font-medium text-amber-900">
          {languages.find((l) => l.code === language)?.flag}
        </span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-40 bg-white rounded-lg shadow-xl border border-gray-200 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageSelect(lang.code)}
              className={`w-full px-4 py-2 text-right hover:bg-amber-50 active:bg-amber-100 transition-colors first:rounded-t-lg last:rounded-b-lg flex items-center justify-between ${
                language === lang.code ? 'bg-amber-100 font-bold' : ''
              }`}
            >
              <span className="text-sm">{lang.label}</span>
              <span className="text-lg">{lang.flag}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}