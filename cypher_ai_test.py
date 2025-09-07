#!/usr/bin/env python3
"""
Cypher AI Genetic Model - Environment Verification
Phase 1: Critical Infrastructure Setup
"""

import sys
import importlib

def test_import(package_name, display_name=None):
    """Test if a package can be imported and show version info"""
    if display_name is None:
        display_name = package_name
    
    try:
        module = importlib.import_module(package_name)
        version = getattr(module, '__version__', 'Unknown')
        print(f"✅ {display_name}: {version}")
        return True
    except ImportError as e:
        print(f"❌ {display_name}: Import failed - {e}")
        return False

def main():
    """Verify Cypher AI environment setup"""
    print("🧬 CyberSecured AI - Cypher AI Genetic Model Environment Test")
    print("=" * 60)
    print(f"Python Version: {sys.version}")
    print("=" * 60)
    
    # Core AI/ML Libraries
    packages = [
        ('torch', 'PyTorch'),
        ('torchvision', 'TorchVision'),  
        ('torchaudio', 'TorchAudio'),
        ('tensorflow', 'TensorFlow'),
        ('deap', 'DEAP (Genetic Algorithms)'),
        ('numpy', 'NumPy'),
        ('pandas', 'Pandas'),
        ('sklearn', 'Scikit-Learn'),
        ('matplotlib', 'Matplotlib'),
        ('seaborn', 'Seaborn')
    ]
    
    print("\n🔬 Testing Core AI/ML Libraries:")
    print("-" * 40)
    
    success_count = 0
    for package, display in packages:
        if test_import(package, display):
            success_count += 1
    
    print("\n" + "=" * 60)
    print(f"📊 Results: {success_count}/{len(packages)} packages available")
    
    if success_count == len(packages):
        print("🎉 Environment is ready for Cypher AI Genetic Model development!")
        
        # Quick functionality tests
        print("\n🧪 Quick Functionality Tests:")
        print("-" * 40)
        
        try:
            import torch
            device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
            print(f"✅ PyTorch device: {device}")
            
            import tensorflow as tf
            print(f"✅ TensorFlow devices: {len(tf.config.list_physical_devices())} device(s)")
            
            from deap import base, creator, tools
            print("✅ DEAP genetic algorithm framework ready")
            
        except Exception as e:
            print(f"⚠️  Functionality test failed: {e}")
    else:
        print("❌ Some packages are missing. Please install missing dependencies.")

if __name__ == "__main__":
    main()