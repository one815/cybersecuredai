/**
 * CIRCL Tools Integration
 * Integrates various CIRCL cybersecurity tools and services
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import fetch from 'node-fetch';

const execAsync = promisify(exec);

export interface CIRCLToolsConfig {
  bgpRankingUrl?: string;
  urlAbuseEnabled?: boolean;
  passiveDnsUrl?: string;
  ailFrameworkUrl?: string;
}

export interface ThreatAssessment {
  target: string;
  type: 'ip' | 'domain' | 'url' | 'asn';
  timestamp: string;
  circl_tools: {
    bgp_ranking: BGPRankingResult | null;
    url_abuse: URLAbuseResult | null;
    passive_dns: PassiveDNSResult[];
    ail_leaks: AILLeakResult[];
    pymisp_intel: any;
  };
  risk_score: number;
  risk_level?: 'low' | 'medium' | 'high' | 'critical';
  recommendations: string[];
  error?: string;
}

export interface BGPRankingResult {
  asn: string;
  rank: number;
  country: string;
  description: string;
  day: string;
}

export interface URLAbuseResult {
  url: string;
  malicious: boolean;
  categories: string[];
  confidence: number;
}

export interface PassiveDNSResult {
  rrname: string;
  rrtype: string;
  rdata: string;
  time_first: string;
  time_last: string;
  count: number;
}

export interface AILLeakResult {
  id: string;
  source: string;
  content_type: string;
  leak_date: string;
  risk_level: 'low' | 'medium' | 'high' | 'critical';
}

export class CIRCLToolsService {
  private config: CIRCLToolsConfig;
  
  constructor(config: CIRCLToolsConfig = {}) {
    this.config = {
      bgpRankingUrl: config.bgpRankingUrl || 'https://bgpranking-ng.circl.lu',
      urlAbuseEnabled: config.urlAbuseEnabled ?? true,
      passiveDnsUrl: config.passiveDnsUrl || 'https://www.circl.lu/pdns/query',
      ailFrameworkUrl: config.ailFrameworkUrl || 'https://circl.lu/api/ail',
      ...config
    };
  }

  /**
   * Get BGP ranking for an ASN
   */
  async getBGPRanking(asn: string): Promise<BGPRankingResult | null> {
    try {
      const response = await fetch(`${this.config.bgpRankingUrl}/json/${asn}`);
      const data = await response.json() as any;
      
      if (data && data.response) {
        return {
          asn: asn,
          rank: data.response.ranking || 0,
          country: data.response.country || 'Unknown',
          description: data.response.description || 'No description',
          day: data.response.day || new Date().toISOString().split('T')[0]
        };
      }
      
      return null;
    } catch (error: any) {
      console.error(`Error fetching BGP ranking for ${asn}:`, error);
      return null;
    }
  }

  /**
   * Analyze URL for abuse/malicious content using CIRCL URL Abuse tool
   */
  async analyzeURL(url: string): Promise<URLAbuseResult | null> {
    if (!this.config.urlAbuseEnabled) {
      return null;
    }

    try {
      // For now, this is a mock implementation
      // In production, you would call the actual CIRCL URL Abuse API
      const mockResult: URLAbuseResult = {
        url: url,
        malicious: this.isSuspiciousURL(url),
        categories: this.categorizeURL(url),
        confidence: Math.random() * 100
      };

      return mockResult;
    } catch (error: any) {
      console.error(`Error analyzing URL ${url}:`, error);
      return null;
    }
  }

  /**
   * Query passive DNS for a domain
   */
  async queryPassiveDNS(domain: string): Promise<PassiveDNSResult[]> {
    try {
      // Mock implementation - replace with actual CIRCL Passive DNS API
      const mockResults: PassiveDNSResult[] = [
        {
          rrname: domain,
          rrtype: 'A',
          rdata: '192.0.2.1',
          time_first: new Date(Date.now() - 86400000).toISOString(),
          time_last: new Date().toISOString(),
          count: 100
        }
      ];

      return mockResults;
    } catch (error: any) {
      console.error(`Error querying passive DNS for ${domain}:`, error);
      return [];
    }
  }

  /**
   * Check for information leaks using AIL Framework
   */
  async checkInformationLeaks(query: string): Promise<AILLeakResult[]> {
    try {
      // Mock implementation - replace with actual CIRCL AIL API
      const mockResults: AILLeakResult[] = [];
      
      // Simulate finding leaks for educational domains
      if (query.includes('.edu') || query.includes('school') || query.includes('university')) {
        mockResults.push({
          id: `leak_${Date.now()}`,
          source: 'Pastebin',
          content_type: 'credential_leak',
          leak_date: new Date(Date.now() - 172800000).toISOString(),
          risk_level: 'high'
        });
      }

      return mockResults;
    } catch (error: any) {
      console.error(`Error checking information leaks for ${query}:`, error);
      return [];
    }
  }

  /**
   * Enhanced PyMISP integration using Python service
   */
  async getPyMISPThreatIntelligence(): Promise<any> {
    try {
      console.log('🐍 Executing enhanced PyMISP service...');
      const { stdout, stderr } = await execAsync('python3 server/pymisp-service.py');
      
      if (stderr) {
        console.warn('PyMISP service warnings:', stderr);
      }

      // Parse JSON output from Python service
      const lines = stdout.trim().split('\n');
      const jsonStart = lines.findIndex(line => line.includes('='));
      
      if (jsonStart !== -1 && jsonStart < lines.length - 1) {
        const jsonOutput = lines.slice(jsonStart + 1).join('\n');
        return JSON.parse(jsonOutput);
      }

      console.log('PyMISP service output:', stdout);
      return { error: 'No JSON output from PyMISP service' };
      
    } catch (error: any) {
      console.error('Error executing PyMISP service:', error);
      return { error: error.message };
    }
  }

  /**
   * Comprehensive threat assessment combining all CIRCL tools
   */
  async comprehensiveThreatAssessment(target: string, type: 'ip' | 'domain' | 'url' | 'asn'): Promise<ThreatAssessment> {
    const assessment: ThreatAssessment = {
      target,
      type,
      timestamp: new Date().toISOString(),
      circl_tools: {
        bgp_ranking: null,
        url_abuse: null,
        passive_dns: [],
        ail_leaks: [],
        pymisp_intel: null
      },
      risk_score: 0,
      recommendations: []
    };

    try {
      // Parallel execution of CIRCL tools
      const promises: Promise<void>[] = [];

      if (type === 'asn') {
        promises.push(this.getBGPRanking(target).then(result => {
          assessment.circl_tools.bgp_ranking = result;
          if (result && result.rank < 50) {
            assessment.risk_score += 30;
            assessment.recommendations.push('ASN has low security ranking - monitor closely');
          }
        }));
      }

      if (type === 'url') {
        promises.push(this.analyzeURL(target).then(result => {
          assessment.circl_tools.url_abuse = result;
          if (result && result.malicious) {
            assessment.risk_score += 50;
            assessment.recommendations.push('URL flagged as malicious - block immediately');
          }
        }));
      }

      if (type === 'domain') {
        promises.push(this.queryPassiveDNS(target).then(result => {
          assessment.circl_tools.passive_dns = result;
          if (result.length > 10) {
            assessment.risk_score += 10;
            assessment.recommendations.push('Domain has high DNS activity - investigate further');
          }
        }));

        promises.push(this.checkInformationLeaks(target).then(result => {
          assessment.circl_tools.ail_leaks = result;
          if (result.length > 0) {
            assessment.risk_score += 40;
            assessment.recommendations.push('Information leaks detected - review data exposure');
          }
        }));
      }

      // Get PyMISP threat intelligence
      promises.push(this.getPyMISPThreatIntelligence().then(result => {
        assessment.circl_tools.pymisp_intel = result;
        if (result && result.total_indicators > 100) {
          assessment.risk_score += 20;
          assessment.recommendations.push('High threat intelligence activity detected');
        }
      }));

      await Promise.allSettled(promises);

      // Calculate final risk level
      if (assessment.risk_score >= 80) {
        assessment.risk_level = 'critical';
      } else if (assessment.risk_score >= 60) {
        assessment.risk_level = 'high';
      } else if (assessment.risk_score >= 30) {
        assessment.risk_level = 'medium';
      } else {
        assessment.risk_level = 'low';
      }

      return assessment;
      
    } catch (error: any) {
      console.error('Error in comprehensive threat assessment:', error);
      assessment.error = error.message;
      return assessment;
    }
  }

  // Helper methods
  private isSuspiciousURL(url: string): boolean {
    const suspiciousPatterns = [
      /phishing/i,
      /malware/i,
      /suspicious/i,
      /\.tk$/,
      /\.ml$/,
      /bit\.ly/,
      /tinyurl/
    ];
    
    return suspiciousPatterns.some(pattern => pattern.test(url));
  }

  private categorizeURL(url: string): string[] {
    const categories = [];
    
    if (url.includes('phishing')) categories.push('phishing');
    if (url.includes('malware')) categories.push('malware');
    if (url.includes('.edu')) categories.push('education');
    if (url.includes('.gov')) categories.push('government');
    
    return categories.length > 0 ? categories : ['uncategorized'];
  }
}

// Export singleton instance
export const circlTools = new CIRCLToolsService();