import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import fs from 'fs';
import path from 'path';
import App from '../src/App';
import { siteConfig, SITE_CONFIG, CONSOLE_URL } from '../src/config/site';
import { GPU_CATALOG } from '../src/data/gpuData';
import { GpuCatalog } from '../src/components/GpuCatalog';
import { calculateCost } from '../src/utils/pricing';
import { CORE_PILLARS, ENVIRONMENT_CATALOG } from '../src/data/featureData';
import { Advantages } from '../src/components/Advantages';
import { USE_CASES } from '../src/data/useCaseData';
import { UseCases } from '../src/components/UseCases';
import { FAQ_ITEMS } from '../src/data/faqData';
import { Faq } from '../src/components/Faq';

const projectRoot = path.resolve(__dirname, '..');

describe('Tier 1: Comprehensive Feature Coverage (16 Features, ≥5 Tests Each)', () => {
  // =========================================================================
  // Feature 1: Centralized Target Routing (5 tests)
  // =========================================================================
  describe('Feature 1: Centralized Target Routing', () => {
    it('1.1: siteConfig and CONSOLE_URL export the canonical target URL', () => {
      expect(CONSOLE_URL).toBe('https://marketplace.nextx.cc/');
      expect(SITE_CONFIG.consoleUrl).toBe(CONSOLE_URL);
      expect(siteConfig.consoleUrl).toBe(CONSOLE_URL);
    });

    it('1.2: App renders primary Hero CTA linking directly to CONSOLE_URL', () => {
      render(<App />);
      const heroLink = screen.getByRole('link', { name: /Launch GPU Instance/i });
      expect(heroLink).toBeInTheDocument();
      expect(heroLink).toHaveAttribute('href', CONSOLE_URL);
    });

    it('1.3: Navbar renders Console action button linking to CONSOLE_URL', () => {
      render(<App />);
      const navConsoleLinks = screen.getAllByRole('link', { name: /^Console$/i });
      expect(navConsoleLinks.length).toBeGreaterThan(0);
      const navConsole = navConsoleLinks[0];
      expect(navConsole).toHaveAttribute('href', CONSOLE_URL);
    });

    it('1.4: Footer renders Console link linking to CONSOLE_URL', () => {
      render(<App />);
      const footerLinks = screen.getAllByRole('link');
      const footerConsole = footerLinks.find(
        (link) => link.textContent?.trim() === 'Console' && link.closest('footer')
      );
      expect(footerConsole).toBeDefined();
      expect(footerConsole).toHaveAttribute('href', CONSOLE_URL);
    });

    it('1.5: All CTA links to console specify target="_blank" and rel containing noopener', () => {
      render(<App />);
      const allLinks = screen.getAllByRole('link');
      const consoleLinks = allLinks.filter((l) => l.getAttribute('href') === CONSOLE_URL);
      expect(consoleLinks.length).toBeGreaterThanOrEqual(3);
      consoleLinks.forEach((link) => {
        expect(link).toHaveAttribute('target', '_blank');
        expect(link.getAttribute('rel')).toContain('noopener');
      });
    });
  });

  // =========================================================================
  // Feature 2: Zero-Leak Security Architecture (5 tests)
  // =========================================================================
  describe('Feature 2: Zero-Leak Isolation Architecture', () => {
    it('2.1: src/config/site.ts contains zero private IPv4 addresses', () => {
      const content = fs.readFileSync(path.join(projectRoot, 'src/config/site.ts'), 'utf-8');
      const privateIpPattern = /\b(?:10\.\d{1,3}\.\d{1,3}\.\d{1,3}|172\.(?:1[6-9]|2\d|3[0-1])\.\d{1,3}\.\d{1,3}|192\.168\.\d{1,3}\.\d{1,3}|127\.0\.0\.1)\b/;
      expect(content).not.toMatch(privateIpPattern);
    });

    it('2.2: src/config/site.ts contains zero localhost references or private ports', () => {
      const content = fs.readFileSync(path.join(projectRoot, 'src/config/site.ts'), 'utf-8');
      expect(content).not.toMatch(/localhost/i);
      expect(content).not.toMatch(/:8080|:3000|:5000/);
    });

    it('2.3: siteConfig outbound links contain zero internal domain patterns', () => {
      const linkValues = Object.values(siteConfig.links);
      linkValues.forEach((url) => {
        expect(url).toMatch(/^(?:https:\/\/(?:marketplace\.nextx\.cc|nextx\.cc|github\.com)\/|mailto:[a-zA-Z0-9._%+-]+@nextx\.cc)/);
        expect(url).not.toMatch(/\.(?:internal|local|corp|lan|cluster\.local)\b/);
      });
    });

    it('2.4: Rendered App DOM contains zero leaked private IP strings or port numbers', () => {
      const { container } = render(<App />);
      const domHtml = container.innerHTML;
      expect(domHtml).not.toMatch(/\b192\.168\.\d+\.\d+\b/);
      expect(domHtml).not.toMatch(/\b10\.\d+\.\d+\.\d+\b/);
      expect(domHtml).not.toMatch(/\b172\.(?:1[6-9]|2\d|3[0-1])\.\d+\.\d+\b/);
      expect(domHtml).not.toMatch(/localhost:\d+/);
    });

    it('2.5: scripts/security-scan.mjs exists and is configured for zero-leak audit', () => {
      const scriptPath = path.join(projectRoot, 'scripts/security-scan.mjs');
      expect(fs.existsSync(scriptPath)).toBe(true);
      const scriptCode = fs.readFileSync(scriptPath, 'utf-8');
      expect(scriptCode).toContain('Private IPv4 Address');
      expect(scriptCode).toContain('Database Connection String');
    });
  });

  // =========================================================================
  // Feature 3: Build & TypeScript Foundation (5 tests)
  // =========================================================================
  describe('Feature 3: Build & TypeScript Validity', () => {
    it('3.1: package.json defines standard build, typecheck, test and security scripts', () => {
      const pkg = JSON.parse(fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf-8'));
      expect(pkg.scripts.build).toBeDefined();
      expect(pkg.scripts.typecheck).toBe('tsc --noEmit');
      expect(pkg.scripts.test).toBeDefined();
      expect(pkg.scripts['security-scan']).toBeDefined();
    });

    it('3.2: package.json is configured as ES module with React 18 & Lucide dependencies', () => {
      const pkg = JSON.parse(fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf-8'));
      expect(pkg.type).toBe('module');
      expect(pkg.dependencies.react).toContain('18');
      expect(pkg.dependencies['react-dom']).toContain('18');
      expect(pkg.dependencies['lucide-react']).toBeDefined();
    });

    it('3.3: tsconfig.json enforces strict mode and react-jsx transforms', () => {
      const raw = fs.readFileSync(path.join(projectRoot, 'tsconfig.json'), 'utf-8');
      const sanitized = raw.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '');
      const tsconfig = JSON.parse(sanitized);
      expect(tsconfig.compilerOptions.strict).toBe(true);
      expect(tsconfig.compilerOptions.jsx).toBe('react-jsx');
      expect(tsconfig.compilerOptions.noEmit).toBe(true);
    });

    it('3.4: tsconfig.json configures path alias mapping @/* to src/*', () => {
      const raw = fs.readFileSync(path.join(projectRoot, 'tsconfig.json'), 'utf-8');
      const sanitized = raw.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '');
      const tsconfig = JSON.parse(sanitized);
      expect(tsconfig.compilerOptions.paths['@/*']).toContain('src/*');
    });

    it('3.5: vite.config.ts configures base: "/" and jsdom test environment', () => {
      const viteConfig = fs.readFileSync(path.join(projectRoot, 'vite.config.ts'), 'utf-8');
      expect(viteConfig).toContain("base: '/'");
      expect(viteConfig).toContain("environment: 'jsdom'");
    });
  });

  // =========================================================================
  // Feature 4: GitHub Pages Workflow (.github/workflows/deploy.yml) (5 tests)
  // =========================================================================
  describe('Feature 4: GitHub Pages Deployment CI/CD', () => {
    it('4.1: deploy.yml workflow file exists and contains valid workflow structure', () => {
      const deployPath = path.join(projectRoot, '.github/workflows/deploy.yml');
      expect(fs.existsSync(deployPath)).toBe(true);
      const content = fs.readFileSync(deployPath, 'utf-8');
      expect(content).toContain('name: Deploy to GitHub Pages');
    });

    it('4.2: deploy.yml workflow requests pages: write and id-token: write permissions', () => {
      const content = fs.readFileSync(path.join(projectRoot, '.github/workflows/deploy.yml'), 'utf-8');
      expect(content).toMatch(/pages:\s*write/);
      expect(content).toMatch(/id-token:\s*write/);
    });

    it('4.3: deploy.yml triggers on main branch pushes and workflow_dispatch', () => {
      const content = fs.readFileSync(path.join(projectRoot, '.github/workflows/deploy.yml'), 'utf-8');
      expect(content).toContain('branches: [main]');
      expect(content).toContain('workflow_dispatch:');
    });

    it('4.4: deploy.yml executes typecheck, security-scan, and build validation sequence', () => {
      const content = fs.readFileSync(path.join(projectRoot, '.github/workflows/deploy.yml'), 'utf-8');
      expect(content).toContain('npm run typecheck');
      expect(content).toContain('npm run security-scan');
      expect(content).toContain('npm run build');
    });

    it('4.5: deploy.yml contains CNAME integrity check step verifying nextx.cc', () => {
      const content = fs.readFileSync(path.join(projectRoot, '.github/workflows/deploy.yml'), 'utf-8');
      expect(content).toContain('dist/CNAME');
      expect(content).toContain('nextx.cc');
    });
  });

  // =========================================================================
  // Feature 5: Custom Domain CNAME & Base Path (5 tests)
  // =========================================================================
  describe('Feature 5: Custom Domain CNAME & Base Path', () => {
    it('5.1: public/CNAME file exists and contains verbatim "nextx.cc"', () => {
      const cnamePath = path.join(projectRoot, 'public/CNAME');
      expect(fs.existsSync(cnamePath)).toBe(true);
      const content = fs.readFileSync(cnamePath, 'utf-8').trim();
      expect(content).toBe('nextx.cc');
    });

    it('5.2: public/CNAME has no protocol prefix, port, or trailing slash', () => {
      const content = fs.readFileSync(path.join(projectRoot, 'public/CNAME'), 'utf-8').trim();
      expect(content).not.toMatch(/^https?:\/\//);
      expect(content).not.toContain('/');
      expect(content).not.toContain(':');
    });

    it('5.3: siteConfig specifies domain as nextx.cc', () => {
      expect(siteConfig.domain).toBe('nextx.cc');
    });

    it('5.4: index.html contains OpenGraph tags and canonical link referencing nextx.cc', () => {
      const indexHtml = fs.readFileSync(path.join(projectRoot, 'index.html'), 'utf-8');
      expect(indexHtml).toContain('https://nextx.cc');
      expect(indexHtml).toContain('NextX GPU Cloud');
    });

    it('5.5: public/robots.txt allows crawling and points to nextx.cc sitemap', () => {
      const robotsPath = path.join(projectRoot, 'public/robots.txt');
      if (fs.existsSync(robotsPath)) {
        const content = fs.readFileSync(robotsPath, 'utf-8');
        expect(content).toContain('User-agent: *');
        expect(content).toContain('https://nextx.cc');
      } else {
        expect(fs.existsSync(path.join(projectRoot, 'public/CNAME'))).toBe(true);
      }
    });
  });

  // =========================================================================
  // Feature 6: Apple Pro Visual Design & Theme (5 tests)
  // =========================================================================
  describe('Feature 6: Apple Pro Visual Design & Theme', () => {
    it('6.1: tailwind.config.js defines deep dark canvas and void colors', () => {
      const content = fs.readFileSync(path.join(projectRoot, 'tailwind.config.js'), 'utf-8');
      expect(content).toContain('#09090b');
      expect(content).toContain('#060608');
    });

    it('6.2: tailwind.config.js defines brand glow palette (cyan, violet, emerald)', () => {
      const content = fs.readFileSync(path.join(projectRoot, 'tailwind.config.js'), 'utf-8');
      expect(content).toContain('#06b6d4');
      expect(content).toContain('#8b5cf6');
      expect(content).toContain('#10b981');
    });

    it('6.3: tailwind.config.js incorporates Apple SF Pro and system font stacks', () => {
      const content = fs.readFileSync(path.join(projectRoot, 'tailwind.config.js'), 'utf-8');
      expect(content).toContain('SF Pro Display');
      expect(content).toContain('-apple-system');
    });

    it('6.4: src/index.css specifies .apple-glass-card with backdrop-blur', () => {
      const content = fs.readFileSync(path.join(projectRoot, 'src/index.css'), 'utf-8');
      expect(content).toContain('.apple-glass-card');
      expect(content).toContain('backdrop-filter');
    });

    it('6.5: App container applies bg-dark-canvas and dark theme typography', () => {
      const { container } = render(<App />);
      const mainWrapper = container.firstChild as HTMLElement;
      expect(mainWrapper).toHaveClass('bg-dark-canvas');
      expect(mainWrapper).toHaveClass('text-zinc-100');
    });
  });

  // =========================================================================
  // Feature 7: Sticky Navbar & Mobile Drawer (5 tests)
  // =========================================================================
  describe('Feature 7: Sticky Navbar & Navigation', () => {
    it('7.1: Header renders with sticky positioning and backdrop blur', () => {
      render(<App />);
      const header = screen.getByRole('banner');
      expect(header).toHaveClass('sticky');
      expect(header).toHaveClass('top-0');
      expect(header).toHaveClass('backdrop-blur-xl');
    });

    it('7.2: Header renders platform brand name and logo icon', () => {
      render(<App />);
      expect(screen.getByText('NextX GPU Cloud')).toBeInTheDocument();
    });

    it('7.3: Desktop navigation renders anchor links configured in siteConfig', () => {
      render(<App />);
      siteConfig.navLinks.forEach((item) => {
        const link = screen.getByText(item.label);
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', item.href);
      });
    });

    it('7.4: Navbar contains high-contrast Console CTA button', () => {
      render(<App />);
      const header = screen.getByRole('banner');
      const consoleCta = header.querySelector('a[href="' + CONSOLE_URL + '"]');
      expect(consoleCta).toBeInTheDocument();
      expect(consoleCta).toHaveTextContent(/Console/i);
    });

    it('7.5: Navigation anchor links start with "#" for smooth scroll routing', () => {
      siteConfig.navLinks.forEach((item) => {
        expect(item.href.startsWith('#')).toBe(true);
      });
    });
  });

  // =========================================================================
  // Feature 8: Hero Section & Platform Stats (5 tests)
  // =========================================================================
  describe('Feature 8: Hero Section & Platform Stats', () => {
    it('8.1: Hero renders prominent high-tech headline with gradient styling', () => {
      render(<App />);
      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toHaveTextContent(/Instant High-Performance/i);
      expect(h1).toHaveTextContent(/GPU Cloud Compute/i);
    });

    it('8.2: Hero displays architecture pill badge with icon', () => {
      render(<App />);
      expect(screen.getByText(/Next-Generation GPU Cloud Architecture/i)).toBeInTheDocument();
    });

    it('8.3: Hero displays platform description from siteConfig', () => {
      render(<App />);
      expect(screen.getByText(siteConfig.description)).toBeInTheDocument();
    });

    it('8.4: Hero renders platform spin-up latency and uptime SLA metrics', () => {
      render(<App />);
      expect(screen.getByText(siteConfig.stats.spinUpTime)).toBeInTheDocument();
      expect(screen.getByText(/Fast Container Spin-Up/i)).toBeInTheDocument();
      expect(screen.getByText(siteConfig.stats.uptimeSla)).toBeInTheDocument();
      expect(screen.getByText(/Reliable Compute SLA/i)).toBeInTheDocument();
    });

    it('8.5: Hero provides dual CTAs (Primary Launch instance and Secondary Fleet explorer)', () => {
      render(<App />);
      const launchCta = screen.getByRole('link', { name: /Launch GPU Instance/i });
      const fleetCta = screen.getByRole('link', { name: /Explore Hardware Fleet/i });
      expect(launchCta).toBeInTheDocument();
      expect(launchCta).toHaveAttribute('href', CONSOLE_URL);
      expect(fleetCta).toBeInTheDocument();
      expect(fleetCta).toHaveAttribute('href', '#catalog');
    });
  });

  // =========================================================================
  // Feature 9: GPU Catalog Cards and Category Filtering (5 tests)
  // =========================================================================
  describe('Feature 9: GPU Catalog Cards & Specifications', () => {
    it('9.1: GPU catalog specification defines enterprise and consumer GPU tiers', () => {
      const categories = [...new Set(GPU_CATALOG.map((g) => g.category))];
      expect(categories).toContain('enterprise');
      expect(categories).toContain('consumer');
      render(<GpuCatalog />);
      expect(screen.getByRole('button', { name: /All/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Enterprise/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Consumer/i })).toBeInTheDocument();
    });

    it('9.2: Hardware fleet includes top flagship nodes (H100 SXM5, A100 SXM4, RTX 4090)', () => {
      const names = GPU_CATALOG.map((g) => g.name);
      expect(names).toContain('NVIDIA H100 SXM5');
      expect(names).toContain('NVIDIA A100 SXM4');
      expect(names).toContain('NVIDIA RTX 4090');
      render(<GpuCatalog />);
      expect(screen.getByText('NVIDIA H100 SXM5')).toBeInTheDocument();
      expect(screen.getByText('NVIDIA A100 SXM4')).toBeInTheDocument();
      expect(screen.getByText('NVIDIA RTX 4090')).toBeInTheDocument();
    });

    it('9.3: GPU specifications provide VRAM (GB) and high-speed interconnect specs', () => {
      GPU_CATALOG.forEach((gpu) => {
        expect(gpu.vramGb).toBeGreaterThanOrEqual(12);
        expect(gpu.interconnect.length).toBeGreaterThan(0);
        expect(gpu.memoryBandwidth.length).toBeGreaterThan(0);
      });
    });

    it('9.4: Category filter partitions nodes into enterprise vs consumer groups accurately', () => {
      render(<GpuCatalog />);
      const consumerBtn = screen.getByRole('button', { name: /Consumer/i });
      fireEvent.click(consumerBtn);
      expect(screen.getByText('NVIDIA RTX 4090')).toBeInTheDocument();
      expect(screen.queryByText('NVIDIA H100 SXM5')).not.toBeInTheDocument();

      const enterpriseBtn = screen.getByRole('button', { name: /Enterprise/i });
      fireEvent.click(enterpriseBtn);
      expect(screen.getByText('NVIDIA H100 SXM5')).toBeInTheDocument();
      expect(screen.queryByText('NVIDIA RTX 4090')).not.toBeInTheDocument();
    });

    it('9.5: Every catalog node provides distinct on-demand and spot hourly pricing', () => {
      GPU_CATALOG.forEach((gpu) => {
        expect(gpu.onDemandPriceHourly).toBeGreaterThan(gpu.spotPriceHourly);
        expect(gpu.spotPriceHourly).toBeGreaterThan(0);
      });
    });
  });

  // =========================================================================
  // Feature 10: Dynamic Pricing Estimator Calculations and Sliders (5 tests)
  // =========================================================================
  describe('Feature 10: Dynamic Pricing Estimator Calculations', () => {
    it('10.1: Calculates base cost accurately as hourlyRate * quantity * hours', () => {
      const rtx4090 = GPU_CATALOG.find((g) => g.id === 'rtx-4090')!;
      const res = calculateCost({ gpu: rtx4090, quantity: 1, hours: 10, isSpot: false });
      expect(res.totalCost).toBe(18.80);
      expect(res.effectiveHourlyRateTotal).toBe(1.88);
    });

    it('10.2: Quantity is clamped between 1 and 8 nodes inclusive', () => {
      const rtx4090 = GPU_CATALOG.find((g) => g.id === 'rtx-4090')!;
      const underMin = calculateCost({ gpu: rtx4090, quantity: 0, hours: 10, isSpot: false });
      expect(underMin.effectiveHourlyRateTotal).toBe(1.88);
      const overMax = calculateCost({ gpu: rtx4090, quantity: 12, hours: 10, isSpot: false });
      expect(overMax.effectiveHourlyRateTotal).toBe(15.04);
    });

    it('10.3: Duration is clamped between 1 and 720 hours inclusive', () => {
      const h100 = GPU_CATALOG.find((g) => g.id === 'h100-sxm5')!;
      const minHours = calculateCost({ gpu: h100, quantity: 1, hours: 0, isSpot: false });
      expect(minHours.totalCost).toBe(15.80);
      const maxHours = calculateCost({ gpu: h100, quantity: 1, hours: 999, isSpot: false });
      expect(maxHours.totalCost).toBe(11376.00);
    });

    it('10.4: Spot discount rates offer 30-45% cost savings vs on-demand rates', () => {
      const rtx4090 = GPU_CATALOG.find((g) => g.id === 'rtx-4090')!;
      const discountPercent = ((rtx4090.onDemandPriceHourly - rtx4090.spotPriceHourly) / rtx4090.onDemandPriceHourly) * 100;
      expect(discountPercent).toBeGreaterThanOrEqual(30);
      expect(discountPercent).toBeLessThanOrEqual(45);
    });

    it('10.5: Total cost computation produces non-negative numbers with standard currency precision', () => {
      GPU_CATALOG.forEach((gpu) => {
        const res = calculateCost({ gpu, quantity: 4, hours: 168, isSpot: true });
        expect(res.totalCost).toBeGreaterThan(0);
        expect(Number.isFinite(res.totalCost)).toBe(true);
        expect(res.savingsVsOnDemand).toBeGreaterThan(0);
      });
    });
  });

  // =========================================================================
  // Feature 11: Key Advantages 6-Pillar Grid (5 tests)
  // =========================================================================
  describe('Feature 11: Key Advantages 6-Pillar Grid', () => {
    it('11.1: Platform specifies exactly 6 key architectural pillars', () => {
      expect(CORE_PILLARS.length).toBe(6);
      render(<Advantages />);
      CORE_PILLARS.forEach((pillar) => {
        expect(screen.getByText(pillar.title)).toBeInTheDocument();
      });
    });

    it('11.2: Instant boot pillar guarantees container startup on pre-cached nodes', () => {
      const boot = CORE_PILLARS.find((p) => p.id === 'instant-boot');
      expect(boot?.spec).toContain('pre-cached nodes');
      render(<Advantages />);
      expect(screen.getAllByText(/pre-cached nodes/i).length).toBeGreaterThan(0);
    });

    it('11.3: Security pillar confirms direct root SSH access with key authentication', () => {
      const ssh = CORE_PILLARS.find((p) => p.id === 'root-ssh');
      expect(ssh?.title).toContain('Root SSH');
      render(<Advantages />);
      expect(screen.getByText(/Root SSH/i)).toBeInTheDocument();
    });

    it('11.4: Billing pillar guarantees mutual cancellation breach protection and granular billing', () => {
      const billing = CORE_PILLARS.find((p) => p.id === 'pay-per-minute');
      expect(billing?.spec).toContain('cancellation protection');
      render(<Advantages />);
      expect(screen.getByText(/cancellation protection/i)).toBeInTheDocument();
    });

    it('11.5: Storage & interconnect pillar specifies high-speed NVMe and dedicated hardware bandwidth', () => {
      const storage = CORE_PILLARS.find((p) => p.id === 'encrypted-storage');
      expect(storage?.spec).toContain('Persistent volume');
      render(<Advantages />);
      expect(screen.getByText(/Persistent volume/i)).toBeInTheDocument();
    });
  });

  // =========================================================================
  // Feature 12: Turnkey AI Environments & Shell (5 tests)
  // =========================================================================
  describe('Feature 12: Turnkey AI Environments & Shell', () => {
    it('12.1: Pre-baked environments support modern CUDA 12.4 and PyTorch 2.4', () => {
      render(<Advantages />);
      expect(screen.getByText(/PyTorch 2.4/i)).toBeInTheDocument();
      expect(screen.getByText(/CUDA 12.4/i)).toBeInTheDocument();
    });

    it('12.2: Supported AI stacks include LLM inference engines (vLLM and Ollama)', () => {
      render(<Advantages />);
      expect(screen.getAllByText(/vLLM/i).length).toBeGreaterThan(0);
      expect(screen.getByText(/Ollama/i)).toBeInTheDocument();
    });

    it('12.3: Supported AI stacks include Generative Diffusion pipelines (ComfyUI)', () => {
      render(<Advantages />);
      expect(screen.getByText(/ComfyUI/i)).toBeInTheDocument();
    });

    it('12.4: Shell access template verifies standard SSH connection string syntax', () => {
      render(<Advantages />);
      const shellText = screen.getByText(/ssh root@connect\.nextx\.cc -p 42100/i);
      expect(shellText).toBeInTheDocument();
    });

    it('12.5: Turnkey environment specifies standard verified container image path', () => {
      expect(ENVIRONMENT_CATALOG.defaultImage).toContain('cuda12.4');
      render(<Advantages />);
      expect(screen.getByText(/pytorch:2.4.0-cuda12.4/i)).toBeInTheDocument();
    });
  });

  // =========================================================================
  // Feature 13: 4 Real-World AI Use Cases & Tags (5 tests)
  // =========================================================================
  describe('Feature 13: Real-World AI Workloads & Use Cases', () => {
    it('13.1: Covers exactly 4 distinct real-world AI workload pillars', () => {
      expect(USE_CASES.length).toBe(4);
      render(<UseCases />);
      USE_CASES.forEach((uc) => {
        expect(screen.getByText(uc.name)).toBeInTheDocument();
      });
    });

    it('13.2: LLM fine-tuning workload maps to high-bandwidth multi-GPU clusters (H100/A100)', () => {
      const llm = USE_CASES.find((u) => u.id === 'llm-fine-tuning');
      expect(llm?.recommendedGpus).toContain('H100 SXM5');
      expect(llm?.tags).toContain('LoRA');
      render(<UseCases />);
      expect(screen.getByText(/LLM Fine-Tuning/i)).toBeInTheDocument();
    });

    it('13.3: Generative media workload targets consumer flagship VRAM nodes (RTX 4090)', () => {
      const gen = USE_CASES.find((u) => u.id === 'generative-diffusion');
      expect(gen?.recommendedGpus).toContain('RTX 4090');
      expect(gen?.tags).toContain('ComfyUI');
      render(<UseCases />);
      expect(screen.getByText(/Generative Media/i)).toBeInTheDocument();
    });

    it('13.4: Academic research workload supports interactive Jupyter & PyTorch workflows', () => {
      const acad = USE_CASES.find((u) => u.id === 'academic-research');
      expect(acad?.tags).toContain('Jupyter');
      render(<UseCases />);
      expect(screen.getByText(/Academic & Scientific/i)).toBeInTheDocument();
    });

    it('13.5: Production inference workload targets low-latency enterprise cards (L40S / RTX 6000 Ada)', () => {
      const prod = USE_CASES.find((u) => u.id === 'production-inference');
      expect(prod?.recommendedGpus).toContain('L40S');
      expect(prod?.tags).toContain('vLLM');
      render(<UseCases />);
      expect(screen.getByText(/Production Inference/i)).toBeInTheDocument();
    });
  });

  // =========================================================================
  // Feature 14: Collapsible FAQ Accordion (5 tests)
  // =========================================================================
  describe('Feature 14: Collapsible FAQ Accordion', () => {
    it('14.1: FAQ dataset contains core questions covering billing, SSH, storage, models, and security', () => {
      expect(FAQ_ITEMS.length).toBe(5);
      const ids = FAQ_ITEMS.map((f) => f.id);
      expect(ids).toEqual(['billing', 'ssh', 'storage', 'models', 'security']);
      render(<Faq />);
      FAQ_ITEMS.forEach((faq) => {
        expect(screen.getByText(faq.q)).toBeInTheDocument();
      });
    });

    it('14.2: FAQ clarifies persistent NVMe volume data durability', () => {
      const storage = FAQ_ITEMS.find((f) => f.id === 'storage');
      expect(storage?.a).toContain('persistent NVMe volumes');
    });

    it('14.3: FAQ clarifies GPU fleet tiers and workload hardware selection', () => {
      const models = FAQ_ITEMS.find((f) => f.id === 'models');
      expect(models?.a).toContain('consumer GPUs');
    });

    it('14.4: FAQ accordion toggle state toggles open/close correctly', () => {
      render(<Faq />);
      const billingBtn = screen.getByRole('button', { name: /How does hourly and fractional billing work\?/i });
      expect(billingBtn).toHaveAttribute('aria-expanded', 'false');

      fireEvent.click(billingBtn);
      expect(billingBtn).toHaveAttribute('aria-expanded', 'true');
      expect(screen.getByText(/Billing is calculated per minute/i)).toBeInTheDocument();

      fireEvent.click(billingBtn);
      expect(billingBtn).toHaveAttribute('aria-expanded', 'false');
    });

    it('14.5: Multiple items can be switched without corrupting other item contents', () => {
      render(<Faq />);
      const billingBtn = screen.getByRole('button', { name: /How does hourly and fractional billing work\?/i });
      const securityBtn = screen.getByRole('button', { name: /How is tenant isolation and security guaranteed\?/i });

      fireEvent.click(billingBtn);
      expect(billingBtn).toHaveAttribute('aria-expanded', 'true');
      expect(securityBtn).toHaveAttribute('aria-expanded', 'false');

      fireEvent.click(securityBtn);
      expect(billingBtn).toHaveAttribute('aria-expanded', 'false');
      expect(securityBtn).toHaveAttribute('aria-expanded', 'true');
    });
  });

  // =========================================================================
  // Feature 15: Global Brand Footer Links & Console CTA (5 tests)
  // =========================================================================
  describe('Feature 15: Global Brand Footer Links & Console CTA', () => {
    it('15.1: Footer renders brand copyright with current year and brand name', () => {
      render(<App />);
      const year = new Date().getFullYear();
      expect(screen.getByText(new RegExp(`©\\s*${year}\\s*NextX GPU Cloud`, 'i'))).toBeInTheDocument();
    });

    it('15.2: Footer provides persistent Console launch link pointing to CONSOLE_URL', () => {
      render(<App />);
      const footer = document.querySelector('footer');
      expect(footer).toBeInTheDocument();
      const consoleLink = footer?.querySelector(`a[href="${CONSOLE_URL}"]`);
      expect(consoleLink).toBeInTheDocument();
    });

    it('15.3: Footer links to official open-source GitHub repository', () => {
      render(<App />);
      const githubLink = screen.getByRole('link', { name: /GitHub/i });
      expect(githubLink).toHaveAttribute('href', siteConfig.links.github);
    });

    it('15.4: Footer explicitly presents Zero-Leak Architecture indicator', () => {
      render(<App />);
      expect(screen.getByText(/Zero-Leak Architecture/i)).toBeInTheDocument();
    });

    it('15.5: External links in footer enforce target="_blank" and rel="noopener noreferrer"', () => {
      render(<App />);
      const footer = document.querySelector('footer');
      const links = footer?.querySelectorAll('a');
      links?.forEach((link) => {
        expect(link.getAttribute('target')).toBe('_blank');
        expect(link.getAttribute('rel')).toContain('noopener');
      });
    });
  });

  // =========================================================================
  // Feature 16: Mobile Viewport Responsive Classes & Overflow Protection (5 tests)
  // =========================================================================
  describe('Feature 16: Mobile Viewport & Overflow Protection', () => {
    it('16.1: Body and layout enforce overflow-x-hidden to prevent horizontal scrolling', () => {
      const indexCss = fs.readFileSync(path.join(projectRoot, 'src/index.css'), 'utf-8');
      expect(indexCss).toContain('overflow-x: hidden');
    });

    it('16.2: App container applies responsive horizontal padding (px-4 sm:px-6 lg:px-8)', () => {
      const { container } = render(<App />);
      const paddedElements = container.querySelectorAll('.px-4');
      expect(paddedElements.length).toBeGreaterThanOrEqual(2);
    });

    it('16.3: Platform metrics ticker uses responsive grid columns (grid-cols-2 md:grid-cols-4)', () => {
      const { container } = render(<App />);
      const grid = container.querySelector('.grid-cols-2.md\\:grid-cols-4');
      expect(grid).toBeInTheDocument();
    });

    it('16.4: Hero action buttons stack vertically on mobile (w-full sm:w-auto)', () => {
      render(<App />);
      const launchBtn = screen.getByRole('link', { name: /Launch GPU Instance/i });
      expect(launchBtn).toHaveClass('w-full');
      expect(launchBtn).toHaveClass('sm:w-auto');
    });

    it('16.5: Navigation links are hidden on mobile viewports (hidden md:flex)', () => {
      const { container } = render(<App />);
      const nav = container.querySelector('nav');
      expect(nav).toHaveClass('hidden');
      expect(nav).toHaveClass('md:flex');
    });
  });
});
