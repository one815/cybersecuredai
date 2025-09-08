/**
 * CyberSecured AI Chrome Extension - Content Script
 * Phase 3: External Integrations Content Enhancement
 */

// Content script state
let contentState = {
  platform: detectPlatform(),
  initialized: false,
  securityOverlay: null,
  aiAssistant: null
};

// Initialize content script
function init() {
  if (contentState.initialized) return;
  
  console.log(`🔒 CyberSecured AI: Initializing on ${contentState.platform}`);
  
  // Add security enhancements based on platform
  switch (contentState.platform) {
    case 'linkedin':
      initializeLinkedInIntegration();
      break;
    case 'twitter':
      initializeTwitterIntegration();
      break;
    case 'github':
      initializeGitHubIntegration();
      break;
    case 'google-calendar':
      initializeGoogleCalendarIntegration();
      break;
    case 'outlook':
      initializeOutlookIntegration();
      break;
    case 'zoom':
      initializeZoomIntegration();
      break;
    case 'teams':
      initializeTeamsIntegration();
      break;
  }
  
  // Add global security overlay
  createSecurityOverlay();
  
  // Add AI assistant widget
  createAIAssistant();
  
  contentState.initialized = true;
}

// Detect current platform
function detectPlatform() {
  const hostname = window.location.hostname.toLowerCase();
  
  if (hostname.includes('linkedin.com')) return 'linkedin';
  if (hostname.includes('twitter.com') || hostname.includes('x.com')) return 'twitter';
  if (hostname.includes('github.com')) return 'github';
  if (hostname.includes('calendar.google.com')) return 'google-calendar';
  if (hostname.includes('outlook.office.com')) return 'outlook';
  if (hostname.includes('zoom.us')) return 'zoom';
  if (hostname.includes('teams.microsoft.com')) return 'teams';
  
  return 'unknown';
}

// LinkedIn Integration
function initializeLinkedInIntegration() {
  // Track profile views for lead intelligence
  const profileHeading = document.querySelector('h1[data-anonymize="person-name"]');
  if (profileHeading) {
    trackSocialInteraction('linkedin', 'profile_view', {
      profileName: profileHeading.textContent,
      url: window.location.href
    });
  }
  
  // Enhance connection requests with AI suggestions
  const connectButtons = document.querySelectorAll('button[aria-label*="Connect"]');
  connectButtons.forEach(button => {
    button.addEventListener('click', () => {
      showAIConnectionSuggestions();
    });
  });
  
  // Monitor messaging for lead qualification
  observeMessages('linkedin');
}

// Twitter Integration
function initializeTwitterIntegration() {
  // Monitor for cybersecurity-related content
  const tweets = document.querySelectorAll('[data-testid="tweet"]');
  tweets.forEach(tweet => {
    const tweetText = tweet.textContent;
    
    if (containsCyberSecurityKeywords(tweetText)) {
      addThreatAnalysisButton(tweet);
    }
  });
  
  // Track engagement metrics
  const engagementButtons = document.querySelectorAll('[data-testid="like"], [data-testid="retweet"]');
  engagementButtons.forEach(button => {
    button.addEventListener('click', () => {
      trackSocialInteraction('twitter', 'engagement', {
        action: button.getAttribute('data-testid'),
        url: window.location.href
      });
    });
  });
}

// GitHub Integration
function initializeGitHubIntegration() {
  // Add security analysis to repositories
  const repoHeader = document.querySelector('h1[data-pjax="#js-repo-pjax-container"]');
  if (repoHeader) {
    addSecurityAnalysisWidget();
  }
  
  // Monitor pull requests for security issues
  const prTabs = document.querySelectorAll('a[data-tab-item="pr-tab-files"]');
  prTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      setTimeout(analyzePullRequestSecurity, 1000);
    });
  });
  
  // Track repository interactions
  trackSocialInteraction('github', 'repository_view', {
    repository: extractRepositoryInfo(),
    url: window.location.href
  });
}

// Google Calendar Integration
function initializeGoogleCalendarIntegration() {
  // Add security meeting templates
  const createButton = document.querySelector('[data-action="create"]');
  if (createButton) {
    addSecurityMeetingTemplates();
  }
  
  // Monitor meeting scheduling
  observeMeetingEvents('google-calendar');
  
  // Add CyberSecured AI meeting intelligence
  addMeetingIntelligenceWidget();
}

// Outlook Integration
function initializeOutlookIntegration() {
  // Email security scanning
  const emailHeaders = document.querySelectorAll('[role="listitem"]');
  emailHeaders.forEach(header => {
    addEmailSecurityIndicator(header);
  });
  
  // Calendar integration
  const calendarEvents = document.querySelectorAll('[data-automation-id="calendarEvent"]');
  calendarEvents.forEach(event => {
    addMeetingSecurityOptions(event);
  });
}

// Zoom Integration
function initializeZoomIntegration() {
  // Meeting intelligence integration
  const meetingControls = document.querySelector('#meeting-controls');
  if (meetingControls) {
    addCyberSecuredAIMeetingControls(meetingControls);
  }
  
  // Track meeting events
  trackMeetingEvent('zoom', 'meeting_joined', {
    meetingId: extractZoomMeetingId(),
    timestamp: new Date().toISOString()
  });
}

// Teams Integration
function initializeTeamsIntegration() {
  // Meeting transcription integration
  const meetingStage = document.querySelector('[data-tid="meeting-stage"]');
  if (meetingStage) {
    addTranscriptionWidget();
  }
  
  // Chat security monitoring
  const chatMessages = document.querySelectorAll('[data-tid="message-body"]');
  chatMessages.forEach(message => {
    scanMessageForThreats(message);
  });
}

// Create security overlay
function createSecurityOverlay() {
  if (contentState.securityOverlay) return;
  
  const overlay = document.createElement('div');
  overlay.id = 'cybersecured-security-overlay';
  overlay.className = 'cybersecured-overlay';
  overlay.innerHTML = `
    <div class="cybersecured-security-status">
      <div class="status-indicator safe" id="security-status">
        <span class="status-icon">🛡️</span>
        <span class="status-text">Protected</span>
      </div>
      <div class="threat-count" id="threat-count" style="display: none;">
        <span class="count">0</span> threats
      </div>
    </div>
  `;
  
  document.body.appendChild(overlay);
  contentState.securityOverlay = overlay;
  
  // Update security status
  updateSecurityStatus();
}

// Create AI assistant widget
function createAIAssistant() {
  if (contentState.aiAssistant) return;
  
  const assistant = document.createElement('div');
  assistant.id = 'cybersecured-ai-assistant';
  assistant.className = 'cybersecured-assistant';
  assistant.innerHTML = `
    <button class="assistant-toggle" id="ai-toggle">
      <span class="ai-icon">🤖</span>
      <span class="ai-text">Cypher AI</span>
    </button>
    <div class="assistant-panel" id="ai-panel" style="display: none;">
      <div class="panel-header">
        <h3>Cypher AI Assistant</h3>
        <button class="close-btn" id="ai-close">×</button>
      </div>
      <div class="panel-content">
        <div class="ai-status">Ready to assist</div>
        <div class="quick-actions">
          <button class="action-btn" data-action="analyze-page">Analyze Page</button>
          <button class="action-btn" data-action="check-threats">Check Threats</button>
          <button class="action-btn" data-action="optimize-workflow">Optimize Workflow</button>
        </div>
        <div class="ai-insights" id="ai-insights"></div>
      </div>
    </div>
  `;
  
  document.body.appendChild(assistant);
  contentState.aiAssistant = assistant;
  
  // Add event listeners
  document.getElementById('ai-toggle').addEventListener('click', toggleAIPanel);
  document.getElementById('ai-close').addEventListener('click', closeAIPanel);
  
  // Quick action handlers
  document.querySelectorAll('.action-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      handleAIAction(e.target.getAttribute('data-action'));
    });
  });
}

// Utility functions
function trackSocialInteraction(platform, interaction, metadata = {}) {
  chrome.runtime.sendMessage({
    type: 'SOCIAL_INTERACTION',
    data: { platform, interaction, metadata }
  });
}

function trackMeetingEvent(platform, eventType, data = {}) {
  chrome.runtime.sendMessage({
    type: eventType.toUpperCase(),
    data: { platform, ...data }
  });
}

function containsCyberSecurityKeywords(text) {
  const keywords = [
    'malware', 'phishing', 'ransomware', 'breach', 'vulnerability',
    'exploit', 'cybersecurity', 'infosec', 'zero-day', 'ddos'
  ];
  
  return keywords.some(keyword => 
    text.toLowerCase().includes(keyword.toLowerCase())
  );
}

function updateSecurityStatus() {
  chrome.runtime.sendMessage({ type: 'GET_THREATS' }, (response) => {
    if (response?.threats) {
      const threatCount = response.threats.length;
      const statusIndicator = document.getElementById('security-status');
      const threatCountElement = document.getElementById('threat-count');
      
      if (threatCount > 0) {
        statusIndicator.className = 'status-indicator warning';
        statusIndicator.querySelector('.status-icon').textContent = '⚠️';
        statusIndicator.querySelector('.status-text').textContent = 'Threats Detected';
        
        threatCountElement.style.display = 'block';
        threatCountElement.querySelector('.count').textContent = threatCount;
      }
    }
  });
}

function toggleAIPanel() {
  const panel = document.getElementById('ai-panel');
  panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
}

function closeAIPanel() {
  document.getElementById('ai-panel').style.display = 'none';
}

function handleAIAction(action) {
  const insights = document.getElementById('ai-insights');
  
  switch (action) {
    case 'analyze-page':
      insights.innerHTML = '<div class="loading">🔍 Analyzing page security...</div>';
      chrome.runtime.sendMessage({
        type: 'ANALYZE_PAGE',
        data: { url: window.location.href, content: document.body.innerText }
      });
      break;
      
    case 'check-threats':
      insights.innerHTML = '<div class="loading">🛡️ Checking for threats...</div>';
      updateSecurityStatus();
      break;
      
    case 'optimize-workflow':
      insights.innerHTML = '<div class="loading">⚡ Analyzing workflow optimization...</div>';
      chrome.runtime.sendMessage({
        type: 'OPTIMIZE_WORKFLOW',
        data: { platform: contentState.platform, url: window.location.href }
      });
      break;
  }
}

// Listen for messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.type) {
    case 'ANALYSIS_RESULT':
      displayAnalysisResult(request.data);
      break;
    case 'SECURITY_UPDATE':
      updateSecurityStatus();
      break;
    case 'AI_INSIGHT':
      displayAIInsight(request.data);
      break;
  }
  
  sendResponse({ received: true });
});

function displayAnalysisResult(data) {
  const insights = document.getElementById('ai-insights');
  if (insights) {
    insights.innerHTML = `
      <div class="analysis-result">
        <h4>Security Analysis</h4>
        <div class="score">Score: ${data.securityScore}%</div>
        <div class="summary">${data.summary}</div>
        ${data.recommendations ? 
          `<div class="recommendations">
            <strong>Recommendations:</strong>
            <ul>${data.recommendations.map(rec => `<li>${rec}</li>`).join('')}</ul>
           </div>` : ''
        }
      </div>
    `;
  }
}

function displayAIInsight(data) {
  const insights = document.getElementById('ai-insights');
  if (insights) {
    insights.innerHTML = `
      <div class="ai-insight">
        <h4>${data.title}</h4>
        <div class="insight-content">${data.content}</div>
        ${data.actions ? 
          `<div class="insight-actions">
            ${data.actions.map(action => 
              `<button class="insight-action" data-action="${action.id}">${action.label}</button>`
            ).join('')}
           </div>` : ''
        }
      </div>
    `;
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

console.log(`🚀 CyberSecured AI Content Script loaded on ${contentState.platform}`);