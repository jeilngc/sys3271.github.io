const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

// Files/folders to ignore
const ignore = ['build.js', 'node_modules', '.git', '.github'];

// Recursively find all .css and .js files (excluding ignored paths)
function findFiles(dir, extension, result = []) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            if (!ignore.includes(item)) {
                findFiles(fullPath, extension, result);
            }
        } else if (item.endsWith(extension) && !ignore.includes(item) && !item.includes('.hash.')) {
            result.push(fullPath);
        }
    }
    return result;
}

// Get all CSS and JS files
const cssFiles = findFiles('.', '.css');
const jsFiles = findFiles('.', '.js');

// Store renamed paths for updating HTML
const renamed = {};

// Process CSS files
cssFiles.forEach(origPath => {
    const content = fs.readFileSync(origPath);
    const hash = crypto.createHash('md5').update(content).digest('hex').slice(0, 8);
    const dir = path.dirname(origPath);
    const ext = path.extname(origPath);
    const base = path.basename(origPath, ext);
    const newName = `${base}.${hash}${ext}`;
    const newPath = path.join(dir, newName);
    
    fs.renameSync(origPath, newPath);
    console.log(`✅ ${origPath} → ${newPath}`);
    renamed[origPath] = newPath;
});

// Process JS files
jsFiles.forEach(origPath => {
    const content = fs.readFileSync(origPath);
    const hash = crypto.createHash('md5').update(content).digest('hex').slice(0, 8);
    const dir = path.dirname(origPath);
    const ext = path.extname(origPath);
    const base = path.basename(origPath, ext);
    const newName = `${base}.${hash}${ext}`;
    const newPath = path.join(dir, newName);
    
    fs.renameSync(origPath, newPath);
    console.log(`✅ ${origPath} → ${newPath}`);
    renamed[origPath] = newPath;
});

// Update all HTML files
const htmlFiles = findFiles('.', '.html');
htmlFiles.forEach(htmlPath => {
    let html = fs.readFileSync(htmlPath, 'utf8');
    let modified = false;
    
    for (const [orig, renamedPath] of Object.entries(renamed)) {
        // Convert absolute paths to relative for HTML matching
        const origRelative = orig.startsWith('./') ? orig : './' + orig;
        const origPattern = orig.replace(/\\/g, '/'); // Windows fix
        
        if (html.includes(origPattern)) {
            html = html.split(origPattern).join(renamedPath.replace(/\\/g, '/'));
            modified = true;
        }
    }
    
    if (modified) {
        fs.writeFileSync(htmlPath, html);
        console.log(`📄 Updated ${htmlPath}`);
    }
});

console.log('🎉 Build complete!');
