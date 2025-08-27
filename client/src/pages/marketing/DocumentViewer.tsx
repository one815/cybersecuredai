import { useParams } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  FileText, 
  Calendar, 
  Eye, 
  ArrowLeft,
  ExternalLink
} from "lucide-react";
import { MarketingLayout } from "@/components/MarketingLayout";
import { Link } from "wouter";

const documentDatabase = {
  // Success Kits
  'federal-ai-security-compliance-kit': {
    type: 'success-kit',
    title: 'Federal AI Security Compliance Kit',
    description: 'Complete FISMA compliance templates with step-by-step implementation guides and FedRAMP certification preparation materials.',
    pages: '150+',
    downloadCount: '2,400',
    publishDate: '2025-01-15',
    authors: 'CyberSecure AI Compliance Team',
    downloadUrl: '/marketing/documents/success-kits/federal-ai-security-compliance-kit.pdf',
    previewContent: 'Complete FISMA compliance templates and implementation guides for federal agencies.'
  },
  'national-security-ai-protection-kit': {
    type: 'success-kit',
    title: 'National Security AI Protection Kit',
    description: 'Classified data handling procedures with multi-level security protocols and compartmentalized access control frameworks.',
    pages: '200+',
    downloadCount: '1,800',
    publishDate: '2025-01-15',
    authors: 'CyberSecure AI National Security Team',
    downloadUrl: '/marketing/documents/success-kits/national-security-ai-protection-kit.pdf',
    previewContent: 'Classified data handling procedures and multi-level security protocols.'
  },
  
  // Handbooks
  'the-definitive-ai-security-handbook': {
    type: 'handbook',
    title: 'The Definitive AI Security Handbook',
    description: 'Strategies, tools, and techniques for protecting intelligent systems',
    pages: '300+',
    version: '2025 Edition',
    downloadCount: '8,900',
    publishDate: '2025-01-15',
    authors: 'CyberSecure AI Research Team',
    downloadUrl: '/marketing/documents/handbooks/the-definitive-ai-security-handbook.pdf',
    previewContent: `
      This comprehensive handbook covers:
      
      Chapter 1: AI Security Fundamentals
      - Understanding AI threat landscapes
      - Risk assessment methodologies
      - Security architecture principles
      
      Chapter 2: Implementation Strategies
      - Secure development practices
      - Infrastructure hardening
      - Monitoring and detection
      
      Chapter 3: Compliance and Governance
      - Regulatory frameworks
      - Policy development
      - Audit requirements
    `
  },
  'zero-trust-security-implementation-guide': {
    type: 'handbook',
    title: 'Zero Trust Security Implementation Guide',
    description: 'Complete implementation guide for zero trust architecture in educational and government environments.',
    pages: '220+',
    version: '2025 Edition',
    downloadCount: '5,600',
    publishDate: '2025-01-15',
    authors: 'CyberSecure AI Architecture Team',
    downloadUrl: '/marketing/documents/handbooks/zero-trust-security-implementation-guide.pdf',
    previewContent: 'Complete implementation guide for zero trust architecture in educational and government environments.'
  },
  
  // White Papers
  'quantifying-ai-security-roi-metrics-and-measurement-frameworks': {
    type: 'whitepaper',
    title: 'Quantifying AI Security ROI: Metrics and Measurement Frameworks',
    description: 'Comprehensive framework for measuring and demonstrating AI security value',
    pages: '45',
    downloadType: 'PDF',
    downloadCount: '3,200',
    publishDate: '2025-01-15',
    authors: 'CyberSecure AI Research Team',
    downloadUrl: '/marketing/documents/white-papers/quantifying-ai-security-roi.pdf',
    previewContent: `
      Executive Summary:
      Organizations investing in AI security need clear metrics to demonstrate ROI and justify continued investment.
      This paper presents a comprehensive framework for measuring AI security value.
      
      Key Topics Covered:
      - Financial impact measurement
      - Risk reduction quantification
      - Operational efficiency gains
      - Compliance cost avoidance
    `
  },
  
  // EBooks
  'federal-ai-security-compliance-guide-fisma-fedramp': {
    type: 'ebook',
    title: 'Federal AI Security Compliance Guide: FISMA & FedRAMP',
    description: 'Comprehensive guide for federal agencies implementing AI security solutions under FISMA and FedRAMP.',
    pages: '160',
    downloadCount: '3,800',
    publishDate: '2025-01-15',
    authors: 'CyberSecure AI Federal Compliance Team',
    downloadUrl: '/marketing/documents/ebooks/federal-ai-security-compliance-guide-fisma-fedramp.pdf',
    previewContent: 'Comprehensive guide for federal agencies implementing AI security solutions under FISMA and FedRAMP.'
  },
  'complete-guide-to-university-ai-security-research-protection': {
    type: 'ebook',
    title: 'Complete Guide to University AI Security: Research Protection',
    description: 'Comprehensive 195-page guide covering all aspects of AI security for educational institutions.',
    pages: '195',
    downloadCount: '5,400',
    publishDate: '2025-01-15',
    authors: 'CyberSecure AI Education Team',
    downloadUrl: '/marketing/documents/ebooks/complete-guide-to-university-ai-security-research-protection.pdf',
    previewContent: 'Comprehensive 195-page guide covering all aspects of AI security for educational institutions.'
  },
  
  // Use Cases
  'federal-agency-threat-detection-enhancement': {
    type: 'use-case',
    title: 'Federal Agency Threat Detection Enhancement',
    description: 'Advanced AI algorithms identifying sophisticated attack patterns with 99.7% accuracy in federal environments.',
    pages: '25',
    downloadCount: '2,100',
    publishDate: '2025-01-15',
    authors: 'CyberSecure AI Federal Solutions Team',
    downloadUrl: '/marketing/documents/use-cases/federal-agency-threat-detection-enhancement.pdf',
    previewContent: 'Advanced AI algorithms identifying sophisticated attack patterns with 99.7% accuracy in federal environments.'
  }
};

export default function DocumentViewer() {
  const params = useParams();
  const documentSlug = params.document;
  const document = documentDatabase[documentSlug as keyof typeof documentDatabase];
  
  if (!document) {
    return (
      <MarketingLayout>
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <Card className="bg-gray-800 border-gray-700 p-8 text-center">
            <CardHeader>
              <CardTitle className="text-red-400">Document Not Found</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">The requested document could not be found.</p>
              <Link href="/resources">
                <Button variant="outline" className="border-cyan-400 text-cyan-400">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Resources
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </MarketingLayout>
    );
  }
  
  return (
    <MarketingLayout>
      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900 via-blue-900/20 to-cyan-900/20 py-16">
          <div className="container mx-auto px-4">
            <Link href="/resources">
              <Button variant="outline" className="mb-6 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Resources
              </Button>
            </Link>
            
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <Badge className="mb-4 bg-cyan-600 text-white">
                  {document.type === 'handbook' ? 'Handbook' : 'White Paper'}
                </Badge>
                <h1 className="text-4xl font-bold text-white mb-4">{document.title}</h1>
                <p className="text-xl text-gray-300 mb-6">{document.description}</p>
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                  <div className="flex items-center">
                    <FileText className="w-4 h-4 mr-1" />
                    {document.pages} pages
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(document.publishDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <Download className="w-4 h-4 mr-1" />
                    {document.downloadCount} downloads
                  </div>
                </div>
              </div>
              
              <div className="ml-8">
                <Button 
                  className="bg-cyan-600 hover:bg-cyan-700 text-white"
                  onClick={() => window.open(document.downloadUrl, '_blank')}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Document Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-invert max-w-none">
                    <pre className="whitespace-pre-wrap text-gray-300 font-sans">
                      {document.previewContent}
                    </pre>
                  </div>
                  
                  <div className="mt-8 p-4 bg-gray-700 rounded-lg">
                    <p className="text-gray-300 text-sm">
                      This is a preview of the full document. Download the complete PDF to access all content, 
                      charts, diagrams, and detailed implementation guides.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Sidebar */}
            <div>
              <Card className="bg-gray-800 border-gray-700 mb-6">
                <CardHeader>
                  <CardTitle className="text-white">Document Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="text-gray-400 text-sm">Author(s)</div>
                      <div className="text-white">{document.authors}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Version</div>
                      <div className="text-white">{'version' in document ? document.version : 'Latest'}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Format</div>
                      <div className="text-white">PDF</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">File Size</div>
                      <div className="text-white">~15 MB</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Related Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Link href="/webinars">
                      <Button variant="outline" className="w-full justify-start border-gray-600 text-gray-300 hover:border-cyan-400 hover:text-cyan-400">
                        <Eye className="w-4 h-4 mr-2" />
                        Related Webinars
                      </Button>
                    </Link>
                    <Link href="/courses">
                      <Button variant="outline" className="w-full justify-start border-gray-600 text-gray-300 hover:border-cyan-400 hover:text-cyan-400">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Training Courses
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MarketingLayout>
  );
}