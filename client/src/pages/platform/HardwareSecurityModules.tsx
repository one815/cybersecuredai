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
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { MarketingLayout } from "@/components/MarketingLayout";
import { 
  Shield, 
  Key,
  HardDrive,
  Server,
  Cpu,
  Activity,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Plus,
  Settings,
  Lock,
  Unlock,
  RefreshCw,
  Download,
  Upload,
  Eye,
  EyeOff,
  Zap,
  Database
} from "lucide-react";

interface HSMDevice {
  id: string;
  type: 'thales_luna' | 'yubihsm2' | 'aws_cloud_hsm';
  name: string;
  status: 'active' | 'inactive' | 'maintenance' | 'error';
  firmwareVersion: string;
  serialNumber: string;
  location: string;
  keyCount: number;
  maxKeys: number;
  lastHealthCheck: Date;
  configuration: any;
}

interface HSMKey {
  id: string;
  deviceId: string;
  label: string;
  keyType: string;
  keySize: number;
  purpose: string;
  createdAt: Date;
  lastUsed: Date;
  usageCount: number;
  status: 'active' | 'inactive' | 'revoked';
}

export default function HardwareSecurityModules() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [isAddingDevice, setIsAddingDevice] = useState(false);
  const [isGeneratingKey, setIsGeneratingKey] = useState(false);

  // Mock data for demonstration
  const [hsmDevices] = useState<HSMDevice[]>([
    {
      id: 'thales_001',
      type: 'thales_luna',
      name: 'Thales Luna HSM - Primary',
      status: 'active',
      firmwareVersion: '7.7.0',
      serialNumber: 'TL-001-2024',
      location: 'Data Center - Rack A1',
      keyCount: 47,
      maxKeys: 1000,
      lastHealthCheck: new Date(),
      configuration: { fipsLevel: 'Level 3', clustering: true }
    },
    {
      id: 'yubi_001',
      type: 'yubihsm2',
      name: 'YubiHSM 2 - Development',
      status: 'active',
      firmwareVersion: '2.3.1',
      serialNumber: 'YH-002-2024',
      location: 'Development Lab',
      keyCount: 12,
      maxKeys: 256,
      lastHealthCheck: new Date(Date.now() - 300000),
      configuration: { authKeyCount: 3, wrapKeys: 5 }
    },
    {
      id: 'aws_001',
      type: 'aws_cloud_hsm',
      name: 'AWS CloudHSM - Cluster',
      status: 'active',
      firmwareVersion: '3.4.5',
      serialNumber: 'AWSHSM-CLUSTER-001',
      location: 'AWS us-east-1',
      keyCount: 89,
      maxKeys: 3300,
      lastHealthCheck: new Date(Date.now() - 150000),
      configuration: { clusterSize: 2, backup: 'enabled' }
    }
  ]);

  const [hsmKeys] = useState<HSMKey[]>([
    {
      id: 'key_001',
      deviceId: 'thales_001',
      label: 'Master-Encryption-Key',
      keyType: 'AES',
      keySize: 256,
      purpose: 'data_encryption',
      createdAt: new Date('2024-01-15'),
      lastUsed: new Date(),
      usageCount: 1247,
      status: 'active'
    },
    {
      id: 'key_002',
      deviceId: 'thales_001',
      label: 'Digital-Signature-RSA',
      keyType: 'RSA',
      keySize: 4096,
      purpose: 'digital_signature',
      createdAt: new Date('2024-01-20'),
      lastUsed: new Date(Date.now() - 3600000),
      usageCount: 89,
      status: 'active'
    }
  ]);

  const initializeDeviceMutation = useMutation({
    mutationFn: async (data: { deviceType: string; configuration: any }) => {
      return await apiRequest('/api/hsm/initialize', {
        method: 'POST',
        body: JSON.stringify(data)
      });
    },
    onSuccess: () => {
      toast({
        title: "HSM Device Initialized",
        description: "Hardware security module has been successfully configured.",
      });
      setIsAddingDevice(false);
      queryClient.invalidateQueries({ queryKey: ['/api/hsm/devices'] });
    },
    onError: () => {
      toast({
        title: "Initialization Failed",
        description: "Failed to initialize HSM device. Please check configuration.",
        variant: "destructive",
      });
    },
  });

  const generateKeyMutation = useMutation({
    mutationFn: async (data: { deviceId: string; keyData: any }) => {
      return await apiRequest(`/api/hsm/${data.deviceId}/generate-key`, {
        method: 'POST',
        body: JSON.stringify(data.keyData)
      });
    },
    onSuccess: () => {
      toast({
        title: "Key Generated",
        description: "Cryptographic key has been successfully generated.",
      });
      setIsGeneratingKey(false);
      queryClient.invalidateQueries({ queryKey: ['/api/hsm/keys'] });
    },
    onError: () => {
      toast({
        title: "Key Generation Failed",
        description: "Failed to generate cryptographic key. Please try again.",
        variant: "destructive",
      });
    },
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'inactive': return <XCircle className="w-4 h-4 text-gray-500" />;
      case 'maintenance': return <Settings className="w-4 h-4 text-yellow-500" />;
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDeviceTypeIcon = (type: string) => {
    switch (type) {
      case 'thales_luna': return <Shield className="w-5 h-5 text-blue-500" />;
      case 'yubihsm2': return <Key className="w-5 h-5 text-green-500" />;
      case 'aws_cloud_hsm': return <Server className="w-5 h-5 text-orange-500" />;
      default: return <HardDrive className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <MarketingLayout>
      <div className="ai-dashboard-bg min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
                  <Shield className="w-8 h-8 mr-3 text-spring-green" />
                  Hardware Security Modules
                </h1>
                <p className="text-gray-400">
                  Enterprise-grade cryptographic key management and hardware security
                </p>
              </div>
              <Dialog open={isAddingDevice} onOpenChange={setIsAddingDevice}>
                <DialogTrigger asChild>
                  <Button className="bg-spring-green hover:bg-spring-green/80 text-midnight-blue">
                    <Plus className="w-4 h-4 mr-2" />
                    Add HSM Device
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-surface border border-gray-700">
                  <DialogHeader>
                    <DialogTitle className="text-white">Initialize HSM Device</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div>
                      <Label className="text-gray-300">Device Type</Label>
                      <Select>
                        <SelectTrigger className="bg-midnight-blue border-gray-600 text-white">
                          <SelectValue placeholder="Select HSM type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="thales_luna">Thales Luna HSM</SelectItem>
                          <SelectItem value="yubihsm2">YubiHSM 2</SelectItem>
                          <SelectItem value="aws_cloud_hsm">AWS CloudHSM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-gray-300">Device Name</Label>
                      <Input 
                        className="bg-midnight-blue border-gray-600 text-white" 
                        placeholder="Enter device name"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Location</Label>
                      <Input 
                        className="bg-midnight-blue border-gray-600 text-white" 
                        placeholder="Physical or logical location"
                      />
                    </div>
                    <div className="flex justify-end space-x-2 pt-4">
                      <Button variant="outline" onClick={() => setIsAddingDevice(false)}>
                        Cancel
                      </Button>
                      <Button 
                        className="bg-spring-green hover:bg-spring-green/80 text-midnight-blue"
                        onClick={() => {
                          initializeDeviceMutation.mutate({
                            deviceType: 'thales_luna',
                            configuration: { fipsLevel: 'Level 3' }
                          });
                        }}
                        disabled={initializeDeviceMutation.isPending}
                      >
                        {initializeDeviceMutation.isPending ? 'Initializing...' : 'Initialize Device'}
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
                  <Server className="w-5 h-5 mr-2 text-spring-green" />
                  Active Devices
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-spring-green">
                  {hsmDevices.filter(d => d.status === 'active').length}
                </div>
                <p className="text-gray-400 text-sm">of {hsmDevices.length} total</p>
              </CardContent>
            </Card>

            <Card className="bg-surface/80 backdrop-blur-md border border-spring-green/30 cyber-glow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-white flex items-center">
                  <Key className="w-5 h-5 mr-2 text-spring-green" />
                  Total Keys
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-spring-green">
                  {hsmDevices.reduce((sum, device) => sum + device.keyCount, 0)}
                </div>
                <p className="text-gray-400 text-sm">cryptographic keys</p>
              </CardContent>
            </Card>

            <Card className="bg-surface/80 backdrop-blur-md border border-spring-green/30 cyber-glow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-white flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-spring-green" />
                  Health Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-spring-green">100%</div>
                <p className="text-gray-400 text-sm">operational</p>
              </CardContent>
            </Card>

            <Card className="bg-surface/80 backdrop-blur-md border border-spring-green/30 cyber-glow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-white flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-spring-green" />
                  FIPS Compliance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-spring-green">Level 3</div>
                <p className="text-gray-400 text-sm">certified</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="devices" className="space-y-6">
            <TabsList className="bg-surface/50 border border-gray-700">
              <TabsTrigger value="devices" className="data-[state=active]:bg-spring-green data-[state=active]:text-midnight-blue">
                HSM Devices
              </TabsTrigger>
              <TabsTrigger value="keys" className="data-[state=active]:bg-spring-green data-[state=active]:text-midnight-blue">
                Key Management
              </TabsTrigger>
              <TabsTrigger value="operations" className="data-[state=active]:bg-spring-green data-[state=active]:text-midnight-blue">
                Operations
              </TabsTrigger>
            </TabsList>

            {/* Devices Tab */}
            <TabsContent value="devices" className="space-y-6">
              <div className="grid gap-6">
                {hsmDevices.map((device) => (
                  <Card key={device.id} className="bg-surface/80 backdrop-blur-md border border-gray-700">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {getDeviceTypeIcon(device.type)}
                          <div>
                            <CardTitle className="text-white">{device.name}</CardTitle>
                            <p className="text-gray-400 text-sm">{device.location}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(device.status)}>
                            {getStatusIcon(device.status)}
                            <span className="ml-1 capitalize">{device.status}</span>
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-gray-400 text-sm">Firmware</p>
                          <p className="text-white font-medium">{device.firmwareVersion}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Serial Number</p>
                          <p className="text-white font-medium">{device.serialNumber}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Key Usage</p>
                          <p className="text-white font-medium">
                            {device.keyCount} / {device.maxKeys}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Last Health Check</p>
                          <p className="text-white font-medium">
                            {Math.floor((Date.now() - device.lastHealthCheck.getTime()) / 60000)} min ago
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2 mt-4">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="w-4 h-4 mr-1" />
                          Configure
                        </Button>
                        <Button variant="outline" size="sm">
                          <RefreshCw className="w-4 h-4 mr-1" />
                          Health Check
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Keys Tab */}
            <TabsContent value="keys" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-white">Cryptographic Keys</h3>
                <Dialog open={isGeneratingKey} onOpenChange={setIsGeneratingKey}>
                  <DialogTrigger asChild>
                    <Button className="bg-spring-green hover:bg-spring-green/80 text-midnight-blue">
                      <Plus className="w-4 h-4 mr-2" />
                      Generate Key
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-surface border border-gray-700">
                    <DialogHeader>
                      <DialogTitle className="text-white">Generate Cryptographic Key</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      <div>
                        <Label className="text-gray-300">Target Device</Label>
                        <Select>
                          <SelectTrigger className="bg-midnight-blue border-gray-600 text-white">
                            <SelectValue placeholder="Select HSM device" />
                          </SelectTrigger>
                          <SelectContent>
                            {hsmDevices.filter(d => d.status === 'active').map(device => (
                              <SelectItem key={device.id} value={device.id}>
                                {device.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-gray-300">Key Type</Label>
                        <Select>
                          <SelectTrigger className="bg-midnight-blue border-gray-600 text-white">
                            <SelectValue placeholder="Select key type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="aes">AES (Symmetric)</SelectItem>
                            <SelectItem value="rsa">RSA (Asymmetric)</SelectItem>
                            <SelectItem value="ecc">ECC (Elliptic Curve)</SelectItem>
                            <SelectItem value="hmac">HMAC (Authentication)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-gray-300">Key Size</Label>
                        <Select>
                          <SelectTrigger className="bg-midnight-blue border-gray-600 text-white">
                            <SelectValue placeholder="Select key size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="256">256 bits</SelectItem>
                            <SelectItem value="2048">2048 bits</SelectItem>
                            <SelectItem value="4096">4096 bits</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-gray-300">Key Label</Label>
                        <Input 
                          className="bg-midnight-blue border-gray-600 text-white" 
                          placeholder="Enter key label"
                        />
                      </div>
                      <div>
                        <Label className="text-gray-300">Purpose</Label>
                        <Select>
                          <SelectTrigger className="bg-midnight-blue border-gray-600 text-white">
                            <SelectValue placeholder="Select purpose" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="data_encryption">Data Encryption</SelectItem>
                            <SelectItem value="digital_signature">Digital Signature</SelectItem>
                            <SelectItem value="key_wrapping">Key Wrapping</SelectItem>
                            <SelectItem value="authentication">Authentication</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex justify-end space-x-2 pt-4">
                        <Button variant="outline" onClick={() => setIsGeneratingKey(false)}>
                          Cancel
                        </Button>
                        <Button 
                          className="bg-spring-green hover:bg-spring-green/80 text-midnight-blue"
                          onClick={() => {
                            generateKeyMutation.mutate({
                              deviceId: 'thales_001',
                              keyData: {
                                keyType: 'AES',
                                keySize: 256,
                                purpose: 'data_encryption',
                                label: 'Generated-Key'
                              }
                            });
                          }}
                          disabled={generateKeyMutation.isPending}
                        >
                          {generateKeyMutation.isPending ? 'Generating...' : 'Generate Key'}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid gap-4">
                {hsmKeys.map((key) => (
                  <Card key={key.id} className="bg-surface/80 backdrop-blur-md border border-gray-700">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Lock className="w-5 h-5 text-spring-green" />
                          <div>
                            <h4 className="text-white font-medium">{key.label}</h4>
                            <p className="text-gray-400 text-sm">
                              {key.keyType} {key.keySize}-bit • {key.purpose.replace('_', ' ')}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="text-white text-sm">Used {key.usageCount} times</p>
                            <p className="text-gray-400 text-xs">
                              Last: {Math.floor((Date.now() - key.lastUsed.getTime()) / 3600000)}h ago
                            </p>
                          </div>
                          <Badge className={getStatusColor(key.status)}>
                            {key.status}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Operations Tab */}
            <TabsContent value="operations" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-surface/80 backdrop-blur-md border border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Database className="w-5 h-5 mr-2 text-spring-green" />
                      Backup & Recovery
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Last Backup</span>
                      <span className="text-white">2 hours ago</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Backup Status</span>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <div className="space-y-2">
                      <Button className="w-full" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Create Backup
                      </Button>
                      <Button className="w-full" variant="outline">
                        <Upload className="w-4 h-4 mr-2" />
                        Restore from Backup
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-surface/80 backdrop-blur-md border border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Activity className="w-5 h-5 mr-2 text-spring-green" />
                      Performance Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Operations/sec</span>
                      <span className="text-white">1,247</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Response Time</span>
                      <span className="text-white">2.3ms</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Error Rate</span>
                      <span className="text-white">0.01%</span>
                    </div>
                    <Button className="w-full" variant="outline">
                      <Eye className="w-4 h-4 mr-2" />
                      View Detailed Metrics
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MarketingLayout>
  );
}