import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

interface OptimizationOptions {
  maxWidth: number;
  quality: number;
  outputFormat: 'webp' | 'avif' | 'jpeg';
  outputDir: string;
}

const defaultOptions: OptimizationOptions = {
  maxWidth: 1920,
  quality: 80,
  outputFormat: 'webp',
  outputDir: 'client/public/assets-optimized'
};

async function ensureDirectory(dir: string): Promise<void> {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (error) {
    console.error(`Failed to create directory ${dir}:`, error);
  }
}

async function optimizeImage(
  inputPath: string, 
  outputPath: string, 
  options: OptimizationOptions
): Promise<void> {
  try {
    const { size: originalSize } = await fs.stat(inputPath);
    
    await sharp(inputPath)
      .resize(options.maxWidth, null, { 
        withoutEnlargement: true,
        fit: 'inside'
      })
      .webp({ quality: options.quality })
      .toFile(outputPath);
    
    const { size: optimizedSize } = await fs.stat(outputPath);
    const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
    
    console.log(`✅ ${path.basename(inputPath)} → ${path.basename(outputPath)}`);
    console.log(`   ${(originalSize / 1024).toFixed(1)}KB → ${(optimizedSize / 1024).toFixed(1)}KB (${savings}% reduction)`);
  } catch (error) {
    console.error(`❌ Failed to optimize ${inputPath}:`, error);
  }
}

async function findImages(directory: string): Promise<string[]> {
  const images: string[] = [];
  const extensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff'];
  
  try {
    const entries = await fs.readdir(directory, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(directory, entry.name);
      
      if (entry.isDirectory()) {
        // Recursively search subdirectories
        const subImages = await findImages(fullPath);
        images.push(...subImages);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (extensions.includes(ext)) {
          images.push(fullPath);
        }
      }
    }
  } catch (error) {
    console.error(`Failed to read directory ${directory}:`, error);
  }
  
  return images;
}

async function optimizeImagesInDirectory(
  sourceDir: string, 
  options: OptimizationOptions = defaultOptions
): Promise<void> {
  console.log(`🔍 Scanning for images in ${sourceDir}...`);
  
  const images = await findImages(sourceDir);
  
  if (images.length === 0) {
    console.log('No images found to optimize.');
    return;
  }
  
  console.log(`📸 Found ${images.length} images to optimize`);
  
  await ensureDirectory(options.outputDir);
  
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  
  for (const imagePath of images) {
    try {
      const { size: originalSize } = await fs.stat(imagePath);
      
      // Only optimize images larger than 100KB
      if (originalSize > 100 * 1024) {
        const relativePath = path.relative(sourceDir, imagePath);
        const outputName = path.basename(imagePath, path.extname(imagePath)) + `.${options.outputFormat}`;
        const outputDir = path.join(options.outputDir, path.dirname(relativePath));
        await ensureDirectory(outputDir);
        const outputPath = path.join(outputDir, outputName);
        
        await optimizeImage(imagePath, outputPath, options);
        
        const { size: optimizedSize } = await fs.stat(outputPath);
        totalOriginalSize += originalSize;
        totalOptimizedSize += optimizedSize;
      } else {
        console.log(`⏭️  Skipping ${path.basename(imagePath)} (< 100KB)`);
      }
    } catch (error) {
      console.error(`Failed to process ${imagePath}:`, error);
    }
  }
  
  if (totalOriginalSize > 0) {
    const totalSavings = ((totalOriginalSize - totalOptimizedSize) / totalOriginalSize * 100).toFixed(1);
    console.log(`\n📊 Optimization Summary:`);
    console.log(`   Original size: ${(totalOriginalSize / 1024 / 1024).toFixed(1)}MB`);
    console.log(`   Optimized size: ${(totalOptimizedSize / 1024 / 1024).toFixed(1)}MB`);
    console.log(`   Total savings: ${totalSavings}%`);
  }
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const sourceDir = process.argv[2] || 'client/public/assets';
  
  optimizeImagesInDirectory(sourceDir, defaultOptions)
    .then(() => {
      console.log('✅ Image optimization complete!');
    })
    .catch((error) => {
      console.error('❌ Image optimization failed:', error);
      process.exit(1);
    });
}

export { optimizeImagesInDirectory, OptimizationOptions };