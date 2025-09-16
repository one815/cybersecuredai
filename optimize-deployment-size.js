#!/usr/bin/env node
/**
 * Deployment Size Optimization Script
 * 
 * This script categorizes assets into essential (< 1MB, include in build) 
 * vs large (move to external storage) to reduce deployment size.
 * 
 * Run with: node optimize-deployment-size.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ATTACHED_ASSETS_DIR = './attached_assets';
const SIZE_THRESHOLD = 1024 * 1024; // 1MB threshold

/**
 * Get file size in bytes
 */
function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.size;
  } catch (error) {
    console.error(`Error getting size for ${filePath}:`, error.message);
    return 0;
  }
}

/**
 * Get all image files recursively
 */
function getImageFiles(dir) {
  const files = [];
  
  if (!fs.existsSync(dir)) {
    console.log(`Directory ${dir} does not exist`);
    return files;
  }
  
  function traverse(currentDir) {
    const entries = fs.readdirSync(currentDir);
    
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        traverse(fullPath);
      } else if (/\.(png|jpe?g|webp|gif|svg)$/i.test(entry)) {
        const size = stat.size;
        const relativePath = path.relative('.', fullPath);
        files.push({
          path: fullPath,
          relativePath,
          name: entry,
          size,
          sizeFormatted: formatSize(size)
        });
      }
    }
  }
  
  traverse(dir);
  return files;
}

/**
 * Format file size for display
 */
function formatSize(bytes) {
  if (bytes >= 1024 * 1024) {
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  } else if (bytes >= 1024) {
    return (bytes / 1024).toFixed(2) + ' KB';
  } else {
    return bytes + ' B';
  }
}

/**
 * Categorize assets by size
 */
function categorizeAssets() {
  console.log('🔍 Analyzing assets for deployment size optimization...\n');
  
  const allFiles = getImageFiles(ATTACHED_ASSETS_DIR);
  
  if (allFiles.length === 0) {
    console.log('No image files found in attached_assets directory');
    return;
  }
  
  const essential = allFiles.filter(file => file.size < SIZE_THRESHOLD);
  const large = allFiles.filter(file => file.size >= SIZE_THRESHOLD);
  
  console.log(`📊 Asset Analysis Results:`);
  console.log(`   Total files: ${allFiles.length}`);
  console.log(`   Essential files (< 1MB): ${essential.length}`);
  console.log(`   Large files (≥ 1MB): ${large.length}\n`);
  
  const totalSize = allFiles.reduce((sum, file) => sum + file.size, 0);
  const essentialSize = essential.reduce((sum, file) => sum + file.size, 0);
  const largeSize = large.reduce((sum, file) => sum + file.size, 0);
  
  console.log(`📈 Size Breakdown:`);
  console.log(`   Total size: ${formatSize(totalSize)}`);
  console.log(`   Essential files size: ${formatSize(essentialSize)}`);
  console.log(`   Large files size: ${formatSize(largeSize)}`);
  console.log(`   Size reduction potential: ${formatSize(largeSize)} (${((largeSize/totalSize)*100).toFixed(1)}%)\n`);
  
  if (large.length > 0) {
    console.log(`🔴 Large files that should be moved to external storage:`);
    large.sort((a, b) => b.size - a.size); // Sort by size descending
    large.forEach((file, index) => {
      console.log(`   ${index + 1}. ${file.relativePath} (${file.sizeFormatted})`);
    });
    console.log('');
  }
  
  if (essential.length > 0) {
    console.log(`🟢 Essential files (keep in build):`);
    essential.sort((a, b) => b.size - a.size); // Sort by size descending
    essential.slice(0, 10).forEach((file, index) => {
      console.log(`   ${index + 1}. ${file.relativePath} (${file.sizeFormatted})`);
    });
    if (essential.length > 10) {
      console.log(`   ... and ${essential.length - 10} more smaller files`);
    }
    console.log('');
  }
  
  // Generate recommendations
  console.log(`📋 Deployment Optimization Recommendations:`);
  console.log(`   1. Move ${large.length} large files (${formatSize(largeSize)}) to external object storage`);
  console.log(`   2. Update asset references for large files to use /public-objects/ endpoint`);
  console.log(`   3. Keep ${essential.length} essential files (${formatSize(essentialSize)}) in build`);
  console.log(`   4. Expected deployment size reduction: ~${formatSize(largeSize)}`);
  
  // Write report file
  const report = {
    timestamp: new Date().toISOString(),
    analysis: {
      totalFiles: allFiles.length,
      essentialFiles: essential.length,
      largeFiles: large.length,
      totalSize,
      essentialSize,
      largeSize,
      potentialReduction: largeSize,
      reductionPercentage: ((largeSize/totalSize)*100)
    },
    largeFiles: large.map(f => ({ path: f.relativePath, size: f.size, sizeFormatted: f.sizeFormatted })),
    essentialFiles: essential.map(f => ({ path: f.relativePath, size: f.size, sizeFormatted: f.sizeFormatted }))
  };
  
  fs.writeFileSync('deployment-size-analysis.json', JSON.stringify(report, null, 2));
  console.log(`\n📄 Detailed report saved to: deployment-size-analysis.json`);
  
  return report;
}

// Run the analysis when script is executed directly
categorizeAssets();