import fs from 'fs';
import path from 'path';

// Images that kept PNG format (have transparency)
const pngImages = [
  'Clean_transparent_iMac_frame_2795ad4e',
  'Transparent_background_iMac_mockup_761aab24',
  'Large_clean_iMac_mockup_8681b1a2',
  'Front_facing_iMac_desktop_mockup_b0cc3b8d'
];

function getAllFiles(dir, extension) {
  let results = [];
  try {
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
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error.message);
  }
  
  return results;
}

function fixAllRemainingImports() {
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
      
      // Replace all @assets/ imports ending with .png to .jpg (except transparency files)
      content = content.replace(/@assets\/([^'"]*?)\.png/g, (match, imageName) => {
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
      
      // Also fix direct attached_assets references in src attributes
      content = content.replace(/\/attached_assets\/([^'"]*?)\.png/g, (match, imageName) => {
        const shouldStayPng = pngImages.some(pngImg => imageName.includes(pngImg));
        
        if (shouldStayPng) {
          console.log(`✓ Keeping PNG path: /attached_assets/${imageName}.png (has transparency)`);
          return match;
        } else {
          console.log(`→ Converting path: /attached_assets/${imageName}.png → /attached_assets/${imageName}.jpg`);
          return `/attached_assets/${imageName}.jpg`;
        }
      });
      
      // Fix import.meta.env.BASE_URL references
      content = content.replace(/import\.meta\.env\.BASE_URL \+ ['"]+attached_assets\/([^'"]*?)\.png/g, (match, imageName) => {
        const shouldStayPng = pngImages.some(pngImg => imageName.includes(pngImg));
        
        if (shouldStayPng) {
          console.log(`✓ Keeping PNG BASE_URL: ${imageName}.png (has transparency)`);
          return match;
        } else {
          console.log(`→ Converting BASE_URL: ${imageName}.png → ${imageName}.jpg`);
          return match.replace('.png', '.jpg');
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
  
  console.log(`\nAll remaining imports fix completed!`);
  console.log(`Updated ${totalReplacements} files`);
}

fixAllRemainingImports();