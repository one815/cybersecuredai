import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function compressImages() {
  const inputDir = './attached_assets/generated_images';
  const files = fs.readdirSync(inputDir).filter(file => 
    file.toLowerCase().endsWith('.png') || file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg')
  );

  console.log(`Found ${files.length} images to compress...`);
  
  let totalOriginalSize = 0;
  let totalCompressedSize = 0;

  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const outputPath = inputPath; // Overwrite original files
    
    try {
      // Get original file size
      const originalStats = fs.statSync(inputPath);
      totalOriginalSize += originalStats.size;
      
      // Compress the image
      await sharp(inputPath)
        .resize(1200, 1200, { 
          fit: 'inside', 
          withoutEnlargement: true 
        })
        .jpeg({ 
          quality: 75,
          progressive: true,
          mozjpeg: true 
        })
        .toFile(outputPath.replace(/\.(png|jpg|jpeg)$/i, '.jpg'));
        
      // If we converted to JPG, remove the original PNG
      if (file.toLowerCase().endsWith('.png')) {
        fs.unlinkSync(inputPath);
      }
      
      // Get new file size
      const newPath = outputPath.replace(/\.(png|jpg|jpeg)$/i, '.jpg');
      const compressedStats = fs.statSync(newPath);
      totalCompressedSize += compressedStats.size;
      
      console.log(`✓ ${file} - ${(originalStats.size / 1024 / 1024).toFixed(2)}MB → ${(compressedStats.size / 1024 / 1024).toFixed(2)}MB`);
    } catch (error) {
      console.error(`Error processing ${file}:`, error.message);
    }
  }
  
  console.log(`\nCompression completed!`);
  console.log(`Total size reduced from ${(totalOriginalSize / 1024 / 1024).toFixed(2)}MB to ${(totalCompressedSize / 1024 / 1024).toFixed(2)}MB`);
  console.log(`Saved ${((totalOriginalSize - totalCompressedSize) / 1024 / 1024).toFixed(2)}MB (${(((totalOriginalSize - totalCompressedSize) / totalOriginalSize) * 100).toFixed(1)}% reduction)`);
}

compressImages().catch(console.error);