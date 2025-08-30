import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Fingerprint, Smartphone, Shield, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface BiometricAuthProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
  planType?: string;
}

interface BiometricCredential {
  id: string;
  type: "fingerprint" | "face";
  name: string;
  lastUsed: Date;
}

export function BiometricAuth({ onSuccess, onError, planType = "standard" }: BiometricAuthProps) {
  const [isSupported, setIsSupported] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authStatus, setAuthStatus] = useState<"idle" | "success" | "error">("idle");
  const [credentials, setCredentials] = useState<BiometricCredential[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    checkBiometricSupport();
    loadStoredCredentials();
  }, []);

  const checkBiometricSupport = async () => {
    try {
      // Check if WebAuthn is supported
      const supported = !!(navigator.credentials && window.PublicKeyCredential);
      setIsSupported(supported);
      
      if (supported) {
        // Check for platform authenticator (biometric)
        const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
        setIsSupported(available);
      }
    } catch (error) {
      console.error("Error checking biometric support:", error);
      setIsSupported(false);
    }
  };

  const loadStoredCredentials = () => {
    // Mock stored credentials - in real app, load from secure storage
    const mockCredentials: BiometricCredential[] = [
      {
        id: "cred-1",
        type: "fingerprint",
        name: "Touch ID",
        lastUsed: new Date(Date.now() - 86400000) // 1 day ago
      },
      {
        id: "cred-2", 
        type: "face",
        name: "Face ID",
        lastUsed: new Date(Date.now() - 3600000) // 1 hour ago
      }
    ];
    setCredentials(mockCredentials);
  };

  const authenticateWithBiometrics = async () => {
    if (planType !== "enterprise") {
      setErrorMessage("Biometric authentication is only available with Enterprise plans");
      setAuthStatus("error");
      onError?.("Enterprise plan required");
      return;
    }

    setIsAuthenticating(true);
    setAuthStatus("idle");
    setErrorMessage("");

    try {
      // Create WebAuthn challenge
      const publicKeyCredentialRequestOptions = {
        challenge: new Uint8Array(32),
        timeout: 60000,
        userVerification: "required" as UserVerificationRequirement,
        rpId: window.location.hostname,
      };

      // Request authentication
      const credential = await navigator.credentials.get({
        publicKey: publicKeyCredentialRequestOptions
      });

      if (credential) {
        // Simulate server verification
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setAuthStatus("success");
        onSuccess?.();
      } else {
        throw new Error("Authentication failed");
      }
    } catch (error: any) {
      console.error("Biometric authentication error:", error);
      const message = error.name === "NotAllowedError" 
        ? "Biometric authentication was cancelled or failed"
        : "Biometric authentication is not available";
      
      setErrorMessage(message);
      setAuthStatus("error");
      onError?.(message);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const registerBiometric = async () => {
    if (planType !== "enterprise") {
      setErrorMessage("Biometric registration is only available with Enterprise plans");
      return;
    }

    try {
      setIsAuthenticating(true);
      
      // Create WebAuthn registration challenge
      const publicKeyCredentialCreationOptions = {
        challenge: new Uint8Array(32),
        rp: {
          name: "CyberSecured AI",
          id: window.location.hostname,
        },
        user: {
          id: new Uint8Array(16),
          name: "user@example.com",
          displayName: "User",
        },
        pubKeyCredParams: [{alg: -7, type: "public-key" as const}],
        authenticatorSelection: {
          authenticatorAttachment: "platform" as AuthenticatorAttachment,
          userVerification: "required" as UserVerificationRequirement,
        },
        timeout: 60000,
        attestation: "direct" as AttestationConveyancePreference,
      };

      const credential = await navigator.credentials.create({
        publicKey: publicKeyCredentialCreationOptions
      });

      if (credential) {
        // Add new credential to list
        const newCredential: BiometricCredential = {
          id: `cred-${Date.now()}`,
          type: "fingerprint", // Detect actual type in real implementation
          name: "New Biometric",
          lastUsed: new Date()
        };
        setCredentials(prev => [...prev, newCredential]);
        setAuthStatus("success");
      }
    } catch (error: any) {
      console.error("Biometric registration error:", error);
      setErrorMessage("Failed to register biometric credential");
      setAuthStatus("error");
    } finally {
      setIsAuthenticating(false);
    }
  };

  if (planType !== "enterprise") {
    return (
      <Card className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 border-purple-700/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Fingerprint className="w-5 h-5 text-purple-400" />
              </div>
              <span>Biometric Authentication</span>
            </CardTitle>
            <Badge variant="outline" className="text-purple-300 border-purple-500">Enterprise Only</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Alert className="bg-purple-900/30 border-purple-700/50">
            <Shield className="w-4 h-4 text-purple-400" />
            <AlertDescription className="text-purple-200">
              Biometric authentication requires an Enterprise plan. Upgrade to enable fingerprint and face recognition login.
            </AlertDescription>
          </Alert>
          <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700" disabled>
            <Fingerprint className="w-4 h-4 mr-2" />
            Upgrade to Enterprise
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 border-blue-700/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Fingerprint className="w-5 h-5 text-blue-400" />
            </div>
            <span>Biometric Authentication</span>
          </CardTitle>
          <Badge variant="outline" className="text-green-300 border-green-500">Active</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isSupported && (
          <Alert className="bg-red-900/30 border-red-700/50">
            <AlertCircle className="w-4 h-4 text-red-400" />
            <AlertDescription className="text-red-200">
              Biometric authentication is not supported on this device or browser.
            </AlertDescription>
          </Alert>
        )}

        {errorMessage && (
          <Alert className="bg-red-900/30 border-red-700/50">
            <AlertCircle className="w-4 h-4 text-red-400" />
            <AlertDescription className="text-red-200">
              {errorMessage}
            </AlertDescription>
          </Alert>
        )}

        {authStatus === "success" && (
          <Alert className="bg-green-900/30 border-green-700/50">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <AlertDescription className="text-green-200">
              Biometric authentication successful!
            </AlertDescription>
          </Alert>
        )}

        {/* Registered Credentials */}
        {credentials.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-300">Registered Biometrics</h4>
            {credentials.map((cred) => (
              <div key={cred.id} className="flex items-center justify-between p-3 bg-blue-900/30 rounded-lg border border-blue-700/30">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    {cred.type === "fingerprint" ? (
                      <Fingerprint className="w-4 h-4 text-blue-400" />
                    ) : (
                      <Smartphone className="w-4 h-4 text-blue-400" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{cred.name}</p>
                    <p className="text-xs text-gray-400">Last used {cred.lastUsed.toLocaleDateString()}</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-green-300 border-green-500 text-xs">
                  Active
                </Badge>
              </div>
            ))}
          </div>
        )}

        {/* Authentication Actions */}
        <div className="flex space-x-3">
          <Button
            onClick={authenticateWithBiometrics}
            disabled={!isSupported || isAuthenticating}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
            data-testid="biometric-auth-button"
          >
            {isAuthenticating ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Fingerprint className="w-4 h-4 mr-2" />
            )}
            {isAuthenticating ? "Authenticating..." : "Authenticate"}
          </Button>
          
          <Button
            onClick={registerBiometric}
            variant="outline"
            disabled={!isSupported || isAuthenticating}
            className="border-blue-700 text-blue-300 hover:bg-blue-900/50"
            data-testid="register-biometric-button"
          >
            <Shield className="w-4 h-4 mr-2" />
            Register
          </Button>
        </div>

        <div className="pt-4 border-t border-blue-700/30">
          <p className="text-xs text-gray-400 text-center">
            Biometric data is processed securely on your device and never shared with our servers.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}