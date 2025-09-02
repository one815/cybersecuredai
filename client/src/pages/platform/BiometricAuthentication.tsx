import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  Fingerprint,
  Eye,
  Mic,
  Camera,
  User,
  Shield,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Plus,
  Settings,
  Play,
  Square,
  RefreshCw,
  Download,
  Activity,
  Users,
  Smartphone,
  Lock,
  Unlock
} from "lucide-react";

interface BiometricProvider {
  id: string;
  name: string;
  type: 'facial' | 'fingerprint' | 'voice' | 'multimodal';
  status: 'active' | 'inactive' | 'testing';
  accuracy: number;
  enrolledUsers: number;
  lastVerification: Date;
  configuration: any;
}

interface BiometricEnrollment {
  id: string;
  userId: string;
  userName: string;
  providerId: string;
  biometricType: string;
  enrollmentDate: Date;
  lastUsed: Date;
  verificationCount: number;
  status: 'active' | 'pending' | 'failed' | 'revoked';
  accuracy: number;
}

export default function BiometricAuthentication() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testingProvider, setTestingProvider] = useState<string | null>(null);

  // Mock data for demonstration
  const [biometricProviders] = useState<BiometricProvider[]>([
    {
      id: 'auth0_facial',
      name: 'Auth0 Facial Recognition',
      type: 'facial',
      status: 'active',
      accuracy: 99.7,
      enrolledUsers: 1247,
      lastVerification: new Date(),
      configuration: { 
        livenessDetection: true, 
        spoofingDetection: true,
        threshold: 0.85
      }
    },
    {
      id: 'nec_corporation',
      name: 'NEC Corporation Advanced Biometrics',
      type: 'multimodal',
      status: 'active',
      accuracy: 99.9,
      enrolledUsers: 1456,
      lastVerification: new Date(Date.now() - 60000),
      configuration: {
        enterpriseGrade: true,
        facialRecognition: true,
        irisRecognition: true,
        fingerprintRecognition: true,
        palmVeinRecognition: true,
        governmentCertified: true
      }
    },
    {
      id: 'portal_guard_biokey',
      name: 'Portal Guard Bio-Key Enterprise',
      type: 'multimodal',
      status: 'active',
      accuracy: 99.5,
      enrolledUsers: 987,
      lastVerification: new Date(Date.now() - 180000),
      configuration: {
        enterpriseSSO: true,
        fingerprintScanning: true,
        facialRecognition: true,
        voiceRecognition: true,
        fido2Compliant: true,
        activeDirectoryIntegration: true
      }
    }
  ]);

  const [enrollments] = useState<BiometricEnrollment[]>([
    {
      id: 'enroll_001',
      userId: 'user_001',
      userName: 'Sarah Johnson',
      providerId: 'auth0_facial',
      biometricType: 'facial',
      enrollmentDate: new Date('2024-01-15'),
      lastUsed: new Date(),
      verificationCount: 47,
      status: 'active',
      accuracy: 99.8
    },
    {
      id: 'enroll_002',
      userId: 'user_002', 
      userName: 'Mike Davidson',
      providerId: 'nec_corporation',
      biometricType: 'iris',
      enrollmentDate: new Date('2024-01-20'),
      lastUsed: new Date(Date.now() - 1800000),
      verificationCount: 34,
      status: 'active',
      accuracy: 99.9
    },
    {
      id: 'enroll_003',
      userId: 'user_003', 
      userName: 'Emily Chen',
      providerId: 'portal_guard_biokey',
      biometricType: 'fingerprint',
      enrollmentDate: new Date('2024-01-25'),
      lastUsed: new Date(Date.now() - 900000),
      verificationCount: 18,
      status: 'active',
      accuracy: 99.5
    }
  ]);

  const enrollUserMutation = useMutation({
    mutationFn: async (data: { userId: string; providerId: string; biometricData: any }) => {
      const response = await fetch('/api/biometric/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to enroll user');
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Enrollment Successful",
        description: "User has been successfully enrolled for biometric authentication.",
      });
      setIsEnrolling(false);
      queryClient.invalidateQueries({ queryKey: ['/api/biometric/enrollments'] });
    },
    onError: () => {
      toast({
        title: "Enrollment Failed",
        description: "Failed to enroll user. Please try again.",
        variant: "destructive",
      });
    },
  });

  const testProviderMutation = useMutation({
    mutationFn: async (data: { providerId: string; testType: string }) => {
      const response = await fetch(`/api/biometric/${data.providerId}/test`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ testType: data.testType })
      });
      if (!response.ok) throw new Error('Failed to test provider');
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Test Completed",
        description: "Biometric provider test completed successfully.",
      });
      setIsTesting(false);
      setTestingProvider(null);
    },
    onError: () => {
      toast({
        title: "Test Failed",
        description: "Provider test failed. Please check configuration.",
        variant: "destructive",
      });
    },
  });

  const getProviderIcon = (type: string) => {
    switch (type) {
      case 'facial': return <Camera className="w-5 h-5 text-blue-500" />;
      case 'fingerprint': return <Fingerprint className="w-5 h-5 text-green-500" />;
      case 'voice': return <Mic className="w-5 h-5 text-purple-500" />;
      case 'multimodal': return <Eye className="w-5 h-5 text-orange-500" />;
      default: return <User className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'inactive': return <XCircle className="w-4 h-4 text-gray-500" />;
      case 'testing': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'failed': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'testing': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'failed': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
                  <Fingerprint className="w-8 h-8 mr-3 text-spring-green" />
                  Biometric Authentication
                </h1>
                <p className="text-gray-400">
                  Advanced biometric security with facial, voice, and multi-modal authentication
                </p>
              </div>
              <Dialog open={isEnrolling} onOpenChange={setIsEnrolling}>
                <DialogTrigger asChild>
                  <Button className="bg-spring-green hover:bg-spring-green/80 text-midnight-blue">
                    <Plus className="w-4 h-4 mr-2" />
                    Enroll User
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-surface border border-gray-700">
                  <DialogHeader>
                    <DialogTitle className="text-white">Enroll User for Biometric Authentication</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div>
                      <Label className="text-gray-300">User</Label>
                      <Select>
                        <SelectTrigger className="bg-midnight-blue border-gray-600 text-white">
                          <SelectValue placeholder="Select user to enroll" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user_001">Sarah Johnson (Faculty)</SelectItem>
                          <SelectItem value="user_002">Mike Davidson (Student)</SelectItem>
                          <SelectItem value="user_003">Emily Rodriguez (Admin)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-gray-300">Biometric Provider</Label>
                      <Select>
                        <SelectTrigger className="bg-midnight-blue border-gray-600 text-white">
                          <SelectValue placeholder="Select authentication method" />
                        </SelectTrigger>
                        <SelectContent>
                          {biometricProviders.filter(p => p.status === 'active').map(provider => (
                            <SelectItem key={provider.id} value={provider.id}>
                              {provider.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="bg-midnight-blue/50 p-4 rounded-lg border border-gray-600">
                      <h4 className="text-white font-medium mb-2">Enrollment Instructions</h4>
                      <p className="text-gray-400 text-sm">
                        The user will need to complete the biometric capture process using their device camera/microphone. 
                        This typically takes 2-3 minutes and requires good lighting and audio conditions.
                      </p>
                    </div>
                    <div className="flex justify-end space-x-2 pt-4">
                      <Button variant="outline" onClick={() => setIsEnrolling(false)}>
                        Cancel
                      </Button>
                      <Button 
                        className="bg-spring-green hover:bg-spring-green/80 text-midnight-blue"
                        onClick={() => {
                          enrollUserMutation.mutate({
                            userId: 'user_001',
                            providerId: 'auth0_facial',
                            biometricData: { quality: 'high' }
                          });
                        }}
                        disabled={enrollUserMutation.isPending}
                      >
                        {enrollUserMutation.isPending ? 'Enrolling...' : 'Start Enrollment'}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-surface/80 backdrop-blur-md border border-spring-green/30 cyber-glow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-white flex items-center">
                  <Users className="w-5 h-5 mr-2 text-spring-green" />
                  Enrolled Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-spring-green">
                  {biometricProviders.reduce((sum, provider) => sum + provider.enrolledUsers, 0)}
                </div>
                <p className="text-gray-400 text-sm">across all providers</p>
              </CardContent>
            </Card>

            <Card className="bg-surface/80 backdrop-blur-md border border-spring-green/30 cyber-glow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-white flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-spring-green" />
                  Active Providers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-spring-green">
                  {biometricProviders.filter(p => p.status === 'active').length}
                </div>
                <p className="text-gray-400 text-sm">authentication methods</p>
              </CardContent>
            </Card>

            <Card className="bg-surface/80 backdrop-blur-md border border-spring-green/30 cyber-glow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-white flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-spring-green" />
                  Accuracy Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-spring-green">
                  {(biometricProviders.reduce((sum, p) => sum + p.accuracy, 0) / biometricProviders.length).toFixed(1)}%
                </div>
                <p className="text-gray-400 text-sm">average accuracy</p>
              </CardContent>
            </Card>

            <Card className="bg-surface/80 backdrop-blur-md border border-spring-green/30 cyber-glow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-white flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-spring-green" />
                  Success Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-spring-green">97.8%</div>
                <p className="text-gray-400 text-sm">verification success</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="providers" className="space-y-6">
            <TabsList className="bg-surface/50 border border-gray-700">
              <TabsTrigger value="providers" className="data-[state=active]:bg-spring-green data-[state=active]:text-midnight-blue">
                Providers
              </TabsTrigger>
              <TabsTrigger value="enrollments" className="data-[state=active]:bg-spring-green data-[state=active]:text-midnight-blue">
                User Enrollments
              </TabsTrigger>
              <TabsTrigger value="testing" className="data-[state=active]:bg-spring-green data-[state=active]:text-midnight-blue">
                Testing & Validation
              </TabsTrigger>
            </TabsList>

            {/* Providers Tab */}
            <TabsContent value="providers" className="space-y-6">
              <div className="grid gap-6">
                {biometricProviders.map((provider) => (
                  <Card key={provider.id} className="bg-surface/80 backdrop-blur-md border border-gray-700">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {getProviderIcon(provider.type)}
                          <div>
                            <CardTitle className="text-white">{provider.name}</CardTitle>
                            <p className="text-gray-400 text-sm capitalize">
                              {provider.type.replace('_', ' ')} Authentication
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(provider.status)}>
                            {getStatusIcon(provider.status)}
                            <span className="ml-1 capitalize">{provider.status}</span>
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-gray-400 text-sm">Accuracy</p>
                          <p className="text-white font-medium">{provider.accuracy}%</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Enrolled Users</p>
                          <p className="text-white font-medium">{provider.enrolledUsers.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Last Verification</p>
                          <p className="text-white font-medium">
                            {Math.floor((Date.now() - provider.lastVerification.getTime()) / 60000)} min ago
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Provider Type</p>
                          <p className="text-white font-medium capitalize">
                            {provider.type.replace('_', ' ')}
                          </p>
                        </div>
                      </div>
                      
                      {/* Configuration Details */}
                      <div className="bg-midnight-blue/30 p-3 rounded-lg mb-4">
                        <h5 className="text-white font-medium mb-2">Configuration</h5>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                          {Object.entries(provider.configuration).map(([key, value]) => (
                            <div key={key} className="flex items-center space-x-2">
                              <span className="text-gray-400 capitalize">
                                {key.replace(/([A-Z])/g, ' $1').toLowerCase()}:
                              </span>
                              <span className="text-white">
                                {typeof value === 'boolean' ? (value ? 'Enabled' : 'Disabled') : String(value)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm">
                          <Settings className="w-4 h-4 mr-1" />
                          Configure
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setTestingProvider(provider.id);
                            setIsTesting(true);
                          }}
                        >
                          <Play className="w-4 h-4 mr-1" />
                          Test Provider
                        </Button>
                        <Button variant="outline" size="sm">
                          <Activity className="w-4 h-4 mr-1" />
                          View Analytics
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Enrollments Tab */}
            <TabsContent value="enrollments" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-white">User Enrollments</h3>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-1" />
                    Export Report
                  </Button>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4 mr-1" />
                    Refresh
                  </Button>
                </div>
              </div>

              <div className="grid gap-4">
                {enrollments.map((enrollment) => (
                  <Card key={enrollment.id} className="bg-surface/80 backdrop-blur-md border border-gray-700">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <User className="w-5 h-5 text-spring-green" />
                          <div>
                            <h4 className="text-white font-medium">{enrollment.userName}</h4>
                            <p className="text-gray-400 text-sm">
                              {biometricProviders.find(p => p.id === enrollment.providerId)?.name} • 
                              {enrollment.biometricType} authentication
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="text-white text-sm">Accuracy: {enrollment.accuracy}%</p>
                            <p className="text-gray-400 text-xs">
                              {enrollment.verificationCount} verifications
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-white text-sm">
                              Enrolled: {enrollment.enrollmentDate.toLocaleDateString()}
                            </p>
                            <p className="text-gray-400 text-xs">
                              Last used: {Math.floor((Date.now() - enrollment.lastUsed.getTime()) / 3600000)}h ago
                            </p>
                          </div>
                          <Badge className={getStatusColor(enrollment.status)}>
                            {enrollment.status}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Testing Tab */}
            <TabsContent value="testing" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-surface/80 backdrop-blur-md border border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Play className="w-5 h-5 mr-2 text-spring-green" />
                      Quick Test
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-gray-300">Select Provider</Label>
                      <Select>
                        <SelectTrigger className="bg-midnight-blue border-gray-600 text-white">
                          <SelectValue placeholder="Choose provider to test" />
                        </SelectTrigger>
                        <SelectContent>
                          {biometricProviders.map(provider => (
                            <SelectItem key={provider.id} value={provider.id}>
                              {provider.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-gray-300">Test Type</Label>
                      <Select>
                        <SelectTrigger className="bg-midnight-blue border-gray-600 text-white">
                          <SelectValue placeholder="Select test type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="liveness">Liveness Detection</SelectItem>
                          <SelectItem value="spoofing">Anti-Spoofing</SelectItem>
                          <SelectItem value="accuracy">Accuracy Test</SelectItem>
                          <SelectItem value="performance">Performance Test</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button 
                      className="w-full bg-spring-green hover:bg-spring-green/80 text-midnight-blue"
                      onClick={() => {
                        testProviderMutation.mutate({
                          providerId: 'auth0_facial',
                          testType: 'liveness'
                        });
                      }}
                      disabled={testProviderMutation.isPending}
                    >
                      {testProviderMutation.isPending ? 'Running Test...' : 'Start Test'}
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-surface/80 backdrop-blur-md border border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Activity className="w-5 h-5 mr-2 text-spring-green" />
                      Test Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Last Test</span>
                        <span className="text-white">Liveness Detection</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Result</span>
                        <Badge className="bg-green-100 text-green-800">Passed</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Accuracy</span>
                        <span className="text-white">99.7%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Response Time</span>
                        <span className="text-white">1.2s</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Date</span>
                        <span className="text-white">
                          {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                    <Button className="w-full" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download Report
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Test Provider Dialog */}
          <Dialog open={isTesting} onOpenChange={setIsTesting}>
            <DialogContent className="bg-surface border border-gray-700">
              <DialogHeader>
                <DialogTitle className="text-white">Test Biometric Provider</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="bg-midnight-blue/50 p-4 rounded-lg border border-gray-600">
                  <h4 className="text-white font-medium mb-2">Testing Configuration</h4>
                  <p className="text-gray-400 text-sm mb-3">
                    This will run a comprehensive test of the selected biometric provider including
                    liveness detection, anti-spoofing, and accuracy validation.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="liveness" defaultChecked />
                      <Label htmlFor="liveness" className="text-gray-300">Liveness Detection</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="spoofing" defaultChecked />
                      <Label htmlFor="spoofing" className="text-gray-300">Anti-Spoofing</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="accuracy" defaultChecked />
                      <Label htmlFor="accuracy" className="text-gray-300">Accuracy Test</Label>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setIsTesting(false)}>
                    Cancel
                  </Button>
                  <Button 
                    className="bg-spring-green hover:bg-spring-green/80 text-midnight-blue"
                    onClick={() => {
                      if (testingProvider) {
                        testProviderMutation.mutate({
                          providerId: testingProvider,
                          testType: 'comprehensive'
                        });
                      }
                    }}
                    disabled={testProviderMutation.isPending}
                  >
                    {testProviderMutation.isPending ? 'Testing...' : 'Run Tests'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
    </div>
  );
}