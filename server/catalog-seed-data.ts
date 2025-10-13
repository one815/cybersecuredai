// CyberSecured AI Catalog Seed Data
// Comprehensive federal cybersecurity offerings with realistic pricing structure
// CONFIDENTIAL: Internal use only - contains sensitive pricing information

import { storage } from "./storage";
import type { 
  InsertCatalogCategory, 
  InsertBomComponent, 
  InsertCatalogProduct, 
  InsertProductBom,
  InsertCatalogService, 
  InsertCatalogSolution,
  InsertSolutionComponent 
} from "@shared/schema";

export async function seedCatalogData() {
  console.log('🌱 Seeding CyberSecured AI Catalog Data...');

  try {
    // ===== STEP 1: CREATE CATEGORIES =====
    console.log('📁 Creating catalog categories...');
    
    const categories: InsertCatalogCategory[] = [
      // Product Categories
      { name: 'Core AI Systems', slug: 'core-ai-systems', categoryType: 'product', description: 'Revolutionary AI-powered cybersecurity platforms' },
      { name: 'Visualization Platforms', slug: 'visualization-platforms', categoryType: 'product', description: '5D holographic and immersive security interfaces' },
      { name: 'Monitoring Systems', slug: 'monitoring-systems', categoryType: 'product', description: 'Real-time tracking and surveillance platforms' },
      { name: 'Defense Platforms', slug: 'defense-platforms', categoryType: 'product', description: 'Autonomous cyber defense and swarm coordination' },
      { name: 'Analytics Engines', slug: 'analytics-engines', categoryType: 'product', description: 'Cross-system intelligence and correlation platforms' },
      
      // Service Categories
      { name: 'RMF Services', slug: 'rmf-services', categoryType: 'service', description: 'Risk Management Framework implementation services' },
      { name: 'Information Assurance', slug: 'information-assurance', categoryType: 'service', description: 'Comprehensive information security services' },
      { name: 'Threat Analytics', slug: 'threat-analytics', categoryType: 'service', description: 'Advanced threat detection and analysis services' },
      { name: 'Infrastructure Services', slug: 'infrastructure-services', categoryType: 'service', description: 'Network and infrastructure security services' },
      { name: 'SOC Services', slug: 'soc-services', categoryType: 'service', description: 'Security Operations Center managed services' },
      { name: 'HACS Services', slug: 'hacs-services', categoryType: 'service', description: 'High Assurance Cyber Services vendor offerings' },
      
      // Solution Categories
      { name: 'Federal Enterprise', slug: 'federal-enterprise', categoryType: 'solution', description: 'Complete federal agency cybersecurity solutions' },
      { name: 'Educational Institutions', slug: 'educational-institutions', categoryType: 'solution', description: 'K-12 and higher education security solutions' },
      { name: 'Critical Infrastructure', slug: 'critical-infrastructure', categoryType: 'solution', description: 'Infrastructure protection and resilience solutions' },
      { name: 'Healthcare Security', slug: 'healthcare-security', categoryType: 'solution', description: 'HIPAA-compliant healthcare cybersecurity solutions' }
    ];

    const createdCategories = await Promise.all(
      categories.map(cat => storage.createCatalogCategory(cat))
    );
    console.log(`✅ Created ${createdCategories.length} categories`);

    // ===== STEP 2: CREATE BOM COMPONENTS =====
    console.log('🔧 Creating BOM components...');
    
    const bomComponents: InsertBomComponent[] = [
      // Hardware Components
      { componentName: 'High-Performance GPU Array', componentType: 'hardware', vendorName: 'NVIDIA', vendorPartNumber: 'A100-80GB', unitCost: 15000, description: 'Enterprise AI acceleration hardware', leadTimeDays: 45, minimumOrderQuantity: 1 },
      { componentName: 'Quantum-Safe Encryption Module', componentType: 'hardware', vendorName: 'Thales', vendorPartNumber: 'HSM-7000', unitCost: 25000, description: 'Hardware security module with quantum-resistant algorithms', leadTimeDays: 60, minimumOrderQuantity: 1 },
      { componentName: 'Holographic Display Unit', componentType: 'hardware', vendorName: 'HoloTech Industries', vendorPartNumber: 'HD-5000', unitCost: 45000, description: '5D holographic visualization display', leadTimeDays: 90, minimumOrderQuantity: 1 },
      { componentName: 'Edge Computing Node', componentType: 'hardware', vendorName: 'Dell EMC', vendorPartNumber: 'PowerEdge-R750', unitCost: 8500, description: 'High-performance edge computing server', leadTimeDays: 30, minimumOrderQuantity: 1 },
      { componentName: 'Advanced Network Processor', componentType: 'hardware', vendorName: 'Cisco', vendorPartNumber: 'ASR-9000', unitCost: 35000, description: 'High-throughput network processing unit', leadTimeDays: 45, minimumOrderQuantity: 1 },
      
      // Software Components
      { componentName: 'TensorFlow Enterprise License', componentType: 'software', vendorName: 'Google', vendorPartNumber: 'TF-ENT-001', unitCost: 50000, description: 'Enterprise machine learning framework license', leadTimeDays: 7, minimumOrderQuantity: 1 },
      { componentName: 'Genetic Algorithm Engine Core', componentType: 'software', vendorName: 'CyberSecured AI', vendorPartNumber: 'GAE-CORE-2025', unitCost: 125000, description: 'Proprietary self-evolving AI algorithm engine', leadTimeDays: 14, minimumOrderQuantity: 1 },
      { componentName: 'Real-time Correlation Engine', componentType: 'software', vendorName: 'CyberSecured AI', vendorPartNumber: 'RCE-2025', unitCost: 85000, description: 'Advanced threat correlation and analysis engine', leadTimeDays: 14, minimumOrderQuantity: 1 },
      { componentName: 'Holographic Rendering Framework', componentType: 'software', vendorName: 'CyberSecured AI', vendorPartNumber: 'HRF-5D-2025', unitCost: 95000, description: '5D holographic visualization rendering engine', leadTimeDays: 21, minimumOrderQuantity: 1 },
      { componentName: 'Swarm Coordination Protocol', componentType: 'software', vendorName: 'CyberSecured AI', vendorPartNumber: 'SCP-ACDS-2025', unitCost: 75000, description: 'Autonomous defense swarm coordination software', leadTimeDays: 14, minimumOrderQuantity: 1 },
      
      // Services Components
      { componentName: 'Senior Cybersecurity Engineer', componentType: 'labor', unitCost: 175, description: 'Senior-level cybersecurity engineering expertise', leadTimeDays: 1, minimumOrderQuantity: 40 },
      { componentName: 'Principal Security Architect', componentType: 'labor', unitCost: 250, description: 'Principal-level security architecture expertise', leadTimeDays: 1, minimumOrderQuantity: 40 },
      { componentName: 'Cybersecurity Analyst', componentType: 'labor', unitCost: 125, description: 'Cybersecurity analysis and monitoring expertise', leadTimeDays: 1, minimumOrderQuantity: 40 },
      { componentName: 'Penetration Testing Specialist', componentType: 'labor', unitCost: 200, description: 'Specialized penetration testing and ethical hacking', leadTimeDays: 1, minimumOrderQuantity: 8 },
      { componentName: 'Federal Compliance Specialist', componentType: 'labor', unitCost: 185, description: 'Federal compliance and RMF expertise', leadTimeDays: 1, minimumOrderQuantity: 40 },
      
      // Cloud Infrastructure
      { componentName: 'AWS GovCloud Compute', componentType: 'service', vendorName: 'Amazon Web Services', vendorPartNumber: 'EC2-GOV-XL', unitCost: 0.85, description: 'FedRAMP authorized cloud compute per hour', leadTimeDays: 1, minimumOrderQuantity: 1 },
      { componentName: 'Azure Government Storage', componentType: 'service', vendorName: 'Microsoft', vendorPartNumber: 'AZ-GOV-STG', unitCost: 0.12, description: 'Government cloud storage per GB/month', leadTimeDays: 1, minimumOrderQuantity: 1 },
      { componentName: 'FedRAMP Security Monitoring', componentType: 'service', vendorName: 'Splunk', vendorPartNumber: 'SPLUNK-GOV', unitCost: 15, description: 'Government-approved security monitoring per GB', leadTimeDays: 1, minimumOrderQuantity: 1 }
    ];

    const createdComponents = await Promise.all(
      bomComponents.map(comp => storage.createBomComponent(comp))
    );
    console.log(`✅ Created ${createdComponents.length} BOM components`);

    // ===== STEP 3: CREATE CORE PRODUCTS =====
    console.log('📦 Creating core products...');

    const coreProducts: InsertCatalogProduct[] = [
      {
        name: 'CyDEF Genetic Algorithm Engine',
        slug: 'cydef-genetic-algorithm-engine',
        productCode: 'CYDEF-GAE-2025',
        categoryId: createdCategories.find(c => c.slug === 'core-ai-systems')!.id,
        shortDescription: 'Revolutionary self-evolving AI cybersecurity system with genetic algorithm optimization',
        fullDescription: 'The CyDEF Genetic Algorithm Engine represents a breakthrough in autonomous cybersecurity. This self-evolving AI system continuously adapts and improves its threat detection capabilities through genetic algorithm optimization, learning from every security event to strengthen organizational defenses.',
        technicalSpecifications: {
          processors: 'Multi-GPU acceleration support',
          memory: '256GB RAM minimum',
          storage: '10TB NVMe SSD',
          networkThroughput: '100Gbps',
          powerConsumption: '2.5kW',
          dimensions: '4U rack mountable'
        },
        features: [
          'Self-evolving threat detection algorithms',
          'Real-time genetic optimization',
          'Federal compliance integration',
          'Advanced behavioral analysis',
          'Autonomous incident response',
          'Multi-vector threat correlation'
        ],
        developmentCost: 2850000,
        manufacturingCost: 425000,
        totalCostPrice: 485000,
        commercialSellPrice: 1275000,
        federalSellPrice: 1485000,
        gsaPrice: 1356750,
        commercialMarginPercent: 62.0,
        federalMarginPercent: 67.3,
        volumePricingTiers: [
          { quantity: 1, price: 1485000 },
          { quantity: 5, price: 1336500 },
          { quantity: 10, price: 1188000 },
          { quantity: 25, price: 1039500 }
        ],
        complianceFrameworks: ['FISMA', 'FedRAMP', 'NIST', 'DoD 8570'],
        securityCertifications: ['FIPS 140-2', 'Common Criteria EAL4+'],
        licenseModel: 'perpetual',
        deploymentModel: 'on-premise',
        supportLevel: 'enterprise',
        productStatus: 'active',
        releaseDate: new Date('2025-01-15')
      },
      {
        name: 'CypherHUM 5D Interface',
        slug: 'cypherhum-5d-interface',
        productCode: 'CHUM-5D-2025',
        categoryId: createdCategories.find(c => c.slug === 'visualization-platforms')!.id,
        shortDescription: 'Immersive 5D holographic cybersecurity visualization platform with live AI avatar',
        fullDescription: 'CypherHUM 5D Interface revolutionizes cybersecurity monitoring through immersive holographic visualization. This cutting-edge platform presents complex security data in an intuitive 5D environment, complete with an intelligent AI avatar that provides real-time analysis and recommendations.',
        technicalSpecifications: {
          display: '5D Holographic Projection System',
          resolution: '8K per eye, 120Hz refresh rate',
          fieldOfView: '360° immersive environment',
          tracking: 'Sub-millimeter precision hand tracking',
          audio: '3D spatial audio with haptic feedback',
          connectivity: '10GbE, WiFi 6E, Bluetooth 5.2'
        },
        features: [
          '5D holographic threat visualization',
          'Live AI avatar assistant',
          'Gesture-based interface control',
          'Real-time data manipulation',
          'Collaborative virtual environments',
          'Advanced threat correlation displays'
        ],
        developmentCost: 4200000,
        manufacturingCost: 785000,
        totalCostPrice: 865000,
        commercialSellPrice: 2275000,
        federalSellPrice: 2650000,
        gsaPrice: 2417500,
        commercialMarginPercent: 61.9,
        federalMarginPercent: 67.4,
        volumePricingTiers: [
          { quantity: 1, price: 2650000 },
          { quantity: 3, price: 2385000 },
          { quantity: 5, price: 2120000 },
          { quantity: 10, price: 1855000 }
        ],
        complianceFrameworks: ['FISMA', 'FedRAMP', 'NIST', 'DoD 8570'],
        securityCertifications: ['FIPS 140-2', 'Common Criteria EAL4+'],
        licenseModel: 'subscription',
        deploymentModel: 'hybrid',
        supportLevel: 'enterprise',
        productStatus: 'active',
        releaseDate: new Date('2025-03-01')
      },
      {
        name: 'Live Location Tracking System',
        slug: 'live-location-tracking-system',
        productCode: 'LLTS-2025',
        categoryId: createdCategories.find(c => c.slug === 'monitoring-systems')!.id,
        shortDescription: 'Real-time device and asset monitoring with comprehensive location intelligence',
        fullDescription: 'The Live Location Tracking System provides comprehensive real-time monitoring of devices, assets, and personnel across federal installations. This advanced platform combines GPS, cellular, WiFi, and Bluetooth technologies to deliver precise location intelligence with robust security features.',
        technicalSpecifications: {
          accuracy: 'Sub-meter indoor/outdoor positioning',
          coverage: 'Global GPS + indoor positioning',
          batteryLife: '5+ years on single charge',
          connectivity: '5G, LTE, WiFi 6, Bluetooth 5.2',
          sensors: 'Accelerometer, gyroscope, temperature, humidity',
          security: 'AES-256 encryption, secure boot'
        },
        features: [
          'Real-time location tracking',
          'Geofencing and alerts',
          'Historical movement analysis',
          'Asset inventory management',
          'Emergency response integration',
          'Compliance reporting'
        ],
        developmentCost: 1750000,
        manufacturingCost: 285000,
        totalCostPrice: 325000,
        commercialSellPrice: 855000,
        federalSellPrice: 995000,
        gsaPrice: 907750,
        commercialMarginPercent: 62.0,
        federalMarginPercent: 67.3,
        volumePricingTiers: [
          { quantity: 1, price: 995000 },
          { quantity: 10, price: 895500 },
          { quantity: 25, price: 796000 },
          { quantity: 50, price: 696500 }
        ],
        complianceFrameworks: ['FISMA', 'FedRAMP', 'NIST'],
        securityCertifications: ['FIPS 140-2'],
        licenseModel: 'subscription',
        deploymentModel: 'cloud',
        supportLevel: 'premium',
        productStatus: 'active',
        releaseDate: new Date('2025-02-01')
      },
      {
        name: 'ACDS Control Platform',
        slug: 'acds-control-platform',
        productCode: 'ACDS-CP-2025',
        categoryId: createdCategories.find(c => c.slug === 'defense-platforms')!.id,
        shortDescription: 'Autonomous Cyber Defense Swarm coordination and control platform',
        fullDescription: 'The ACDS Control Platform orchestrates autonomous cyber defense swarms to provide unprecedented protection against sophisticated threats. This revolutionary system coordinates multiple AI-driven defense nodes that work in concert to identify, isolate, and neutralize cyber threats in real-time.',
        technicalSpecifications: {
          nodeCapacity: 'Up to 10,000 coordinated defense nodes',
          responseTime: 'Sub-millisecond threat response',
          scalability: 'Elastic cloud-native architecture',
          coordination: 'Distributed consensus algorithms',
          intelligence: 'Federated learning across swarm',
          deployment: 'Multi-cloud, hybrid, on-premise'
        },
        features: [
          'Autonomous swarm coordination',
          'Real-time threat response',
          'Distributed intelligence sharing',
          'Self-healing network topology',
          'Advanced threat prediction',
          'Zero-trust architecture integration'
        ],
        developmentCost: 3650000,
        manufacturingCost: 645000,
        totalCostPrice: 715000,
        commercialSellPrice: 1875000,
        federalSellPrice: 2185000,
        gsaPrice: 1993750,
        commercialMarginPercent: 61.9,
        federalMarginPercent: 67.3,
        volumePricingTiers: [
          { quantity: 1, price: 2185000 },
          { quantity: 3, price: 1966500 },
          { quantity: 5, price: 1748000 },
          { quantity: 10, price: 1529500 }
        ],
        complianceFrameworks: ['FISMA', 'FedRAMP', 'NIST', 'DoD 8570', 'CMMC'],
        securityCertifications: ['FIPS 140-2', 'Common Criteria EAL4+'],
        licenseModel: 'subscription',
        deploymentModel: 'hybrid',
        supportLevel: 'enterprise',
        productStatus: 'active',
        releaseDate: new Date('2025-04-15')
      },
      {
        name: 'Unified Analytics Platform',
        slug: 'unified-analytics-platform',
        productCode: 'UAP-2025',
        categoryId: createdCategories.find(c => c.slug === 'analytics-engines')!.id,
        shortDescription: 'Cross-system intelligence correlation and advanced analytics engine',
        fullDescription: 'The Unified Analytics Platform provides comprehensive cross-system intelligence correlation, bringing together data from multiple security tools and systems to provide a unified view of organizational security posture. Advanced AI algorithms identify patterns and correlations across disparate data sources.',
        technicalSpecifications: {
          dataIngestion: '100TB/day processing capacity',
          correlationEngine: 'Real-time multi-source correlation',
          storage: 'Petabyte-scale data lake architecture',
          analytics: 'Machine learning and statistical analysis',
          visualization: 'Interactive dashboards and reports',
          integration: '500+ security tool connectors'
        },
        features: [
          'Cross-system data correlation',
          'Advanced threat analytics',
          'Predictive risk modeling',
          'Automated report generation',
          'Executive dashboard views',
          'Custom KPI tracking'
        ],
        developmentCost: 2950000,
        manufacturingCost: 485000,
        totalCostPrice: 535000,
        commercialSellPrice: 1405000,
        federalSellPrice: 1635000,
        gsaPrice: 1491750,
        commercialMarginPercent: 61.9,
        federalMarginPercent: 67.3,
        volumePricingTiers: [
          { quantity: 1, price: 1635000 },
          { quantity: 5, price: 1471500 },
          { quantity: 10, price: 1308000 },
          { quantity: 20, price: 1144500 }
        ],
        complianceFrameworks: ['FISMA', 'FedRAMP', 'NIST', 'SOX', 'GDPR'],
        securityCertifications: ['FIPS 140-2', 'ISO 27001'],
        licenseModel: 'subscription',
        deploymentModel: 'cloud',
        supportLevel: 'premium',
        productStatus: 'active',
        releaseDate: new Date('2025-01-30')
      }
    ];

    const createdProducts = await Promise.all(
      coreProducts.map(product => storage.createCatalogProduct(product))
    );
    console.log(`✅ Created ${createdProducts.length} core products`);

    // ===== STEP 4: CREATE FEDERAL SERVICES =====
    console.log('🛡️ Creating federal services...');

    const federalServices: InsertCatalogService[] = [
      {
        name: 'Seven-Step Risk Management Framework (RMF) Services',
        slug: 'seven-step-rmf-services',
        serviceCode: 'RMF-7STEP-2025',
        categoryId: createdCategories.find(c => c.slug === 'rmf-services')!.id,
        shortDescription: 'Comprehensive NIST RMF implementation and compliance services',
        fullDescription: 'Our Seven-Step RMF Services provide end-to-end implementation of the NIST Risk Management Framework, ensuring federal agencies achieve and maintain cybersecurity compliance while reducing risk exposure.',
        serviceType: 'professional',
        serviceDelivery: 'hybrid',
        requiredSkillLevel: 'expert',
        requiredCertifications: ['CISSP', 'CISA', 'CISM', 'Security+'],
        laborHours: {
          'Principal Security Architect': 120,
          'Senior RMF Specialist': 280,
          'Compliance Analyst': 160,
          'Technical Writer': 80
        },
        hourlyRate: 195,
        dailyRate: 1560,
        weeklyRate: 7800,
        monthlyRate: 31200,
        projectBasePrice: 485000,
        deliveryCost: 285000,
        commercialSellPrice: 750000,
        federalSellPrice: 825000,
        commercialMarginPercent: 62.0,
        federalMarginPercent: 65.5,
        slaCommitments: {
          'assessment_completion': '90 days',
          'documentation_delivery': '120 days',
          'ongoing_support': '24/7 availability'
        },
        responseTimeHours: 4,
        resolutionTimeHours: 24,
        availabilityPercent: 99.9,
        complianceFrameworks: ['NIST RMF', 'FISMA', 'FedRAMP'],
        clearanceLevel: 'secret'
      },
      {
        name: 'Information Assurance Services',
        slug: 'information-assurance-services',
        serviceCode: 'IAS-2025',
        categoryId: createdCategories.find(c => c.slug === 'information-assurance')!.id,
        shortDescription: 'Comprehensive information security and assurance consulting',
        fullDescription: 'Our Information Assurance Services provide comprehensive security consulting, risk assessment, and assurance programs to protect sensitive government information and ensure regulatory compliance.',
        serviceType: 'consulting',
        serviceDelivery: 'hybrid',
        requiredSkillLevel: 'expert',
        requiredCertifications: ['CISSP', 'CISA', 'CISM', 'CAP'],
        laborHours: {
          'IA Architect': 160,
          'Security Consultant': 320,
          'Risk Analyst': 200,
          'Compliance Specialist': 120
        },
        hourlyRate: 185,
        dailyRate: 1480,
        weeklyRate: 7400,
        monthlyRate: 29600,
        projectBasePrice: 395000,
        deliveryCost: 235000,
        commercialSellPrice: 620000,
        federalSellPrice: 695000,
        commercialMarginPercent: 62.1,
        federalMarginPercent: 66.2,
        slaCommitments: {
          'initial_assessment': '30 days',
          'remediation_plan': '45 days',
          'ongoing_monitoring': 'Monthly reports'
        },
        responseTimeHours: 2,
        resolutionTimeHours: 16,
        availabilityPercent: 99.5,
        complianceFrameworks: ['FISMA', 'NIST', 'ISO 27001'],
        clearanceLevel: 'public'
      },
      {
        name: 'Advanced Virus Detection & Threat Analytics',
        slug: 'virus-detection-threat-analytics',
        serviceCode: 'VDTA-2025',
        categoryId: createdCategories.find(c => c.slug === 'threat-analytics')!.id,
        shortDescription: 'AI-powered malware detection and advanced threat analysis services',
        fullDescription: 'Our Advanced Virus Detection & Threat Analytics services leverage cutting-edge AI and machine learning to detect, analyze, and respond to sophisticated malware and advanced persistent threats.',
        serviceType: 'managed',
        serviceDelivery: 'remote',
        requiredSkillLevel: 'expert',
        requiredCertifications: ['GCIH', 'GCFA', 'GNFA', 'CySA+'],
        laborHours: {
          'Malware Analyst': 160,
          'Threat Hunter': 240,
          'Incident Responder': 120,
          'SOC Analyst': 200
        },
        hourlyRate: 165,
        dailyRate: 1320,
        weeklyRate: 6600,
        monthlyRate: 26400,
        projectBasePrice: 285000,
        deliveryCost: 185000,
        commercialSellPrice: 485000,
        federalSellPrice: 545000,
        commercialMarginPercent: 61.9,
        federalMarginPercent: 66.1,
        slaCommitments: {
          'detection_time': '< 5 minutes',
          'analysis_completion': '< 2 hours',
          'threat_briefing': 'Daily reports'
        },
        responseTimeHours: 1,
        resolutionTimeHours: 4,
        availabilityPercent: 99.9,
        complianceFrameworks: ['NIST', 'FISMA'],
        clearanceLevel: 'public'
      },
      {
        name: 'Zero Trust Architecture Implementation',
        slug: 'zero-trust-architecture-implementation',
        serviceCode: 'ZTA-IMPL-2025',
        categoryId: createdCategories.find(c => c.slug === 'infrastructure-services')!.id,
        shortDescription: 'Complete Zero Trust architecture design and implementation',
        fullDescription: 'Our Zero Trust Architecture Implementation services provide comprehensive design, deployment, and management of Zero Trust security frameworks, ensuring secure access to resources regardless of location.',
        serviceType: 'professional',
        serviceDelivery: 'hybrid',
        requiredSkillLevel: 'architect',
        requiredCertifications: ['CISSP', 'SABSA', 'TOGAF', 'Security+'],
        laborHours: {
          'Security Architect': 200,
          'Network Engineer': 160,
          'Identity Specialist': 120,
          'Implementation Consultant': 240
        },
        hourlyRate: 225,
        dailyRate: 1800,
        weeklyRate: 9000,
        monthlyRate: 36000,
        projectBasePrice: 685000,
        deliveryCost: 425000,
        commercialSellPrice: 1115000,
        federalSellPrice: 1255000,
        commercialMarginPercent: 61.9,
        federalMarginPercent: 66.1,
        slaCommitments: {
          'architecture_design': '60 days',
          'implementation_phase1': '90 days',
          'full_deployment': '180 days'
        },
        responseTimeHours: 4,
        resolutionTimeHours: 24,
        availabilityPercent: 99.5,
        complianceFrameworks: ['NIST', 'FISMA', 'CMMC'],
        clearanceLevel: 'secret'
      },
      {
        name: 'Network Management & Monitoring',
        slug: 'network-management-monitoring',
        serviceCode: 'NMM-2025',
        categoryId: createdCategories.find(c => c.slug === 'infrastructure-services')!.id,
        shortDescription: '24/7 network infrastructure management and security monitoring',
        fullDescription: 'Comprehensive network management and monitoring services providing 24/7 oversight of network infrastructure, performance optimization, and security event monitoring for federal networks.',
        serviceType: 'managed',
        serviceDelivery: 'remote',
        requiredSkillLevel: 'senior',
        requiredCertifications: ['CCNP Security', 'GCIH', 'Network+'],
        laborHours: {
          'Network Security Engineer': 160,
          'NOC Analyst': 240,
          'Systems Administrator': 120,
          'Performance Analyst': 80
        },
        hourlyRate: 145,
        dailyRate: 1160,
        weeklyRate: 5800,
        monthlyRate: 23200,
        projectBasePrice: 195000,
        deliveryCost: 125000,
        commercialSellPrice: 325000,
        federalSellPrice: 375000,
        commercialMarginPercent: 61.5,
        federalMarginPercent: 66.7,
        slaCommitments: {
          'uptime_guarantee': '99.9%',
          'incident_response': '< 15 minutes',
          'performance_reports': 'Weekly'
        },
        responseTimeHours: 1,
        resolutionTimeHours: 8,
        availabilityPercent: 99.9,
        complianceFrameworks: ['NIST', 'FISMA'],
        clearanceLevel: 'public'
      },
      {
        name: 'Security Operations Center (SOC) Services',
        slug: 'soc-services',
        serviceCode: 'SOC-MNG-2025',
        categoryId: createdCategories.find(c => c.slug === 'soc-services')!.id,
        shortDescription: 'Comprehensive managed SOC services with 24/7/365 monitoring',
        fullDescription: 'Our SOC Services provide around-the-clock security monitoring, incident detection, analysis, and response for federal agencies. Our team of certified analysts monitors your environment using advanced SIEM tools and threat intelligence.',
        serviceType: 'managed',
        serviceDelivery: 'remote',
        requiredSkillLevel: 'senior',
        requiredCertifications: ['GCIH', 'GCFA', 'CySA+', 'GSEC'],
        laborHours: {
          'SOC Manager': 40,
          'Senior SOC Analyst': 120,
          'SOC Analyst': 200,
          'Incident Handler': 80,
          'Threat Hunter': 60
        },
        hourlyRate: 155,
        dailyRate: 1240,
        weeklyRate: 6200,
        monthlyRate: 24800,
        projectBasePrice: 425000,
        deliveryCost: 265000,
        commercialSellPrice: 685000,
        federalSellPrice: 785000,
        commercialMarginPercent: 61.3,
        federalMarginPercent: 66.2,
        slaCommitments: {
          'monitoring_coverage': '24/7/365',
          'alert_response': '< 5 minutes',
          'incident_escalation': '< 30 minutes',
          'monthly_reports': 'Executive and technical'
        },
        responseTimeHours: 1,
        resolutionTimeHours: 4,
        availabilityPercent: 99.9,
        complianceFrameworks: ['NIST', 'FISMA', 'SOC 2'],
        clearanceLevel: 'secret'
      }
    ];

    // Create HACS services
    const hacsServices: InsertCatalogService[] = [
      {
        name: 'High Value Asset Assessment',
        slug: 'high-value-asset-assessment',
        serviceCode: 'HVAA-2025',
        categoryId: createdCategories.find(c => c.slug === 'hacs-services')!.id,
        shortDescription: 'Comprehensive security assessment of high-value organizational assets',
        fullDescription: 'Specialized assessment services for high-value assets including critical systems, sensitive data repositories, and mission-critical infrastructure with detailed risk analysis and remediation recommendations.',
        serviceType: 'professional',
        serviceDelivery: 'on-site',
        requiredSkillLevel: 'expert',
        requiredCertifications: ['CISSP', 'CISA', 'CEH', 'OSCP'],
        laborHours: {
          'Lead Security Assessor': 80,
          'Technical Assessor': 160,
          'Risk Analyst': 120,
          'Report Writer': 40
        },
        hourlyRate: 245,
        dailyRate: 1960,
        weeklyRate: 9800,
        monthlyRate: 39200,
        projectBasePrice: 185000,
        deliveryCost: 115000,
        commercialSellPrice: 295000,
        federalSellPrice: 325000,
        commercialMarginPercent: 61.0,
        federalMarginPercent: 64.6,
        slaCommitments: {
          'assessment_duration': '2-4 weeks',
          'report_delivery': '10 business days',
          'executive_briefing': 'Included'
        },
        responseTimeHours: 24,
        resolutionTimeHours: 72,
        availabilityPercent: 99.0,
        complianceFrameworks: ['NIST', 'FISMA', 'ISO 27001'],
        clearanceLevel: 'secret'
      },
      {
        name: 'Penetration Testing Services',
        slug: 'penetration-testing-services',
        serviceCode: 'PENTEST-2025',
        categoryId: createdCategories.find(c => c.slug === 'hacs-services')!.id,
        shortDescription: 'Advanced penetration testing and vulnerability assessment',
        fullDescription: 'Comprehensive penetration testing services including network, web application, wireless, and social engineering assessments conducted by certified ethical hackers.',
        serviceType: 'professional',
        serviceDelivery: 'hybrid',
        requiredSkillLevel: 'expert',
        requiredCertifications: ['OSCP', 'CEH', 'GPEN', 'CISSP'],
        laborHours: {
          'Lead Penetration Tester': 120,
          'Senior Pentester': 160,
          'Web App Specialist': 80,
          'Social Engineer': 40
        },
        hourlyRate: 275,
        dailyRate: 2200,
        weeklyRate: 11000,
        monthlyRate: 44000,
        projectBasePrice: 145000,
        deliveryCost: 89000,
        commercialSellPrice: 235000,
        federalSellPrice: 265000,
        commercialMarginPercent: 62.1,
        federalMarginPercent: 66.4,
        slaCommitments: {
          'testing_duration': '1-3 weeks',
          'preliminary_findings': '48 hours',
          'final_report': '5 business days'
        },
        responseTimeHours: 24,
        resolutionTimeHours: 48,
        availabilityPercent: 99.0,
        complianceFrameworks: ['NIST', 'OWASP', 'PTES'],
        clearanceLevel: 'secret'
      },
      {
        name: 'Cyber Hunt Operations',
        slug: 'cyber-hunt-operations',
        serviceCode: 'HUNT-OPS-2025',
        categoryId: createdCategories.find(c => c.slug === 'hacs-services')!.id,
        shortDescription: 'Proactive threat hunting and advanced persistent threat detection',
        fullDescription: 'Advanced threat hunting services using cutting-edge tools and techniques to proactively identify and eliminate sophisticated threats that have evaded traditional security controls.',
        serviceType: 'managed',
        serviceDelivery: 'remote',
        requiredSkillLevel: 'expert',
        requiredCertifications: ['GCTH', 'GCFA', 'GNFA', 'CISSP'],
        laborHours: {
          'Lead Threat Hunter': 120,
          'Senior Threat Analyst': 200,
          'Digital Forensics Expert': 80,
          'Malware Analyst': 100
        },
        hourlyRate: 265,
        dailyRate: 2120,
        weeklyRate: 10600,
        monthlyRate: 42400,
        projectBasePrice: 325000,
        deliveryCost: 205000,
        commercialSellPrice: 535000,
        federalSellPrice: 595000,
        commercialMarginPercent: 61.7,
        federalMarginPercent: 65.5,
        slaCommitments: {
          'hunt_missions': 'Weekly campaigns',
          'threat_briefings': 'Bi-weekly reports',
          'ioc_sharing': 'Real-time feeds'
        },
        responseTimeHours: 2,
        resolutionTimeHours: 8,
        availabilityPercent: 99.5,
        complianceFrameworks: ['NIST', 'MITRE ATT&CK'],
        clearanceLevel: 'secret'
      },
      {
        name: 'Incident Handling & Event Management (IHEM)',
        slug: 'incident-handling-event-management',
        serviceCode: 'IHEM-2025',
        categoryId: createdCategories.find(c => c.slug === 'hacs-services')!.id,
        shortDescription: 'Comprehensive incident response and security event management',
        fullDescription: 'Full-spectrum incident handling and event management services providing rapid response to security incidents, forensic analysis, and coordinated remediation efforts.',
        serviceType: 'managed',
        serviceDelivery: 'hybrid',
        requiredSkillLevel: 'expert',
        requiredCertifications: ['GCIH', 'GCFA', 'CISSP', 'CISM'],
        laborHours: {
          'Incident Commander': 40,
          'Senior Incident Handler': 120,
          'Forensics Analyst': 80,
          'Communications Specialist': 40,
          'Recovery Specialist': 80
        },
        hourlyRate: 235,
        dailyRate: 1880,
        weeklyRate: 9400,
        monthlyRate: 37600,
        projectBasePrice: 285000,
        deliveryCost: 175000,
        commercialSellPrice: 465000,
        federalSellPrice: 525000,
        commercialMarginPercent: 62.4,
        federalMarginPercent: 66.7,
        slaCommitments: {
          'initial_response': '< 30 minutes',
          'containment': '< 2 hours',
          'recovery_plan': '< 8 hours',
          'lessons_learned': '< 48 hours'
        },
        responseTimeHours: 1,
        resolutionTimeHours: 4,
        availabilityPercent: 99.9,
        complianceFrameworks: ['NIST', 'FISMA', 'SANS'],
        clearanceLevel: 'secret'
      }
    ];

    const allServices = [...federalServices, ...hacsServices];
    const createdServices = await Promise.all(
      allServices.map(service => storage.createCatalogService(service))
    );
    console.log(`✅ Created ${createdServices.length} services`);

    // ===== STEP 5: CREATE INTEGRATED SOLUTIONS =====
    console.log('🔧 Creating integrated solutions...');

    const integratedSolutions: InsertCatalogSolution[] = [
      {
        name: 'Federal Enterprise Security Suite',
        slug: 'federal-enterprise-security-suite',
        solutionCode: 'FESS-2025',
        categoryId: createdCategories.find(c => c.slug === 'federal-enterprise')!.id,
        shortDescription: 'Complete federal agency cybersecurity solution with AI-powered protection',
        fullDescription: 'Comprehensive cybersecurity solution designed specifically for federal agencies, combining our core AI products with professional services to deliver end-to-end protection, compliance, and threat response capabilities.',
        solutionType: 'enterprise',
        targetAudience: 'federal',
        deploymentSize: 'large',
        implementationPeriodMonths: 12,
        onboardingIncluded: true,
        trainingIncluded: true,
        migrationSupport: true,
        totalSolutionCost: 4850000,
        commercialSellPrice: 7850000,
        federalSellPrice: 8950000,
        bundleDiscountPercent: 15.0,
        minimumContractMonths: 36,
        maximumContractMonths: 60,
        autoRenewal: true,
        yearOnePrice: 8950000,
        yearTwoPrice: 8055000,
        yearThreePrice: 7607500,
        enterpriseLicenseTerms: {
          'unlimited_users': true,
          'multi_site_deployment': true,
          'custom_integrations': true,
          'priority_support': true
        },
        scalabilityOptions: {
          'additional_sites': 'Available',
          'user_scaling': 'Elastic',
          'performance_tiers': 'Configurable'
        },
        customizationLevel: 'full',
        supportLevel: 'enterprise',
        maintenanceIncluded: true,
        upgradePolicy: 'Automatic updates included with maintenance'
      },
      {
        name: 'K-12 Education Security Package',
        slug: 'k12-education-security-package',
        solutionCode: 'K12-ESP-2025',
        categoryId: createdCategories.find(c => c.slug === 'educational-institutions')!.id,
        shortDescription: 'FERPA-compliant cybersecurity solution for K-12 school districts',
        fullDescription: 'Tailored cybersecurity solution for K-12 educational institutions providing FERPA compliance, student data protection, and age-appropriate security controls while maintaining educational technology accessibility.',
        solutionType: 'bundled',
        targetAudience: 'education',
        deploymentSize: 'medium',
        implementationPeriodMonths: 6,
        onboardingIncluded: true,
        trainingIncluded: true,
        migrationSupport: true,
        totalSolutionCost: 1850000,
        commercialSellPrice: 2950000,
        federalSellPrice: 3250000,
        bundleDiscountPercent: 20.0,
        minimumContractMonths: 24,
        maximumContractMonths: 48,
        autoRenewal: true,
        yearOnePrice: 3250000,
        yearTwoPrice: 2925000,
        yearThreePrice: 2762500,
        enterpriseLicenseTerms: {
          'district_wide_coverage': true,
          'student_data_protection': true,
          'teacher_training': true,
          'parent_portal_access': true
        },
        scalabilityOptions: {
          'additional_schools': 'Available',
          'student_growth': 'Automatic scaling',
          'seasonal_adjustments': 'Included'
        },
        customizationLevel: 'enhanced',
        supportLevel: 'premium',
        maintenanceIncluded: true,
        upgradePolicy: 'Scheduled updates during school breaks'
      },
      {
        name: 'Higher Education Research Security Platform',
        slug: 'higher-education-research-security',
        solutionCode: 'HE-RSP-2025',
        categoryId: createdCategories.find(c => c.slug === 'educational-institutions')!.id,
        shortDescription: 'Advanced security platform for university research and academic environments',
        fullDescription: 'Sophisticated cybersecurity platform designed for higher education institutions, protecting valuable research data, intellectual property, and sensitive academic information while enabling collaborative research environments.',
        solutionType: 'integrated',
        targetAudience: 'education',
        deploymentSize: 'large',
        implementationPeriodMonths: 9,
        onboardingIncluded: true,
        trainingIncluded: true,
        migrationSupport: true,
        totalSolutionCost: 3250000,
        commercialSellPrice: 5150000,
        federalSellPrice: 5750000,
        bundleDiscountPercent: 18.0,
        minimumContractMonths: 36,
        maximumContractMonths: 60,
        autoRenewal: true,
        yearOnePrice: 5750000,
        yearTwoPrice: 5175000,
        yearThreePrice: 4887500,
        enterpriseLicenseTerms: {
          'campus_wide_deployment': true,
          'research_data_protection': true,
          'collaboration_tools': true,
          'grant_compliance': true
        },
        scalabilityOptions: {
          'multi_campus': 'Available',
          'research_scaling': 'Dynamic',
          'international_collaboration': 'Supported'
        },
        customizationLevel: 'full',
        supportLevel: 'enterprise',
        maintenanceIncluded: true,
        upgradePolicy: 'Continuous updates with testing environment'
      },
      {
        name: 'Critical Infrastructure Protection Suite',
        slug: 'critical-infrastructure-protection-suite',
        solutionCode: 'CIPS-2025',
        categoryId: createdCategories.find(c => c.slug === 'critical-infrastructure')!.id,
        shortDescription: 'Comprehensive protection for critical infrastructure and industrial systems',
        fullDescription: 'Advanced cybersecurity solution designed to protect critical infrastructure including power grids, water systems, transportation networks, and other essential services from sophisticated cyber threats.',
        solutionType: 'enterprise',
        targetAudience: 'federal',
        deploymentSize: 'enterprise',
        implementationPeriodMonths: 18,
        onboardingIncluded: true,
        trainingIncluded: true,
        migrationSupport: true,
        totalSolutionCost: 6850000,
        commercialSellPrice: 11250000,
        federalSellPrice: 12750000,
        bundleDiscountPercent: 12.0,
        minimumContractMonths: 60,
        maximumContractMonths: 120,
        autoRenewal: true,
        yearOnePrice: 12750000,
        yearTwoPrice: 11475000,
        yearThreePrice: 10837500,
        enterpriseLicenseTerms: {
          'multi_facility_coverage': true,
          'industrial_controls_protection': true,
          'regulatory_compliance': true,
          'emergency_response': true
        },
        scalabilityOptions: {
          'geographical_expansion': 'Available',
          'capacity_scaling': 'Unlimited',
          'redundancy_options': 'Full failover'
        },
        customizationLevel: 'full',
        supportLevel: 'enterprise',
        maintenanceIncluded: true,
        upgradePolicy: 'Zero-downtime updates with redundant systems'
      }
    ];

    const createdSolutions = await Promise.all(
      integratedSolutions.map(solution => storage.createCatalogSolution(solution))
    );
    console.log(`✅ Created ${createdSolutions.length} integrated solutions`);

    console.log('🎉 CyberSecured AI Catalog seeding completed successfully!');
    console.log(`📊 Summary: ${createdCategories.length} categories, ${createdComponents.length} components, ${createdProducts.length} products, ${createdServices.length} services, ${createdSolutions.length} solutions`);

    return {
      categories: createdCategories,
      components: createdComponents,
      products: createdProducts,
      services: createdServices,
      solutions: createdSolutions
    };

  } catch (error) {
    console.error('❌ Failed to seed catalog data:', error);
    throw error;
  }
}

// Export for use in other modules
export default seedCatalogData;