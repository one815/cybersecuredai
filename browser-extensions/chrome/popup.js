/**
 * CyberSecured AI Chrome Extension - Popup Interface
 * Phase 3: External Integrations Dashboard
 */

// Popup state management
let popupState = {
  connected: false,
  threats: [],
  insights: [],
  platformStatus: {},
  user: null
};

// Initialize popup
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🔒 CyberSecured AI Popup initialized');
    
    // Load extension state
    await loadExtensionState();
    
    // Update UI
    updateConnectionStatus();
    updateThreatCount();
    updatePlatformStatus();
    updateAIInsights();
    updateRecentActivity();
    
    // Set up event listeners
    setupEventListeners();
    
    // Periodic updates
    setInterval(updateDashboard, 30000); // Update every 30 seconds
});

// Load extension state from background
async function loadExtensionState() {
    try {
        // Get state from background script
        const response = await chrome.runtime.sendMessage({ type: 'GET_STATE' });
        
        if (response?.state) {
            popupState.connected = response.state.isConnected;
            popupState.threats = response.state.threats || [];
            popupState.user = response.state.user;
        }
        
        // Get platform status from storage
        const result = await chrome.storage.local.get(['platformStatus', 'insights', 'recentActivity']);
        popupState.platformStatus = result.platformStatus || {};
        popupState.insights = result.insights || [];
        popupState.recentActivity = result.recentActivity || [];
        
    } catch (error) {
        console.error('❌ Failed to load extension state:', error);
    }
}

// Set up event listeners
function setupEventListeners() {
    // Quick action buttons
    document.getElementById('scan-page').addEventListener('click', scanCurrentPage);
    document.getElementById('check-threats').addEventListener('click', checkThreats);
    document.getElementById('open-dashboard').addEventListener('click', openDashboard);
    
    // Footer buttons
    document.getElementById('open-settings').addEventListener('click', openSettings);
    document.getElementById('open-help').addEventListener('click', openHelp);
    document.getElementById('open-external-integrations').addEventListener('click', openExternalIntegrations);
    
    // Platform status items
    document.querySelectorAll('.platform-item').forEach(item => {
        item.addEventListener('click', () => {
            const platform = item.getAttribute('data-platform');
            openPlatformSettings(platform);
        });
    });
}

// Update connection status
function updateConnectionStatus() {
    const statusElement = document.getElementById('connection-status');
    const indicator = statusElement.querySelector('.status-indicator');
    const text = statusElement.querySelector('.status-text');
    
    if (popupState.connected) {
        indicator.className = 'status-indicator connected';
        text.textContent = 'Connected';
    } else {
        indicator.className = 'status-indicator disconnected';
        text.textContent = 'Disconnected';
    }
    
    // Update protection status
    const protectionStatus = document.getElementById('protection-status');
    protectionStatus.textContent = popupState.connected ? 'Active' : 'Offline';
    protectionStatus.className = popupState.connected ? 'status-active' : 'status-inactive';
}

// Update threat count
function updateThreatCount() {
    const threatCount = document.getElementById('threat-count');
    const count = popupState.threats.length;
    
    threatCount.textContent = count.toString();
    threatCount.className = count > 0 ? 'status-warning' : 'status-safe';
}

// Update platform status indicators
function updatePlatformStatus() {
    const platforms = ['linkedin', 'twitter', 'github', 'calendar'];
    
    platforms.forEach(platform => {
        const statusIndicator = document.getElementById(`${platform}-status`);
        const isConnected = popupState.platformStatus[platform]?.connected || false;
        
        statusIndicator.className = `platform-status-indicator ${isConnected ? 'connected' : 'disconnected'}`;
        statusIndicator.textContent = isConnected ? '●' : '○';
    });
}

// Update AI insights
function updateAIInsights() {
    const insightCards = document.getElementById('insight-cards');
    
    if (popupState.insights.length === 0) {
        insightCards.innerHTML = `
            <div class="no-insights">
                <span class="no-insights-icon">🤖</span>
                <span class="no-insights-text">No insights available</span>
            </div>
        `;
        return;
    }
    
    insightCards.innerHTML = popupState.insights.map(insight => `
        <div class="insight-card ${insight.priority || 'normal'}">
            <div class="insight-header">
                <span class="insight-icon">${insight.icon}</span>
                <span class="insight-title">${insight.title}</span>
            </div>
            <div class="insight-content">${insight.content}</div>
            ${insight.action ? 
                `<button class="insight-action" data-action="${insight.action.id}">
                    ${insight.action.label}
                </button>` : ''
            }
        </div>
    `).join('');
    
    // Add event listeners to insight actions
    document.querySelectorAll('.insight-action').forEach(btn => {
        btn.addEventListener('click', (e) => {
            handleInsightAction(e.target.getAttribute('data-action'));
        });
    });
}

// Update recent activity
function updateRecentActivity() {
    const activityList = document.getElementById('activity-list');
    
    if (!popupState.recentActivity || popupState.recentActivity.length === 0) {
        activityList.innerHTML = `
            <div class="no-activity">
                <span class="no-activity-text">No recent activity</span>
            </div>
        `;
        return;
    }
    
    activityList.innerHTML = popupState.recentActivity.slice(0, 3).map(activity => `
        <div class="activity-item">
            <span class="activity-icon">${activity.icon}</span>
            <div class="activity-details">
                <span class="activity-text">${activity.text}</span>
                <span class="activity-time">${formatTimeAgo(activity.timestamp)}</span>
            </div>
        </div>
    `).join('');
}

// Action handlers
async function scanCurrentPage() {
    try {
        // Get current tab
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        
        if (!tab) return;
        
        // Show loading state
        const scanBtn = document.getElementById('scan-page');
        const originalText = scanBtn.querySelector('.btn-text').textContent;
        scanBtn.querySelector('.btn-text').textContent = 'Scanning...';
        scanBtn.disabled = true;
        
        // Send scan request to background
        chrome.runtime.sendMessage({
            type: 'ANALYZE_PAGE',
            data: { url: tab.url, tabId: tab.id }
        });
        
        // Add to activity
        addActivity({
            icon: '🔍',
            text: 'Page scan initiated',
            timestamp: new Date().toISOString()
        });
        
        // Reset button after delay
        setTimeout(() => {
            scanBtn.querySelector('.btn-text').textContent = originalText;
            scanBtn.disabled = false;
        }, 2000);
        
    } catch (error) {
        console.error('❌ Scan failed:', error);
    }
}

async function checkThreats() {
    try {
        // Show loading state
        const checkBtn = document.getElementById('check-threats');
        const originalText = checkBtn.querySelector('.btn-text').textContent;
        checkBtn.querySelector('.btn-text').textContent = 'Checking...';
        checkBtn.disabled = true;
        
        // Force threat update
        const response = await chrome.runtime.sendMessage({ type: 'GET_THREATS' });
        
        if (response?.threats) {
            popupState.threats = response.threats;
            updateThreatCount();
            
            // Show notification if threats found
            if (response.threats.length > 0) {
                addInsight({
                    icon: '⚠️',
                    title: 'Security Alert',
                    content: `${response.threats.length} potential threat(s) detected`,
                    priority: 'high',
                    action: {
                        id: 'view-threats',
                        label: 'View Details'
                    }
                });
            }
        }
        
        // Add to activity
        addActivity({
            icon: '🚨',
            text: `Threat check completed - ${popupState.threats.length} threats found`,
            timestamp: new Date().toISOString()
        });
        
        // Reset button
        setTimeout(() => {
            checkBtn.querySelector('.btn-text').textContent = originalText;
            checkBtn.disabled = false;
        }, 1500);
        
    } catch (error) {
        console.error('❌ Threat check failed:', error);
    }
}

function openDashboard() {
    chrome.tabs.create({ 
        url: 'https://cybersecuredai.com/dashboard' 
    });
}

function openSettings() {
    chrome.runtime.openOptionsPage();
}

function openHelp() {
    chrome.tabs.create({ 
        url: 'https://cybersecuredai.com/support' 
    });
}

function openExternalIntegrations() {
    chrome.tabs.create({ 
        url: 'https://cybersecuredai.com/integrations/external' 
    });
}

function openPlatformSettings(platform) {
    const platformUrls = {
        linkedin: 'https://cybersecuredai.com/integrations/external?tab=social',
        twitter: 'https://cybersecuredai.com/integrations/external?tab=social',
        github: 'https://cybersecuredai.com/integrations/external?tab=social',
        calendar: 'https://cybersecuredai.com/integrations/external?tab=calendar'
    };
    
    chrome.tabs.create({ 
        url: platformUrls[platform] || 'https://cybersecuredai.com/integrations/external'
    });
}

// Handle insight actions
function handleInsightAction(actionId) {
    switch (actionId) {
        case 'view-threats':
            openDashboard();
            break;
        case 'optimize-settings':
            openSettings();
            break;
        case 'connect-platform':
            openExternalIntegrations();
            break;
        default:
            console.log(`Unknown insight action: ${actionId}`);
    }
}

// Utility functions
function addActivity(activity) {
    if (!popupState.recentActivity) {
        popupState.recentActivity = [];
    }
    
    popupState.recentActivity.unshift(activity);
    
    // Keep only last 10 activities
    if (popupState.recentActivity.length > 10) {
        popupState.recentActivity = popupState.recentActivity.slice(0, 10);
    }
    
    // Save to storage
    chrome.storage.local.set({ recentActivity: popupState.recentActivity });
    
    // Update UI
    updateRecentActivity();
}

function addInsight(insight) {
    if (!popupState.insights) {
        popupState.insights = [];
    }
    
    popupState.insights.unshift(insight);
    
    // Keep only last 5 insights
    if (popupState.insights.length > 5) {
        popupState.insights = popupState.insights.slice(0, 5);
    }
    
    // Save to storage
    chrome.storage.local.set({ insights: popupState.insights });
    
    // Update UI
    updateAIInsights();
}

function formatTimeAgo(timestamp) {
    const now = new Date();
    const time = new Date(timestamp);
    const diff = Math.floor((now - time) / 1000);
    
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
}

// Periodic dashboard updates
async function updateDashboard() {
    await loadExtensionState();
    updateConnectionStatus();
    updateThreatCount();
    updatePlatformStatus();
}

// Listen for messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.type) {
        case 'THREAT_UPDATE':
            popupState.threats = request.data;
            updateThreatCount();
            break;
        case 'PLATFORM_STATUS_UPDATE':
            popupState.platformStatus = request.data;
            updatePlatformStatus();
            break;
        case 'NEW_INSIGHT':
            addInsight(request.data);
            break;
    }
    
    sendResponse({ received: true });
});

console.log('🚀 CyberSecured AI Popup script loaded');