import { useState, useMemo } from 'react';
import { Cpu, ArrowRight, Sparkles, Search, AlertCircle } from 'lucide-react';
import { CONSOLE_URL } from '../config/site';
import { GPU_FLEET, type GpuNode } from '../data/gpuData';
import { useLanguage } from '../context/LanguageContext';

export interface GpuCatalogProps {
  onSelectGpuForEstimate?: (gpu: GpuNode) => void;
}

type FilterCategory = 'all' | 'enterprise' | 'consumer';

export function GpuCatalog({ onSelectGpuForEstimate }: GpuCatalogProps) {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { t, language } = useLanguage();

  const filteredGpus = useMemo(() => {
    return GPU_FLEET.filter((gpu) => {
      const matchesCategory = activeCategory === 'all' || gpu.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const cleanQ = q.replace(/\s+/g, '');
      const searchableStr = `${gpu.name} ${gpu.shortName ?? ''} ${gpu.architecture} ${gpu.id}`.toLowerCase();
      const cleanSearchableStr = searchableStr.replace(/\s+/g, '');
      const matchesSearch = searchableStr.includes(q) || cleanSearchableStr.includes(cleanQ);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="catalog" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          <span className="apple-gradient-text">{t.catalog.titleHighPerf}</span>{' '}
          <span className="apple-accent-gradient-text">{t.catalog.titleFleet}</span>
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base">{t.catalog.subtitle}</p>
      </div>

      {/* Community Stock & Demonstration Notice Banner */}
      <div className="max-w-4xl mx-auto mb-10 p-4 sm:p-5 rounded-2xl bg-amber-500/[0.08] border border-amber-500/25 backdrop-blur-md flex items-start space-x-3.5 text-amber-200/90 text-xs sm:text-sm">
        <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-semibold text-amber-300 tracking-wide flex items-center gap-2">
            <span>{t.catalog.noticeTitle}</span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
              {language === 'zh' ? '展示说明' : 'Demo Notice'}
            </span>
          </div>
          <p className="text-zinc-300 leading-relaxed text-xs sm:text-sm">
            {t.catalog.noticeDesc}
          </p>
        </div>
      </div>

      {/* Category Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
        <div className="inline-flex p-1 rounded-xl bg-dark-card border border-white/10 backdrop-blur-md">
          <button
            type="button"
            aria-label="All"
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeCategory === 'all'
                ? 'bg-brand-cyan text-zinc-950 font-semibold shadow-md shadow-brand-cyan/20'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {t.catalog.tabAll}
          </button>
          <button
            type="button"
            aria-label="Consumer"
            onClick={() => setActiveCategory('consumer')}
            className={`px-4 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeCategory === 'consumer'
                ? 'bg-brand-cyan text-zinc-950 font-semibold shadow-md shadow-brand-cyan/20'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {t.catalog.tabConsumer}
          </button>
          <button
            type="button"
            aria-label="Enterprise AI"
            onClick={() => setActiveCategory('enterprise')}
            className={`px-4 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeCategory === 'enterprise'
                ? 'bg-brand-cyan text-zinc-950 font-semibold shadow-md shadow-brand-cyan/20'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {t.catalog.tabEnterprise}
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder={t.catalog.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-dark-card border border-white/10 text-xs sm:text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-brand-cyan/50 transition-colors"
          />
        </div>
      </div>

      {/* GPU Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGpus.map((gpu) => (
          <div
            key={gpu.id}
            className="apple-glass-card rounded-2xl p-6 border border-white/10 flex flex-col justify-between hover:border-brand-cyan/40 transition-all duration-300 group"
          >
            {/* Card Category Badge & Popularity Pill */}
            <div className="flex items-center justify-between mb-4">
              <span
                className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                  gpu.category === 'enterprise'
                    ? 'bg-brand-violet/15 text-brand-violet border border-brand-violet/30'
                    : 'bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/30'
                }`}
              >
                {gpu.category === 'enterprise' ? t.catalog.tabEnterprise : t.catalog.tabConsumer}
              </span>
              {gpu.popular && (
                <span className="inline-flex items-center space-x-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-brand-amber border border-brand-amber/30">
                  <Sparkles className="w-3 h-3" />
                  <span>{t.catalog.badges['Most Popular'] || 'Popular'}</span>
                </span>
              )}
            </div>

            {/* GPU Name & Architecture */}
            <div className="mb-5">
              <h3 className="text-xl font-bold text-white tracking-tight mb-1">{gpu.name}</h3>
              <p className="text-xs text-zinc-400 font-medium">
                {gpu.architecture} {language === 'zh' ? '架构' : 'Architecture'}
              </p>
            </div>

            {/* Hardware Specs Grid */}
            <div className="grid grid-cols-2 gap-2 py-3 px-3.5 rounded-xl bg-white/[0.02] border border-white/5 mb-5 text-xs">
              <div>
                <div className="text-zinc-500 text-[10px] uppercase font-semibold">{t.catalog.vram}</div>
                <div className="text-zinc-200 font-mono font-medium">
                  {gpu.vramGb} GB {gpu.memoryType}
                </div>
              </div>
              <div>
                <div className="text-zinc-500 text-[10px] uppercase font-semibold">{t.catalog.fp16}</div>
                <div className="text-zinc-200 font-mono font-medium">{gpu.tflopsFp16} TFLOPS</div>
              </div>
              <div className="col-span-2 pt-1 border-t border-white/5 flex items-center justify-between">
                <span className="text-zinc-500 text-[10px] uppercase font-semibold">{t.catalog.interconnect}</span>
                <span className="text-zinc-300 font-mono text-[11px]">{gpu.interconnect}</span>
              </div>
            </div>

            {/* Preinstalled Software Chips */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {gpu.preInstalledEnvironments.slice(0, 4).map((env) => (
                <span
                  key={env}
                  className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-zinc-400 border border-white/5"
                >
                  {env}
                </span>
              ))}
            </div>

            {/* Pricing Details & Action CTAs */}
            <div className="border-t border-white/10 pt-4 flex flex-col gap-3">
              <div className="flex items-baseline justify-between">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xs text-zinc-400">{t.catalog.onDemand}:</span>
                  <span className="text-lg font-bold text-white font-mono">
                    ¥{gpu.onDemandPriceHourly.toFixed(2)}
                  </span>
                  <span className="text-xs text-zinc-500 font-normal">{t.catalog.hourly}</span>
                </div>
                <span className="text-[11px] text-zinc-500 font-mono">
                  {gpu.vramGb}GB {gpu.memoryType}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={CONSOLE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Launch Instance"
                  className="flex-1 inline-flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-xl bg-brand-cyan text-zinc-950 text-xs font-semibold hover:bg-cyan-300 transition-all shadow-md shadow-brand-cyan/20"
                >
                  <span>{t.catalog.launchBtn}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <button
                  type="button"
                  aria-label="Estimate"
                  onClick={() => {
                    onSelectGpuForEstimate?.(gpu);
                    const pricingElem = document.getElementById('pricing');
                    pricingElem?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-3 py-2.5 rounded-xl border border-white/15 hover:border-brand-cyan/40 hover:bg-white/5 text-xs text-zinc-300 transition-all"
                  title="Estimate cost in pricing calculator"
                >
                  {t.catalog.estimateBtn}
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Empty Search Result State */}
        {filteredGpus.length === 0 && (
          <div className="text-center py-16 apple-glass-card rounded-2xl col-span-full border border-white/10">
            <Cpu className="w-10 h-10 text-zinc-500 mx-auto mb-3" />
            <p className="text-zinc-300 font-medium">
              {language === 'zh' ? '未找到符合条件的 GPU 节点。' : 'No GPU nodes found matching your criteria.'}
            </p>
            <p className="text-xs text-zinc-500 mt-1">
              {language === 'zh' ? '请尝试切换至“全部”或调整搜索关键字。' : 'Try selecting "All" or adjusting your search term.'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default GpuCatalog;
