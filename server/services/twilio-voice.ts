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
 * Twilio Voice Integration Service for CyberSecured AI Platform
 * Handles incoming voice calls, security alerts, and voice authentication
 */
export class TwilioVoiceService {
  
  /**
   * Handle incoming voice calls with security-focused menu
   */
  static handleIncomingCall(req: Request, res: Response): void {
    const twiml = new twilio.twiml.VoiceResponse();
    
    // Welcome message for CyberSecured AI platform
    twiml.say({
      voice: 'alice',
      language: 'en-US'
    }, 'Welcome to CyberSecured AI Platform. Your call is being recorded for security and compliance purposes.');

    // Create main menu
    const gather = twiml.gather({
      numDigits: 1,
      action: '/api/twilio/voice/menu',
      method: 'POST',
      timeout: 10
    });

    gather.say({
      voice: 'alice',
      language: 'en-US'
    }, 'Please select from the following options: Press 1 for Security Emergency, Press 2 for Technical Support, Press 3 for Compliance Inquiry, Press 4 for General Information, or Press 0 to speak with an operator.');

    // Fallback if no input
    twiml.say({
      voice: 'alice',
      language: 'en-US'
    }, 'We did not receive your selection. Please call back and make a selection.');

    twiml.hangup();

    res.type('text/xml');
    res.send(twiml.toString());
  }

  /**
   * Handle voice menu selections
   */
  static handleMenuSelection(req: Request, res: Response): void {
    const twiml = new twilio.twiml.VoiceResponse();
    const choice = req.body.Digits;

    switch (choice) {
      case '1':
        // Security Emergency
        twiml.say({
          voice: 'alice',
          language: 'en-US'
        }, 'You have reached Security Emergency services. This call is being escalated to our security operations center. Please hold while we connect you to our on-call security analyst.');
        
        // In production, this would dial the security team
        twiml.dial({
          action: '/api/twilio/voice/security-complete',
          method: 'POST'
        }, '+1-800-SECURITY'); // Replace with actual security team number
        break;

      case '2':
        // Technical Support
        twiml.say({
          voice: 'alice',
          language: 'en-US'
        }, 'You have reached Technical Support for CyberSecured AI Platform. Please hold while we connect you to our technical support team.');
        
        twiml.dial({
          action: '/api/twilio/voice/support-complete',
          method: 'POST'
        }, '+1-800-SUPPORT'); // Replace with actual support number
        break;

      case '3':
        // Compliance Inquiry
        twiml.say({
          voice: 'alice',
          language: 'en-US'
        }, 'You have reached Compliance Services. For FERPA, FISMA, or CIPA compliance inquiries, please hold while we connect you to our compliance officer.');
        
        twiml.dial({
          action: '/api/twilio/voice/compliance-complete',
          method: 'POST'
        }, '+1-800-COMPLY'); // Replace with actual compliance number
        break;

      case '4':
        // General Information
        twiml.say({
          voice: 'alice',
          language: 'en-US'
        }, 'Thank you for calling CyberSecured AI Platform. We provide advanced cybersecurity solutions for educational institutions and government organizations. Our platform features real-time threat monitoring, compliance management, and AI-powered security analytics. For more information, please visit our website at cybersecuredai.com or stay on the line to speak with a representative.');
        
        twiml.dial({
          action: '/api/twilio/voice/info-complete',
          method: 'POST'
        }, '+1-800-INFO'); // Replace with actual info line
        break;

      case '0':
        // Operator
        twiml.say({
          voice: 'alice',
          language: 'en-US'
        }, 'Please hold while we connect you to an operator.');
        
        twiml.dial({
          action: '/api/twilio/voice/operator-complete',
          method: 'POST'
        }, '+1-800-OPERATOR'); // Replace with actual operator number
        break;

      default:
        // Invalid selection
        twiml.say({
          voice: 'alice',
          language: 'en-US'
        }, 'Invalid selection. Please try again.');
        
        twiml.redirect('/api/twilio/voice');
        break;
    }

    res.type('text/xml');
    res.send(twiml.toString());
  }

  /**
   * Handle call completion and logging
   */
  static handleCallComplete(req: Request, res: Response, callType: string): void {
    const twiml = new twilio.twiml.VoiceResponse();
    const callStatus = req.body.DialCallStatus;
    const duration = req.body.DialCallDuration;
    const from = req.body.From;
    const to = req.body.To;

    // Log call for security and compliance
    console.log(`📞 Call completed - Type: ${callType}, Status: ${callStatus}, Duration: ${duration}s, From: ${from}, To: ${to}`);

    if (callStatus === 'completed') {
      twiml.say({
        voice: 'alice',
        language: 'en-US'
      }, 'Thank you for calling CyberSecured AI Platform. Have a secure day.');
    } else {
      twiml.say({
        voice: 'alice',
        language: 'en-US'
      }, 'We were unable to connect your call at this time. Please try again later or contact us through our website at cybersecuredai.com');
    }

    twiml.hangup();

    res.type('text/xml');
    res.send(twiml.toString());
  }

  /**
   * Handle voice authentication for multi-factor authentication
   */
  static handleVoiceAuth(req: Request, res: Response): void {
    const twiml = new twilio.twiml.VoiceResponse();
    const authCode = req.query.code as string;

    if (!authCode) {
      twiml.say({
        voice: 'alice',
        language: 'en-US'
      }, 'Authentication code not provided. Please try again.');
      twiml.hangup();
    } else {
      twiml.say({
        voice: 'alice',
        language: 'en-US'
      }, `Your CyberSecured AI Platform authentication code is: ${authCode.split('').join(', ')}. I repeat: ${authCode.split('').join(', ')}. This code will expire in 5 minutes.`);
      
      twiml.pause({ length: 2 });
      
      twiml.say({
        voice: 'alice',
        language: 'en-US'
      }, 'Thank you for using CyberSecured AI Platform secure voice authentication.');
      
      twiml.hangup();
    }

    res.type('text/xml');
    res.send(twiml.toString());
  }

  /**
   * Handle fallback URL for voice webhooks
   */
  static handleFallback(req: Request, res: Response): void {
    const twiml = new twilio.twiml.VoiceResponse();
    
    twiml.say({
      voice: 'alice',
      language: 'en-US'
    }, 'We are experiencing technical difficulties. Please try your call again later or contact us through our website.');
    
    twiml.hangup();

    res.type('text/xml');
    res.send(twiml.toString());
  }

  /**
   * Handle call status updates for monitoring
   */
  static handleStatusCallback(req: Request, res: Response): void {
    const callSid = req.body.CallSid;
    const callStatus = req.body.CallStatus;
    const from = req.body.From;
    const to = req.body.To;
    const duration = req.body.CallDuration;

    // Log call status for security monitoring
    console.log(`📞 Call Status Update - SID: ${callSid}, Status: ${callStatus}, From: ${from}, To: ${to}, Duration: ${duration}s`);

    // Store call data for compliance and analytics
    // In production, this would save to database
    
    res.status(200).send('OK');
  }

  /**
   * Send voice call with authentication code
   */
  static async sendVoiceAuth(phoneNumber: string, authCode: string): Promise<boolean> {
    if (!twilioClient) {
      console.error('❌ Twilio client not initialized - missing credentials');
      return false;
    }

    try {
      const call = await twilioClient.calls.create({
        to: phoneNumber,
        from: process.env.TWILIO_PHONE_NUMBER || '+1234567890', // Your Twilio phone number
        url: `${process.env.REPLIT_DOMAIN || 'https://your-app.replit.app'}/api/twilio/voice/auth?code=${authCode}`,
        method: 'GET'
      });

      console.log(`✅ Voice authentication call initiated - SID: ${call.sid}`);
      return true;
    } catch (error: any) {
      console.error('❌ Failed to send voice authentication call:', error.message);
      return false;
    }
  }

  /**
   * Send emergency security alert call
   */
  static async sendSecurityAlert(phoneNumber: string, alertMessage: string): Promise<boolean> {
    if (!twilioClient) {
      console.error('❌ Twilio client not initialized - missing credentials');
      return false;
    }

    try {
      const twiml = new twilio.twiml.VoiceResponse();
      twiml.say({
        voice: 'alice',
        language: 'en-US'
      }, `Security Alert from CyberSecured AI Platform: ${alertMessage}. This is an automated security notification. Please check your dashboard immediately.`);

      const call = await twilioClient.calls.create({
        to: phoneNumber,
        from: process.env.TWILIO_PHONE_NUMBER || '+1234567890',
        twiml: twiml.toString()
      });

      console.log(`🚨 Security alert call sent - SID: ${call.sid}`);
      return true;
    } catch (error: any) {
      console.error('❌ Failed to send security alert call:', error.message);
      return false;
    }
  }
}

export default TwilioVoiceService;