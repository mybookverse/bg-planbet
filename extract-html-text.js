const fs = require('fs');
const path = require('path');
const { DOMParser } = globalThis;
const baseDir = process.cwd();
const results = [];
function isHtml(file) {
  return file.toLowerCase().endsWith('.html');
}
function walk(node, pathArr, filePath) {
  if (!node) return;
  const name = node.nodeName.toLowerCase();
  if (name === 'script' || name === 'style' || name === 'noscript') return;
  if (node.nodeType === 3) {
    const text = node.nodeValue.replace(/\s+/g, ' ').trim();
    if (text) results.push({ file: filePath, path: pathArr.join(' > '), text });
  }
  node.childNodes?.forEach(child => walk(child, [...pathArr, name], filePath));
}
function traverse(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      traverse(full);
    } else if (entry.isFile() && isHtml(entry.name)) {
      const html = fs.readFileSync(full, 'utf8');
      const doc = new DOMParser().parseFromString(html, 'text/html');
      walk(doc.documentElement, [], path.relative(baseDir, full));
      results.push({ file: path.relative(baseDir, full), path: '---', text: '---' });
    }
  }
}
traverse(baseDir);
console.log(JSON.stringify(results, null, 2));
