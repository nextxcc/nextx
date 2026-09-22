import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import App from '../src/App';
import { CONSOLE_URL, siteConfig } from '../src/config/site';
import { GPU_CATALOG } from '../src/data/gpuData';
import { calculateCost } from '../src/utils/pricing';

describe('Tier 4: Real-World End-to-End User Journey Scenarios (8 Scenarios)', () => {
  // -------------------------------------------------------------------------
  // Scenario A: Deep Learning Researcher User Flow
  // -------------------------------------------------------------------------
  it('Scenario A: Deep Learning Researcher configures 8x H100 SXM5, checks PyTorch 2.4, estimates 168h cost, launches console', () => {
    // 1. Researcher inspects hardware fleet for 8x H100 SXM5
    const h100 = GPU_CATALOG.find((g) => g.id === 'h100-sxm5');
    expect(h100).toBeDefined();
    expect(h100?.vramGb).toBe(80);
    expect(h100?.interconnect).toBe('NVLink 900 GB/s');

    // 2. Researcher confirms pre-installed environment includes PyTorch and CUDA
    expect(h100?.preInstalledEnvironments).toContain('PyTorch 2.5');
    expect(h100?.preInstalledEnvironments).toContain('CUDA 12.8');
    expect(h100?.preInstalledEnvironments).toContain('DeepSpeed');

    // 3. Researcher estimates cost for 8 nodes for 1 week (168 hours) in Spot mode
    const res = calculateCost({ gpu: h100!, quantity: 8, hours: 168, isSpot: true });
    expect(res.effectiveHourlyRateTotal).toBe(88.00);
    expect(res.totalCost).toBe(14784.00);
    expect(res.savingsVsOnDemand).toBe(6451.20);

    // 4. Researcher initiates deployment via Launch Console CTA
    render(<App />);
    const cta = screen.getByRole('link', { name: /Launch GPU Instance/i });
    expect(cta).toHaveAttribute('href', CONSOLE_URL);
    expect(cta).toHaveAttribute('target', '_blank');
  });

  // -------------------------------------------------------------------------
  // Scenario B: Independent GenAI Creator User Flow
  // -------------------------------------------------------------------------
  it('Scenario B: Independent GenAI Creator compares RTX 4090 vs RTX 3090 for ComfyUI, toggles spot pricing, checks hourly rate', () => {
    // 1. Creator compares RTX 4090 and RTX 3090
    const rtx4090 = GPU_CATALOG.find((g) => g.id === 'rtx-4090')!;
    const rtx3090 = GPU_CATALOG.find((g) => g.id === 'rtx-3090')!;

    // 2. Verifies ComfyUI support
    expect(rtx4090.preInstalledEnvironments).toContain('ComfyUI');

    // 3. Creator toggles Spot pricing: compares hourly costs
    expect(rtx4090.spotPriceHourly).toBe(1.28);
    expect(rtx3090.spotPriceHourly).toBe(0.88);

    // 4. Calculates 10-hour rendering session on RTX 4090 spot
    const res = calculateCost({ gpu: rtx4090, quantity: 1, hours: 10, isSpot: true });
    expect(res.totalCost).toBe(12.80);

    // 5. Clicks conversion CTA
    render(<App />);
    const headerConsole = screen.getAllByRole('link', { name: /^Console$/i })[0];
    expect(headerConsole).toHaveAttribute('href', CONSOLE_URL);
  });

  // -------------------------------------------------------------------------
  // Scenario C: Startup CTO Review Flow
  // -------------------------------------------------------------------------
  it('Scenario C: Startup CTO reviews High SLA, data persistence, and launches console from Navbar', () => {
    render(<App />);

    // 1. CTO reviews platform uptime SLA
    expect(screen.getByText(siteConfig.stats.uptimeSla)).toBeInTheDocument();
    expect(screen.getByText(/Reliable Compute SLA/i)).toBeInTheDocument();

    // 2. CTO reviews spin-up speed
    expect(screen.getByText(siteConfig.stats.spinUpTime)).toBeInTheDocument();
    expect(screen.getByText(/Fast Container Spin-Up/i)).toBeInTheDocument();

    // 3. CTO confirms zero-leak architecture claim in footer
    expect(screen.getAllByText(/Zero-Leak/i).length).toBeGreaterThan(0);

    // 4. CTO launches console from top navigation
    const header = screen.getByRole('banner');
    const launchBtn = header.querySelector(`a[href="${CONSOLE_URL}"]`);
    expect(launchBtn).toBeInTheDocument();
  });

  // -------------------------------------------------------------------------
  // Scenario D: University ML Student Budget Experimentation Flow
  // -------------------------------------------------------------------------
  it('Scenario D: Student runs 2-hour lab experiment on 1x RTX 3090 spot instance under ¥5.00 budget', () => {
    const rtx3090 = GPU_CATALOG.find((g) => g.id === 'rtx-3090')!;
    const res = calculateCost({ gpu: rtx3090, quantity: 1, hours: 2, isSpot: true });
    expect(res.totalCost).toBe(1.76);
    expect(res.totalCost).toBeLessThan(5.00);

    // Verifies fractional pay-as-you-go model
    expect(siteConfig.tagline).toContain('Instant On-Demand GPU Compute');
  });

  // -------------------------------------------------------------------------
  // Scenario E: Enterprise AI Architect Evaluating vLLM Serving
  // -------------------------------------------------------------------------
  it('Scenario E: Enterprise Architect checks L40S and RTX 6000 Ada with 48GB VRAM for vLLM deployment', () => {
    const l40s = GPU_CATALOG.find((g) => g.id === 'l40s')!;
    const rtx6000 = GPU_CATALOG.find((g) => g.id === 'rtx-6000-ada')!;

    // Both cards provide 48GB VRAM suitable for 70B parameter quantized models
    expect(l40s.vramGb).toBe(48);
    expect(rtx6000.vramGb).toBe(48);

    // Both support vLLM container stack
    expect(l40s.preInstalledEnvironments).toContain('vLLM');
    expect(rtx6000.preInstalledEnvironments).toContain('vLLM');
  });

  // -------------------------------------------------------------------------
  // Scenario F: Mobile Phone User Journey
  // -------------------------------------------------------------------------
  it('Scenario F: Mobile user opens landing page, views hero metrics, navigates via CTA', () => {
    render(<App />);

    // Mobile layout has responsive classes
    const heroBtn = screen.getByRole('link', { name: /Launch GPU Instance/i });
    expect(heroBtn).toHaveClass('w-full');
    expect(heroBtn).toHaveClass('sm:w-auto');

    // Tapping hero CTA routes cleanly
    expect(heroBtn).toHaveAttribute('href', CONSOLE_URL);
  });

  // -------------------------------------------------------------------------
  // Scenario G: Security Auditor Compliance Flow
  // -------------------------------------------------------------------------
  it('Scenario G: Security auditor verifies 100% of external links point exclusively to CONSOLE_URL or GitHub', () => {
    render(<App />);
    const allLinks = screen.getAllByRole('link');
    const externalLinks = allLinks.filter((l) => {
      const href = l.getAttribute('href') || '';
      return href.startsWith('http://') || href.startsWith('https://');
    });

    expect(externalLinks.length).toBeGreaterThanOrEqual(4);
    externalLinks.forEach((link) => {
      const href = link.getAttribute('href');
      expect(
        href === CONSOLE_URL ||
        href === siteConfig.links.github ||
        href?.startsWith('https://github.com')
      ).toBe(true);
    });
  });

  // -------------------------------------------------------------------------
  // Scenario H: Full Conversion Funnel Flow
  // -------------------------------------------------------------------------
  it('Scenario H: Complete conversion journey from hero arrival to footer console navigation', () => {
    render(<App />);

    // 1. User arrives at hero section
    expect(screen.getByText('NextX GPU Cloud')).toBeInTheDocument();

    // 2. User explores fleet anchor link
    const fleetLink = screen.getByRole('link', { name: /Explore Hardware Fleet/i });
    expect(fleetLink).toHaveAttribute('href', '#catalog');

    // 3. User checks region coverage
    expect(screen.getByText(siteConfig.stats.globalRegions)).toBeInTheDocument();
    expect(screen.getByText(/China Compute Nodes/i)).toBeInTheDocument();

    // 4. User concludes at footer and activates persistent Console link
    const footer = document.querySelector('footer');
    const footerCta = footer?.querySelector(`a[href="${CONSOLE_URL}"]`);
    expect(footerCta).toBeInTheDocument();
  });
});
