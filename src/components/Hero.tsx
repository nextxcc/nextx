import { Zap, ArrowRight } from 'lucide-react';
import { siteConfig, CONSOLE_URL } from '../config/site';
import { useLanguage } from '../context/LanguageContext';

export function Hero() {
  const { t, language } = useLanguage();

  return (
    <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
      {/* Architecture Pill Badge */}
      <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full text-xs font-medium border border-brand-cyan/30 bg-brand-cyan/10 text-brand-cyan mb-8 animate-fade-in shadow-sm shadow-brand-cyan/20">
        <Zap className="w-3.5 h-3.5 animate-pulse text-brand-cyan" />
        <span>{t.hero.badge}</span>
      </div>

      {/* Main High-Tech Headline */}
      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight max-w-5xl leading-tight sm:leading-tight mb-6">
        <span className="apple-gradient-text">{t.hero.titleInstant}</span>{' '}
        <span className="apple-accent-gradient-text">{t.hero.titleGpu}</span>
      </h1>

      {/* Platform Subtitle */}
      <p className="max-w-3xl text-base sm:text-lg text-zinc-400 mb-10 leading-relaxed font-normal">
        {t.hero.description}
      </p>

      {/* Dual CTAs */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-16 w-full sm:w-auto">
        <a
          href={CONSOLE_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Launch GPU Instance"
          className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 rounded-full text-base font-semibold bg-gradient-to-r from-brand-cyan to-brand-indigo text-zinc-950 hover:opacity-95 transition-all shadow-xl shadow-brand-cyan/20 hover:shadow-brand-cyan/35"
        >
          <span>{t.hero.launchCta}</span>
          <ArrowRight className="w-4 h-4" />
        </a>
        <a
          href="#catalog"
          aria-label="Explore Hardware Fleet"
          className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full text-base font-medium border border-white/15 hover:border-brand-cyan/40 hover:bg-white/5 transition-all text-zinc-300 hover:text-white"
        >
          {t.hero.exploreFleet}
        </a>
      </div>

      {/* Platform Live Metrics Ticker Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
        <div className="apple-glass-card rounded-2xl p-5 text-center">
          <div className="text-2xl sm:text-3xl font-bold text-white mb-1 font-mono tracking-tight">
            {language === 'zh' ? '秒级' : siteConfig.stats.spinUpTime}
          </div>
          <div className="text-xs text-zinc-400 font-medium">{t.hero.spinUpLatency}</div>
        </div>
        <div className="apple-glass-card rounded-2xl p-5 text-center">
          <div className="text-2xl sm:text-3xl font-bold text-brand-emerald mb-1 font-mono tracking-tight">
            {language === 'zh' ? '高可用' : siteConfig.stats.uptimeSla}
          </div>
          <div className="text-xs text-zinc-400 font-medium">{t.hero.uptimeSla}</div>
        </div>
        <div className="apple-glass-card rounded-2xl p-5 text-center">
          <div className="text-2xl sm:text-3xl font-bold text-brand-cyan mb-1 font-mono tracking-tight">
            {language === 'zh' ? '动态池' : siteConfig.stats.availableGpus}
          </div>
          <div className="text-xs text-zinc-400 font-medium">{t.hero.availableGpus}</div>
        </div>
        <div className="apple-glass-card rounded-2xl p-5 text-center">
          <div className="text-2xl sm:text-3xl font-bold text-brand-violet mb-1 font-mono tracking-tight">
            {language === 'zh' ? '全国多地' : siteConfig.stats.globalRegions}
          </div>
          <div className="text-xs text-zinc-400 font-medium">{t.hero.globalCoverage}</div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
