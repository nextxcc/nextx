import { useState } from 'react';
import { Cpu, ArrowRight, ShieldCheck, Github, Mail } from 'lucide-react';
import { siteConfig, CONSOLE_URL } from '../config/site';
import { useLanguage } from '../context/LanguageContext';
import { ContactModal } from './ContactModal';

export function Footer() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const currentYear = new Date().getFullYear();
  const { t, language } = useLanguage();

  return (
    <footer className="z-10 border-t border-white/10 pt-16 pb-12 text-sm text-zinc-400 bg-dark-canvas/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Pre-Footer Console Conversion Banner */}
        <div className="apple-glass-card rounded-3xl p-8 mb-12 flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              {language === 'zh' ? '准备好加速您的 AI 算法模型了吗？' : 'Ready to accelerate your AI models?'}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400">
              {language === 'zh'
                ? '秒级开通 Docker GPU 容器实例，零预付费，按分钟灵活计费。'
                : 'Launch Docker GPU containers in under 45 seconds with zero upfront commitment.'}
            </p>
          </div>
          <a
            href={CONSOLE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Launch GPU Console"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-full text-sm font-semibold bg-brand-cyan text-zinc-950 hover:bg-cyan-300 transition-all shadow-lg shadow-brand-cyan/25 flex-shrink-0"
          >
            <span>{language === 'zh' ? '进入 GPU 控制台' : 'Launch GPU Console'}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-brand-cyan/20 border border-brand-cyan/40 flex items-center justify-center">
                <Cpu className="w-4 h-4 text-brand-cyan" />
              </div>
              <span className="font-semibold text-white">NextX</span>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed mb-4">{t.footer.tagline}</p>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-brand-emerald/10 border border-brand-emerald/25 text-brand-emerald text-[11px] font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{language === 'zh' ? '零泄露安全验证' : 'Zero-Leak Verified'}</span>
            </div>
          </div>

          {/* Resources Col */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-200 mb-4">
              {t.footer.colResources}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href={CONSOLE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-cyan transition-colors"
                >
                  {language === 'zh' ? '开发者文档' : 'Documentation'}
                </a>
              </li>
              <li>
                <a
                  href={CONSOLE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-cyan transition-colors"
                >
                  {language === 'zh' ? '集群实时状态' : 'Cluster Status'}
                </a>
              </li>
              <li>
                <a
                  href={CONSOLE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-cyan transition-colors"
                >
                  {language === 'zh' ? '算力价格计算' : 'Pricing Calculator'}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.support}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsContactModalOpen(true);
                  }}
                  className="hover:text-brand-cyan transition-colors inline-flex items-center space-x-1 cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{t.footer.contactUs}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Ecosystem Col */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-200 mb-4">
              {language === 'zh' ? '生态与接入' : 'Ecosystem'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href={CONSOLE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-cyan transition-colors"
                >
                  {language === 'zh' ? '控制台' : 'Console'}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-cyan transition-colors inline-flex items-center space-x-1"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              </li>
              <li>
                <a
                  href={CONSOLE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-cyan transition-colors"
                >
                  {language === 'zh' ? 'API 与 CLI 终端工具' : 'API & CLI Tools'}
                </a>
              </li>
            </ul>
          </div>

          {/* Security & SLA Col */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-200 mb-4">
              {t.footer.colSecurity}
            </h4>
            <ul className="space-y-2 text-xs text-zinc-500">
              <li>{language === 'zh' ? '企业级高可用运行保障' : 'Enterprise High-Availability SLA'}</li>
              <li>{language === 'zh' ? 'KVM 硬件级微虚机隔离' : 'Isolated KVM MicroVMs'}</li>
              <li>{language === 'zh' ? 'NVMe 本地加密持久存储' : 'Encrypted Persistent NVMe'}</li>
              <li>{language === 'zh' ? '原生专属 Root SSH 访问' : 'Direct Root SSH Access'}</li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Legal Line */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            © {currentYear} {siteConfig.name}. {t.footer.rights}
          </div>
          <div className="flex items-center space-x-6">
            <a
              href={CONSOLE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Console"
              className="hover:text-brand-cyan"
            >
              {language === 'zh' ? '控制台' : 'Console'}
            </a>
            <span>Zero-Leak Architecture</span>
          </div>
        </div>
      </div>

      {/* Contact Us Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </footer>
  );
}

export default Footer;
