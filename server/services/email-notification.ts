import { MailService } from '@sendgrid/mail';

export interface EmailNotificationConfig {
  from: string;
  defaultToAddress: string;
  complianceOfficerEmail: string;
  adminEmails: string[];
}

export interface ComplianceEmailTemplate {
  subject: string;
  htmlContent: string;
  textContent: string;
}

export interface IncidentNotification {
  incidentId: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  affectedSystems: string[];
  detectedAt: Date;
  nistControls: string[];
  recommendedActions: string[];
}

export interface ComplianceAssessmentNotification {
  assessmentId: string;
  frameworkId: string;
  frameworkName: string;
  overallScore: number;
  complianceStatus: 'compliant' | 'non_compliant' | 'partial';
  criticalFindings: number;
  highFindings: number;
  completedAt: Date;
  nextAssessmentDue: Date;
  reportUrl?: string;
}

export interface ThreatIntelligenceAlert {
  alertId: string;
  threatType: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  indicators: string[];
  description: string;
  sourceFeeds: string[];
  detectedAt: Date;
  recommendedActions: string[];
}

export class EmailNotificationService {
  private mailService: MailService;
  private config: EmailNotificationConfig;
  private isInitialized: boolean = false;

  constructor() {
    this.mailService = new MailService();
    this.config = {
      from: 'noreply@cybersecured.ai',
      defaultToAddress: 'security@cybersecured.ai',
      complianceOfficerEmail: 'compliance@cybersecured.ai',
      adminEmails: ['admin@cybersecured.ai', 'security@cybersecured.ai']
    };
    this.initialize();
  }

  private async initialize() {
    try {
      if (!process.env.SENDGRID_API_KEY) {
        throw new Error("SENDGRID_API_KEY environment variable must be set");
      }

      this.mailService.setApiKey(process.env.SENDGRID_API_KEY);
      this.isInitialized = true;
      console.log('✅ SendGrid Email Notification Service initialized successfully');
      
      // Test the service on initialization
      setTimeout(() => {
        this.testEmailService().then(success => {
          if (success) {
            console.log('📧 SendGrid test email sent successfully - service is operational');
          } else {
            console.log('⚠️ SendGrid test failed - please check configuration');
          }
        });
      }, 2000);
    } catch (error) {
      console.error('❌ Failed to initialize SendGrid Email Service:', error);
      this.isInitialized = false;
    }
  }

  /**
   * Send critical security incident notification
   */
  async sendIncidentNotification(incident: IncidentNotification): Promise<boolean> {
    if (!this.isInitialized) {
      console.error('❌ Email service not initialized');
      return false;
    }

    try {
      const template = this.generateIncidentEmailTemplate(incident);
      
      const recipients = incident.severity === 'critical' 
        ? [...this.config.adminEmails, this.config.complianceOfficerEmail]
        : this.config.adminEmails;

      const emailData = {
        to: recipients,
        from: this.config.from,
        subject: template.subject,
        text: template.textContent,
        html: template.htmlContent,
      };

      await this.mailService.send(emailData);
      console.log(`📧 Incident notification sent for ${incident.incidentId} (${incident.severity})`);
      return true;
      
    } catch (error) {
      console.error('❌ Failed to send incident notification:', error);
      return false;
    }
  }

  /**
   * Send compliance assessment completion notification
   */
  async sendComplianceAssessmentNotification(assessment: ComplianceAssessmentNotification): Promise<boolean> {
    if (!this.isInitialized) {
      console.error('❌ Email service not initialized');
      return false;
    }

    try {
      const template = this.generateAssessmentEmailTemplate(assessment);
      
      const recipients = assessment.complianceStatus === 'non_compliant'
        ? [...this.config.adminEmails, this.config.complianceOfficerEmail]
        : [this.config.complianceOfficerEmail];

      const emailData = {
        to: recipients,
        from: this.config.from,
        subject: template.subject,
        text: template.textContent,
        html: template.htmlContent,
      };

      await this.mailService.send(emailData);
      console.log(`📧 Assessment notification sent for ${assessment.frameworkName} (Score: ${assessment.overallScore}%)`);
      return true;
      
    } catch (error) {
      console.error('❌ Failed to send assessment notification:', error);
      return false;
    }
  }

  /**
   * Send threat intelligence alert
   */
  async sendThreatIntelligenceAlert(alert: ThreatIntelligenceAlert): Promise<boolean> {
    if (!this.isInitialized) {
      console.error('❌ Email service not initialized');
      return false;
    }

    try {
      const template = this.generateThreatAlertEmailTemplate(alert);
      
      const recipients = alert.severity === 'critical' || alert.severity === 'high'
        ? [...this.config.adminEmails, this.config.complianceOfficerEmail]
        : this.config.adminEmails;

      const emailData = {
        to: recipients,
        from: this.config.from,
        subject: template.subject,
        text: template.textContent,
        html: template.htmlContent,
      };

      await this.mailService.send(emailData);
      console.log(`📧 Threat alert sent for ${alert.threatType} (${alert.severity})`);
      return true;
      
    } catch (error) {
      console.error('❌ Failed to send threat alert:', error);
      return false;
    }
  }

  /**
   * Send custom compliance notification
   */
  async sendCustomNotification(
    subject: string, 
    content: string, 
    recipients?: string[], 
    priority: 'normal' | 'high' | 'critical' = 'normal'
  ): Promise<boolean> {
    if (!this.isInitialized) {
      console.error('❌ Email service not initialized');
      return false;
    }

    try {
      const toAddresses = recipients || this.config.adminEmails;
      const priorityPrefix = priority === 'critical' ? '[CRITICAL] ' : priority === 'high' ? '[HIGH] ' : '';
      
      const emailData = {
        to: toAddresses,
        from: this.config.from,
        subject: `${priorityPrefix}${subject}`,
        text: content,
        html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px;">
            <h2 style="color: #1e40af; margin-top: 0;">${priorityPrefix}${subject}</h2>
            <div style="background: white; padding: 20px; border-radius: 6px; border-left: 4px solid #2563eb;">
              ${content.replace(/\n/g, '<br>')}
            </div>
            <div style="margin-top: 20px; font-size: 12px; color: #64748b;">
              <p>CyberSecured AI Security Platform | Automated Compliance Notification</p>
              <p>Generated: ${new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>`,
      };

      await this.mailService.send(emailData);
      console.log(`📧 Custom notification sent: ${subject}`);
      return true;
      
    } catch (error) {
      console.error('❌ Failed to send custom notification:', error);
      return false;
    }
  }

  /**
   * Generate incident email template
   */
  private generateIncidentEmailTemplate(incident: IncidentNotification): ComplianceEmailTemplate {
    const severityColors = {
      critical: '#dc2626',
      high: '#ea580c', 
      medium: '#ca8a04',
      low: '#059669'
    };

    const severityColor = severityColors[incident.severity];
    
    const subject = `🚨 ${incident.severity.toUpperCase()} Security Incident: ${incident.title}`;
    
    const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #f8fafc; padding: 20px; border-radius: 8px;">
        <div style="background: ${severityColor}; color: white; padding: 15px; border-radius: 6px; text-align: center;">
          <h1 style="margin: 0; font-size: 18px;">🚨 SECURITY INCIDENT DETECTED</h1>
          <p style="margin: 5px 0 0 0; font-size: 14px;">Severity: ${incident.severity.toUpperCase()}</p>
        </div>
        
        <div style="background: white; padding: 20px; border-radius: 6px; margin-top: 15px;">
          <h2 style="color: #1e40af; margin-top: 0;">Incident Details</h2>
          
          <div style="margin-bottom: 15px;">
            <strong>Incident ID:</strong> ${incident.incidentId}<br>
            <strong>Title:</strong> ${incident.title}<br>
            <strong>Detected:</strong> ${incident.detectedAt.toLocaleString()}<br>
            <strong>Severity:</strong> <span style="color: ${severityColor}; font-weight: bold;">${incident.severity.toUpperCase()}</span>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong>Description:</strong>
            <div style="background: #f1f5f9; padding: 10px; border-radius: 4px; margin-top: 5px;">
              ${incident.description}
            </div>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong>Affected Systems:</strong>
            <ul style="margin: 5px 0 0 20px;">
              ${incident.affectedSystems.map(system => `<li>${system}</li>`).join('')}
            </ul>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong>NIST Controls Impacted:</strong>
            <div style="margin-top: 5px;">
              ${incident.nistControls.map(control => `<span style="background: #dbeafe; color: #1e40af; padding: 2px 8px; border-radius: 12px; font-size: 12px; margin-right: 5px;">${control}</span>`).join('')}
            </div>
          </div>
          
          <div style="background: #fef3c7; padding: 15px; border-radius: 6px; border-left: 4px solid #f59e0b;">
            <strong style="color: #92400e;">Recommended Actions:</strong>
            <ul style="margin: 10px 0 0 20px; color: #92400e;">
              ${incident.recommendedActions.map(action => `<li>${action}</li>`).join('')}
            </ul>
          </div>
        </div>
        
        <div style="margin-top: 20px; text-align: center; font-size: 12px; color: #64748b;">
          <p>CyberSecured AI Security Platform | NIST SP 800-53 Compliance</p>
          <p>This is an automated incident notification per IR-6 requirements</p>
        </div>
      </div>
    </div>`;

    const textContent = `
SECURITY INCIDENT DETECTED - ${incident.severity.toUpperCase()}

Incident ID: ${incident.incidentId}
Title: ${incident.title}
Detected: ${incident.detectedAt.toLocaleString()}
Severity: ${incident.severity.toUpperCase()}

Description: ${incident.description}

Affected Systems:
${incident.affectedSystems.map(system => `- ${system}`).join('\n')}

NIST Controls Impacted: ${incident.nistControls.join(', ')}

Recommended Actions:
${incident.recommendedActions.map(action => `- ${action}`).join('\n')}

---
CyberSecured AI Security Platform | NIST SP 800-53 Compliance
This is an automated incident notification per IR-6 requirements
    `;

    return { subject, htmlContent, textContent };
  }

  /**
   * Generate assessment email template
   */
  private generateAssessmentEmailTemplate(assessment: ComplianceAssessmentNotification): ComplianceEmailTemplate {
    const statusColors = {
      compliant: '#059669',
      partial: '#ca8a04',
      non_compliant: '#dc2626'
    };

    const statusColor = statusColors[assessment.complianceStatus];
    const statusText = assessment.complianceStatus.replace('_', ' ').toUpperCase();
    
    const subject = `📊 Compliance Assessment Complete: ${assessment.frameworkName} (${assessment.overallScore}%)`;
    
    const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #f8fafc; padding: 20px; border-radius: 8px;">
        <div style="background: linear-gradient(135deg, #1e40af, #3b82f6); color: white; padding: 20px; border-radius: 6px; text-align: center;">
          <h1 style="margin: 0; font-size: 18px;">📊 COMPLIANCE ASSESSMENT COMPLETE</h1>
          <p style="margin: 5px 0 0 0; font-size: 14px;">${assessment.frameworkName}</p>
        </div>
        
        <div style="background: white; padding: 20px; border-radius: 6px; margin-top: 15px;">
          <h2 style="color: #1e40af; margin-top: 0;">Assessment Results</h2>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
            <div style="background: #f1f5f9; padding: 15px; border-radius: 6px; text-align: center;">
              <div style="font-size: 24px; font-weight: bold; color: ${statusColor};">${assessment.overallScore}%</div>
              <div style="color: #64748b; font-size: 12px;">Overall Score</div>
            </div>
            <div style="background: #f1f5f9; padding: 15px; border-radius: 6px; text-align: center;">
              <div style="font-size: 16px; font-weight: bold; color: ${statusColor};">${statusText}</div>
              <div style="color: #64748b; font-size: 12px;">Status</div>
            </div>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong>Assessment ID:</strong> ${assessment.assessmentId}<br>
            <strong>Framework:</strong> ${assessment.frameworkName}<br>
            <strong>Completed:</strong> ${assessment.completedAt.toLocaleString()}<br>
            <strong>Next Assessment Due:</strong> ${assessment.nextAssessmentDue.toLocaleDateString()}
          </div>
          
          <div style="margin-bottom: 20px;">
            <h3 style="color: #1e40af; margin-bottom: 10px;">Findings Summary</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
              <div style="background: #fef2f2; padding: 10px; border-radius: 4px; text-align: center; border-left: 4px solid #dc2626;">
                <div style="font-size: 18px; font-weight: bold; color: #dc2626;">${assessment.criticalFindings}</div>
                <div style="font-size: 12px; color: #991b1b;">Critical Findings</div>
              </div>
              <div style="background: #fff7ed; padding: 10px; border-radius: 4px; text-align: center; border-left: 4px solid #ea580c;">
                <div style="font-size: 18px; font-weight: bold; color: #ea580c;">${assessment.highFindings}</div>
                <div style="font-size: 12px; color: #c2410c;">High Findings</div>
              </div>
            </div>
          </div>
          
          ${assessment.reportUrl ? `
          <div style="background: #dbeafe; padding: 15px; border-radius: 6px; text-align: center;">
            <a href="${assessment.reportUrl}" style="background: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: bold;">
              📄 View Full Report
            </a>
          </div>
          ` : ''}
        </div>
        
        <div style="margin-top: 20px; text-align: center; font-size: 12px; color: #64748b;">
          <p>CyberSecured AI Security Platform | NIST SP 800-53 Compliance</p>
          <p>Automated assessment notification system</p>
        </div>
      </div>
    </div>`;

    const textContent = `
COMPLIANCE ASSESSMENT COMPLETE

Framework: ${assessment.frameworkName}
Assessment ID: ${assessment.assessmentId}
Overall Score: ${assessment.overallScore}%
Status: ${statusText}
Completed: ${assessment.completedAt.toLocaleString()}
Next Assessment Due: ${assessment.nextAssessmentDue.toLocaleDateString()}

Findings Summary:
- Critical Findings: ${assessment.criticalFindings}
- High Findings: ${assessment.highFindings}

${assessment.reportUrl ? `Full Report: ${assessment.reportUrl}` : ''}

---
CyberSecured AI Security Platform | NIST SP 800-53 Compliance
Automated assessment notification system
    `;

    return { subject, htmlContent, textContent };
  }

  /**
   * Generate threat alert email template
   */
  private generateThreatAlertEmailTemplate(alert: ThreatIntelligenceAlert): ComplianceEmailTemplate {
    const severityColors = {
      critical: '#dc2626',
      high: '#ea580c',
      medium: '#ca8a04',
      low: '#059669'
    };

    const severityColor = severityColors[alert.severity];
    
    const subject = `🎯 Threat Intelligence Alert: ${alert.threatType} (${alert.severity.toUpperCase()})`;
    
    const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #f8fafc; padding: 20px; border-radius: 8px;">
        <div style="background: ${severityColor}; color: white; padding: 15px; border-radius: 6px; text-align: center;">
          <h1 style="margin: 0; font-size: 18px;">🎯 THREAT INTELLIGENCE ALERT</h1>
          <p style="margin: 5px 0 0 0; font-size: 14px;">${alert.threatType} - ${alert.severity.toUpperCase()}</p>
        </div>
        
        <div style="background: white; padding: 20px; border-radius: 6px; margin-top: 15px;">
          <h2 style="color: #1e40af; margin-top: 0;">Threat Details</h2>
          
          <div style="margin-bottom: 15px;">
            <strong>Alert ID:</strong> ${alert.alertId}<br>
            <strong>Threat Type:</strong> ${alert.threatType}<br>
            <strong>Detected:</strong> ${alert.detectedAt.toLocaleString()}<br>
            <strong>Severity:</strong> <span style="color: ${severityColor}; font-weight: bold;">${alert.severity.toUpperCase()}</span>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong>Description:</strong>
            <div style="background: #f1f5f9; padding: 10px; border-radius: 4px; margin-top: 5px;">
              ${alert.description}
            </div>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong>Indicators of Compromise:</strong>
            <ul style="margin: 5px 0 0 20px; font-family: monospace; font-size: 12px;">
              ${alert.indicators.slice(0, 10).map(indicator => `<li style="background: #f3f4f6; padding: 2px 4px; margin: 2px 0; border-radius: 2px;">${indicator}</li>`).join('')}
              ${alert.indicators.length > 10 ? `<li style="color: #64748b; font-style: italic;">... and ${alert.indicators.length - 10} more indicators</li>` : ''}
            </ul>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong>Source Feeds:</strong>
            <div style="margin-top: 5px;">
              ${alert.sourceFeeds.map(feed => `<span style="background: #e0f2fe; color: #0369a1; padding: 2px 8px; border-radius: 12px; font-size: 12px; margin-right: 5px;">${feed}</span>`).join('')}
            </div>
          </div>
          
          <div style="background: #fef3c7; padding: 15px; border-radius: 6px; border-left: 4px solid #f59e0b;">
            <strong style="color: #92400e;">Recommended Actions:</strong>
            <ul style="margin: 10px 0 0 20px; color: #92400e;">
              ${alert.recommendedActions.map(action => `<li>${action}</li>`).join('')}
            </ul>
          </div>
        </div>
        
        <div style="margin-top: 20px; text-align: center; font-size: 12px; color: #64748b;">
          <p>CyberSecured AI Security Platform | Enhanced Threat Intelligence</p>
          <p>Automated threat alert system</p>
        </div>
      </div>
    </div>`;

    const textContent = `
THREAT INTELLIGENCE ALERT - ${alert.severity.toUpperCase()}

Alert ID: ${alert.alertId}
Threat Type: ${alert.threatType}
Detected: ${alert.detectedAt.toLocaleString()}
Severity: ${alert.severity.toUpperCase()}

Description: ${alert.description}

Indicators of Compromise:
${alert.indicators.slice(0, 10).map(indicator => `- ${indicator}`).join('\n')}
${alert.indicators.length > 10 ? `... and ${alert.indicators.length - 10} more indicators` : ''}

Source Feeds: ${alert.sourceFeeds.join(', ')}

Recommended Actions:
${alert.recommendedActions.map(action => `- ${action}`).join('\n')}

---
CyberSecured AI Security Platform | Enhanced Threat Intelligence
Automated threat alert system
    `;

    return { subject, htmlContent, textContent };
  }

  /**
   * Test email connectivity
   */
  async testEmailService(): Promise<boolean> {
    return await this.sendCustomNotification(
      'Email Service Test',
      'This is a test message to verify SendGrid integration is working correctly.',
      [this.config.defaultToAddress],
      'normal'
    );
  }

  /**
   * Update email configuration
   */
  updateConfiguration(config: Partial<EmailNotificationConfig>) {
    this.config = { ...this.config, ...config };
    console.log('✅ Email notification configuration updated');
  }

  /**
   * Get current configuration (without sensitive data)
   */
  getConfiguration(): Omit<EmailNotificationConfig, 'from'> {
    const { from, ...publicConfig } = this.config;
    return publicConfig;
  }
}

export const emailNotificationService = new EmailNotificationService();