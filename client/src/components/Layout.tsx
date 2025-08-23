import { ReactNode, useState } from "react";
import { Sidebar } from "./Sidebar";
import { ThreatNotificationCenter } from "./ThreatNotificationCenter";
import { CypherAssistant } from "./CypherAssistant";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [cypherMinimized, setCypherMinimized] = useState(false);

  return (
    <div className="min-h-screen cyber-grid bg-background text-foreground saas-platform">
      <Sidebar />
      <div className="lg:ml-64 pt-16 lg:pt-0 transition-all duration-300">
        <div className="p-4 lg:p-6">
          {children}
        </div>
      </div>
      <ThreatNotificationCenter />
      <CypherAssistant 
        minimized={cypherMinimized}
        onToggleMinimize={() => setCypherMinimized(!cypherMinimized)}
      />
    </div>
  );
}
