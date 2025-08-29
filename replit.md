# CyberSecure AI Security Platform

## Overview

CyberSecure AI is a comprehensive cybersecurity platform designed for educational institutions and government organizations. The platform provides real-time threat monitoring, secure file sharing, compliance management, and user administration through an AI-powered security dashboard. Built with modern web technologies, it offers role-based access control, multi-factor authentication, and regulatory compliance tracking (FERPA, FISMA, CIPA).

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

### Security and Compliance
- **Encryption**: Built-in file encryption status tracking
- **Audit Logging**: Comprehensive activity tracking for compliance requirements
- **Threat Detection**: Real-time security monitoring with severity classification enhanced by CIRCL intelligence
- **Compliance Frameworks**: FERPA, FISMA, and CIPA compliance reporting and tracking