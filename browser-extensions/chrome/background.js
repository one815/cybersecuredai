/**
 * CyberSecured AI Chrome Extension - Background Service Worker
 * Phase 3: External Integrations with Revolutionary Dual AI System
 */

// Extension state management
let extensionState = {
  isConnected: false,
  apiUrl: 'https://cybersecuredai.com',
  user: null,
  notifications: [],
  threats: [],
  lastSync: null
};

// Initialize extension
chrome.runtime.onInstalled.addListener((details) => {
  console.log('🔒 CyberSecured AI Extension installed/updated');
  
  // Create context menus
  chrome.contextMenus.create({
    id: 'cybersecured-analyze',
    title: 'Analyze with CyberSecured AI',
    contexts: ['selection', 'link', 'page']
  });
  
  chrome.contextMenus.create({
    id: 'cybersecured-threat-check',
    title: 'Check for Security Threats',
    contexts: ['link', 'page']
  });
  
  // Set up periodic threat monitoring
  chrome.alarms.create('threatMonitoring', { periodInMinutes: 5 });
  chrome.alarms.create('syncData', { periodInMinutes: 15 });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  switch (info.menuItemId) {
    case 'cybersecured-analyze':
      await analyzeContent(info, tab);
      break;
    case 'cybersecured-threat-check':
      await checkForThreats(info, tab);
      break;
  }
});

// Handle alarms
chrome.alarms.onAlarm.addListener(async (alarm) => {
  switch (alarm.name) {
    case 'threatMonitoring':
      await monitorThreats();
      break;
    case 'syncData':
      await syncWithPlatform();
      break;
  }
});

// Analyze content with Cypher AI
async function analyzeContent(info, tab) {
  try {
    const content = info.selectionText || info.linkUrl || tab.url;
    
    // Send to CyberSecured AI platform for analysis
    const response = await fetch(`${extensionState.apiUrl}/api/ai/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Extension-Version': '3.0.0'
      },
      body: JSON.stringify({
        content: content,
        context: {
          url: tab.url,
          title: tab.title,
          type: info.selectionText ? 'text' : info.linkUrl ? 'link' : 'page'
        }
      })
    });
    
    if (response.ok) {
      const analysis = await response.json();
      
      // Show notification with results
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icons/icon-48.png',
        title: 'CyberSecured AI Analysis',
        message: `Security Score: ${analysis.securityScore}% - ${analysis.summary}`,
        priority: analysis.threatLevel === 'high' ? 2 : 1
      });
      
      // Send results to content script for display
      chrome.tabs.sendMessage(tab.id, {
        type: 'ANALYSIS_RESULT',
        data: analysis
      });
    }
  } catch (error) {
    console.error('❌ Analysis failed:', error);
  }
}

// Check for security threats
async function checkForThreats(info, tab) {
  try {
    const url = info.linkUrl || tab.url;
    
    const response = await fetch(`${extensionState.apiUrl}/api/threats/check-url`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url })
    });
    
    if (response.ok) {
      const threat = await response.json();
      
      if (threat.isThreaten) {
        chrome.notifications.create({
          type: 'basic',
          iconUrl: 'icons/icon-48.png',
          title: '⚠️ Security Threat Detected',
          message: `Risk Level: ${threat.riskLevel} - ${threat.description}`,
          priority: 2
        });
        
        // Block if high risk
        if (threat.riskLevel === 'high') {
          chrome.tabs.update(tab.id, { url: 'chrome://newtab/' });
        }
      } else {
        chrome.notifications.create({
          type: 'basic',
          iconUrl: 'icons/icon-48.png',
          title: '✅ Safe Site',
          message: 'No security threats detected',
          priority: 0
        });
      }
    }
  } catch (error) {
    console.error('❌ Threat check failed:', error);
  }
}

// Monitor threats in background
async function monitorThreats() {
  try {
    const response = await fetch(`${extensionState.apiUrl}/api/threats/latest?limit=5`);
    if (response.ok) {
      const threats = await response.json();
      extensionState.threats = threats;
      
      // Check for high-priority threats
      const highPriorityThreats = threats.filter(t => t.severity === 'critical' || t.severity === 'high');
      
      if (highPriorityThreats.length > 0) {
        chrome.notifications.create({
          type: 'basic',
          iconUrl: 'icons/icon-48.png',
          title: '🚨 High Priority Threats Detected',
          message: `${highPriorityThreats.length} critical/high threats require attention`,
          priority: 2
        });
      }
      
      // Update badge
      chrome.action.setBadgeText({ 
        text: threats.length > 0 ? threats.length.toString() : '' 
      });
      chrome.action.setBadgeBackgroundColor({ color: '#dc2626' });
    }
  } catch (error) {
    console.error('❌ Threat monitoring failed:', error);
  }
}

// Sync with CyberSecured AI platform
async function syncWithPlatform() {
  try {
    // Get user settings
    const { apiKey, userId } = await chrome.storage.sync.get(['apiKey', 'userId']);
    
    if (!apiKey) return;
    
    const response = await fetch(`${extensionState.apiUrl}/api/extension/sync`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (response.ok) {
      const syncData = await response.json();
      
      // Update extension state
      extensionState.user = syncData.user;
      extensionState.notifications = syncData.notifications;
      extensionState.lastSync = new Date().toISOString();
      
      // Store in local storage
      await chrome.storage.local.set({
        user: syncData.user,
        notifications: syncData.notifications,
        lastSync: extensionState.lastSync
      });
      
      console.log('✅ Synced with CyberSecured AI platform');
    }
  } catch (error) {
    console.error('❌ Platform sync failed:', error);
  }
}

// Handle messages from content scripts and popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.type) {
    case 'GET_THREATS':
      sendResponse({ threats: extensionState.threats });
      break;
    case 'GET_STATE':
      sendResponse({ state: extensionState });
      break;
    case 'SOCIAL_INTERACTION':
      handleSocialInteraction(request.data);
      break;
    case 'MEETING_STARTED':
      handleMeetingEvent('started', request.data);
      break;
    case 'MEETING_ENDED':
      handleMeetingEvent('ended', request.data);
      break;
    default:
      sendResponse({ error: 'Unknown message type' });
  }
  
  return true; // Keep message channel open
});

// Handle social media interactions
async function handleSocialInteraction(data) {
  try {
    await fetch(`${extensionState.apiUrl}/api/integrations/social/track`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        platform: data.platform,
        interaction: data.interaction,
        timestamp: new Date().toISOString(),
        metadata: data.metadata
      })
    });
  } catch (error) {
    console.error('❌ Social interaction tracking failed:', error);
  }
}

// Handle meeting events
async function handleMeetingEvent(eventType, data) {
  try {
    await fetch(`${extensionState.apiUrl}/api/integrations/meeting/${eventType}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        platform: data.platform,
        meetingId: data.meetingId,
        timestamp: new Date().toISOString(),
        participants: data.participants || [],
        metadata: data.metadata
      })
    });
  } catch (error) {
    console.error('❌ Meeting event tracking failed:', error);
  }
}

// Tab updates for security monitoring
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    // Auto-check URLs for threats (configurable)
    const { autoThreatCheck } = await chrome.storage.sync.get(['autoThreatCheck']);
    
    if (autoThreatCheck) {
      await checkForThreats({ linkUrl: tab.url }, tab);
    }
  }
});

// Network request monitoring for threat detection
chrome.webRequest.onBeforeRequest.addListener(
  async (details) => {
    // Check if URL is in threat database
    const { enableNetworkMonitoring } = await chrome.storage.sync.get(['enableNetworkMonitoring']);
    
    if (enableNetworkMonitoring && details.url.startsWith('http')) {
      // Quick threat check (cached responses)
      const threatCache = await chrome.storage.local.get([details.url]);
      
      if (threatCache[details.url]?.isBlocked) {
        return { cancel: true };
      }
    }
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);

console.log('🚀 CyberSecured AI Chrome Extension - Background service worker loaded');