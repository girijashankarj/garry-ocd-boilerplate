#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const argValue = (key) => {
  const index = args.indexOf(`--${key}`);
  if (index === -1) return undefined;
  return args[index + 1];
};

// Usage: node scripts/inject-badge.js --repo owner/repo --badge pr-check
const repo = argValue('repo');
const badge = argValue('badge') || 'pr-check';
if (!repo) {
  console.error('Usage: --repo owner/repo');
  process.exit(1);
}
const readme = path.resolve(process.cwd(), 'README.md');
if (!fs.existsSync(readme)) {
  console.error('README.md not found');
  process.exit(1);
}
const content = fs.readFileSync(readme, 'utf8');
const badgeSvg = `![${badge} CI](https://github.com/${repo}/actions/workflows/pr-check.yml/badge.svg)`;
const nextContent = content.includes(`<!-- CI_BADGE:${badge} -->`)
  ? content.replace(`<!-- CI_BADGE:${badge} -->`, badgeSvg)
  : `${badgeSvg}\n\n${content}`;
fs.writeFileSync(readme, nextContent, 'utf8');
console.log('Badge injected');
