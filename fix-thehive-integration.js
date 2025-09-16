#!/usr/bin/env node
/**
 * Fix TheHive integration by commenting out undefined references
 */

import fs from 'fs';

const ROUTES_FILE = './server/routes.ts';

// Read the file
let content = fs.readFileSync(ROUTES_FILE, 'utf8');

// List of patterns to comment out
const patterns = [
  /theHiveIntegration\.getRecentCases\(/g,
  /theHiveIntegration\.getCriticalCases\(/g,
  /theHiveIntegration\.getActiveAlerts\(/g,
  /theHiveIntegration\.getObservablesByCase\(/g,
  /theHiveIntegration\.getRecentObservables\(/g,
  /theHiveIntegration\.getIOCs\(/g,
  /theHiveIntegration\.getCaseTimeline\(/g,
  /theHiveIntegration\.createAlert\(/g,
  /theHiveIntegration\.promoteAlertToCase\(/g
];

// Find and comment out TheHive routes
const lines = content.split('\n');
let inTheHiveSection = false;
let routeStartLine = -1;
let braceCount = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Check if we're entering a TheHive API route
  if (line.includes('app.get("/api/thehive/') || 
      line.includes('app.post("/api/thehive/') || 
      line.includes('app.put("/api/thehive/') || 
      line.includes('app.delete("/api/thehive/')) {
    inTheHiveSection = true;
    routeStartLine = i;
    braceCount = 0;
    
    // Comment out the line
    if (!line.trim().startsWith('//')) {
      lines[i] = '  /* ' + line;
    }
    continue;
  }
  
  if (inTheHiveSection) {
    if (line.includes('{')) braceCount++;
    if (line.includes('}')) braceCount--;
    
    // Comment out the line if it's not already commented
    if (!line.trim().startsWith('//') && !line.trim().startsWith('/*')) {
      lines[i] = '  ' + line;
    }
    
    // End of route function
    if (braceCount === 0 && line.includes('});')) {
      lines[i] = '  ' + line + ' */';
      inTheHiveSection = false;
      routeStartLine = -1;
    }
  }
}

// Write the updated content
fs.writeFileSync(ROUTES_FILE, lines.join('\n'));
console.log('✅ TheHive integration routes have been commented out');