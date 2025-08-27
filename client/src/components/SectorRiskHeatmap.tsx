import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  Building, 
  GraduationCap, 
  Shield, 
  HeartPulse,
  Factory,
  Banknote,
  Cpu,
  Zap,
  AlertTriangle,
  TrendingUp
} from "lucide-react";

interface SectorData {
  id: string;
  name: string;
  riskLevel: number;
  vulnerabilities: number;
  incidents: number;
  compliance: number;
  trend: "up" | "down" | "stable";
  children?: SectorData[];
}

interface HeatmapCell {
  x: number;
  y: number;
  width: number;
  height: number;
  value: number;
  sector: SectorData;
}

export function SectorRiskHeatmap() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedSector, setSelectedSector] = useState<SectorData | null>(null);
  const [viewMode, setViewMode] = useState<"risk" | "compliance" | "incidents">("risk");

  // Fetch sector risk data
  const { data: sectorData, isLoading } = useQuery<{
    sectors: SectorData[];
    lastUpdated: string;
  }>({
    queryKey: ["/api/sectors/risk-analysis"],
    refetchInterval: 300000, // Refresh every 5 minutes
  });

  const getSectorIcon = (sectorName: string) => {
    const iconMap: { [key: string]: any } = {
      "Federal Government": Shield,
      "Higher Education": GraduationCap,
      "K-12 Education": Building,
      "Healthcare": HeartPulse,
      "Manufacturing": Factory,
      "Financial Services": Banknote,
      "Technology": Cpu,
      "Energy": Zap,
    };
    
    const IconComponent = iconMap[sectorName] || Building;
    return <IconComponent className="w-4 h-4" />;
  };

  const getColorByValue = (value: number, mode: string) => {
    switch (mode) {
      case "risk":
        if (value >= 80) return "#ef4444"; // High risk - red
        if (value >= 60) return "#f97316"; // Medium-high risk - orange
        if (value >= 40) return "#eab308"; // Medium risk - yellow
        if (value >= 20) return "#22c55e"; // Low-medium risk - green
        return "#10b981"; // Low risk - emerald
      
      case "compliance":
        if (value >= 90) return "#10b981"; // Excellent compliance - emerald
        if (value >= 80) return "#22c55e"; // Good compliance - green
        if (value >= 70) return "#eab308"; // Average compliance - yellow
        if (value >= 60) return "#f97316"; // Poor compliance - orange
        return "#ef4444"; // Very poor compliance - red
      
      case "incidents":
        if (value >= 20) return "#ef4444"; // Many incidents - red
        if (value >= 15) return "#f97316"; // Several incidents - orange
        if (value >= 10) return "#eab308"; // Some incidents - yellow
        if (value >= 5) return "#22c55e"; // Few incidents - green
        return "#10b981"; // Very few incidents - emerald
      
      default:
        return "#6b7280";
    }
  };

  const getValue = (sector: SectorData, mode: string) => {
    switch (mode) {
      case "risk": return sector.riskLevel;
      case "compliance": return sector.compliance;
      case "incidents": return sector.incidents;
      default: return sector.riskLevel;
    }
  };

  // Generate treemap cells using simple algorithm
  const generateTreemapCells = (sectors: SectorData[], width: number, height: number): HeatmapCell[] => {
    if (!sectors || sectors.length === 0) return [];
    
    const cells: HeatmapCell[] = [];
    const padding = 2;
    
    // Simple grid layout for sectors
    const cols = Math.ceil(Math.sqrt(sectors.length));
    const rows = Math.ceil(sectors.length / cols);
    const cellWidth = (width - padding * (cols + 1)) / cols;
    const cellHeight = (height - padding * (rows + 1)) / rows;
    
    sectors.forEach((sector, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      
      cells.push({
        x: col * (cellWidth + padding) + padding,
        y: row * (cellHeight + padding) + padding,
        width: cellWidth,
        height: cellHeight,
        value: getValue(sector, viewMode),
        sector
      });
    });
    
    return cells;
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="w-3 h-3 text-red-400" />;
      case "down": return <TrendingUp className="w-3 h-3 text-green-400 rotate-180" />;
      default: return <div className="w-3 h-3 bg-gray-400 rounded-full" />;
    }
  };

  if (isLoading) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Sector Risk Heatmap
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const cells = generateTreemapCells(sectorData?.sectors || [], 500, 300);

  return (
    <Card className="holographic-card border-orange-500/30 backdrop-blur-xl floating-3d">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-orange-300 flex items-center font-bold tracking-wide">
            <AlertTriangle className="w-5 h-5 mr-2 text-orange-400 animate-pulse" />
            SECTOR RISK HEATMAP
            <Badge className="ml-2 bg-gradient-to-r from-orange-500 to-red-500 text-white animate-pulse">INTERACTIVE</Badge>
          </CardTitle>
          
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant={viewMode === "risk" ? "default" : "outline"}
              onClick={() => setViewMode("risk")}
              className="text-xs"
            >
              Risk Level
            </Button>
            <Button
              size="sm"
              variant={viewMode === "compliance" ? "default" : "outline"}
              onClick={() => setViewMode("compliance")}
              className="text-xs"
            >
              Compliance
            </Button>
            <Button
              size="sm"
              variant={viewMode === "incidents" ? "default" : "outline"}
              onClick={() => setViewMode("incidents")}
              className="text-xs"
            >
              Incidents
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {/* Heatmap Visualization */}
          <div className="bg-gray-900 rounded-lg p-4">
            <TooltipProvider>
              <svg
                ref={svgRef}
                width="100%"
                height="320"
                viewBox="0 0 500 320"
                className="cursor-pointer"
              >
                {cells.map((cell, index) => (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <g
                        onClick={() => setSelectedSector(cell.sector)}
                        className="cursor-pointer transition-opacity hover:opacity-80"
                      >
                        <rect
                          x={cell.x}
                          y={cell.y}
                          width={cell.width}
                          height={cell.height}
                          fill={getColorByValue(cell.value, viewMode)}
                          stroke="#374151"
                          strokeWidth="1"
                          rx="4"
                        />
                        <text
                          x={cell.x + cell.width / 2}
                          y={cell.y + cell.height / 2 - 10}
                          textAnchor="middle"
                          className="text-xs font-bold fill-white"
                        >
                          {cell.sector.name.split(" ")[0]}
                        </text>
                        <text
                          x={cell.x + cell.width / 2}
                          y={cell.y + cell.height / 2 + 5}
                          textAnchor="middle"
                          className="text-xs fill-white"
                        >
                          {cell.value}%
                        </text>
                      </g>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="bg-gray-900 border-gray-700">
                      <div className="p-2">
                        <div className="font-bold text-white">{cell.sector.name}</div>
                        <div className="text-sm text-gray-300">
                          {viewMode === "risk" && `Risk Level: ${cell.sector.riskLevel}%`}
                          {viewMode === "compliance" && `Compliance Score: ${cell.sector.compliance}%`}
                          {viewMode === "incidents" && `Incidents: ${cell.sector.incidents}`}
                        </div>
                        <div className="text-xs text-gray-400">
                          Vulnerabilities: {cell.sector.vulnerabilities}
                        </div>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </svg>
            </TooltipProvider>
          </div>
          
          {/* Selected Sector Details */}
          {selectedSector && (
            <div className="bg-gray-900 rounded-lg p-4 border border-blue-600">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getSectorIcon(selectedSector.name)}
                  <div>
                    <h3 className="text-white font-bold">{selectedSector.name}</h3>
                    <p className="text-xs text-gray-400">Detailed Analysis</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getTrendIcon(selectedSector.trend)}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedSector(null)}
                    className="border-gray-600"
                  >
                    Close
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-400">{selectedSector.riskLevel}%</div>
                  <div className="text-xs text-gray-400">Risk Level</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{selectedSector.compliance}%</div>
                  <div className="text-xs text-gray-400">Compliance</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">{selectedSector.vulnerabilities}</div>
                  <div className="text-xs text-gray-400">Vulnerabilities</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-400">{selectedSector.incidents}</div>
                  <div className="text-xs text-gray-400">Incidents</div>
                </div>
              </div>
            </div>
          )}
          
          {/* Color Legend */}
          <div className="flex justify-center">
            <div className="flex items-center space-x-4 text-xs">
              <span className="text-gray-400">
                {viewMode === "risk" && "Risk Level:"}
                {viewMode === "compliance" && "Compliance Score:"}
                {viewMode === "incidents" && "Incident Count:"}
              </span>
              <div className="flex items-center space-x-1">
                <div className="w-4 h-4 bg-emerald-500 rounded"></div>
                <span className="text-gray-400">Low</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                <span className="text-gray-400">Medium</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-gray-400">High</span>
              </div>
            </div>
          </div>
          
          {/* Last Updated */}
          <div className="text-center text-xs text-gray-500">
            Last updated: {sectorData?.lastUpdated ? new Date(sectorData.lastUpdated).toLocaleString() : 'Never'}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}