import fs from 'fs';
import path from 'path';

// Images that kept PNG format (have transparency)
const pngImages = [
  'Clean_transparent_iMac_frame_2795ad4e',
  'Transparent_background_iMac_mockup_761aab24',
  'Large_clean_iMac_mockup_8681b1a2'
];

function getAllFiles(dir, extension) {
  let results = [];
  const list = fs.readdirSync(dir);
  
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFiles(filePath, extension));
    } else if (file.endsWith(extension)) {
      results.push(filePath);
    }
  });
  
  return results;
}

function updateImportPaths() {
  // Find all TypeScript/JavaScript files
  const files = [
    ...getAllFiles('./client/src', '.tsx'),
    ...getAllFiles('./client/src', '.ts'),
    ...getAllFiles('./client/src', '.jsx'),
    ...getAllFiles('./client/src', '.js')
  ];

  let totalReplacements = 0;
  
  files.forEach(filePath => {
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      let originalContent = content;
      
      // Replace .png imports with .jpg, except for PNG-only images
      const pngRegex = /@assets\/([^'"\s]+)\.png/g;
      
      content = content.replace(pngRegex, (match, imageName) => {
        // Check if this image should stay PNG (has transparency)
        const shouldStayPng = pngImages.some(pngImg => imageName.includes(pngImg));
        
        if (shouldStayPng) {
          console.log(`✓ Keeping PNG: ${imageName}.png (has transparency)`);
          return match; // Keep as .png
        } else {
          console.log(`→ Converting import: ${imageName}.png → ${imageName}.jpg`);
          return `@assets/${imageName}.jpg`;
        }
      });
      
      // Also handle generated_images directory
      const generatedPngRegex = /@assets\/generated_images\/([^'"\s]+)\.png/g;
      
      content = content.replace(generatedPngRegex, (match, imageName) => {
        const shouldStayPng = pngImages.some(pngImg => imageName.includes(pngImg));
        
        if (shouldStayPng) {
          console.log(`✓ Keeping PNG: generated_images/${imageName}.png (has transparency)`);
          return match;
        } else {
          console.log(`→ Converting import: generated_images/${imageName}.png → generated_images/${imageName}.jpg`);
          return `@assets/generated_images/${imageName}.jpg`;
        }
      });
      
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content);
        totalReplacements++;
        console.log(`Updated file: ${filePath}`);
      }
      
    } catch (error) {
      console.error(`Error processing ${filePath}:`, error.message);
    }
  });
  
  console.log(`\nImport path fix completed!`);
  console.log(`Updated ${totalReplacements} files`);
}

updateImportPaths();