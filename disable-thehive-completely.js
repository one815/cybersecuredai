#!/usr/bin/env node
/**
 * Completely disable TheHive integration routes by commenting them out properly
 */

import fs from 'fs';

const ROUTES_FILE = './server/routes.ts';

// Read the file
let content = fs.readFileSync(ROUTES_FILE, 'utf8');

// Find the start of TheHive section and comment out everything until the next major section
const lines = content.split('\n');
let inTheHiveSection = false;
let modifiedLines = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Start of TheHive section
  if (line.includes('// TheHive Integration API Routes')) {
    inTheHiveSection = true;
    modifiedLines.push(line);
    modifiedLines.push('  /* TheHive integration temporarily disabled');
    continue;
  }
  
  // End TheHive section when we reach another major section
  if (inTheHiveSection && 
      (line.includes('// =====') || 
       line.includes('// Database') ||
       line.includes('// Health') ||
       line.includes('const httpServer = createServer(app);') ||
       line.includes('return httpServer;'))) {
    modifiedLines.push('  */ // End TheHive integration');
    modifiedLines.push(line);
    inTheHiveSection = false;
    continue;
  }
  
  // Add line normally if not in TheHive section
  if (!inTheHiveSection) {
    modifiedLines.push(line);
  } else {
    // Skip lines in TheHive section (they're being commented out)
    continue;
  }
}

// If we're still in TheHive section at end of file, close the comment
if (inTheHiveSection) {
  modifiedLines.push('  */ // End TheHive integration');
}

// Write the cleaned content
fs.writeFileSync(ROUTES_FILE, modifiedLines.join('\n'));
console.log('✅ TheHive integration has been completely disabled');