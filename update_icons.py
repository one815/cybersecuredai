#!/usr/bin/env python3
import os
import re
from glob import glob

def update_html_files_with_icons():
    """Update all HTML files in the ORCA Federal website with glassy 4D icons"""
    
    website_dir = "orca-federal-website"
    
    # Find all HTML files
    html_files = glob(f"{website_dir}/**/*.html", recursive=True)
    
    print(f"Found {len(html_files)} HTML files to update...")
    
    for html_file in html_files:
        # Skip demo and portal files that might have different structures
        if 'demo.html' in html_file or 'water-animations-demo.html' in html_file:
            continue
            
        print(f"Processing: {html_file}")
        
        try:
            with open(html_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Determine the relative path depth for icons
            depth = html_file.count('/') - 1  # orca-federal-website counts as 1
            relative_path = '../' * depth if depth > 0 else ''
            icon_path = f"{relative_path}assets/images/icons/"
            
            # Navigation icons (main dropdown toggles)
            nav_icon_updates = [
                (r'(<a href="[^"]*platform[^"]*" class="nav-link dropdown-toggle"[^>]*>)([^<]*)(Platform)([^<]*</a>)', 
                 f'\\1<img src="{icon_path}platform.png" alt="Platform" style="height: 20px; vertical-align: middle; margin-right: 8px;">\\3\\4'),
                
                (r'(<a href="[^"]*solutions[^"]*" class="nav-link dropdown-toggle"[^>]*>)([^<]*)(Solutions)([^<]*</a>)', 
                 f'\\1<img src="{icon_path}solutions.png" alt="Solutions" style="height: 20px; vertical-align: middle; margin-right: 8px;">\\3\\4'),
                
                (r'(<a href="[^"]*services[^"]*" class="nav-link dropdown-toggle"[^>]*>)([^<]*)(Services)([^<]*</a>)', 
                 f'\\1<img src="{icon_path}services.png" alt="Services" style="height: 20px; vertical-align: middle; margin-right: 8px;">\\3\\4'),
                
                (r'(<a href="[^"]*resources[^"]*" class="nav-link dropdown-toggle"[^>]*>)([^<]*)(Resources)([^<]*</a>)', 
                 f'\\1<img src="{icon_path}resources.png" alt="Resources" style="height: 20px; vertical-align: middle; margin-right: 8px;">\\3\\4'),
                
                (r'(<a href="[^"]*about[^"]*" class="nav-link dropdown-toggle"[^>]*>)([^<]*)(About)([^<]*</a>)', 
                 f'\\1<img src="{icon_path}about.png" alt="About" style="height: 20px; vertical-align: middle; margin-right: 8px;">\\3\\4'),
            ]
            
            # Platform capability icons (for dropdown items)
            capability_icon_updates = [
                # Cloud Security & AI Analytics
                (r'(<a href="[^"]*cloud-security[^"]*">)([^<]*)(Cloud Security)([^<]*</a>)', 
                 f'\\1<img src="{icon_path}cloud-security.png" alt="Cloud Security" style="height: 20px; vertical-align: middle; margin-right: 8px;">\\3 & AI Analytics\\4'),
                
                # Network Infrastructure  
                (r'(<a href="[^"]*network-infrastructure[^"]*">)([^<]*)(Network Infrastructure)([^<]*</a>)', 
                 f'\\1<img src="{icon_path}network-infrastructure.png" alt="Network Infrastructure" style="height: 20px; vertical-align: middle; margin-right: 8px;">\\3\\4'),
                
                # Endpoint Security
                (r'(<a href="[^"]*endpoint-security[^"]*">)([^<]*)(Endpoint Security)([^<]*</a>)', 
                 f'\\1<img src="{icon_path}endpoint-security.png" alt="Endpoint Security" style="height: 20px; vertical-align: middle; margin-right: 8px;">\\3\\4'),
                
                # Compliance & Risk Management
                (r'(<a href="[^"]*compliance-risk[^"]*">)([^<]*)(Compliance & Risk Management?)([^<]*</a>)', 
                 f'\\1<img src="{icon_path}compliance-risk.png" alt="Compliance & Risk" style="height: 20px; vertical-align: middle; margin-right: 8px;">\\3\\4'),
            ]
            
            # Apply navigation icon updates
            updated_content = content
            for pattern, replacement in nav_icon_updates:
                # Only apply if the icon is not already present
                if 'icons/' not in re.search(pattern, updated_content, re.IGNORECASE).group() if re.search(pattern, updated_content, re.IGNORECASE) else True:
                    updated_content = re.sub(pattern, replacement, updated_content, flags=re.IGNORECASE)
            
            # Apply platform capability icon updates
            for pattern, replacement in capability_icon_updates:
                # Only apply if the icon is not already present  
                matches = re.finditer(pattern, updated_content, re.IGNORECASE)
                for match in matches:
                    if 'icons/' not in match.group():
                        updated_content = re.sub(pattern, replacement, updated_content, flags=re.IGNORECASE)
                        break
            
            # Write the updated content back to file
            if updated_content != content:
                with open(html_file, 'w', encoding='utf-8') as f:
                    f.write(updated_content)
                print(f"✅ Updated: {html_file}")
            else:
                print(f"⏭️  No changes: {html_file}")
                
        except Exception as e:
            print(f"❌ Error processing {html_file}: {str(e)}")
    
    print("\n🎉 Icon implementation completed!")

if __name__ == "__main__":
    update_html_files_with_icons()