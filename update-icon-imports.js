import fs from 'fs';
import path from 'path';

// Files that import from CustomIcons component (from grep results)
const filesToUpdate = [
  'client/src/pages/Leadership.tsx',
  'client/src/pages/ThreatAnalysis.tsx', 
  'client/src/pages/Dashboard.tsx',
  'client/src/pages/Platform.tsx',
  'client/src/pages/Solutions.tsx',
  'client/src/pages/Services.tsx',
  'client/src/pages/Integrations.tsx',
  'client/src/pages/ThreatIntelligence.tsx',
  'client/src/pages/Videos.tsx',
  'client/src/pages/Pricing.tsx',
  'client/src/pages/ThreatMap5D.tsx',
  'client/src/pages/FileSharing.tsx',
  'client/src/pages/SecurityOverview.tsx',
  'client/src/pages/AboutUs.tsx',
  'client/src/pages/DataSheets.tsx',
  'client/src/components/Sidebar.tsx',
  'client/src/components/ui/checkbox.tsx'
];

function updateIconImports() {
  let totalUpdated = 0;
  
  filesToUpdate.forEach(filePath => {
    try {
      if (!fs.existsSync(filePath)) {
        console.log(`⚠️ File not found: ${filePath}`);
        return;
      }

      let content = fs.readFileSync(filePath, 'utf8');
      let originalContent = content;
      
      // Replace imports from @/components/CustomIcons to @/components/LazyCustomIcons
      content = content.replace(
        /from\s+['"]\@\/components\/CustomIcons['"]/g,
        'from "@/components/LazyCustomIcons"'
      );
      
      // Also handle any import statements with different quote styles
      content = content.replace(
        /from\s+['"]\@\/components\/CustomIcons['"]/g,
        'from "@/components/LazyCustomIcons"'
      );
      
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content);
        totalUpdated++;
        console.log(`✅ Updated: ${filePath}`);
      } else {
        console.log(`ℹ️ No changes needed: ${filePath}`);
      }
      
    } catch (error) {
      console.error(`❌ Error processing ${filePath}:`, error.message);
    }
  });
  
  console.log(`\n🎉 Icon import update completed!`);
  console.log(`📊 Updated ${totalUpdated} of ${filesToUpdate.length} files`);
}

updateIconImports();