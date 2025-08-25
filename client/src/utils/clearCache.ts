// Utility to clear browser cache and stored authentication data
export function clearBrowserCache() {
  // Clear localStorage
  localStorage.removeItem("authToken");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("resolvedAlerts");
  
  // Clear sessionStorage
  sessionStorage.clear();
  
  console.log("Browser cache and stored authentication data cleared");
}