import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { CONSOLE_URL, SITE_CONFIG, siteConfig } from '../src/config/site';

const projectRoot = path.resolve(__dirname, '..');

const SCAN_DIRS = ['src', 'public', '.github'];
const ROOT_CONFIGS = ['index.html', 'vite.config.ts', 'package.json', 'tailwind.config.js'];
const IGNORED_EXTS = ['.png', '.jpg', '.jpeg', '.gif', '.ico', '.woff', '.woff2', '.ttf', '.eot'];

const VULN_PATTERNS = [
  {
    name: 'Private IPv4 Address',
    regex: /\b(?:10\.\d{1,3}\.\d{1,3}\.\d{1,3}|172\.(?:1[6-9]|2\d|3[0-1])\.\d{1,3}\.\d{1,3}|192\.168\.\d{1,3}\.\d{1,3}|127\.0\.0\.1)\b/g,
  },
  {
    name: 'Localhost Reference',
    regex: /\b(?:localhost|127\.0\.0\.1)(?::\d+)?\b/gi,
  },
  {
    name: 'Internal Domain Pattern',
    regex: /\b[a-zA-Z0-9-]+\.(?:internal|corp|lan|local|cluster\.local)\b/g,
  },
  {
    name: 'Private SSH Key Header',
    regex: /-----BEGIN\s+(?:RSA|OPENSSH|DSA|EC)?\s*PRIVATE\s+KEY-----/g,
  },
  {
    name: 'Generic API Secret Pattern',
    regex: /(?:api[_-]?key|auth[_-]?token|secret[_-]?key|client[_-]?secret)\s*[:=]\s*["'][A-Za-z0-9_\-]{16,}["']/gi,
  },
  {
    name: 'AWS Access Key ID',
    regex: /\bAKIA[0-9A-Z]{16}\b/g,
  },
  {
    name: 'OpenAI Secret Key',
    regex: /\bsk-[a-zA-Z0-9]{32,}\b/g,
  },
  {
    name: 'Database Connection String',
    regex: /\b(?:postgres|postgresql|mongodb|mysql|redis):\/\/[a-zA-Z0-9_-]+:[^@\s]+@[a-zA-Z0-9.-]+/gi,
  },
];

function getSourceFiles(dir: string): string[] {
  const fullDir = path.join(projectRoot, dir);
  if (!fs.existsSync(fullDir)) return [];
  const entries = fs.readdirSync(fullDir, { withFileTypes: true });
  let files: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(fullDir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== 'dist' && entry.name !== '.git') {
        files = files.concat(getSourceFiles(path.join(dir, entry.name)));
      }
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (!IGNORED_EXTS.includes(ext)) {
        files.push(path.relative(projectRoot, fullPath));
      }
    }
  }
  return files;
}

describe('Security & Zero-Leak Isolation Architecture', () => {
  it('verifies CONSOLE_URL is configured as the canonical single source of truth', () => {
    expect(CONSOLE_URL).toBe('https://marketplace.nextx.cc/');
    expect(SITE_CONFIG.consoleUrl).toBe('https://marketplace.nextx.cc/');
    expect(siteConfig.consoleUrl).toBe('https://marketplace.nextx.cc/');
    expect(siteConfig.links.console).toBe('https://marketplace.nextx.cc/');
  });

  it('scans all production src/ files for zero private IPv4 addresses and zero localhost references', () => {
    const srcFiles = getSourceFiles('src');
    expect(srcFiles.length).toBeGreaterThan(0);

    const violations: Array<{ file: string; match: string }> = [];
    for (const relFile of srcFiles) {
      const fullPath = path.join(projectRoot, relFile);
      const content = fs.readFileSync(fullPath, 'utf-8');
      const ipRegex = /\b(?:10\.\d{1,3}\.\d{1,3}\.\d{1,3}|172\.(?:1[6-9]|2\d|3[0-1])\.\d{1,3}\.\d{1,3}|192\.168\.\d{1,3}\.\d{1,3}|127\.0\.0\.1)\b/g;
      let match;
      while ((match = ipRegex.exec(content)) !== null) {
        violations.push({ file: relFile, match: match[0] });
      }
      const localhostRegex = /\b(?:localhost|127\.0\.0\.1)(?::\d+)?\b/gi;
      while ((match = localhostRegex.exec(content)) !== null) {
        violations.push({ file: relFile, match: match[0] });
      }
    }

    expect(violations).toEqual([]);
  });

  it('scans public assets and workflow files for zero leaked credentials or private keys', () => {
    const publicFiles = getSourceFiles('public');
    const workflowFiles = getSourceFiles('.github');
    const filesToScan = [...publicFiles, ...workflowFiles];

    const violations: Array<{ file: string; rule: string; match: string }> = [];
    for (const relFile of filesToScan) {
      const fullPath = path.join(projectRoot, relFile);
      const content = fs.readFileSync(fullPath, 'utf-8');
      for (const pattern of VULN_PATTERNS) {
        let match;
        const regex = new RegExp(pattern.regex.source, pattern.regex.flags);
        while ((match = regex.exec(content)) !== null) {
          violations.push({ file: relFile, rule: pattern.name, match: match[0] });
        }
      }
    }

    expect(violations).toEqual([]);
  });

  it('verifies public/CNAME contains exactly nextx.cc with no trailing whitespace or protocol', () => {
    const cnamePath = path.join(projectRoot, 'public', 'CNAME');
    expect(fs.existsSync(cnamePath)).toBe(true);
    const cnameContent = fs.readFileSync(cnamePath, 'utf-8').trim();
    expect(cnameContent).toBe('nextx.cc');
    expect(cnameContent).not.toContain('http');
    expect(cnameContent).not.toContain('/');
  });

  it('scans root configs for absence of private database connection strings and secret tokens', () => {
    for (const rf of ROOT_CONFIGS) {
      const fullPath = path.join(projectRoot, rf);
      if (fs.existsSync(fullPath)) {
        const content = fs.readFileSync(fullPath, 'utf-8');
        for (const pattern of VULN_PATTERNS) {
          if (pattern.name.includes('Database') || pattern.name.includes('Secret') || pattern.name.includes('SSH')) {
            let match;
            const regex = new RegExp(pattern.regex.source, pattern.regex.flags);
            while ((match = regex.exec(content)) !== null) {
              expect(match[0]).toBeUndefined();
            }
          }
        }
      }
    }
  });

  it('confirms siteConfig does not expose any mock backend endpoints or port numbers', () => {
    const serialized = JSON.stringify(siteConfig);
    expect(serialized).not.toMatch(/api\/v\d+/i);
    expect(serialized).not.toMatch(/:8080|:5000|:8000|:3001/);
    expect(serialized).not.toMatch(/\/graphql/i);
    expect(serialized).not.toMatch(/\/mock/i);
  });

  it('guarantees old hidden subpath is completely eliminated from all source files', () => {
    const oldSubpath = ['7dKp9x', 'Q4mN8v', 'R2sL6cW1'].join('');
    const allFiles = [...getSourceFiles('src'), ...getSourceFiles('public'), ...getSourceFiles('.github')];
    for (const relFile of allFiles) {
      const fullPath = path.join(projectRoot, relFile);
      const content = fs.readFileSync(fullPath, 'utf-8');
      expect(content).not.toContain(oldSubpath);
    }
  });
});
