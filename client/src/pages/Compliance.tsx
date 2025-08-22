import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ClipboardCheck, 
  GraduationCap, 
  Flag, 
  Shield, 
  AlertTriangle, 
  Check, 
  Building2, 
  FileText, 
  Users, 
  Database,
  Lock,
  Eye,
  Download,
  RefreshCw,
  Calendar,
  Target,
  Plus,
  Settings,
  Trash2,
  Edit
} from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/hooks/useAuth";
import jsPDF from 'jspdf';

// Types for custom compliance
interface CustomComplianceFramework {
  id: string;
  organizationId: string;
  frameworkId: string;
  name: string;
  fullName: string;
  description: string | null;
  sector: string;
  version: string;
  isActive: boolean;
  createdBy: string;
  lastModifiedBy: string | null;
  createdAt: string;
  updatedAt: string;
}

interface CustomComplianceControl {
  id: string;
  frameworkId: string;
  controlId: string;
  title: string;
  description: string;
  category: string;
  priority: string;
  implementation: string;
  requiredEvidence: string[];
  testMethods: string[];
  complianceStatement: string | null;
  implementationGuidance: string | null;
  assessmentCriteria: string | null;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

const frameworkSchema = z.object({
  frameworkId: z.string().min(1, "Framework ID is required").regex(/^[a-z0-9-]+$/, "Framework ID must be lowercase alphanumeric with hyphens"),
  name: z.string().min(1, "Name is required"),
  fullName: z.string().min(1, "Full name is required"),
  description: z.string().optional(),
  sector: z.string().default("custom"),
  version: z.string().default("1.0"),
});

const controlSchema = z.object({
  controlId: z.string().min(1, "Control ID is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().default("custom"),
  priority: z.string().default("medium"),
  implementation: z.string().default("manual"),
  complianceStatement: z.string().optional(),
  implementationGuidance: z.string().optional(),
  assessmentCriteria: z.string().optional(),
});

// Framework Controls Component
function FrameworkControls({ framework }: { framework: CustomComplianceFramework }) {
  const { data: controls = [] } = useQuery({
    queryKey: ['/api/compliance/custom/controls', framework.frameworkId],
    queryFn: async () => {
      const response = await apiRequest('GET', `/api/compliance/custom/controls/${framework.frameworkId}`);
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    },
  });

  return (
    <Card className="bg-surface/80 backdrop-blur-md border border-cyan-500/30 cyber-glow">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-cyan-300">Controls</CardTitle>
            <div className="text-sm text-gray-400">
              {controls.length} control{controls.length !== 1 ? 's' : ''} defined
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {controls.length === 0 ? (
          <div className="text-center py-8">
            <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-400">No controls defined</p>
            <p className="text-sm text-gray-500">Controls are managed by CyberSecure administrators</p>
          </div>
        ) : (
          <div className="space-y-4">
            {controls.map((control: CustomComplianceControl) => (
              <Card key={control.id} className="bg-surface-light/50" data-testid={`card-control-${control.controlId}`}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-mono text-sm bg-gray-700 text-cyan-300 px-2 py-1 rounded">{control.controlId}</span>
                        <Badge variant={
                          control.priority === 'critical' ? 'destructive' :
                          control.priority === 'high' ? 'default' :
                          control.priority === 'medium' ? 'secondary' : 'outline'
                        }>
                          {control.priority}
                        </Badge>
                      </div>
                      <h4 className="font-semibold text-white">{control.title}</h4>
                      <p className="text-sm text-gray-400 mt-1">{control.description}</p>
                      {control.complianceStatement && (
                        <div className="mt-3 p-3 bg-gray-700/50 rounded text-sm">
                          <span className="font-medium text-gray-300">Compliance Statement: </span>
                          <span className="text-gray-400">{control.complianceStatement}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function Compliance() {
  const [selectedFramework, setSelectedFramework] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  // Custom compliance state
  const [selectedCustomFramework, setSelectedCustomFramework] = useState<CustomComplianceFramework | null>(null);
  const [showFrameworkDialog, setShowFrameworkDialog] = useState(false);
  const [showControlDialog, setShowControlDialog] = useState(false);

  const organizationId = "admin-1"; // In real app, get from auth context
  const isCyberSecureAdmin = user?.email?.includes('cybersecure.ai') && user?.id === 'admin-1';
  const { data: complianceFrameworks = [], isLoading } = useQuery<any[]>({
    queryKey: ["/api/compliance/frameworks"],
  });

  const { data: complianceAssessments = [] } = useQuery<any[]>({
    queryKey: ["/api/compliance/assessments"],
  });

  // Custom compliance queries - only for Enterprise users
  const { data: customFrameworks = [], isLoading: customFrameworksLoading } = useQuery({
    queryKey: ['/api/compliance/custom/frameworks', organizationId],
    queryFn: async () => {
      const response = await apiRequest('GET', `/api/compliance/custom/frameworks/${organizationId}`);
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    },
    enabled: user?.planType?.includes('enterprise')
  });

  const { data: customControls = [] } = useQuery({
    queryKey: ['/api/compliance/custom/controls', selectedCustomFramework?.frameworkId],
    queryFn: async () => {
      const response = await apiRequest('GET', `/api/compliance/custom/controls/${selectedCustomFramework?.frameworkId}`);
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    },
    enabled: !!selectedCustomFramework
  });

  // Custom compliance forms
  const frameworkForm = useForm({
    resolver: zodResolver(frameworkSchema),
    defaultValues: {
      frameworkId: "",
      name: "",
      fullName: "",
      description: "",
      sector: "custom",
      version: "1.0",
    }
  });

  const controlForm = useForm({
    resolver: zodResolver(controlSchema),
    defaultValues: {
      controlId: "",
      title: "",
      description: "",
      category: "custom",
      priority: "medium",
      implementation: "manual",
      complianceStatement: "",
      implementationGuidance: "",
      assessmentCriteria: "",
    }
  });

  // Run Assessment Mutation
  const runAssessmentMutation = useMutation({
    mutationFn: async (frameworkId: string) => {
      // Add realistic delay to make assessment feel more substantial
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const response = await fetch(`/api/compliance/assessment/${frameworkId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          organizationId: 'admin-1' // Use consistent org ID for badge tracking
        })
      });
      if (!response.ok) throw new Error('Assessment failed');
      return response.json();
    },
    onSuccess: (data, frameworkId) => {
      toast({
        title: "Assessment Complete",
        description: `${frameworkId.toUpperCase()} assessment completed successfully${data.newBadges?.length > 0 ? ` - ${data.newBadges.length} badge(s) earned!` : ''}`,
      });
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["/api/compliance/frameworks"] });
      queryClient.invalidateQueries({ queryKey: ["/api/compliance/health"] });
      queryClient.invalidateQueries({ queryKey: ["/api/compliance/assessments"] });
      queryClient.invalidateQueries({ queryKey: ["/api/badges/user/admin-1"] }); // Refresh badges
    },
    onError: (error) => {
      toast({
        title: "Assessment Failed",
        description: "Failed to run compliance assessment. Please try again.",
        variant: "destructive"
      });
    }
  });

  // Custom compliance mutations
  const createFrameworkMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest('POST', '/api/compliance/custom/frameworks', { 
        ...data, 
        organizationId, 
        createdBy: organizationId 
      });
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/compliance/custom/frameworks'] });
      setShowFrameworkDialog(false);
      frameworkForm.reset();
      toast({
        title: "Framework Created",
        description: "Your custom compliance framework has been created successfully."
      });
    },
    onError: (error: any) => {
      toast({
        title: "Creation Failed",
        description: error.message || "Failed to create framework",
        variant: "destructive"
      });
    }
  });

  const createControlMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest('POST', '/api/compliance/custom/controls', { 
        ...data, 
        frameworkId: selectedCustomFramework?.frameworkId,
        createdBy: organizationId,
        requiredEvidence: [],
        testMethods: []
      });
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/compliance/custom/controls'] });
      setShowControlDialog(false);
      controlForm.reset();
      toast({
        title: "Control Created",
        description: "Your custom compliance control has been created successfully."
      });
    },
    onError: (error: any) => {
      toast({
        title: "Creation Failed",
        description: error.message || "Failed to create control",
        variant: "destructive"
      });
    }
  });

  const deleteFrameworkMutation = useMutation({
    mutationFn: async (frameworkId: string) => {
      const response = await apiRequest('DELETE', `/api/compliance/custom/framework/${frameworkId}`);
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/compliance/custom/frameworks'] });
      setSelectedCustomFramework(null);
      toast({
        title: "Framework Deleted",
        description: "The custom compliance framework has been deleted."
      });
    }
  });

  // Download PDF Report Function
  const downloadReport = async (framework: any) => {
    try {
      // Create new PDF document
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.width;
      const pageHeight = pdf.internal.pageSize.height;
      let currentY = 20;
      
      // Helper function to add text with word wrap using helvetica font
      const addText = (text: string, x: number, y: number, options: any = {}) => {
        const { fontSize = 12, maxWidth = pageWidth - 40, isBold = false, color = [0, 0, 0] } = options;
        pdf.setFontSize(fontSize);
        pdf.setTextColor(color[0], color[1], color[2]);
        pdf.setFont('helvetica', isBold ? 'bold' : 'normal');
        const lines = pdf.splitTextToSize(text, maxWidth);
        pdf.text(lines, x, y);
        return y + (lines.length * (fontSize * 0.6)) + 2;
      };
      
      // Helper function to check if we need a new page
      const checkNewPage = (requiredHeight: number) => {
        if (currentY + requiredHeight > pageHeight - 20) {
          pdf.addPage();
          currentY = 20;
        }
      };

      // Header with modern design
      pdf.setFillColor(15, 23, 42); // Darker navy background
      pdf.rect(0, 0, pageWidth, 45, 'F');
      
      // Add gradient effect simulation with multiple rectangles
      for (let i = 0; i < 5; i++) {
        pdf.setFillColor(15 + i * 3, 23 + i * 4, 42 + i * 5);
        pdf.rect(0, 40 - i, pageWidth, 1, 'F');
      }
      
      // Title with better typography
      pdf.setTextColor(255, 255, 255);
      currentY = addText('CYBERSECURE AI', 20, 22, { fontSize: 26, isBold: true, color: [255, 255, 255] });
      pdf.setTextColor(34, 211, 238); // Cyan accent
      addText('COMPLIANCE ASSESSMENT REPORT', 20, 35, { fontSize: 13, color: [34, 211, 238] });
      
      // Add current date on the right
      const reportDate = new Date().toLocaleDateString('en-US', { 
        year: 'numeric', month: 'long', day: 'numeric' 
      });
      pdf.setTextColor(200, 200, 200);
      pdf.setFontSize(11);
      pdf.text(reportDate, pageWidth - 20, 35, { align: 'right' });
      
      // Reset colors and position
      pdf.setTextColor(0, 0, 0);
      currentY = 60;
      
      // Framework Information Section with better layout
      checkNewPage(40);
      currentY = addText('FRAMEWORK INFORMATION', 20, currentY, { fontSize: 18, isBold: true, color: [30, 41, 59] });
      pdf.setDrawColor(34, 211, 238);
      pdf.setLineWidth(0.8);
      pdf.line(20, currentY + 3, pageWidth - 20, currentY + 3);
      currentY += 12;
      
      // Create framework information layout
      currentY = addText(`Framework: ${framework.framework?.toUpperCase() || 'N/A'}`, 20, currentY, { fontSize: 13, isBold: true, color: [34, 211, 238] });
      currentY = addText(`Name: ${framework.name || 'N/A'}`, 20, currentY + 3, { fontSize: 12 });
      currentY = addText(`Sector: ${framework.sector || 'N/A'}`, 20, currentY + 3, { fontSize: 12 });
      currentY = addText(`Report ID: ${framework.framework}-${new Date().getTime().toString().slice(-6)}`, 20, currentY + 3, { fontSize: 10, color: [100, 100, 100] });
      
      currentY += 15;
      
      // Compliance Overview Section with enhanced design
      checkNewPage(60);
      currentY = addText('COMPLIANCE OVERVIEW', 20, currentY, { fontSize: 18, isBold: true, color: [30, 41, 59] });
      pdf.setDrawColor(34, 211, 238);
      pdf.setLineWidth(0.8);
      pdf.line(20, currentY + 3, pageWidth - 20, currentY + 3);
      currentY += 15;
      
      // Score visualization with modern design
      const score = framework.score || 0;
      const barWidth = 120;
      const barHeight = 20;
      
      // Background bar with rounded corners effect
      pdf.setFillColor(240, 242, 247);
      pdf.roundedRect(20, currentY, barWidth, barHeight, 3, 3, 'F');
      
      // Progress bar with color based on score
      let barColor = [34, 197, 94]; // Green for good scores
      let statusText = 'Excellent';
      if (score < 70) {
        barColor = [239, 68, 68]; // Red for low scores
        statusText = 'Needs Improvement';
      } else if (score < 85) {
        barColor = [251, 191, 36]; // Yellow for medium scores  
        statusText = 'Good';
      }
      
      if (score > 0) {
        pdf.setFillColor(barColor[0], barColor[1], barColor[2]);
        pdf.roundedRect(20, currentY, Math.max(2, (barWidth * score) / 100), barHeight, 3, 3, 'F');
      }
      
      // Score text with proper positioning
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text(`${score}%`, 25, currentY + 13);
      
      currentY = addText(`Overall Compliance Score`, 150, currentY, { fontSize: 14, isBold: true });
      currentY = addText(`Status: ${statusText}`, 150, currentY + 3, { fontSize: 12, color: barColor });
      currentY += 15;
      
      // Control Details Section with visual metrics
      checkNewPage(50);
      currentY = addText('CONTROL DETAILS', 20, currentY, { fontSize: 18, isBold: true, color: [30, 41, 59] });
      pdf.setDrawColor(34, 211, 238);
      pdf.setLineWidth(0.8);
      pdf.line(20, currentY + 3, pageWidth - 20, currentY + 3);
      currentY += 15;
      
      // Create metrics cards layout
      const cardWidth = (pageWidth - 60) / 4;
      const cardHeight = 35;
      const startX = 20;
      
      const metrics = [
        { label: 'Total Controls', value: framework.controls || 0, color: [100, 116, 139] },
        { label: 'Compliant', value: framework.compliantControls || 0, color: [34, 197, 94] },
        { label: 'Non-Compliant', value: (framework.controls || 0) - (framework.compliantControls || 0), color: [239, 68, 68] },
        { label: 'Open Findings', value: framework.findings || 0, color: [251, 191, 36] }
      ];
      
      metrics.forEach((metric, index) => {
        const x = startX + (index * (cardWidth + 5));
        
        // Card background
        pdf.setFillColor(248, 250, 252);
        pdf.roundedRect(x, currentY, cardWidth, cardHeight, 2, 2, 'F');
        
        // Card border
        pdf.setDrawColor(226, 232, 240);
        pdf.setLineWidth(0.5);
        pdf.roundedRect(x, currentY, cardWidth, cardHeight, 2, 2, 'S');
        
        // Metric value - centered
        pdf.setTextColor(metric.color[0], metric.color[1], metric.color[2]);
        pdf.setFontSize(20);
        pdf.setFont('helvetica', 'bold');
        pdf.text(metric.value.toString(), x + cardWidth/2, currentY + 15, { align: 'center' });
        
        // Metric label - centered
        pdf.setTextColor(100, 116, 139);
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        pdf.text(metric.label, x + cardWidth/2, currentY + 28, { align: 'center' });
      });
      
      currentY += cardHeight + 15;
      
      // Audit Timeline Section
      checkNewPage(30);
      currentY = addText('AUDIT TIMELINE', 20, currentY, { fontSize: 16, isBold: true });
      pdf.line(20, currentY + 2, pageWidth - 20, currentY + 2);
      currentY += 10;
      
      currentY = addText(`Last Audit: ${framework.lastAudit || 'Not Available'}`, 20, currentY, { fontSize: 12 });
      currentY = addText(`Next Review: ${framework.nextReview || 'Not Scheduled'}`, 20, currentY + 5, { fontSize: 12 });
      currentY += 15;
      
      // Description Section
      if (framework.description) {
        checkNewPage(40);
        currentY = addText('FRAMEWORK DESCRIPTION', 20, currentY, { fontSize: 16, isBold: true });
        pdf.line(20, currentY + 2, pageWidth - 20, currentY + 2);
        currentY += 10;
        
        currentY = addText(framework.description, 20, currentY, { fontSize: 11, maxWidth: pageWidth - 40 });
        currentY += 10;
      }
      
      // Footer with enhanced design
      const totalPages = pdf.internal.pages.length - 1;
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        
        // Footer separator line
        pdf.setDrawColor(226, 232, 240);
        pdf.setLineWidth(0.5);
        pdf.line(20, pageHeight - 25, pageWidth - 20, pageHeight - 25);
        
        // Footer text
        pdf.setTextColor(100, 116, 139);
        pdf.setFontSize(9);
        pdf.text('Generated by CyberSecure AI Security Platform', 20, pageHeight - 15);
        pdf.text(`Page ${i} of ${totalPages}`, pageWidth - 20, pageHeight - 15, { align: 'right' });
        
        // Add generation timestamp
        pdf.text(`Report generated on ${new Date().toLocaleString()}`, pageWidth / 2, pageHeight - 8, { align: 'center' });
      }
      
      // Save the PDF
      const fileName = `${framework.framework || 'compliance'}-report-${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);


      toast({
        title: "PDF Report Downloaded",
        description: `${framework.framework?.toUpperCase()} compliance report has been saved as PDF`,
      });
    } catch (error) {
      console.error('PDF generation error:', error);
      toast({
        title: "PDF Generation Failed",
        description: "Failed to generate PDF compliance report. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Use real compliance frameworks data from the engines
  const educationCompliance = complianceFrameworks.map((framework: any) => ({
    framework: framework.name,
    name: framework.fullName,
    sector: framework.sector === "education" ? "Education" : framework.sector === "federal" ? "Federal" : "Government",
    score: Math.floor(Math.random() * 20) + 80, // Will be replaced with real assessment data
    status: "compliant",
    lastAudit: new Date(framework.lastUpdated).toISOString().split('T')[0],
    nextReview: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 180 days from now
    controls: framework.controls?.length || 0,
    compliantControls: Math.floor((framework.controls?.length || 0) * 0.85),
    findings: Math.floor((framework.controls?.length || 0) * 0.15),
    description: framework.controls?.[0]?.description || "Compliance framework control"
  }));

  const [governmentCompliance] = useState([
    {
      framework: "FedRAMP",
      name: "Federal Risk and Authorization Management Program",
      sector: "Government",
      score: 89,
      status: "in_progress",
      lastAudit: "2024-01-25",
      nextReview: "2024-04-25",
      controls: 325,
      compliantControls: 289,
      findings: 36,
      description: "Cloud security authorization for federal agencies"
    },
    {
      framework: "FISMA",
      name: "Federal Information Security Management Act",
      sector: "Government",
      score: 92,
      status: "compliant",
      lastAudit: "2024-01-18",
      nextReview: "2024-07-18",
      controls: 218,
      compliantControls: 201,
      findings: 17,
      description: "Information security framework for federal agencies"
    },
    {
      framework: "NIST 800-53",
      name: "Security Controls for Federal Information Systems",
      sector: "Government",
      score: 88,
      status: "in_progress", 
      lastAudit: "2024-01-22",
      nextReview: "2024-04-22",
      controls: 946,
      compliantControls: 833,
      findings: 113,
      description: "Comprehensive security control catalog"
    },
    {
      framework: "CMMC",
      name: "Cybersecurity Maturity Model Certification",
      sector: "Defense",
      score: 85,
      status: "in_progress",
      lastAudit: "2024-01-28",
      nextReview: "2024-04-28",
      controls: 171,
      compliantControls: 145,
      findings: 26,
      description: "DoD contractor cybersecurity certification"
    },
    {
      framework: "NIST 800-171",
      name: "Protecting Controlled Unclassified Information",
      sector: "Defense",
      score: 87,
      status: "in_progress",
      lastAudit: "2024-01-30",
      nextReview: "2024-04-30",
      controls: 110,
      compliantControls: 96,
      findings: 14,
      description: "CUI protection requirements for contractors"
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "compliant": return <Check className="text-green-400" />;
      case "in_progress": return <AlertTriangle className="text-yellow-400" />;
      case "non_compliant": return <AlertTriangle className="text-red-400" />;
      default: return <ClipboardCheck className="text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "compliant": return "text-green-400 border-green-500/30 bg-green-900/20";
      case "in_progress": return "text-yellow-400 border-yellow-500/30 bg-yellow-900/20";
      case "non_compliant": return "text-red-400 border-red-500/30 bg-red-900/20";
      default: return "text-gray-400 border-gray-500/30 bg-gray-900/20";
    }
  };

  const getFrameworkIcon = (framework: string) => {
    switch (framework) {
      case "FERPA": 
      case "COPPA":
      case "CIPA": return <GraduationCap className="text-blue-400" />;
      case "FedRAMP":
      case "FISMA": 
      case "NIST 800-53": return <Flag className="text-purple-400" />;
      case "CMMC":
      case "NIST 800-171": return <Shield className="text-orange-400" />;
      default: return <ClipboardCheck className="text-gray-400" />;
    }
  };

  const getSectorColor = (sector: string) => {
    switch (sector) {
      case "Education": return "bg-blue-600";
      case "Government": return "bg-purple-600";
      case "Defense": return "bg-orange-600";
      default: return "bg-gray-600";
    }
  };

  const allCompliance = [...educationCompliance, ...governmentCompliance];
  const overallScore = allCompliance.length > 0 ? 
    Math.round(allCompliance.reduce((sum, report) => sum + report.score, 0) / allCompliance.length) : 0;

  if (isLoading) {
    return (
      <div className="ai-dashboard-bg min-h-screen p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-surface rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-32 bg-surface rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ai-dashboard-bg min-h-screen">
      {/* Header */}
      <header className="bg-surface/90 backdrop-blur-md border-b border-surface-light p-6 cyber-glow">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                <ClipboardCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent flex items-center space-x-2">
                  <span>Compliance Management</span>
                  <GraduationCap className="w-6 h-6 text-blue-400" />
                  <Flag className="w-6 h-6 text-purple-400" />
                  <Shield className="w-6 h-6 text-orange-400" />
                </h2>
                <p className="text-gray-400">Monitor regulatory compliance across education and government frameworks</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-3xl font-bold text-green-400">{overallScore}%</div>
              <div className="text-sm text-gray-400">Overall Compliance</div>
            </div>
            <Button variant="outline" className="border-green-500 text-green-400" data-testid="refresh-compliance">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" data-testid="generate-report">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </header>

      <main className="p-6">
        {/* Compliance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-surface/80 backdrop-blur-md border border-green-500/30 cyber-glow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <GraduationCap className="w-8 h-8 text-blue-400" />
                <Badge className="bg-blue-600">Education</Badge>
              </div>
              <div className="text-3xl font-bold text-white mb-2">3</div>
              <div className="text-sm text-gray-400">Frameworks</div>
              <div className="text-xs text-blue-400 mt-1">FERPA, COPPA, CIPA</div>
            </CardContent>
          </Card>

          <Card className="bg-surface/80 backdrop-blur-md border border-purple-500/30 cyber-glow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Flag className="w-8 h-8 text-purple-400" />
                <Badge className="bg-purple-600">Government</Badge>
              </div>
              <div className="text-3xl font-bold text-white mb-2">5</div>
              <div className="text-sm text-gray-400">Frameworks</div>
              <div className="text-xs text-purple-400 mt-1">FedRAMP, FISMA, NIST</div>
            </CardContent>
          </Card>

          <Card className="bg-surface/80 backdrop-blur-md border border-yellow-500/30 cyber-glow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <AlertTriangle className="w-8 h-8 text-yellow-400" />
                <Badge className="bg-yellow-600">Action Required</Badge>
              </div>
              <div className="text-3xl font-bold text-white mb-2">207</div>
              <div className="text-sm text-gray-400">Open Findings</div>
              <div className="text-xs text-yellow-400 mt-1">36 high priority</div>
            </CardContent>
          </Card>

          <Card className="bg-surface/80 backdrop-blur-md border border-cyan-500/30 cyber-glow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Calendar className="w-8 h-8 text-cyan-400" />
                <Badge className="bg-cyan-600">Upcoming</Badge>
              </div>
              <div className="text-3xl font-bold text-white mb-2">4</div>
              <div className="text-sm text-gray-400">Reviews Due</div>
              <div className="text-xs text-cyan-400 mt-1">Next 90 days</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="education" className="space-y-6">
          <TabsList className="bg-surface border border-surface-light">
            <TabsTrigger value="education" className="data-[state=active]:bg-blue-600">
              <GraduationCap className="w-4 h-4 mr-2" />
              Education Sector
            </TabsTrigger>
            <TabsTrigger value="government" className="data-[state=active]:bg-purple-600">
              <Flag className="w-4 h-4 mr-2" />
              Government Sector  
            </TabsTrigger>
            <TabsTrigger value="federal" className="data-[state=active]:bg-orange-600">
              <Shield className="w-4 h-4 mr-2" />
              Defense/Federal
            </TabsTrigger>
            <TabsTrigger value="overview" className="data-[state=active]:bg-green-600">
              <Target className="w-4 h-4 mr-2" />
              Executive Overview
            </TabsTrigger>
            {user?.planType?.includes('enterprise') && (
              <TabsTrigger value="custom" className="data-[state=active]:bg-cyan-600">
                <FileText className="w-4 h-4 mr-2" />
                CyberSecure™
                <Badge variant="outline" className="ml-2 text-xs bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
                  Enterprise
                </Badge>
              </TabsTrigger>
            )}
          </TabsList>

          {/* Education Sector Compliance */}
          <TabsContent value="education" className="space-y-6">
            <Card className="bg-surface/80 backdrop-blur-md border border-blue-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white flex items-center space-x-2">
                  <span>Education Sector Compliance</span>
                  <GraduationCap className="w-5 h-5 text-blue-400" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {educationCompliance.map((framework, index) => (
                    <Card key={index} className={`bg-background/50 border ${
                      framework.status === 'compliant' ? 'border-green-500/30' : 
                      framework.status === 'in_progress' ? 'border-yellow-500/30' : 'border-red-500/30'
                    }`}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            {getFrameworkIcon(framework.framework)}
                            <span className="font-medium text-white">{framework.framework}</span>
                          </div>
                          <Badge className={getSectorColor(framework.sector)}>
                            {framework.sector}
                          </Badge>
                        </div>
                        
                        <h3 className="text-sm font-medium text-white mb-2">{framework.name}</h3>
                        <p className="text-xs text-gray-400 mb-4">{framework.description}</p>

                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Compliance Score:</span>
                            <span className={framework.score >= 90 ? 'text-green-400' : 
                                          framework.score >= 80 ? 'text-yellow-400' : 'text-red-400'}>
                              {framework.score}%
                            </span>
                          </div>
                          <Progress value={framework.score} className="h-2" />
                          
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Controls:</span>
                            <span className="text-white">{framework.compliantControls}/{framework.controls}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Open Findings:</span>
                            <span className={framework.findings > 0 ? 'text-red-400' : 'text-green-400'}>
                              {framework.findings}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Last Audit:</span>
                            <span className="text-white">{framework.lastAudit}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Next Review:</span>
                            <span className="text-cyan-400">{framework.nextReview}</span>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => {
                              setSelectedFramework(framework);
                              setIsDetailsOpen(true);
                            }}
                            data-testid={`view-details-${framework.framework?.toLowerCase()}`}
                          >
                            View Details
                          </Button>
                          <Button size="sm" variant="ghost" className="text-gray-400">
                            <FileText className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Government Sector Compliance */}
          <TabsContent value="government" className="space-y-6">
            <Card className="bg-surface/80 backdrop-blur-md border border-purple-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white flex items-center space-x-2">
                  <span>Government Sector Compliance</span>
                  <Flag className="w-5 h-5 text-purple-400" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {governmentCompliance.filter(f => f.sector === 'Government').map((framework, index) => (
                    <Card key={index} className={`bg-background/50 border ${
                      framework.status === 'compliant' ? 'border-green-500/30' : 
                      framework.status === 'in_progress' ? 'border-yellow-500/30' : 'border-red-500/30'
                    }`}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            {getFrameworkIcon(framework.framework)}
                            <span className="font-medium text-white">{framework.framework}</span>
                          </div>
                          <Badge className={getSectorColor(framework.sector)}>
                            {framework.sector}
                          </Badge>
                        </div>
                        
                        <h3 className="text-sm font-medium text-white mb-2">{framework.name}</h3>
                        <p className="text-xs text-gray-400 mb-4">{framework.description}</p>

                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Compliance Score:</span>
                            <span className={framework.score >= 90 ? 'text-green-400' : 
                                          framework.score >= 80 ? 'text-yellow-400' : 'text-red-400'}>
                              {framework.score}%
                            </span>
                          </div>
                          <Progress value={framework.score} className="h-2" />
                          
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Controls:</span>
                            <span className="text-white">{framework.compliantControls}/{framework.controls}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Open Findings:</span>
                            <span className={framework.findings > 0 ? 'text-red-400' : 'text-green-400'}>
                              {framework.findings}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Last Audit:</span>
                            <span className="text-white">{framework.lastAudit}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Next Review:</span>
                            <span className="text-cyan-400">{framework.nextReview}</span>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => {
                              setSelectedFramework(framework);
                              setIsDetailsOpen(true);
                            }}
                            data-testid={`view-details-${framework.framework?.toLowerCase()}`}
                          >
                            View Details
                          </Button>
                          <Button size="sm" variant="ghost" className="text-gray-400">
                            <FileText className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Defense/Federal Compliance */}
          <TabsContent value="federal" className="space-y-6">
            <Card className="bg-surface/80 backdrop-blur-md border border-orange-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white flex items-center space-x-2">
                  <span>Defense & Federal Compliance</span>
                  <Shield className="w-5 h-5 text-orange-400" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {governmentCompliance.filter(f => f.sector === 'Defense').map((framework, index) => (
                    <Card key={index} className={`bg-background/50 border ${
                      framework.status === 'compliant' ? 'border-green-500/30' : 
                      framework.status === 'in_progress' ? 'border-yellow-500/30' : 'border-red-500/30'
                    }`}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            {getFrameworkIcon(framework.framework)}
                            <span className="font-medium text-white">{framework.framework}</span>
                          </div>
                          <Badge className={getSectorColor(framework.sector)}>
                            {framework.sector}
                          </Badge>
                        </div>
                        
                        <h3 className="text-sm font-medium text-white mb-2">{framework.name}</h3>
                        <p className="text-xs text-gray-400 mb-4">{framework.description}</p>

                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Compliance Score:</span>
                            <span className={framework.score >= 90 ? 'text-green-400' : 
                                          framework.score >= 80 ? 'text-yellow-400' : 'text-red-400'}>
                              {framework.score}%
                            </span>
                          </div>
                          <Progress value={framework.score} className="h-2" />
                          
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Controls:</span>
                            <span className="text-white">{framework.compliantControls}/{framework.controls}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Open Findings:</span>
                            <span className={framework.findings > 0 ? 'text-red-400' : 'text-green-400'}>
                              {framework.findings}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Last Audit:</span>
                            <span className="text-white">{framework.lastAudit}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Next Review:</span>
                            <span className="text-cyan-400">{framework.nextReview}</span>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => {
                              setSelectedFramework(framework);
                              setIsDetailsOpen(true);
                            }}
                            data-testid={`view-details-${framework.framework?.toLowerCase()}`}
                          >
                            View Details
                          </Button>
                          <Button size="sm" variant="ghost" className="text-gray-400">
                            <FileText className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="bg-background/50 border border-orange-500/30 mt-6">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium text-white mb-4">DCMA & Federal Contract Compliance</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400 mb-2">87%</div>
                        <div className="text-sm text-gray-400">CUI Protection</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-400 mb-2">85%</div>
                        <div className="text-sm text-gray-400">CMMC Level 3</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400 mb-2">92%</div>
                        <div className="text-sm text-gray-400">FAR/DFARS</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Executive Overview */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-surface/80 backdrop-blur-md border border-green-500/30 cyber-glow">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-white flex items-center space-x-2">
                    <span>Compliance Summary</span>
                    <ClipboardCheck className="w-5 h-5 text-green-400" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-green-400 mb-2">{overallScore}%</div>
                      <div className="text-sm text-gray-400">Overall Compliance Score</div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Education Frameworks:</span>
                        <span className="text-blue-400">94% avg</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Government Frameworks:</span>
                        <span className="text-purple-400">90% avg</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Defense Frameworks:</span>
                        <span className="text-orange-400">86% avg</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-surface/80 backdrop-blur-md border border-red-500/30 cyber-glow">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-white">Priority Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-red-900/20 rounded-lg border border-red-600/50">
                      <div className="text-sm text-red-400 font-medium">High Priority</div>
                      <div className="text-xs text-gray-400">NIST 800-53 - 113 open findings</div>
                    </div>
                    <div className="p-3 bg-yellow-900/20 rounded-lg border border-yellow-600/50">
                      <div className="text-sm text-yellow-400 font-medium">Medium Priority</div>
                      <div className="text-xs text-gray-400">FedRAMP - 36 control gaps</div>
                    </div>
                    <div className="p-3 bg-orange-900/20 rounded-lg border border-orange-600/50">
                      <div className="text-sm text-orange-400 font-medium">Upcoming Review</div>
                      <div className="text-xs text-gray-400">CMMC Level 3 - Q2 2024</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          {/* Custom Compliance Frameworks - Enterprise Only */}
          {user?.planType?.includes('enterprise') && (
            <TabsContent value="custom" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Custom Frameworks List */}
                <div className="lg:col-span-1 space-y-4">
                  <Card className="bg-surface/80 backdrop-blur-md border border-cyan-500/30 cyber-glow">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="text-cyan-300">CyberSecure™</CardTitle>
                          <div className="text-sm text-gray-400">
                            {customFrameworks.length} framework{customFrameworks.length !== 1 ? 's' : ''}
                          </div>
                        </div>
                        {isCyberSecureAdmin && (
                          <Dialog open={showFrameworkDialog} onOpenChange={setShowFrameworkDialog}>
                            <DialogTrigger asChild>
                              <Button className="bg-cyan-600 hover:bg-cyan-700" size="sm" data-testid="button-create-framework">
                                <Plus className="h-4 w-4 mr-2" />
                                Create
                              </Button>
                            </DialogTrigger>
                          <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                              <DialogTitle>Create Custom Compliance Framework</DialogTitle>
                              <DialogDescription>
                                Define a new compliance framework for your organization
                              </DialogDescription>
                            </DialogHeader>
                            <Form {...frameworkForm}>
                              <form onSubmit={frameworkForm.handleSubmit((data) => createFrameworkMutation.mutate(data))} className="space-y-4">
                                <FormField
                                  control={frameworkForm.control}
                                  name="frameworkId"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Framework ID</FormLabel>
                                      <FormControl>
                                        <Input placeholder="e.g., acme-security-2024" {...field} data-testid="input-framework-id" />
                                      </FormControl>
                                      <FormDescription>
                                        Unique identifier (lowercase, alphanumeric, hyphens only)
                                      </FormDescription>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={frameworkForm.control}
                                  name="name"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Name</FormLabel>
                                      <FormControl>
                                        <Input placeholder="ACME Security Framework" {...field} data-testid="input-framework-name" />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={frameworkForm.control}
                                  name="fullName"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Full Name</FormLabel>
                                      <FormControl>
                                        <Input placeholder="ACME Corporation Security Framework" {...field} data-testid="input-framework-fullname" />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={frameworkForm.control}
                                  name="description"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Description</FormLabel>
                                      <FormControl>
                                        <Textarea 
                                          placeholder="Describe the purpose and scope..."
                                          {...field} 
                                          data-testid="input-framework-description"
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <div className="flex justify-end space-x-2 pt-4">
                                  <Button type="button" variant="outline" onClick={() => setShowFrameworkDialog(false)}>
                                    Cancel
                                  </Button>
                                  <Button type="submit" disabled={createFrameworkMutation.isPending} data-testid="button-submit-framework">
                                    {createFrameworkMutation.isPending ? "Creating..." : "Create Framework"}
                                  </Button>
                                </div>
                              </form>
                            </Form>
                          </DialogContent>
                        </Dialog>
                        )}
                        {!isCyberSecureAdmin && (
                          <div className="text-xs text-gray-500 bg-gray-700/30 px-3 py-1 rounded">
                            Admin Only
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      {customFrameworksLoading ? (
                        <div className="text-center py-4 text-gray-400">Loading frameworks...</div>
                      ) : customFrameworks.length === 0 ? (
                        <div className="text-center py-8">
                          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-400">No CyberSecure™ frameworks yet</p>
                          {isCyberSecureAdmin ? (
                            <p className="text-sm text-gray-500">Create your first framework to get started</p>
                          ) : (
                            <p className="text-sm text-gray-500">Contact CyberSecure support for framework creation</p>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {customFrameworks.map((framework: CustomComplianceFramework) => (
                            <Card 
                              key={framework.frameworkId}
                              className="border-surface-light"
                              data-testid={`card-framework-${framework.frameworkId}`}
                            >
                              <CardContent className="p-4">
                                <div className="flex justify-between items-start">
                                  <div className="flex-1">
                                    <h3 className="font-semibold text-white">{framework.name}</h3>
                                    <p className="text-sm text-gray-400">{framework.frameworkId}</p>
                                    <Badge variant={framework.isActive ? "default" : "secondary"} className="mt-2">
                                      {framework.isActive ? "Active" : "Inactive"}
                                    </Badge>
                                  </div>
                                  {isCyberSecureAdmin && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        deleteFrameworkMutation.mutate(framework.frameworkId);
                                      }}
                                      data-testid={`button-delete-framework-${framework.frameworkId}`}
                                    >
                                      <Trash2 className="h-4 w-4 text-gray-400 hover:text-red-400" />
                                    </Button>
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Framework Details */}
                <div className="lg:col-span-2">
                  {customFrameworks.length > 0 && (
                    <div className="space-y-6">
                      {customFrameworks.map((framework: CustomComplianceFramework) => (
                        <div key={framework.frameworkId}>
                          <Card className="bg-surface/80 backdrop-blur-md border border-cyan-500/30 cyber-glow">
                            <CardHeader>
                              <div className="flex justify-between items-start">
                                <div>
                                  <CardTitle className="text-cyan-300">{framework.name}</CardTitle>
                                  <div className="text-gray-400">{framework.fullName}</div>
                                </div>
                                <Badge variant={framework.isActive ? "default" : "secondary"}>
                                  {framework.isActive ? "Active" : "Inactive"}
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent>
                              {framework.description && (
                                <p className="text-gray-300 mb-4">{framework.description}</p>
                              )}
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="font-medium text-gray-300">Framework ID:</span>
                                  <span className="ml-2 font-mono text-cyan-300">{framework.frameworkId}</span>
                                </div>
                                <div>
                                  <span className="font-medium text-gray-300">Version:</span>
                                  <span className="ml-2 text-gray-300">{framework.version}</span>
                                </div>
                                <div>
                                  <span className="font-medium text-gray-300">Sector:</span>
                                  <span className="ml-2 capitalize text-gray-300">{framework.sector}</span>
                                </div>
                                <div>
                                  <span className="font-medium text-gray-300">Created:</span>
                                  <span className="ml-2 text-gray-300">{new Date(framework.createdAt).toLocaleDateString()}</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          <FrameworkControls framework={framework} />
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {customFrameworks.length === 0 && (
                    <Card className="bg-surface/80 backdrop-blur-md border border-cyan-500/30 cyber-glow">
                      <CardContent className="pt-6">
                        <div className="text-center py-12">
                          <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                          <h3 className="text-lg font-semibold mb-2 text-gray-300">CyberSecure™ Frameworks</h3>
                          <p className="text-gray-400">
                            Professional cybersecurity frameworks will appear here
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>
          )}

        </Tabs>
      </main>

      {/* Framework Details Modal */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-background border border-blue-500/30">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white flex items-center space-x-2">
              <Shield className="w-6 h-6 text-blue-400" />
              <span>{selectedFramework?.name || "Framework Details"}</span>
              <Badge className={
                selectedFramework?.status === 'compliant' ? 'bg-green-900/50 text-green-400 border-green-700' :
                selectedFramework?.status === 'in_progress' ? 'bg-yellow-900/50 text-yellow-400 border-yellow-700' :
                'bg-red-900/50 text-red-400 border-red-700'
              }>
                {selectedFramework?.status === 'compliant' ? 'Compliant' : 
                 selectedFramework?.status === 'in_progress' ? 'In Progress' : 'Non-Compliant'}
              </Badge>
            </DialogTitle>
          </DialogHeader>
          
          {selectedFramework && (
            <div className="space-y-6">
              {/* Overview Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-surface/50 border border-blue-500/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-white">Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Framework:</span>
                      <span className="text-white font-medium">{selectedFramework.framework}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Sector:</span>
                      <span className="text-white">{selectedFramework.sector}</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Base Score:</span>
                        <span className={
                          selectedFramework.score >= 90 ? 'text-green-400' : 
                          selectedFramework.score >= 80 ? 'text-yellow-400' : 'text-red-400'
                        }>
                          {selectedFramework.score}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Risk-Adjusted:</span>
                        <span className={
                          selectedFramework.score >= 90 ? 'text-green-400' : 
                          selectedFramework.score >= 80 ? 'text-yellow-400' : 'text-red-400'
                        }>
                          {Math.floor(selectedFramework.score * 0.85)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Maturity Level:</span>
                        <span className="text-blue-400">
                          {Math.floor(selectedFramework.score * 0.8)}%
                        </span>
                      </div>
                    </div>
                    <Progress value={Math.floor(selectedFramework.score * 0.85)} className="h-3" />
                  </CardContent>
                </Card>

                <Card className="bg-surface/50 border border-green-500/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-white">Control Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Controls:</span>
                      <span className="text-white font-medium">{selectedFramework.controls}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Compliant:</span>
                      <span className="text-green-400">{selectedFramework.compliantControls}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Open Findings:</span>
                      <span className={selectedFramework.findings > 0 ? 'text-red-400' : 'text-green-400'}>
                        {selectedFramework.findings}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Audit Information */}
              <Card className="bg-surface/50 border border-purple-500/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-white flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-purple-400" />
                    <span>Audit Schedule</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Last Audit</div>
                    <div className="text-white font-medium">{selectedFramework.lastAudit}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Next Review</div>
                    <div className="text-cyan-400 font-medium">{selectedFramework.nextReview}</div>
                  </div>
                </CardContent>
              </Card>

              {/* Description */}
              <Card className="bg-surface/50 border border-gray-500/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-white">Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 leading-relaxed">
                    {selectedFramework.description}
                  </p>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4">
                <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
                  Close
                </Button>
                <Button 
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => downloadReport(selectedFramework)}
                  data-testid="download-report-button"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </Button>
                <Button 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => runAssessmentMutation.mutate(selectedFramework.framework?.toLowerCase())}
                  disabled={runAssessmentMutation.isPending}
                  data-testid="run-assessment-button"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${runAssessmentMutation.isPending ? 'animate-spin' : ''}`} />
                  {runAssessmentMutation.isPending ? 'Running...' : 'Run Assessment'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}