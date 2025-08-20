import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Lock, Shield, Smartphone, Mail, Key, Users } from "lucide-react";

export default function Authentication() {
  return (
    <div>
      {/* Header */}
      <header className="bg-surface border-b border-surface-light p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Authentication & Access Control</h2>
            <p className="text-gray-400">Manage multi-factor authentication and access policies</p>
          </div>
          <Button className="bg-interactive hover:bg-orange-600" data-testid="configure-mfa">
            <Lock className="w-4 h-4 mr-2" />
            Configure MFA
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* MFA Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-surface glow-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center">
                    <Shield className="text-success" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">MFA Enabled</h3>
                    <p className="text-gray-400 text-sm">Multi-factor protection active</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-success border-success">Active</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-surface glow-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-interactive/20 rounded-lg flex items-center justify-center">
                    <Users className="text-interactive" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">SSO Integration</h3>
                    <p className="text-gray-400 text-sm">Single sign-on configured</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-interactive border-interactive">Configured</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-surface glow-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Key className="text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Access Control</h3>
                    <p className="text-gray-400 text-sm">Role-based permissions</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-secondary border-secondary">Enforced</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* MFA Configuration */}
        <Card className="bg-surface glow-border mb-8">
          <CardHeader>
            <CardTitle>Multi-Factor Authentication Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Authenticator App */}
              <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-interactive/20 rounded-lg flex items-center justify-center">
                    <Smartphone className="text-interactive" />
                  </div>
                  <div>
                    <h4 className="font-medium">Authenticator App</h4>
                    <p className="text-gray-400 text-sm">Google Authenticator, Authy, or similar TOTP apps</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="outline" className="text-success border-success">Enabled</Badge>
                  <Switch checked={true} data-testid="toggle-authenticator" />
                </div>
              </div>

              {/* Email Verification */}
              <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Mail className="text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Email Verification</h4>
                    <p className="text-gray-400 text-sm">Receive verification codes via email</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="outline" className="text-interactive border-interactive">Backup</Badge>
                  <Switch checked={true} data-testid="toggle-email" />
                </div>
              </div>

              {/* SMS Verification */}
              <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-muted/20 rounded-lg flex items-center justify-center">
                    <Smartphone className="text-muted-foreground" />
                  </div>
                  <div>
                    <h4 className="font-medium">SMS Verification</h4>
                    <p className="text-gray-400 text-sm">Receive codes via text message</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="outline" className="text-gray-500 border-gray-500">Disabled</Badge>
                  <Switch checked={false} data-testid="toggle-sms" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Access Control Policies */}
        <Card className="bg-surface glow-border">
          <CardHeader>
            <CardTitle>Access Control Policies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                <div>
                  <h4 className="font-medium">Privileged Access Management</h4>
                  <p className="text-gray-400 text-sm">Administrative access requires additional verification</p>
                </div>
                <Switch checked={true} data-testid="toggle-pam" />
              </div>

              <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                <div>
                  <h4 className="font-medium">Session Timeout</h4>
                  <p className="text-gray-400 text-sm">Automatically log out inactive sessions after 30 minutes</p>
                </div>
                <Switch checked={true} data-testid="toggle-timeout" />
              </div>

              <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                <div>
                  <h4 className="font-medium">Location-Based Access</h4>
                  <p className="text-gray-400 text-sm">Restrict access based on geographic location</p>
                </div>
                <Switch checked={false} data-testid="toggle-location" />
              </div>

              <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                <div>
                  <h4 className="font-medium">Device Registration</h4>
                  <p className="text-gray-400 text-sm">Require device registration for new logins</p>
                </div>
                <Switch checked={true} data-testid="toggle-device" />
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
