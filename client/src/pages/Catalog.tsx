import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  Package, 
  Settings, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp, 
  BarChart3, 
  Eye, 
  Edit, 
  Plus,
  Shield,
  Brain,
  Network,
  Search,
  Filter
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Schema for product form
const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  productCode: z.string().min(1, "Product code is required"),
  categoryId: z.string().min(1, "Category is required"),
  shortDescription: z.string().min(1, "Description is required"),
  fullDescription: z.string().optional(),
  totalCostPrice: z.number().min(0, "Cost price must be positive"),
  commercialSellPrice: z.number().min(0, "Commercial price must be positive"),
  federalSellPrice: z.number().min(0, "Federal price must be positive"),
  gsaPrice: z.number().optional(),
  productStatus: z.enum(["active", "deprecated", "planned", "beta"]),
  licenseModel: z.string().optional(),
  deploymentModel: z.string().optional(),
  supportLevel: z.enum(["basic", "standard", "premium", "enterprise"]),
});

// Schema for service form
const serviceSchema = z.object({
  name: z.string().min(1, "Service name is required"),
  serviceCode: z.string().min(1, "Service code is required"),
  categoryId: z.string().min(1, "Category is required"),
  shortDescription: z.string().min(1, "Description is required"),
  serviceType: z.enum(["professional", "managed", "consulting", "support"]),
  serviceDelivery: z.enum(["on-site", "remote", "hybrid"]),
  requiredSkillLevel: z.enum(["junior", "senior", "expert", "architect"]),
  hourlyRate: z.number().min(0, "Hourly rate must be positive").optional(),
  dailyRate: z.number().min(0, "Daily rate must be positive").optional(),
  deliveryCost: z.number().min(0, "Delivery cost must be positive"),
  commercialSellPrice: z.number().min(0, "Commercial price must be positive"),
  federalSellPrice: z.number().min(0, "Federal price must be positive"),
});

// Schema for solution form
const solutionSchema = z.object({
  name: z.string().min(1, "Solution name is required"),
  solutionCode: z.string().min(1, "Solution code is required"),
  categoryId: z.string().min(1, "Category is required"),
  shortDescription: z.string().min(1, "Description is required"),
  solutionType: z.enum(["integrated", "bundled", "enterprise", "pilot"]),
  targetAudience: z.enum(["federal", "education", "healthcare", "commercial"]),
  deploymentSize: z.enum(["small", "medium", "large", "enterprise"]),
  totalSolutionCost: z.number().min(0, "Solution cost must be positive"),
  commercialSellPrice: z.number().min(0, "Commercial price must be positive"),
  federalSellPrice: z.number().min(0, "Federal price must be positive"),
  bundleDiscountPercent: z.number().min(0).max(100).optional(),
});

type ProductFormData = z.infer<typeof productSchema>;
type ServiceFormData = z.infer<typeof serviceSchema>;
type SolutionFormData = z.infer<typeof solutionSchema>;

export default function Catalog() {
  const [activeTab, setActiveTab] = useState("products");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch catalog data
  const { data: products, isLoading: productsLoading } = useQuery({
    queryKey: ['/api/catalog/products'],
    enabled: activeTab === "products"
  });

  const { data: services, isLoading: servicesLoading } = useQuery({
    queryKey: ['/api/catalog/services'],
    enabled: activeTab === "services"
  });

  const { data: solutions, isLoading: solutionsLoading } = useQuery({
    queryKey: ['/api/catalog/solutions'],
    enabled: activeTab === "solutions"
  });

  const { data: categories } = useQuery({
    queryKey: ['/api/catalog/categories']
  });

  const { data: metrics } = useQuery({
    queryKey: ['/api/catalog/metrics']
  });

  // Product form
  const productForm = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      supportLevel: "standard",
      productStatus: "active"
    }
  });

  // Service form
  const serviceForm = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      serviceType: "professional",
      serviceDelivery: "remote",
      requiredSkillLevel: "senior"
    }
  });

  // Solution form
  const solutionForm = useForm<SolutionFormData>({
    resolver: zodResolver(solutionSchema),
    defaultValues: {
      solutionType: "integrated",
      targetAudience: "federal",
      deploymentSize: "medium"
    }
  });

  // Mutations for creating items
  const createProductMutation = useMutation({
    mutationFn: async (data: ProductFormData) => {
      const response = await fetch('/api/catalog/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to create product');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/catalog/products'] });
      queryClient.invalidateQueries({ queryKey: ['/api/catalog/metrics'] });
      toast({ title: "Product created successfully" });
      productForm.reset();
    }
  });

  const createServiceMutation = useMutation({
    mutationFn: async (data: ServiceFormData) => {
      const response = await fetch('/api/catalog/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to create service');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/catalog/services'] });
      queryClient.invalidateQueries({ queryKey: ['/api/catalog/metrics'] });
      toast({ title: "Service created successfully" });
      serviceForm.reset();
    }
  });

  const createSolutionMutation = useMutation({
    mutationFn: async (data: SolutionFormData) => {
      const response = await fetch('/api/catalog/solutions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to create solution');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/catalog/solutions'] });
      queryClient.invalidateQueries({ queryKey: ['/api/catalog/metrics'] });
      toast({ title: "Solution created successfully" });
      solutionForm.reset();
    }
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'deprecated': return 'bg-red-100 text-red-800';
      case 'planned': return 'bg-blue-100 text-blue-800';
      case 'beta': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl" data-testid="catalog-page">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            CyberSecured AI Catalog
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Comprehensive product, service, and solution catalog for federal cybersecurity offerings
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Shield className="h-8 w-8 text-blue-600" />
          <Brain className="h-8 w-8 text-purple-600" />
          <Network className="h-8 w-8 text-green-600" />
        </div>
      </div>

      {/* Metrics Cards */}
      {metrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.totalProducts}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Services</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.totalServices}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Solutions</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.totalSolutions}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Margin</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round((metrics.averageProductMargin + metrics.averageServiceMargin) / 2)}%
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Search and Filter */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search catalog..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            data-testid="search-catalog"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Categories</SelectItem>
            {categories?.map((category: any) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="products" data-testid="tab-products">Products</TabsTrigger>
          <TabsTrigger value="services" data-testid="tab-services">Services</TabsTrigger>
          <TabsTrigger value="solutions" data-testid="tab-solutions">Solutions</TabsTrigger>
        </TabsList>

        {/* Products Tab */}
        <TabsContent value="products" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Products</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button data-testid="add-product-button">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Product</DialogTitle>
                </DialogHeader>
                <Form {...productForm}>
                  <form onSubmit={productForm.handleSubmit((data) => createProductMutation.mutate(data))} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={productForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Product Name</FormLabel>
                            <FormControl>
                              <Input {...field} data-testid="input-product-name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={productForm.control}
                        name="productCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Product Code</FormLabel>
                            <FormControl>
                              <Input {...field} data-testid="input-product-code" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={productForm.control}
                      name="categoryId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-product-category">
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories?.filter((cat: any) => cat.categoryType === 'product').map((category: any) => (
                                <SelectItem key={category.id} value={category.id}>
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={productForm.control}
                      name="shortDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea {...field} data-testid="textarea-product-description" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-3 gap-4">
                      <FormField
                        control={productForm.control}
                        name="totalCostPrice"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Cost Price ($)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                {...field} 
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                data-testid="input-product-cost-price"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={productForm.control}
                        name="commercialSellPrice"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Commercial Price ($)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                {...field} 
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                data-testid="input-product-commercial-price"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={productForm.control}
                        name="federalSellPrice"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Federal Price ($)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                {...field} 
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                data-testid="input-product-federal-price"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={productForm.control}
                        name="productStatus"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-product-status">
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="deprecated">Deprecated</SelectItem>
                                <SelectItem value="planned">Planned</SelectItem>
                                <SelectItem value="beta">Beta</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={productForm.control}
                        name="supportLevel"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Support Level</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-product-support">
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="basic">Basic</SelectItem>
                                <SelectItem value="standard">Standard</SelectItem>
                                <SelectItem value="premium">Premium</SelectItem>
                                <SelectItem value="enterprise">Enterprise</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      disabled={createProductMutation.isPending}
                      className="w-full"
                      data-testid="submit-product-form"
                    >
                      {createProductMutation.isPending ? "Creating..." : "Create Product"}
                    </Button>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {productsLoading ? (
              <div className="text-center py-8">Loading products...</div>
            ) : products?.length === 0 ? (
              <Card className="p-8 text-center">
                <CardContent>
                  <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No products found</h3>
                  <p className="text-gray-500 dark:text-gray-400">Get started by adding your first product to the catalog.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {products?.map((product: any) => (
                  <Card key={product.id} data-testid={`product-card-${product.id}`}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center space-x-2">
                            <span>{product.name}</span>
                            <Badge className={getStatusColor(product.productStatus)}>
                              {product.productStatus}
                            </Badge>
                          </CardTitle>
                          <CardDescription>
                            Code: {product.productCode} | {product.shortDescription}
                          </CardDescription>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm" data-testid={`view-product-${product.id}`}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" data-testid={`edit-product-${product.id}`}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label className="text-sm text-gray-500">Cost Price</Label>
                          <p className="text-lg font-semibold">{formatPrice(product.totalCostPrice)}</p>
                        </div>
                        <div>
                          <Label className="text-sm text-gray-500">Commercial Price</Label>
                          <p className="text-lg font-semibold text-blue-600">{formatPrice(product.commercialSellPrice)}</p>
                        </div>
                        <div>
                          <Label className="text-sm text-gray-500">Federal Price</Label>
                          <p className="text-lg font-semibold text-green-600">{formatPrice(product.federalSellPrice)}</p>
                        </div>
                      </div>
                      {product.gsaPrice && (
                        <div className="mt-4 pt-4 border-t">
                          <Label className="text-sm text-gray-500">GSA Price</Label>
                          <p className="text-lg font-semibold text-purple-600">{formatPrice(product.gsaPrice)}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        {/* Services Tab */}
        <TabsContent value="services" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Services</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button data-testid="add-service-button">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Service
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Service</DialogTitle>
                </DialogHeader>
                <Form {...serviceForm}>
                  <form onSubmit={serviceForm.handleSubmit((data) => createServiceMutation.mutate(data))} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={serviceForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Service Name</FormLabel>
                            <FormControl>
                              <Input {...field} data-testid="input-service-name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={serviceForm.control}
                        name="serviceCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Service Code</FormLabel>
                            <FormControl>
                              <Input {...field} data-testid="input-service-code" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={serviceForm.control}
                      name="categoryId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-service-category">
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories?.filter((cat: any) => cat.categoryType === 'service').map((category: any) => (
                                <SelectItem key={category.id} value={category.id}>
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={serviceForm.control}
                      name="shortDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea {...field} data-testid="textarea-service-description" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-3 gap-4">
                      <FormField
                        control={serviceForm.control}
                        name="serviceType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Service Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-service-type">
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="professional">Professional</SelectItem>
                                <SelectItem value="managed">Managed</SelectItem>
                                <SelectItem value="consulting">Consulting</SelectItem>
                                <SelectItem value="support">Support</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={serviceForm.control}
                        name="serviceDelivery"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Delivery Model</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-service-delivery">
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="on-site">On-site</SelectItem>
                                <SelectItem value="remote">Remote</SelectItem>
                                <SelectItem value="hybrid">Hybrid</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={serviceForm.control}
                        name="requiredSkillLevel"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Skill Level</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-service-skill">
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="junior">Junior</SelectItem>
                                <SelectItem value="senior">Senior</SelectItem>
                                <SelectItem value="expert">Expert</SelectItem>
                                <SelectItem value="architect">Architect</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={serviceForm.control}
                        name="hourlyRate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Hourly Rate ($)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                {...field} 
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || undefined)}
                                data-testid="input-service-hourly-rate"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={serviceForm.control}
                        name="dailyRate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Daily Rate ($)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                {...field} 
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || undefined)}
                                data-testid="input-service-daily-rate"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <FormField
                        control={serviceForm.control}
                        name="deliveryCost"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Delivery Cost ($)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                {...field} 
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                data-testid="input-service-delivery-cost"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={serviceForm.control}
                        name="commercialSellPrice"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Commercial Price ($)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                {...field} 
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                data-testid="input-service-commercial-price"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={serviceForm.control}
                        name="federalSellPrice"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Federal Price ($)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                {...field} 
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                data-testid="input-service-federal-price"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      disabled={createServiceMutation.isPending}
                      className="w-full"
                      data-testid="submit-service-form"
                    >
                      {createServiceMutation.isPending ? "Creating..." : "Create Service"}
                    </Button>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {servicesLoading ? (
              <div className="text-center py-8">Loading services...</div>
            ) : services?.length === 0 ? (
              <Card className="p-8 text-center">
                <CardContent>
                  <Settings className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No services found</h3>
                  <p className="text-gray-500 dark:text-gray-400">Get started by adding your first service to the catalog.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {services?.map((service: any) => (
                  <Card key={service.id} data-testid={`service-card-${service.id}`}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center space-x-2">
                            <span>{service.name}</span>
                            <Badge variant="outline">{service.serviceType}</Badge>
                            <Badge variant="secondary">{service.serviceDelivery}</Badge>
                          </CardTitle>
                          <CardDescription>
                            Code: {service.serviceCode} | {service.shortDescription}
                          </CardDescription>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm" data-testid={`view-service-${service.id}`}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" data-testid={`edit-service-${service.id}`}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-4 gap-4">
                        {service.hourlyRate && (
                          <div>
                            <Label className="text-sm text-gray-500">Hourly Rate</Label>
                            <p className="text-lg font-semibold">{formatPrice(service.hourlyRate)}</p>
                          </div>
                        )}
                        {service.dailyRate && (
                          <div>
                            <Label className="text-sm text-gray-500">Daily Rate</Label>
                            <p className="text-lg font-semibold">{formatPrice(service.dailyRate)}</p>
                          </div>
                        )}
                        <div>
                          <Label className="text-sm text-gray-500">Commercial Price</Label>
                          <p className="text-lg font-semibold text-blue-600">{formatPrice(service.commercialSellPrice)}</p>
                        </div>
                        <div>
                          <Label className="text-sm text-gray-500">Federal Price</Label>
                          <p className="text-lg font-semibold text-green-600">{formatPrice(service.federalSellPrice)}</p>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t flex items-center space-x-4">
                        <Badge variant="outline">Skill: {service.requiredSkillLevel}</Badge>
                        <div className="text-sm text-gray-500">
                          Delivery Cost: {formatPrice(service.deliveryCost)}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        {/* Solutions Tab */}
        <TabsContent value="solutions" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Solutions</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button data-testid="add-solution-button">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Solution
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Solution</DialogTitle>
                </DialogHeader>
                <Form {...solutionForm}>
                  <form onSubmit={solutionForm.handleSubmit((data) => createSolutionMutation.mutate(data))} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={solutionForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Solution Name</FormLabel>
                            <FormControl>
                              <Input {...field} data-testid="input-solution-name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={solutionForm.control}
                        name="solutionCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Solution Code</FormLabel>
                            <FormControl>
                              <Input {...field} data-testid="input-solution-code" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={solutionForm.control}
                      name="categoryId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-solution-category">
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories?.filter((cat: any) => cat.categoryType === 'solution').map((category: any) => (
                                <SelectItem key={category.id} value={category.id}>
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={solutionForm.control}
                      name="shortDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea {...field} data-testid="textarea-solution-description" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-3 gap-4">
                      <FormField
                        control={solutionForm.control}
                        name="solutionType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Solution Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-solution-type">
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="integrated">Integrated</SelectItem>
                                <SelectItem value="bundled">Bundled</SelectItem>
                                <SelectItem value="enterprise">Enterprise</SelectItem>
                                <SelectItem value="pilot">Pilot</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={solutionForm.control}
                        name="targetAudience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Target Audience</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-solution-audience">
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="federal">Federal</SelectItem>
                                <SelectItem value="education">Education</SelectItem>
                                <SelectItem value="healthcare">Healthcare</SelectItem>
                                <SelectItem value="commercial">Commercial</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={solutionForm.control}
                        name="deploymentSize"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Deployment Size</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-solution-deployment">
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="small">Small</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="large">Large</SelectItem>
                                <SelectItem value="enterprise">Enterprise</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={solutionForm.control}
                        name="totalSolutionCost"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Solution Cost ($)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                {...field} 
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                data-testid="input-solution-cost"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={solutionForm.control}
                        name="bundleDiscountPercent"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bundle Discount (%)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                {...field} 
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || undefined)}
                                data-testid="input-solution-discount"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={solutionForm.control}
                        name="commercialSellPrice"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Commercial Price ($)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                {...field} 
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                data-testid="input-solution-commercial-price"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={solutionForm.control}
                        name="federalSellPrice"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Federal Price ($)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                {...field} 
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                data-testid="input-solution-federal-price"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      disabled={createSolutionMutation.isPending}
                      className="w-full"
                      data-testid="submit-solution-form"
                    >
                      {createSolutionMutation.isPending ? "Creating..." : "Create Solution"}
                    </Button>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {solutionsLoading ? (
              <div className="text-center py-8">Loading solutions...</div>
            ) : solutions?.length === 0 ? (
              <Card className="p-8 text-center">
                <CardContent>
                  <ShoppingCart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No solutions found</h3>
                  <p className="text-gray-500 dark:text-gray-400">Get started by adding your first solution to the catalog.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {solutions?.map((solution: any) => (
                  <Card key={solution.id} data-testid={`solution-card-${solution.id}`}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center space-x-2">
                            <span>{solution.name}</span>
                            <Badge variant="outline">{solution.solutionType}</Badge>
                            <Badge variant="secondary">{solution.targetAudience}</Badge>
                            <Badge>{solution.deploymentSize}</Badge>
                          </CardTitle>
                          <CardDescription>
                            Code: {solution.solutionCode} | {solution.shortDescription}
                          </CardDescription>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm" data-testid={`view-solution-${solution.id}`}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" data-testid={`edit-solution-${solution.id}`}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label className="text-sm text-gray-500">Solution Cost</Label>
                          <p className="text-lg font-semibold">{formatPrice(solution.totalSolutionCost)}</p>
                        </div>
                        <div>
                          <Label className="text-sm text-gray-500">Commercial Price</Label>
                          <p className="text-lg font-semibold text-blue-600">{formatPrice(solution.commercialSellPrice)}</p>
                        </div>
                        <div>
                          <Label className="text-sm text-gray-500">Federal Price</Label>
                          <p className="text-lg font-semibold text-green-600">{formatPrice(solution.federalSellPrice)}</p>
                        </div>
                      </div>
                      {solution.bundleDiscountPercent && (
                        <div className="mt-4 pt-4 border-t">
                          <Badge variant="outline" className="text-green-600">
                            {solution.bundleDiscountPercent}% Bundle Discount
                          </Badge>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}