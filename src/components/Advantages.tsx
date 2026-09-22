import { useState } from 'react';
import { Zap, Terminal, Clock, Layers, Cpu, HardDrive, Check, Copy } from 'lucide-react';
import { CORE_PILLARS, ENVIRONMENT_CATALOG } from '../data/featureData';
import { useLanguage } from '../context/LanguageContext';

export function Advantages() {
  const [copied, setCopied] = useState(false);
  const { t, language } = useLanguage();

  const copySshCommand = () => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(ENVIRONMENT_CATALOG.sshSample);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getIcon = (id: string) => {
    switch (id) {
      case 'instant-boot':
        return <Zap className="w-5 h-5 text-brand-cyan" />;
      case 'root-ssh':
        return <Terminal className="w-5 h-5 text-brand-emerald" />;
      case 'pay-per-minute':
        return <Clock className="w-5 h-5 text-brand-amber" />;
      case 'turnkey-env':
        return <Layers className="w-5 h-5 text-brand-violet" />;
      case 'bare-metal':
        return <Cpu className="w-5 h-5 text-brand-indigo" />;
      case 'encrypted-storage':
        return <HardDrive className="w-5 h-5 text-brand-cyan" />;
      default:
        return <Zap className="w-5 h-5 text-brand-cyan" />;
    }
  };

  return (
    <section id="advantages" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          <span className="apple-gradient-text">{t.advantages.titleEngineered}</span>{' '}
          <span className="apple-accent-gradient-text">{t.advantages.titleAdvantages}</span>
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base">{t.advantages.subtitle}</p>
      </div>

      {/* 6-Pillar Advantages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {CORE_PILLARS.map((pillar) => {
          const localized = t.advantages.pillars[pillar.id] || pillar;
          return (
            <div
              key={pillar.id}
              className="apple-glass-card rounded-2xl p-6 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                  {getIcon(pillar.id)}
                </div>
                <h3 className="text-lg font-bold text-white mb-2 tracking-tight">{localized.title}</h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-4">{localized.description}</p>
              </div>
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-zinc-500 font-medium">{language === 'zh' ? '服务保障:' : 'Assurance:'}</span>
                <span className="text-brand-cyan font-mono font-semibold">{localized.spec}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Turnkey AI Environment Shell Snippet Card */}
      <div className="apple-glass-card rounded-2xl p-6 max-w-3xl mx-auto border border-white/10 font-mono text-xs">
        {/* Terminal Header */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
            <span className="text-zinc-400 font-sans text-xs ml-2">
              {language === 'zh' ? '终端连接会话 (SSH Session)' : 'Terminal Shell Session'}
            </span>
          </div>
          <button
            type="button"
            aria-label="Copy SSH command"
            onClick={copySshCommand}
            className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 text-zinc-300 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-brand-emerald" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? t.advantages.copied : t.advantages.copy}</span>
          </button>
        </div>

        {/* Shell Command */}
        <div className="bg-black/60 rounded-xl p-4 text-zinc-300 overflow-x-auto mb-4 border border-white/5">
          <span className="text-brand-cyan">$ </span>
          <span>{ENVIRONMENT_CATALOG.sshSample}</span>
        </div>

        {/* Stack Status Badges & Image Info */}
        <div className="space-y-3 font-sans">
          <div className="flex flex-wrap items-center gap-2 text-[11px]">
            <span className="text-zinc-500 font-medium">
              {language === 'zh' ? '预装深度学习框架:' : 'Pre-baked Stacks:'}
            </span>
            {ENVIRONMENT_CATALOG.frameworks.map((fw) => (
              <span key={fw} className="px-2 py-0.5 rounded-md bg-white/5 text-zinc-300 border border-white/10">
                {fw}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2 text-[11px]">
            <span className="text-zinc-500 font-medium">
              {language === 'zh' ? '支持 CUDA 运行时:' : 'CUDA Runtimes:'}
            </span>
            {ENVIRONMENT_CATALOG.cudaVersions.map((cuda) => (
              <span key={cuda} className="px-2 py-0.5 rounded-md bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20 font-mono">
                CUDA {cuda}
              </span>
            ))}
          </div>
          <div className="flex items-center space-x-2 text-[11px] text-zinc-500 pt-1">
            <span>{language === 'zh' ? '官方标准镜像:' : 'Standard Image:'}</span>
            <span className="font-mono text-zinc-400">{ENVIRONMENT_CATALOG.defaultImage}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Advantages;
