import { useState, useEffect } from "react";
import { CyberThreatScanner } from "./CyberThreatScanner";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
  trigger?: boolean;
}

export function LoadingScreen({ onLoadingComplete, trigger = false }: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (trigger) {
      setIsVisible(true);
    }
  }, [trigger]);

  const handleScanComplete = () => {
    // Add a small delay before transitioning out
    setTimeout(() => {
      setIsVisible(false);
      onLoadingComplete();
    }, 1000);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50">
      <CyberThreatScanner 
        onScanComplete={handleScanComplete}
        duration={6000} // 6 second scan duration
      />
    </div>
  );
}