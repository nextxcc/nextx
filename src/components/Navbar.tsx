import { useState } from 'react';
import { Cpu, ArrowRight, Menu, X, Globe, Mail } from 'lucide-react';
import { siteConfig, CONSOLE_URL } from '../config/site';
import { useLanguage } from '../context/LanguageContext';
import { ContactModal } from './ContactModal';

export interface NavbarProps {
  onNavClick?: (href: string) => void;
}

export function Navbar({ onNavClick }: NavbarProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const handleLinkClick = (href: string) => {
    setIsDrawerOpen(false);
    onNavClick?.(href);
  };

  const navItems = [
    { label: t.nav.catalog, href: '#catalog' },
    { label: t.nav.pricing, href: '#pricing' },
    { label: t.nav.advantages, href: '#advantages' },
    { label: t.nav.useCases, href: '#use-cases' },
    { label: t.nav.faq, href: '#faq' },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-dark-canvas/80 border-b border-white/10 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <a href="#" className="flex items-center space-x-3 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-brand-cyan via-brand-indigo to-brand-violet p-0.5 flex items-center justify-center shadow-lg shadow-brand-cyan/20 group-hover:shadow-brand-cyan/40 transition-shadow">
            <div className="w-full h-full bg-dark-canvas rounded-[7px] flex items-center justify-center">
              <Cpu className="w-5 h-5 text-brand-cyan" />
            </div>
          </div>
          <span className="font-semibold text-lg tracking-tight apple-gradient-text">{siteConfig.name}</span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm text-zinc-400">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => handleLinkClick(item.href)}
              className="hover:text-brand-cyan transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop Right Controls (Contact Us, Language Switcher & Console CTA) */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Contact Us Modal Trigger */}
          <button
            type="button"
            onClick={() => setIsContactModalOpen(true)}
            aria-label="Contact Us"
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-full text-sm font-medium text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all hover:border-brand-cyan/30 shadow-sm"
          >
            <Mail className="w-3.5 h-3.5 text-brand-cyan" />
            <span>{language === 'zh' ? '联系我们' : 'Contact Us'}</span>
          </button>

          {/* Apple-grade Language Switcher Capsule */}
          <div
            data-testid="lang-switch-desktop"
            className="inline-flex items-center p-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs font-medium text-zinc-400"
          >
            <Globe className="w-3.5 h-3.5 ml-1.5 mr-1 text-zinc-400" />
            <button
              type="button"
              onClick={() => setLanguage('zh')}
              className={`px-2.5 py-0.5 rounded-full transition-all ${
                language === 'zh'
                  ? 'bg-brand-cyan text-zinc-950 font-semibold shadow-sm'
                  : 'hover:text-zinc-200'
              }`}
            >
              中文
            </button>
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-0.5 rounded-full transition-all ${
                language === 'en'
                  ? 'bg-brand-cyan text-zinc-950 font-semibold shadow-sm'
                  : 'hover:text-zinc-200'
              }`}
            >
              EN
            </button>
          </div>

          <a
            href={CONSOLE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Console"
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-semibold bg-brand-cyan text-zinc-950 hover:bg-cyan-300 transition-all shadow-lg shadow-brand-cyan/25 hover:shadow-brand-cyan/40"
          >
            <span>{t.nav.console}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile Hamburger & Language Toggle Buttons */}
        <div className="flex md:hidden items-center space-x-2">
          {/* Mobile Contact Us Button */}
          <button
            type="button"
            onClick={() => setIsContactModalOpen(true)}
            className="p-1.5 rounded-lg text-zinc-300 hover:text-white bg-white/5 border border-white/10 transition-colors"
            aria-label="Contact Us"
          >
            <Mail className="w-4 h-4 text-brand-cyan" />
          </button>

          {/* Compact Language Toggle on Mobile Bar */}
          <button
            type="button"
            onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
            className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-zinc-300 hover:text-white"
            aria-label="Toggle language"
          >
            {language === 'zh' ? 'EN' : '中文'}
          </button>

          <button
            type="button"
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            aria-label="Toggle Navigation Menu"
            aria-expanded={isDrawerOpen}
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-cyan/50"
          >
            {isDrawerOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-Over / Dropdown Drawer */}
      {isDrawerOpen && (
        <div
          id="mobile-drawer"
          className="md:hidden border-b border-white/10 bg-dark-canvas/95 backdrop-blur-2xl px-4 pt-3 pb-6 transition-all duration-200 shadow-2xl block translate-x-0"
        >
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => handleLinkClick(item.href)}
                className="px-3 py-2 rounded-lg text-base font-medium text-zinc-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                {item.label}
              </a>
            ))}

            {/* Mobile Drawer Language Switcher Bar */}
            <div className="pt-2 pb-1 border-t border-white/10 flex items-center justify-between px-2 text-sm text-zinc-400">
              <span className="flex items-center space-x-2">
                <Globe className="w-4 h-4" />
                <span>语言 / Language</span>
              </span>
              <div className="inline-flex p-0.5 rounded-full bg-white/5 border border-white/10 text-xs">
                <button
                  type="button"
                  onClick={() => setLanguage('zh')}
                  className={`px-3 py-1 rounded-full ${
                    language === 'zh' ? 'bg-brand-cyan text-zinc-950 font-semibold' : 'text-zinc-400'
                  }`}
                >
                  中文
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 rounded-full ${
                    language === 'en' ? 'bg-brand-cyan text-zinc-950 font-semibold' : 'text-zinc-400'
                  }`}
                >
                  EN
                </button>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <button
                type="button"
                onClick={() => {
                  setIsDrawerOpen(false);
                  setIsContactModalOpen(true);
                }}
                className="w-full inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-full text-sm font-medium text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
              >
                <Mail className="w-4 h-4 text-brand-cyan" />
                <span>{language === 'zh' ? '联系我们 (support@nextx.cc)' : 'Contact Us (support@nextx.cc)'}</span>
              </button>

              <a
                href={CONSOLE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsDrawerOpen(false)}
                aria-label="Console"
                className="w-full inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-full text-sm font-semibold bg-brand-cyan text-zinc-950 hover:bg-cyan-300 transition-all shadow-lg shadow-brand-cyan/25"
              >
                <span>{t.nav.console}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Contact Us Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </header>
  );
}

export default Navbar;
