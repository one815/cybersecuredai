import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Bot, Shield, Lock, Eye, EyeOff } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean().default(false),
});

type LoginForm = z.infer<typeof loginSchema>;

export function ClientLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    try {
      console.log("Login attempt:", data);
      
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const error = await response.json();
        alert(error.message || "Login failed");
        return;
      }
      
      const { user, token } = await response.json();
      
      // Store user info for the session
      localStorage.setItem("authToken", token);
      localStorage.setItem("userEmail", user.email);
      
      // Redirect to dashboard
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Login error:", error);
      alert("Network error - please try again");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface/50 to-background flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
              <Bot className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              CyberSecured AI
            </span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Client Portal</h1>
          <p className="text-gray-400">Access your security dashboard and reports</p>
        </div>

        <Card className="bg-surface/80 backdrop-blur-md border border-cyan-500/30 cyber-glow">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-white">Sign In</CardTitle>
            <CardDescription className="text-center text-gray-400">
              Enter your credentials to access your security platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Email Address</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="admin@example.edu"
                          className="bg-background/50 border-gray-600 text-white placeholder:text-gray-400"
                          data-testid="input-email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="bg-background/50 border-gray-600 text-white placeholder:text-gray-400 pr-10"
                            data-testid="input-password"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                            data-testid="button-toggle-password"
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-gray-400" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-400" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="border-gray-600"
                          data-testid="checkbox-remember-me"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm text-gray-300">
                          Remember me on this device
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                  disabled={isLoading}
                  data-testid="button-sign-in"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Signing In...
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 mr-2" />
                      Sign In
                    </>
                  )}
                </Button>
              </form>
            </Form>

            <div className="mt-6 space-y-4">
              <div className="text-center">
                <Button variant="link" className="text-cyan-400 hover:text-cyan-300" data-testid="link-forgot-password">
                  Forgot your password?
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-600" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-surface px-2 text-gray-400">Security Notice</span>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-orange-400 mt-0.5" />
                  <div className="text-sm">
                    <p className="text-orange-300 font-medium mb-1">Secure Access</p>
                    <p className="text-gray-400">
                      Your connection is encrypted and monitored for security. 
                      Contact your IT administrator if you experience any issues.
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center text-sm text-gray-400">
                <Link href="/" className="text-cyan-400 hover:text-cyan-300">
                  ← Back to main site
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-xs text-gray-500">
          <p>© 2024 CyberSecured AI. All rights reserved.</p>
          <p className="mt-1">
            Protected by enterprise-grade security protocols
          </p>
        </div>
      </div>
    </div>
  );
}