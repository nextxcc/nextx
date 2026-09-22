import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../src/App';
import { translations } from '../src/i18n/translations';
import { CONSOLE_URL } from '../src/config/site';

describe('Bilingual Internationalization (i18n) Test Suite', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('defaults to Chinese (zh) when no localStorage preference is set', () => {
    render(<App defaultLang="zh" />);

    // Verify Chinese hero text is displayed
    expect(screen.getByText('极速高性能')).toBeInTheDocument();
    expect(screen.getByText('GPU 算力云平台')).toBeInTheDocument();
    expect(screen.getByText('启动 GPU 实例')).toBeInTheDocument();
    expect(screen.getByText('探索算力机型')).toBeInTheDocument();

    // Verify Chinese nav links
    expect(screen.getAllByText('算力规格').length).toBeGreaterThan(0);
    expect(screen.getAllByText('价格估算').length).toBeGreaterThan(0);
    expect(screen.getAllByText('核心优势').length).toBeGreaterThan(0);
    expect(screen.getAllByText('应用场景').length).toBeGreaterThan(0);
    expect(screen.getAllByText('常见问题').length).toBeGreaterThan(0);
  });

  it('renders Apple-grade language switcher in Navbar and toggles between zh and en', () => {
    render(<App defaultLang="zh" />);

    // Check desktop language switch capsule
    const desktopSwitcher = screen.getByTestId('lang-switch-desktop');
    expect(desktopSwitcher).toBeInTheDocument();

    // Initially in Chinese mode
    expect(screen.getByText('极速高性能')).toBeInTheDocument();

    // Switch to English by clicking 'EN'
    const enButtons = screen.getAllByRole('button', { name: /^EN$/i });
    expect(enButtons.length).toBeGreaterThan(0);
    fireEvent.click(enButtons[0]);

    // Verify English text is now active
    expect(screen.getByText('Instant High-Performance')).toBeInTheDocument();
    expect(screen.getByText('GPU Cloud Compute')).toBeInTheDocument();
    expect(screen.getAllByText('GPU Catalog').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Pricing Estimator').length).toBeGreaterThan(0);
    expect(window.localStorage.getItem('nextx_lang')).toBe('en');

    // Switch back to Chinese by clicking '中文'
    const zhButtons = screen.getAllByRole('button', { name: /^中文$/i });
    fireEvent.click(zhButtons[0]);

    // Verify Chinese text is restored
    expect(screen.getByText('极速高性能')).toBeInTheDocument();
    expect(screen.getByText('GPU 算力云平台')).toBeInTheDocument();
    expect(screen.getAllByText('算力规格').length).toBeGreaterThan(0);
    expect(window.localStorage.getItem('nextx_lang')).toBe('zh');
  });

  it('persists language selection across reloads via localStorage', () => {
    window.localStorage.setItem('nextx_lang', 'en');
    render(<App />);

    // Should load English because localStorage is 'en'
    expect(screen.getByText('Instant High-Performance')).toBeInTheDocument();
    expect(screen.getAllByText('GPU Catalog').length).toBeGreaterThan(0);
  });

  it('ensures all console CTA buttons link to CONSOLE_URL in both languages', () => {
    const { unmount } = render(<App defaultLang="zh" />);
    const zhLinks = screen.getAllByRole('link');
    const zhConsoleLinks = zhLinks.filter((l) => l.getAttribute('href') === CONSOLE_URL);
    expect(zhConsoleLinks.length).toBeGreaterThanOrEqual(3);

    unmount();

    render(<App defaultLang="en" />);
    const enLinks = screen.getAllByRole('link');
    const enConsoleLinks = enLinks.filter((l) => l.getAttribute('href') === CONSOLE_URL);
    expect(enConsoleLinks.length).toBeGreaterThanOrEqual(3);
  });

  it('validates translation dictionary completeness across all required keys', () => {
    const zh = translations.zh;
    const en = translations.en;

    // Check sections exist
    expect(Object.keys(zh.nav)).toEqual(Object.keys(en.nav));
    expect(Object.keys(zh.hero)).toEqual(Object.keys(en.hero));
    expect(Object.keys(zh.catalog)).toEqual(Object.keys(en.catalog));
    expect(Object.keys(zh.pricing)).toEqual(Object.keys(en.pricing));
    expect(Object.keys(zh.advantages)).toEqual(Object.keys(en.advantages));
    expect(Object.keys(zh.useCases)).toEqual(Object.keys(en.useCases));
    expect(Object.keys(zh.faq)).toEqual(Object.keys(en.faq));
    expect(Object.keys(zh.footer)).toEqual(Object.keys(en.footer));

    // Ensure all 6 pillars have both zh and en translations
    expect(Object.keys(zh.advantages.pillars)).toEqual(Object.keys(en.advantages.pillars));
    expect(Object.keys(zh.useCases.cases)).toEqual(Object.keys(en.useCases.cases));
    expect(Object.keys(zh.faq.items)).toEqual(Object.keys(en.faq.items));
  });

  it('renders community availability disclaimer and RMB currency across the UI', () => {
    const { unmount } = render(<App defaultLang="zh" />);

    // Check Chinese disclaimer in catalog and pricing
    expect(screen.getByText('算力供给与效果展示说明')).toBeInTheDocument();
    expect(screen.getByText(/本平台采用去中心化\/共享算力撮合模式/i)).toBeInTheDocument();
    expect(screen.getByText(/算力标价为参考展示价格（计价单位：人民币 ¥）/i)).toBeInTheDocument();

    // Check RMB currency symbols
    expect(screen.getAllByText(/¥/).length).toBeGreaterThan(0);

    // Verify no bare-metal (裸金属) references in rendered text
    expect(screen.queryByText(/裸金属/)).not.toBeInTheDocument();

    unmount();

    // In English mode
    render(<App defaultLang="en" />);
    expect(screen.getByText('Fleet Availability & Demo Notice')).toBeInTheDocument();
    expect(screen.getByText(/The GPU models, hardware specifications, and estimated rates shown below are for platform demonstration/i)).toBeInTheDocument();
    expect(screen.getByText(/Estimated prices are for demonstration \(Currency: RMB ¥\)/i)).toBeInTheDocument();
    expect(screen.queryByText(/bare-metal/i)).not.toBeInTheDocument();
  });

  it('renders 50-series consumer GPUs and realistic nationwide metrics', () => {
    const { unmount } = render(<App defaultLang="zh" />);

    // Verify 50-series, popular cards, and enterprise models are in the catalog
    expect(screen.getByText('NVIDIA RTX 5090')).toBeInTheDocument();
    expect(screen.getByText('NVIDIA RTX 5080')).toBeInTheDocument();
    expect(screen.getByText('NVIDIA RTX 5070 Ti')).toBeInTheDocument();
    expect(screen.getByText('NVIDIA RTX 5070')).toBeInTheDocument();
    expect(screen.getByText('NVIDIA RTX 5060 Ti 16G')).toBeInTheDocument();
    expect(screen.getByText('NVIDIA RTX 6000 Ada')).toBeInTheDocument();
    expect(screen.getByText('NVIDIA RTX PRO 6000')).toBeInTheDocument();
    expect(screen.getByText('NVIDIA B300')).toBeInTheDocument();
    expect(screen.getByText('NVIDIA B200')).toBeInTheDocument();
    expect(screen.getByText('NVIDIA Tesla V100 32G')).toBeInTheDocument();
    expect(screen.getByText('NVIDIA Tesla V100 16G')).toBeInTheDocument();
    expect(screen.getByText('NVIDIA Tesla T10 16G')).toBeInTheDocument();
    expect(screen.getByText('NVIDIA Tesla T4 16G')).toBeInTheDocument();
    expect(screen.queryByText('NVIDIA RTX PRO 6000 Ada')).not.toBeInTheDocument();

    // Verify realistic metrics in Chinese
    expect(screen.getByText('秒级')).toBeInTheDocument();
    expect(screen.getByText('容器极速拉起')).toBeInTheDocument();
    expect(screen.getByText('高可用')).toBeInTheDocument();
    expect(screen.getByText('稳定运行保障')).toBeInTheDocument();
    expect(screen.getByText('动态池')).toBeInTheDocument();
    expect(screen.getByText('社区共享算力')).toBeInTheDocument();
    expect(screen.getByText('全国多地')).toBeInTheDocument();
    expect(screen.getByText('国内算力节点')).toBeInTheDocument();

    unmount();

    // Verify in English
    render(<App defaultLang="en" />);
    expect(screen.getByText('Instant')).toBeInTheDocument();
    expect(screen.getByText('Fast Container Spin-Up')).toBeInTheDocument();
    expect(screen.getByText('High SLA')).toBeInTheDocument();
    expect(screen.getByText('Reliable Compute SLA')).toBeInTheDocument();
    expect(screen.getByText('Dynamic')).toBeInTheDocument();
    expect(screen.getByText('Community GPU Fleet')).toBeInTheDocument();
    expect(screen.getByText('Nationwide')).toBeInTheDocument();
    expect(screen.getByText('China Compute Nodes')).toBeInTheDocument();
  });

  it('removes Discord, updates GitHub repo to nextxcc/nextx, and verifies Contact Us mailto link', () => {
    const { unmount } = render(<App defaultLang="zh" />);

    // 1. Verify Discord is completely removed
    expect(screen.queryByText(/Discord/i)).not.toBeInTheDocument();

    // 2. Verify GitHub repo points to https://github.com/nextxcc/nextx
    const githubLink = screen.getByRole('link', { name: /GitHub/i });
    expect(githubLink).toHaveAttribute('href', 'https://github.com/nextxcc/nextx');

    // 3. Verify Contact Us link points to mailto:support@nextx.cc
    const contactLinks = screen.getAllByRole('link', { name: /联系我们/i });
    expect(contactLinks.length).toBeGreaterThan(0);
    expect(contactLinks[0]).toHaveAttribute('href', 'mailto:support@nextx.cc');
    expect(screen.getByText(/support@nextx\.cc/i)).toBeInTheDocument();

    unmount();

    // English mode
    render(<App defaultLang="en" />);
    expect(screen.queryByText(/Discord/i)).not.toBeInTheDocument();
    const enContactLinks = screen.getAllByRole('link', { name: /Contact Us/i });
    expect(enContactLinks.length).toBeGreaterThan(0);
    expect(enContactLinks[0]).toHaveAttribute('href', 'mailto:support@nextx.cc');
  });
});

