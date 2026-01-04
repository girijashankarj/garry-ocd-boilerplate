#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const argv = require('minimist')(process.argv.slice(2));
const repo = argv.repo;
const badge = argv.badge || 'frontend-ci';
if (!repo) {
  console.error('Usage: --repo owner/repo');
  process.exit(1);
}
const readme = path.resolve(process.cwd(), 'README.md');
if (!fs.existsSync(readme)) {
  console.error('README.md not found');
  process.exit(1);
}
let content = fs.readFileSync(readme, 'utf8');
const badgeSvg = `![${badge} CI](https://github.com/${repo}/actions/workflows/pr-check.yml/badge.svg)`;
if (content.includes(`<!-- CI_BADGE:${badge} -->`)) {
  content = content.replace(`<!-- CI_BADGE:${badge} -->`, badgeSvg);
} else {
  content = `${badgeSvg}\n\n${content}`;
}
fs.writeFileSync(readme, content, 'utf8');
console.log('Badge injected');
