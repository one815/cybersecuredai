import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function compressRemainingImages() {
  const inputDir = './attached_assets';
  
  // Get all PNG files in the main directory (not subdirectories)
  const files = fs.readdirSync(inputDir).filter(file => 
    file.toLowerCase().endsWith('.png') && fs.statSync(path.join(inputDir, file)).isFile()
  );

  console.log(`Found ${files.length} PNG files in main directory to compress...`);
  
  let totalOriginalSize = 0;
  let totalCompressedSize = 0;

  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const outputPath = inputPath.replace('.png', '.jpg');
    
    try {
      // Get original file size
      const originalStats = fs.statSync(inputPath);
      totalOriginalSize += originalStats.size;
      
      // Compress the image
      await sharp(inputPath)
        .resize(800, 800, { 
          fit: 'inside', 
          withoutEnlargement: true 
        })
        .jpeg({ 
          quality: 75,
          progressive: true,
          mozjpeg: true 
        })
        .toFile(outputPath);
        
      // Remove the original PNG
      fs.unlinkSync(inputPath);
      
      // Get new file size
      const compressedStats = fs.statSync(outputPath);
      totalCompressedSize += compressedStats.size;
      
      console.log(`✓ ${file} - ${(originalStats.size / 1024).toFixed(1)}KB → ${(compressedStats.size / 1024).toFixed(1)}KB`);
    } catch (error) {
      console.error(`Error processing ${file}:`, error.message);
    }
  }
  
  console.log(`\nMain directory compression completed!`);
  console.log(`Total size reduced from ${(totalOriginalSize / 1024 / 1024).toFixed(2)}MB to ${(totalCompressedSize / 1024 / 1024).toFixed(2)}MB`);
  if (totalOriginalSize > 0) {
    console.log(`Saved ${((totalOriginalSize - totalCompressedSize) / 1024 / 1024).toFixed(2)}MB (${(((totalOriginalSize - totalCompressedSize) / totalOriginalSize) * 100).toFixed(1)}% reduction)`);
  }
}

compressRemainingImages().catch(console.error);