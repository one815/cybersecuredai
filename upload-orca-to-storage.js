import { Storage } from '@google-cloud/storage';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = new Storage();
const bucketName = 'replit-objstore-56e5bc9d-3e32-4f07-b8a5-8997fd74d0be';
const bucket = storage.bucket(bucketName);

async function uploadDirectory(localDir, storageDir) {
  const files = [];
  
  function getAllFiles(dir, arrayOfFiles = []) {
    const fileList = fs.readdirSync(dir);
    
    fileList.forEach(file => {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
      } else {
        arrayOfFiles.push(fullPath);
      }
    });
    
    return arrayOfFiles;
  }
  
  const allFiles = getAllFiles(localDir);
  
  console.log(`📁 Found ${allFiles.length} files to upload...`);
  
  for (const filePath of allFiles) {
    try {
      const relativePath = path.relative(localDir, filePath);
      const storageFilePath = `${storageDir}/${relativePath}`.replace(/\\/g, '/');
      
      const file = bucket.file(storageFilePath);
      
      // Set proper content type based on file extension
      const ext = path.extname(filePath).toLowerCase();
      let contentType = 'text/plain';
      
      if (ext === '.html') contentType = 'text/html';
      else if (ext === '.css') contentType = 'text/css';
      else if (ext === '.js') contentType = 'application/javascript';
      else if (ext === '.png') contentType = 'image/png';
      else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
      else if (ext === '.gif') contentType = 'image/gif';
      else if (ext === '.svg') contentType = 'image/svg+xml';
      
      await file.save(fs.readFileSync(filePath), {
        metadata: {
          contentType: contentType,
          cacheControl: 'public, max-age=31536000',
        },
        public: true,
        validation: 'crc32c',
      });
      
      console.log(`✅ Uploaded: ${relativePath}`);
    } catch (error) {
      console.error(`❌ Failed to upload ${filePath}:`, error.message);
    }
  }
}

async function main() {
  try {
    console.log('🚀 Starting ORCA Federal website upload to public storage...');
    
    const localOrcaDir = path.join(__dirname, 'orca-federal-website');
    const storageDir = 'public/orca-federal';
    
    if (!fs.existsSync(localOrcaDir)) {
      console.error('❌ ORCA Federal directory not found:', localOrcaDir);
      process.exit(1);
    }
    
    await uploadDirectory(localOrcaDir, storageDir);
    
    console.log('✅ ORCA Federal website uploaded successfully!');
    console.log('🌐 Your website is now accessible at public URLs like:');
    console.log(`   https://storage.googleapis.com/${bucketName}/public/orca-federal/index.html`);
    console.log(`   https://storage.googleapis.com/${bucketName}/public/orca-federal/platform/index.html`);
    console.log(`   https://storage.googleapis.com/${bucketName}/public/orca-federal/about/index.html`);
    
  } catch (error) {
    console.error('❌ Upload failed:', error);
    process.exit(1);
  }
}

main();