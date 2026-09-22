/**
 * src/config/site.ts
 *
 * CRITICAL ARCHITECTURAL CONTRACT: ZERO-LEAK PRINCIPLE
 *
 * Single source of truth for:
 * 1. Target console portal URL
 * 2. Public-facing platform metadata and branding
 * 3. Outbound navigation links & platform stats
 *
 * Under NO circumstances should any component hardcode outbound URLs or
 * reference private server IP addresses, credentials, or internal ports.
 */

export const CONSOLE_URL = 'https://marketplace.nextx.cc/' as const;

export interface NavLink {
  label: string;
  href: string;
  isAnchor?: boolean;
}

export interface PlatformStats {
  spinUpTime: string;
  uptimeSla: string;
  availableGpus: string;
  globalRegions: string;
  totalGpus?: string;
  uptime?: string;
  startupTime?: string;
  startingPrice?: string;
  activeUsers?: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  domain: string;
  consoleUrl: string;
  supportEmail?: string;
  links: {
    console: string;
    docs: string;
    status: string;
    community: string;
    github: string;
    support: string;
  };
  stats: PlatformStats;
  metrics: PlatformStats;
  navLinks: readonly NavLink[];
  navItems: readonly NavLink[];
}

export const SITE_CONFIG: SiteConfig = {
  name: 'NextX GPU Cloud',
  tagline: 'Instant On-Demand GPU Compute for AI & Deep Learning',
  description:
    'Standardized Docker AI containers, fractional per-minute pricing, and instant pre-configured environments (PyTorch, CUDA, vLLM).',
  domain: 'nextx.cc',
  supportEmail: 'support@nextx.cc',
  consoleUrl: CONSOLE_URL,
  links: {
    console: CONSOLE_URL,
    docs: CONSOLE_URL,
    status: CONSOLE_URL,
    community: CONSOLE_URL,
    github: 'https://github.com/nextxcc/nextx',
    support: 'mailto:support@nextx.cc',
  },
  stats: {
    spinUpTime: 'Instant',
    uptimeSla: 'High SLA',
    availableGpus: 'Dynamic',
    globalRegions: 'Nationwide',
    totalGpus: 'Dynamic',
    uptime: 'High SLA',
    startupTime: 'Instant',
    startingPrice: '¥1.08/hr',
    activeUsers: 'Community',
  },
  metrics: {
    spinUpTime: 'Instant',
    uptimeSla: 'High SLA',
    availableGpus: 'Dynamic',
    globalRegions: 'Nationwide',
    totalGpus: 'Dynamic',
    uptime: 'High SLA',
    startupTime: 'Instant',
    startingPrice: '¥1.08/hr',
    activeUsers: 'Community',
  },
  navLinks: [
    { label: 'GPU Catalog', href: '#catalog', isAnchor: true },
    { label: 'Pricing Estimator', href: '#pricing', isAnchor: true },
    { label: 'Advantages', href: '#advantages', isAnchor: true },
    { label: 'Use Cases', href: '#use-cases', isAnchor: true },
    { label: 'FAQ', href: '#faq', isAnchor: true },
  ],
  navItems: [
    { label: 'GPU Catalog', href: '#catalog', isAnchor: true },
    { label: 'Pricing Estimator', href: '#pricing', isAnchor: true },
    { label: 'Advantages', href: '#advantages', isAnchor: true },
    { label: 'Use Cases', href: '#use-cases', isAnchor: true },
    { label: 'FAQ', href: '#faq', isAnchor: true },
  ],
} as const;

export const siteConfig = SITE_CONFIG;
export default SITE_CONFIG;
