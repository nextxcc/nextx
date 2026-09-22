import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, Language, Translations } from '../i18n/translations';

export type { Language, Translations };

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'nextx_lang';

export function getInitialLanguage(fallback: Language = 'zh'): Language {
  if (typeof window !== 'undefined') {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === 'zh' || stored === 'en') {
        return stored;
      }
    } catch {
      // Ignore localStorage access restrictions
    }
  }
  return fallback;
}

export interface LanguageProviderProps {
  children: React.ReactNode;
  defaultLanguage?: Language;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
  defaultLanguage = 'zh',
}) => {
  const [language, setLanguageState] = useState<Language>(() => getInitialLanguage(defaultLanguage));

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(STORAGE_KEY, lang);
      } catch {
        // Ignore localStorage error
      }
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'zh' ? 'en' : 'zh');
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en-US';
    }
  }, [language]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    toggleLanguage,
    t: translations[language],
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    // Fallback safe defaults if used outside provider
    const fallbackLang = getInitialLanguage('zh');
    return {
      language: fallbackLang,
      setLanguage: () => {},
      toggleLanguage: () => {},
      t: translations[fallbackLang],
    };
  }
  return context;
}

export default LanguageContext;
