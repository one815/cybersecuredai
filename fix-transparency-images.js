import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Images that need transparency - convert these back to optimized PNG
const transparencyImages = [
  'Clean_transparent_iMac_frame_2795ad4e.jpg',
  'Transparent_background_iMac_mockup_761aab24.jpg',
  'Front_facing_iMac_desktop_mockup_b0cc3b8d.jpg',
  'Large_clean_iMac_mockup_8681b1a2.jpg'
];

async function fixTransparencyImages() {
  const inputDir = './attached_assets/generated_images';
  
  for (const file of transparencyImages) {
    const inputPath = path.join(inputDir, file);
    const outputPath = inputPath.replace('.jpg', '.png');
    
    try {
      if (fs.existsSync(inputPath)) {
        console.log(`Converting ${file} back to PNG with transparency...`);
        
        await sharp(inputPath)
          .resize(1200, 1200, { 
            fit: 'inside', 
            withoutEnlargement: true 
          })
          .png({ 
            quality: 80,
            compressionLevel: 9
          })
          .toFile(outputPath);
          
        // Remove the JPG version
        fs.unlinkSync(inputPath);
        
        console.log(`✓ ${file} → PNG with transparency`);
      } else {
        console.log(`⚠️ ${file} not found`);
      }
    } catch (error) {
      console.error(`Error processing ${file}:`, error.message);
    }
  }
  
  console.log('Transparency restoration completed!');
}

fixTransparencyImages().catch(console.error);