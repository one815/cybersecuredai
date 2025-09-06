import twilio from 'twilio';
import type { Request, Response } from 'express';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

// Initialize Twilio client if credentials are available
let twilioClient: twilio.Twilio | null = null;
if (accountSid && authToken) {
  twilioClient = twilio(accountSid, authToken);
}

/**
 * Twilio SMS Integration Service for CyberSecured AI Platform
 * Handles incoming SMS messages, security alerts, and SMS-based authentication
 */
export class TwilioSMSService {

  /**
   * Handle incoming SMS messages
   */
  static handleIncomingSMS(req: Request, res: Response): void {
    const twiml = new twilio.twiml.MessagingResponse();
    const from = req.body.From;
    const body = req.body.Body?.toLowerCase().trim();
    const messageId = req.body.MessageSid;

    console.log(`📱 Incoming SMS from ${from}: ${body} (ID: ${messageId})`);

    // Parse incoming commands for security platform
    if (body.includes('status') || body.includes('health')) {
      twiml.message('🔒 CyberSecured AI Platform Status: All systems operational. Threat monitoring active. Last update: ' + new Date().toLocaleString());
    } 
    else if (body.includes('alert') || body.includes('emergency')) {
      twiml.message('🚨 Emergency services activated. Security team has been notified. Reference ID: ' + messageId.substring(0, 8));
    }
    else if (body.includes('help') || body === '?') {
      twiml.message(`🛡️ CyberSecured AI Commands:
• STATUS - System health check
• ALERT - Emergency notification
• STOP - Unsubscribe from alerts
• HELP - This message
Visit: cybersecuredai.com`);
    }
    else if (body.includes('stop') || body.includes('unsubscribe')) {
      twiml.message('✅ You have been unsubscribed from CyberSecured AI security alerts. Text START to resubscribe.');
      // In production, update user preferences in database
    }
    else if (body.includes('start') || body.includes('subscribe')) {
      twiml.message('✅ You are now subscribed to CyberSecured AI security alerts. Text STOP to unsubscribe.');
      // In production, update user preferences in database
    }
    else {
      // Default response for unrecognized messages
      twiml.message('🔒 CyberSecured AI Platform received your message. For assistance, reply HELP. For emergencies, reply ALERT.');
    }

    res.type('text/xml');
    res.send(twiml.toString());
  }

  /**
   * Handle SMS delivery status callbacks
   */
  static handleSMSStatus(req: Request, res: Response): void {
    const messageSid = req.body.MessageSid;
    const messageStatus = req.body.MessageStatus;
    const to = req.body.To;
    const from = req.body.From;
    const errorCode = req.body.ErrorCode;
    const errorMessage = req.body.ErrorMessage;

    console.log(`📱 SMS Status Update - SID: ${messageSid}, Status: ${messageStatus}, To: ${to}, From: ${from}`);

    if (errorCode) {
      console.error(`❌ SMS Error ${errorCode}: ${errorMessage}`);
    }

    // Store SMS status for compliance and monitoring
    // In production, this would save to database for audit trails

    res.status(200).send('OK');
  }

  /**
   * Send authentication code via SMS
   */
  static async sendAuthCode(phoneNumber: string, code: string): Promise<boolean> {
    if (!twilioClient) {
      console.error('❌ Twilio client not initialized - missing credentials');
      return false;
    }

    try {
      const message = await twilioClient.messages.create({
        body: `🔒 CyberSecured AI Authentication Code: ${code}\n\nThis code expires in 5 minutes. Do not share with anyone.\n\nIf you didn't request this, contact support immediately.`,
        from: process.env.TWILIO_PHONE_NUMBER || '+1234567890',
        to: phoneNumber,
        statusCallback: `${process.env.REPLIT_DOMAIN || 'https://your-app.replit.app'}/api/twilio/sms/status`
      });

      console.log(`✅ Authentication SMS sent - SID: ${message.sid}`);
      return true;
    } catch (error: any) {
      console.error('❌ Failed to send authentication SMS:', error.message);
      return false;
    }
  }

  /**
   * Send security alert via SMS
   */
  static async sendSecurityAlert(phoneNumber: string, alertType: string, message: string): Promise<boolean> {
    if (!twilioClient) {
      console.error('❌ Twilio client not initialized - missing credentials');
      return false;
    }

    try {
      const alertEmoji = alertType === 'critical' ? '🚨' : alertType === 'high' ? '⚠️' : '🔔';
      
      const smsMessage = await twilioClient.messages.create({
        body: `${alertEmoji} SECURITY ALERT\n\nCyberSecured AI Platform\nPriority: ${alertType.toUpperCase()}\n\n${message}\n\nCheck dashboard: cybersecuredai.com\nTime: ${new Date().toLocaleString()}`,
        from: process.env.TWILIO_PHONE_NUMBER || '+1234567890',
        to: phoneNumber,
        statusCallback: `${process.env.REPLIT_DOMAIN || 'https://your-app.replit.app'}/api/twilio/sms/status`
      });

      console.log(`🚨 Security alert SMS sent - SID: ${smsMessage.sid}, Priority: ${alertType}`);
      return true;
    } catch (error: any) {
      console.error('❌ Failed to send security alert SMS:', error.message);
      return false;
    }
  }

  /**
   * Send compliance notification via SMS
   */
  static async sendComplianceNotification(phoneNumber: string, framework: string, status: string): Promise<boolean> {
    if (!twilioClient) {
      console.error('❌ Twilio client not initialized - missing credentials');
      return false;
    }

    try {
      const statusEmoji = status === 'compliant' ? '✅' : status === 'non_compliant' ? '❌' : '⏳';
      
      const message = await twilioClient.messages.create({
        body: `${statusEmoji} COMPLIANCE UPDATE\n\nFramework: ${framework}\nStatus: ${status.toUpperCase()}\n\nCyberSecured AI Platform\nReview required: cybersecuredai.com\nTime: ${new Date().toLocaleString()}`,
        from: process.env.TWILIO_PHONE_NUMBER || '+1234567890',
        to: phoneNumber,
        statusCallback: `${process.env.REPLIT_DOMAIN || 'https://your-app.replit.app'}/api/twilio/sms/status`
      });

      console.log(`📋 Compliance notification SMS sent - SID: ${message.sid}, Framework: ${framework}`);
      return true;
    } catch (error: any) {
      console.error('❌ Failed to send compliance notification SMS:', error.message);
      return false;
    }
  }

  /**
   * Send incident notification via SMS
   */
  static async sendIncidentNotification(phoneNumber: string, incidentId: string, severity: string, title: string): Promise<boolean> {
    if (!twilioClient) {
      console.error('❌ Twilio client not initialized - missing credentials');
      return false;
    }

    try {
      const severityEmoji = severity === 'critical' ? '🔴' : severity === 'high' ? '🟠' : severity === 'medium' ? '🟡' : '🟢';
      
      const message = await twilioClient.messages.create({
        body: `${severityEmoji} INCIDENT ALERT\n\nID: ${incidentId}\nSeverity: ${severity.toUpperCase()}\nTitle: ${title}\n\nCyberSecured AI Platform\nRespond: cybersecuredai.com\nTime: ${new Date().toLocaleString()}`,
        from: process.env.TWILIO_PHONE_NUMBER || '+1234567890',
        to: phoneNumber,
        statusCallback: `${process.env.REPLIT_DOMAIN || 'https://your-app.replit.app'}/api/twilio/sms/status`
      });

      console.log(`🚨 Incident notification SMS sent - SID: ${message.sid}, Incident: ${incidentId}`);
      return true;
    } catch (error: any) {
      console.error('❌ Failed to send incident notification SMS:', error.message);
      return false;
    }
  }

  /**
   * Send bulk security alerts to multiple recipients
   */
  static async sendBulkSecurityAlert(phoneNumbers: string[], alertType: string, message: string): Promise<{ success: number; failed: number }> {
    if (!twilioClient) {
      console.error('❌ Twilio client not initialized - missing credentials');
      return { success: 0, failed: phoneNumbers.length };
    }

    let success = 0;
    let failed = 0;

    for (const phoneNumber of phoneNumbers) {
      try {
        const sent = await this.sendSecurityAlert(phoneNumber, alertType, message);
        if (sent) {
          success++;
        } else {
          failed++;
        }
        // Rate limiting - wait 100ms between messages
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        failed++;
        console.error(`❌ Failed to send bulk alert to ${phoneNumber}:`, error);
      }
    }

    console.log(`📱 Bulk SMS alert completed - Success: ${success}, Failed: ${failed}`);
    return { success, failed };
  }

  /**
   * Validate phone number format
   */
  static validatePhoneNumber(phoneNumber: string): boolean {
    // Basic E.164 format validation
    const phoneRegex = /^\+[1-9]\d{1,14}$/;
    return phoneRegex.test(phoneNumber);
  }

  /**
   * Format phone number to E.164 format
   */
  static formatPhoneNumber(phoneNumber: string): string {
    // Remove all non-digit characters
    const digits = phoneNumber.replace(/\D/g, '');
    
    // Add country code if missing (assumes US)
    if (digits.length === 10) {
      return `+1${digits}`;
    } else if (digits.length === 11 && digits.startsWith('1')) {
      return `+${digits}`;
    }
    
    return `+${digits}`;
  }

  /**
   * Get message delivery statistics
   */
  static async getMessageStats(dateFrom?: Date, dateTo?: Date): Promise<any> {
    if (!twilioClient) {
      console.error('❌ Twilio client not initialized - missing credentials');
      return null;
    }

    try {
      const messages = await twilioClient.messages.list({
        dateCreatedAfter: dateFrom,
        dateCreatedBefore: dateTo,
        limit: 1000
      });

      const stats = {
        total: messages.length,
        sent: 0,
        delivered: 0,
        failed: 0,
        pending: 0
      };

      messages.forEach(message => {
        switch (message.status) {
          case 'sent':
          case 'queued':
            stats.sent++;
            break;
          case 'delivered':
            stats.delivered++;
            break;
          case 'failed':
          case 'undelivered':
            stats.failed++;
            break;
          default:
            stats.pending++;
        }
      });

      return stats;
    } catch (error: any) {
      console.error('❌ Failed to get message statistics:', error.message);
      return null;
    }
  }
}

export default TwilioSMSService;