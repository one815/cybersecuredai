#!/usr/bin/env python3
from PIL import Image
import os

def extract_individual_icons():
    """Extract individual icons from the generated grid images"""
    
    # Define the source and destination paths
    cybersecurity_grid = "attached_assets/generated_images/Glassy_cybersecurity_category_icons_76d2798c.png"
    navigation_grid = "attached_assets/generated_images/Glassy_navigation_category_icons_10b28a46.png"
    output_dir = "orca-federal-website/assets/images/icons"
    
    # Create output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)
    
    # Extract cybersecurity category icons (2x2 grid)
    if os.path.exists(cybersecurity_grid):
        cyber_img = Image.open(cybersecurity_grid)
        width, height = cyber_img.size
        
        # Calculate icon dimensions (2x2 grid)
        icon_width = width // 2
        icon_height = height // 2
        
        # Define the positions and names for cybersecurity icons
        cyber_positions = [
            (0, 0, "cloud-security.png"),          # Top left: Cloud Security & AI Analytics
            (icon_width, 0, "network-infrastructure.png"),  # Top right: Network Infrastructure
            (0, icon_height, "endpoint-security.png"),      # Bottom left: Endpoint Security
            (icon_width, icon_height, "compliance-risk.png") # Bottom right: Compliance & Risk
        ]
        
        # Extract each cybersecurity icon
        for x, y, filename in cyber_positions:
            icon = cyber_img.crop((x, y, x + icon_width, y + icon_height))
            icon.save(os.path.join(output_dir, filename))
            print(f"Extracted: {filename}")
    
    # Extract navigation category icons (2x3 grid)
    if os.path.exists(navigation_grid):
        nav_img = Image.open(navigation_grid)
        width, height = nav_img.size
        
        # Calculate icon dimensions (2x3 grid)
        icon_width = width // 3
        icon_height = height // 2
        
        # Define the positions and names for navigation icons
        nav_positions = [
            (0, 0, "solutions.png"),               # Top left: Solutions
            (icon_width, 0, "services.png"),       # Top middle: Services
            (icon_width * 2, 0, "resources.png"),  # Top right: Resources
            (0, icon_height, "about.png"),         # Bottom left: About
            (icon_width, icon_height, "about-alt.png"),  # Bottom middle: About (alternative)
            (icon_width * 2, icon_height, "platform.png") # Bottom right: Platform
        ]
        
        # Extract each navigation icon
        for x, y, filename in nav_positions:
            icon = nav_img.crop((x, y, x + icon_width, y + icon_height))
            icon.save(os.path.join(output_dir, filename))
            print(f"Extracted: {filename}")
    
    print("Icon extraction completed!")

if __name__ == "__main__":
    extract_individual_icons()