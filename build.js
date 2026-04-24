const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

// Get all CSS files
const cssFiles = fs.readdirSync('.').filter(f => f.endsWith('.css') && !f.includes('.hash.'));
// Get all JS files  
const jsFiles = fs.readdirSync('.').filter(f => f.endsWith('.js') && !f.includes('.hash.'));

// Process each CSS file
cssFiles.forEach(cssFile => {
  const content = fs.readFileSync(cssFile);
  const hash = crypto.createHash('md5').update(content).digest('hex').slice(0, 8);
  const newName = cssFile.replace('.css', `.${hash}.css`);
  
  // Rename file
  fs.renameSync(cssFile, newName);
  console.log(`✅ ${cssFile} → ${newName}`);
  
  // Update HTML
  let html = fs.readFileSync('index.html', 'utf8');
  html = html.replace(cssFile, newName);
  fs.writeFileSync('index.html', html);
});

// Process each JS file
jsFiles.forEach(jsFile => {
  const content = fs.readFileSync(jsFile);
  const hash = crypto.createHash('md5').update(content).digest('hex').slice(0, 8);
  const newName = jsFile.replace('.js', `.${hash}.js`);
  
  // Rename file
  fs.renameSync(jsFile, newName);
  console.log(`✅ ${jsFile} → ${newName}`);
  
  // Update HTML
  let html = fs.readFileSync('index.html', 'utf8');
  html = html.replace(jsFile, newName);
  fs.writeFileSync('index.html', html);
});

console.log('🎉 Nest P Sison Bading');
