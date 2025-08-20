import { ReactNode } from "react";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";

interface MarketingLayoutProps {
  children: ReactNode;
}

export function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="min-h-screen ai-dashboard-bg">
      <Navigation />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
}