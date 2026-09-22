import { Cpu, Sparkles, GraduationCap, Server, ArrowRight } from 'lucide-react';
import { CONSOLE_URL } from '../config/site';
import { USE_CASES } from '../data/useCaseData';
import { useLanguage } from '../context/LanguageContext';

export function UseCases() {
  const { t, language } = useLanguage();

  const getIcon = (id: string) => {
    switch (id) {
      case 'llm-fine-tuning':
        return <Cpu className="w-5 h-5 text-brand-cyan" />;
      case 'generative-diffusion':
        return <Sparkles className="w-5 h-5 text-brand-violet" />;
      case 'academic-research':
        return <GraduationCap className="w-5 h-5 text-brand-emerald" />;
      case 'production-inference':
        return <Server className="w-5 h-5 text-brand-amber" />;
      default:
        return <Cpu className="w-5 h-5 text-brand-cyan" />;
    }
  };

  return (
    <section id="use-cases" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          <span className="apple-gradient-text">{t.useCases.titlePurpose}</span>{' '}
          <span className="apple-accent-gradient-text">{t.useCases.titleWorkloads}</span>
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base">{t.useCases.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {USE_CASES.map((uc) => {
          const localized = t.useCases.cases[uc.id] || uc;
          return (
            <div
              key={uc.id}
              className="apple-glass-card rounded-2xl p-6 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                  {getIcon(uc.id)}
                </div>
                <h3 className="text-lg font-bold text-white mb-2 tracking-tight">{localized.name}</h3>
                <p className="text-xs text-zinc-400 mb-4 leading-relaxed">{localized.description}</p>
              </div>

              <div>
                <div className="mb-4">
                  <div className="text-[10px] uppercase font-semibold text-zinc-500 mb-1.5">
                    {t.useCases.recommended}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {uc.recommendedGpus.map((gpu) => (
                      <span
                        key={gpu}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20"
                      >
                        {gpu}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-5">
                  <div className="text-[10px] uppercase font-semibold text-zinc-500 mb-1.5">
                    {language === 'zh' ? '核心技术栈' : 'Stack Tags'}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {uc.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href={CONSOLE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Deploy Workload"
                  className="w-full inline-flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl bg-white/5 hover:bg-brand-cyan/20 border border-white/10 hover:border-brand-cyan/40 text-zinc-300 hover:text-white text-xs font-medium transition-all"
                >
                  <span>{language === 'zh' ? '部署此场景' : 'Deploy Workload'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default UseCases;
