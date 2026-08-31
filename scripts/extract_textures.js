const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const texturesDir = path.join(__dirname, '../public/textures');
const files = fs.readdirSync(texturesDir);

files.forEach(file => {
  if (file.endsWith('.zip')) {
    const targetJpgName = file.replace('.zip', '');
    const zipPath = path.join(texturesDir, file);
    const tempDir = path.join(texturesDir, 'temp_' + Date.now());

    console.log(`Processing ${file} -> ${targetJpgName}`);

    // Extract zip using powershell
    try {
      execSync(`powershell -Command "Expand-Archive -Path '${zipPath}' -DestinationPath '${tempDir}' -Force"`);
      
      const extractedFiles = fs.readdirSync(tempDir);
      const colorFile = extractedFiles.find(f => f.toLowerCase().includes('color') || f.toLowerCase().includes('diff'));

      if (colorFile) {
        const srcPath = path.join(tempDir, colorFile);
        const destPath = path.join(texturesDir, targetJpgName);
        fs.copyFileSync(srcPath, destPath);
        console.log(`Successfully extracted ${colorFile} to ${targetJpgName}`);
      } else {
        console.log(`No color file found in ${file}. Extracted files:`, extractedFiles);
      }

      // Cleanup temp dir
      fs.rmSync(tempDir, { recursive: true, force: true });
    } catch (err) {
      console.error(`Error processing ${file}:`, err.message);
    }
  }
});
