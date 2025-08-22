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
      <div className="ml-64">
        {children}
      </div>
      <ThreatNotificationCenter />
      <CypherAssistant 
        minimized={cypherMinimized}
        onToggleMinimize={() => setCypherMinimized(!cypherMinimized)}
      />
    </div>
  );
}
