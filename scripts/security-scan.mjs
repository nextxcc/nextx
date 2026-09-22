#!/usr/bin/env node
/**
 * scripts/security-scan.mjs
 *
 * Standalone Zero-Leak Security Auditor for NextX GPU Cloud
 *
 * Audits repository files to guarantee:
 * 1. Zero private IPv4 addresses (10.x, 172.16-31.x, 192.168.x, 127.0.0.1, localhost)
 * 2. Zero internal domains or cluster paths (*.internal, *.corp, *.lan, *.cluster.local)
 * 3. Zero secret keys, API tokens, database URIs, or private SSH keys
 * 4. Verifies CONSOLE_URL in src/config/site.ts matches https://marketplace.nextx.cc/
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const EXPECTED_CONSOLE_URL = 'https://marketplace.nextx.cc/';

const TARGET_DIRECTORIES = ['src', 'public', '.github', 'scripts'];
const ROOT_FILES = ['index.html', 'vite.config.ts', 'package.json'];
const IGNORED_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.ico', '.woff', '.woff2', '.ttf', '.eot', '.lock'];

const VULNERABILITY_PATTERNS = [
  {
    name: 'Private IPv4 Address',
    regex: /\b(?:10\.\d{1,3}\.\d{1,3}\.\d{1,3}|172\.(?:1[6-9]|2\d|3[0-1])\.\d{1,3}\.\d{1,3}|192\.168\.\d{1,3}\.\d{1,3}|127\.0\.0\.1)\b/g,
    allowInTest: true,
  },
  {
    name: 'Localhost Reference',
    regex: /\b(?:localhost|127\.0\.0\.1)(?::\d+)?\b/gi,
    allowInTest: true,
  },
  {
    name: 'Internal Domain Pattern',
    regex: /\b[a-zA-Z0-9-]+\.(?:internal|corp|lan|local|cluster\.local)\b/g,
    allowInTest: true,
  },
  {
    name: 'Private SSH Key Header',
    regex: /-----BEGIN\s+(?:RSA|OPENSSH|DSA|EC)?\s*PRIVATE\s+KEY-----/g,
    allowInTest: false,
  },
  {
    name: 'Generic API Secret Pattern',
    regex: /(?:api[_-]?key|auth[_-]?token|secret[_-]?key|client[_-]?secret)\s*[:=]\s*["'][A-Za-z0-9_\-]{16,}["']/gi,
    allowInTest: false,
  },
  {
    name: 'AWS Access Key ID',
    regex: /\bAKIA[0-9A-Z]{16}\b/g,
    allowInTest: false,
  },
  {
    name: 'OpenAI Secret Key',
    regex: /\bsk-[a-zA-Z0-9]{32,}\b/g,
    allowInTest: false,
  },
  {
    name: 'Database Connection String',
    regex: /\b(?:postgres|postgresql|mongodb|mysql|redis):\/\/[a-zA-Z0-9_-]+:[^@\s]+@[a-zA-Z0-9.-]+/gi,
    allowInTest: false,
  },
  {
    name: 'Third-Party Platform Leak (Strict Zero-Leak Rule)',
    regex: /\b(?:autodl|vast\.ai)\b/gi,
    allowInTest: false,
  },
  {
    name: 'Old Hidden Subpath (7dKp9xQ4mN8vR2sL6cW1) Leak',
    regex: /7dKp9xQ4mN8vR2sL6cW1/g,
    allowInTest: false,
  },
];

let totalScannedFiles = 0;
let totalViolations = 0;
const violationReports = [];

function scanFile(filePath, relPath) {
  const ext = path.extname(filePath).toLowerCase();
  if (IGNORED_EXTENSIONS.includes(ext)) return;
  // Skip this scanner itself
  if (relPath.replace(/\\/g, '/') === 'scripts/security-scan.mjs') return;

  totalScannedFiles++;
  const content = fs.readFileSync(filePath, 'utf-8');
  const isTestFile = relPath.includes('.test.') || relPath.includes('.spec.') || relPath.startsWith('tests');

  for (const pattern of VULNERABILITY_PATTERNS) {
    if (isTestFile && pattern.allowInTest) {
      continue;
    }
    let match;
    const regex = new RegExp(pattern.regex.source, pattern.regex.flags);
    while ((match = regex.exec(content)) !== null) {
      totalViolations++;
      violationReports.push({
        file: relPath,
        rule: pattern.name,
        match: match[0],
        index: match.index,
      });
    }
  }
}

function scanDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) return;
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    const relPath = path.relative(projectRoot, fullPath);

    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === '.git') {
        continue;
      }
      scanDirectory(fullPath);
    } else if (entry.isFile()) {
      scanFile(fullPath, relPath);
    }
  }
}

console.log('🔍 Starting NextX Zero-Leak Security & Isolation Audit...');

for (const dir of TARGET_DIRECTORIES) {
  scanDirectory(path.join(projectRoot, dir));
}

for (const rf of ROOT_FILES) {
  const p = path.join(projectRoot, rf);
  if (fs.existsSync(p)) {
    scanFile(p, rf);
  }
}

// Verify CONSOLE_URL in src/config/site.ts
const siteConfigPath = path.join(projectRoot, 'src', 'config', 'site.ts');
if (!fs.existsSync(siteConfigPath)) {
  totalViolations++;
  violationReports.push({
    file: 'src/config/site.ts',
    rule: 'Missing Configuration',
    match: 'File not found',
    index: 0,
  });
} else {
  const siteConfigContent = fs.readFileSync(siteConfigPath, 'utf-8');
  if (!siteConfigContent.includes(EXPECTED_CONSOLE_URL)) {
    totalViolations++;
    violationReports.push({
      file: 'src/config/site.ts',
      rule: 'CONSOLE_URL mismatch',
      match: `Expected ${EXPECTED_CONSOLE_URL}`,
      index: 0,
    });
  } else {
    console.log(`✅ CONSOLE_URL verified in src/config/site.ts: ${EXPECTED_CONSOLE_URL}`);
  }
}

console.log(`📊 Scanned ${totalScannedFiles} files across repository.`);

if (totalViolations === 0) {
  console.log('✅ ZERO-LEAK AUDIT PASSED: Zero private IPs, secrets, or internal paths detected.');
  process.exit(0);
} else {
  console.error(`❌ ZERO-LEAK AUDIT FAILED: Detected ${totalViolations} potential leaks:`);
  for (const v of violationReports) {
    console.error(`  - [${v.rule}] in ${v.file}: "${v.match}"`);
  }
  process.exit(1);
}
