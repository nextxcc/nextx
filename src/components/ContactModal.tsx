import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Mail, Copy, Check, X, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { siteConfig } from '../config/site';

export interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { t, language } = useLanguage();
  const [copied, setCopied] = useState(false);
  const email = siteConfig.supportEmail ?? 'support@nextx.cc';

  useEffect(() => {
    if (!isOpen) {
      setCopied(false);
      return;
    }

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopy = () => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(email);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const strings = t.contactModal ?? {
    title: language === 'zh' ? '联系我们' : 'Contact Us',
    subtitle:
      language === 'zh'
        ? '如有任何算力租赁需求、定制私有集群或机主节点入驻，欢迎随时与我们沟通。'
        : 'Reach out for GPU rentals, custom clusters, enterprise SLAs, or becoming a compute host.',
    emailLabel: language === 'zh' ? '官方支持邮箱' : 'Official Support Email',
    copyBtn: language === 'zh' ? '复制邮箱' : 'Copy Email',
    copiedBtn: language === 'zh' ? '已复制到剪贴板！' : 'Copied to Clipboard!',
    sendEmailBtn: language === 'zh' ? '直接发送邮件' : 'Send Email via Mail App',
    closeBtn: language === 'zh' ? '关闭' : 'Close',
    slaNotice:
      language === 'zh'
        ? '工作日通常在 2 小时内快速响应您的邮件。'
        : 'We typically respond within 2 business hours.',
  };

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md transition-all duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md my-auto apple-glass-card rounded-3xl p-6 sm:p-8 border border-white/15 bg-zinc-950/95 shadow-2xl shadow-black/90 backdrop-blur-2xl text-left overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow backdrop effects */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-cyan/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-brand-violet/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 p-2 rounded-full text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Icon & Header */}
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-cyan/20 to-brand-violet/20 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan shadow-lg shadow-brand-cyan/15">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h3 id="contact-modal-title" className="text-xl font-bold text-white tracking-tight">
              {strings.title}
            </h3>
            <span className="text-[11px] font-mono text-brand-cyan bg-brand-cyan/10 px-2 py-0.5 rounded-full border border-brand-cyan/20">
              NextX Support
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
          {strings.subtitle}
        </p>

        {/* Email Address Capsule with Copy */}
        <div className="bg-black/60 rounded-2xl p-4 border border-white/10 mb-6">
          <div className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider mb-1.5">
            {strings.emailLabel}
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-sm sm:text-base font-bold text-zinc-100 select-all tracking-wide">
              {email}
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className={`inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                copied
                  ? 'bg-brand-emerald/20 text-brand-emerald border border-brand-emerald/30 font-semibold'
                  : 'bg-white/10 hover:bg-white/15 text-zinc-200 border border-white/10'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? strings.copiedBtn : strings.copyBtn}</span>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <a
            href={`mailto:${email}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center space-x-2 py-3 px-5 rounded-xl bg-brand-cyan text-zinc-950 font-semibold text-sm hover:bg-cyan-300 transition-all shadow-lg shadow-brand-cyan/25 hover:shadow-brand-cyan/40"
          >
            <Send className="w-4 h-4" />
            <span>{strings.sendEmailBtn}</span>
          </a>

          <button
            type="button"
            onClick={handleCopy}
            className="w-full inline-flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white text-xs font-medium transition-all"
          >
            <Copy className="w-3.5 h-3.5 text-zinc-400" />
            <span>{copied ? strings.copiedBtn : `${strings.copyBtn} (${email})`}</span>
          </button>
        </div>

        {/* SLA Notice */}
        <p className="text-[11px] text-zinc-500 text-center mt-4 font-mono">
          ※ {strings.slaNotice}
        </p>
      </div>
    </div>
  );

  if (typeof document !== 'undefined') {
    return createPortal(modalContent, document.body);
  }

  return modalContent;
}

export default ContactModal;
