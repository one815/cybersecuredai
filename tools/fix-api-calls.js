#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.(ts|tsx|js|jsx)$/.test(e.name)) processFile(p);
  }
}

function processFile(file) {
  let src = fs.readFileSync(file, 'utf8');
  const orig = src;

  // pattern: apiRequest('/api/..', 'POST', data)
  src = src.replace(/apiRequest\(\s*([`\"'])(\/[^\)\n]+?)\1\s*,\s*([`\"'])(GET|POST|PUT|DELETE|PATCH)\3\s*,\s*([^\)]+?)\)/g,
    (m, q1, url, q2, method, data) => `apiRequest(${q1}${url}${q1}, { method: ${q2}${method}${q2}, data: ${data.trim()} })`);

  // pattern: apiRequest('POST', '/api/..', data) -- method first
  src = src.replace(/apiRequest\(\s*([`\"'])(GET|POST|PUT|DELETE|PATCH)\1\s*,\s*([`\"'])(\/[^\)\n]+?)\3\s*,\s*([^\)]+?)\)/g,
    (m, q1, method, q2, url, data) => `apiRequest(${q2}${url}${q2}, { method: ${q1}${method}${q1}, data: ${data.trim()} })`);

  // pattern: apiRequest('/api/..', 'POST') -> apiRequest(url, { method: 'POST' })
  src = src.replace(/apiRequest\(\s*([`\"'])(\/[^\)\n]+?)\1\s*,\s*([`\"'])(GET|POST|PUT|DELETE|PATCH)\3\s*\)/g,
    (m, q1, url, q2, method) => `apiRequest(${q1}${url}${q1}, { method: ${q2}${method}${q2} })`);

  // pattern: apiRequest('POST', '/api/...') -> apiRequest(url, { method: 'POST' })
  src = src.replace(/apiRequest\(\s*([`\"'])(GET|POST|PUT|DELETE|PATCH)\1\s*,\s*([`\"'])(\/[^\)\n]+?)\3\s*\)/g,
    (m, q1, method, q2, url) => `apiRequest(${q2}${url}${q2}, { method: ${q1}${method}${q1} })`);

  if (src !== orig) {
    fs.writeFileSync(file, src, 'utf8');
    console.log('patched', file);
  }
}

const target = path.join(__dirname, '..', 'client', 'src');
if (!fs.existsSync(target)) {
  console.error('client/src not found, aborting');
  process.exit(1);
}
walk(target);
console.log('done');
