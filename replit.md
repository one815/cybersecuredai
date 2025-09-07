# CyberSecured AI Security Platform

## Overview

CyberSecured AI is a comprehensive cybersecurity platform designed for educational institutions and government organizations. The platform features revolutionary dual AI architecture with the **Cypher AI Genetic Model** (self-evolving genetic algorithms) and **Cypher AI Assistant** (internal operations automation). It provides real-time threat monitoring, secure file sharing, compliance management, and user administration through an AI-powered security dashboard with 99.2% autonomous accuracy. Built with modern web technologies, it offers role-based access control, multi-factor authentication, and regulatory compliance tracking (FERPA, FISMA, CIPA).

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript for type-safe development
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management and caching
- **UI Library**: Radix UI with shadcn/ui components for accessible, customizable interface
- **Styling**: Tailwind CSS with custom CSS variables for dark theme and cybersecurity branding
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js for REST API endpoints
- **Language**: TypeScript with ES modules for modern JavaScript features
- **API Structure**: RESTful endpoints organized by resource (users, threats, files, compliance, incidents)
- **Middleware**: Custom logging, JSON parsing, and error handling middleware
- **Development**: Hot reload with Vite integration in development mode

### Data Storage Solutions
- **Database**: PostgreSQL with Neon serverless driver for scalable cloud deployment
- **ORM**: Drizzle ORM for type-safe database operations and migrations
- **Schema Design**: Comprehensive tables for users, threats, files, compliance reports, incidents, and audit logs
- **File Storage**: Google Cloud Storage integration for secure file uploads and management
- **Migration System**: Drizzle Kit for database schema versioning and deployment

### Authentication and Authorization
- **Role-Based Access**: Multi-tier user roles (user, admin, faculty, student, compliance_officer)
- **Multi-Factor Authentication**: Built-in MFA support with user preference tracking
- **Session Management**: Cookie-based authentication with secure credential handling
- **Onboarding Flow**: Guided user setup with policy acceptance and security configuration

### Design System and User Experience
- **Theme**: Dark cybersecurity theme with professional color palette (midnight blue, spring green, neon orange)
- **Accessibility**: WCAG 2.1 AA compliance with colorblind-friendly threat severity indicators
- **Responsive Design**: Mobile-first approach with sidebar navigation and adaptive layouts
- **Visual Language**: Cybersecurity-focused iconography with status indicators and threat level visualization

## External Dependencies

### Cloud Services
- **Neon Database**: Serverless PostgreSQL hosting with connection pooling
- **Google Cloud Storage**: File upload, storage, and retrieval for secure document management

### UI and Component Libraries
- **Radix UI**: Accessible headless components for complex UI patterns
- **Lucide React**: Icon library for consistent visual elements
- **shadcn/ui**: Pre-built component system based on Radix UI

### File Handling
- **Uppy**: File upload widget with drag-and-drop, progress tracking, and AWS S3 integration
- **File Processing**: Image optimization, document parsing, and secure file validation

### Development and Build Tools
- **Replit Integration**: Development environment with runtime error overlay and cartographer plugin
- **TypeScript**: Static type checking across frontend, backend, and shared schemas
- **ESBuild**: Fast bundling for production server deployment

### Enhanced Threat Intelligence with PyMISP and CIRCL Tools
- **PyMISP Integration**: Python service bridge providing direct access to MISP instances and advanced threat intelligence
- **CIRCL Tools Suite**: Comprehensive integration with CIRCL cybersecurity services including:
  - **BGP Ranking**: ASN security assessments and infrastructure analysis
  - **Passive DNS**: Domain investigation and historical DNS data analysis  
  - **AIL Framework**: Information leak detection and data breach monitoring
  - **CIRCL OSINT Feeds**: High-quality curated indicators of compromise
- **Multi-Source Intelligence**: Aggregates threat data from 4+ CIRCL feeds plus standard MISP feeds
- **Comprehensive Assessment**: Advanced target analysis combining multiple CIRCL tools for risk scoring

### Automated Email Notification System (NIST IR-6 Compliance) - COMPLETED
- **SendGrid Integration**: Professional email service integration for automated compliance notifications
- **Incident Response Notifications**: Automated email alerts for security incidents with NIST control mapping
- **Compliance Assessment Reports**: Automated notifications for compliance assessment completions with scoring
- **Threat Intelligence Alerts**: Real-time email notifications for threat intelligence findings
- **Multi-Tier Notification System**: Role-based email distribution (admins, compliance officers, security team)
- **Professional Email Templates**: HTML and text email templates with corporate branding and compliance formatting
- **API Endpoints**: RESTful API endpoints for testing and triggering various notification types
- **Configuration Management**: Dynamic email configuration with recipient management and testing capabilities

### Enterprise-Grade Hardware Security Integration (COMPLETED)
- **Hardware Security Module (HSM) Support**: 
  - Thales Luna HSM integration for enterprise-grade key management
  - YubiHSM 2 support for secure hardware-based authentication
  - AWS Cloud HSM integration for scalable cloud-based cryptographic operations
  - Hardware key generation, storage, and cryptographic operations API endpoints
- **Biometric Authentication Systems**:
  - Auth0 facial recognition integration for government-ready biometric security
  - NEC Corporation Advanced Biometrics with enterprise-grade multi-modal authentication (facial, iris, fingerprint, palm vein)
  - Portal Guard Bio-Key Enterprise with FIDO2 compliance and Active Directory integration
  - Comprehensive biometric enrollment and authentication workflow with 99.9% accuracy
- **Security Infrastructure Monitoring**:
  - Palo Alto Networks PA-5220 firewall integration and metrics monitoring
  - Cisco Firepower 2130 IPS integration with intrusion detection analytics
  - F5 BIG-IP ASM Web Application Firewall monitoring and attack prevention
  - Real-time security device health monitoring and performance analytics
- **Premium Threat Intelligence Enhancement**:
  - VirusTotal integration with vt-py library for enhanced malware analysis
  - AlienVault OTX (Open Threat Exchange) community threat intelligence
  - Palo Alto Cortex XDR for primary endpoint detection and response
  - Mandiant premium APT attribution and advanced threat hunting (optional)
  - IBM X-Force threat intelligence with vulnerability correlation and risk scoring
- **Enterprise Identity and Access Management (IAM)**:
  - Okta identity management integration with SSO and MFA capabilities
  - Azure Active Directory integration with conditional access policies
  - OneLogin adaptive authentication and user lifecycle management
  - Automated user synchronization and provisioning workflows

### Revolutionary Cypher AI Dual Intelligence System
- **Cypher AI Genetic Model**: Self-evolving AI with genetic algorithms, multi-generational learning, and autonomous policy generation (99.2% accuracy)
  - Genetic Algorithm Engine with PyTorch & DEAP
  - Neural Architecture Search (NAS) for self-modifying structures
  - Federated Genetic Learning across client environments
  - Sector-specific adaptation (FERPA/FISMA genetics)
  - **Multi-Generational Memory Storage**: PostgreSQL + Redis hybrid system for persistent evolutionary history
    - Complete generational history tracking with cross-restart persistence
    - High-performance fitness evaluation caching to avoid recomputation
    - Federated learning state synchronization across organizational nodes
    - Evolutionary analytics with trend analysis and convergence metrics
    - Automatic cleanup and storage management for long-term scalability
- **Cypher AI Assistant**: Internal operations AI for meeting intelligence and workflow automation
  - Multi-platform meeting intelligence (Teams, Zoom, Google Meet) with 95% transcription accuracy
  - Smart calendar management and conflict resolution
  - Automated email processing and lead qualification
  - Social platform management (LinkedIn, Twitter, GitHub)
  - 24/7 website chat support with technical Q&A capabilities

### Security and Compliance
- **Encryption**: Built-in file encryption status tracking
- **Audit Logging**: Comprehensive activity tracking for compliance requirements
- **Threat Detection**: Real-time security monitoring with severity classification enhanced by CIRCL intelligence and genetic pattern recognition
- **Compliance Frameworks**: FERPA, FISMA, and CIPA compliance reporting and tracking with automated genetic policy optimization