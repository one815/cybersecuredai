import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen cyber-grid bg-background text-foreground">
      <Sidebar />
      <div className="ml-64">
        {children}
      </div>
    </div>
  );
}
