import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../data/faqData';
import { useLanguage } from '../context/LanguageContext';

export function Faq() {
  const [openId, setOpenId] = useState<string | null>(null);
  const { t } = useLanguage();

  const toggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section id="faq" className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          <span className="apple-gradient-text">{t.faq.titleFaq}</span>{' '}
          <span className="apple-accent-gradient-text">{t.faq.titleQuestions}</span>
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base">{t.faq.subtitle}</p>
      </div>

      <div className="space-y-3">
        {FAQ_ITEMS.map((item) => {
          const isOpen = openId === item.id;
          const localized = t.faq.items[item.id] || item;

          return (
            <div
              key={item.id}
              className="apple-glass-card rounded-2xl overflow-hidden border border-white/10 transition-all"
            >
              <button
                type="button"
                onClick={() => toggle(item.id)}
                aria-expanded={isOpen}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus:ring-1 focus:ring-brand-cyan/50"
              >
                <span className="font-semibold text-sm sm:text-base text-zinc-200">{localized.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-zinc-400 ml-4 flex-shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-brand-cyan' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-white/5 animate-fade-in">
                  {localized.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Faq;
