import React from 'react';
import { Language } from '../../types/quran';

interface LanguageSliderProps {
  selectedLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

const languages = [
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' }
] as const;

export function LanguageSlider({ selectedLanguage, onLanguageChange }: LanguageSliderProps) {
  return (
    <div className="relative w-full overflow-hidden mb-8">
      <div className="flex items-center justify-start gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-kaaba-gold/20 scrollbar-track-transparent">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => onLanguageChange(lang.code)}
            className={`flex flex-col items-center justify-center min-w-[100px] px-4 py-3 rounded-lg 
                       transition-all duration-300 ${
                         selectedLanguage === lang.code
                           ? 'bg-kaaba-gold/10 border border-kaaba-gold text-kaaba-gold'
                           : 'border border-kaaba-gold/20 text-kaaba-gold/60 hover:border-kaaba-gold/40'
                       }`}
          >
            <span className="text-lg font-amiri">{lang.nativeName}</span>
            <span className="text-sm mt-1">{lang.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}