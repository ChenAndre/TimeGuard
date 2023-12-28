let siteData = {}; // Store site data (visits and time) here

// Listen for web navigation events
chrome.webNavigation.onCompleted.addListener(function(details) {
  const { url } = details;
  const hostname = new URL(url).hostname;

  // Update siteData
  siteData[hostname] = siteData[hostname] || { visits: 0, timeSpent: 0 };
  siteData[hostname].visits += 1;

  // Save siteData to storage
  chrome.storage.local.set({ siteData });

  // Update total visits in storage
  chrome.storage.local.get('totalVisits', function(data) {
    const totalVisits = (data.totalVisits || 0) + 1;
    chrome.storage.local.set({ totalVisits });
  });

  // Update most visited site in storage
  chrome.storage.local.get('mostVisitedSite', function(data) {
    // Check if siteData exists and has properties to avoid accessing properties of undefined
    if(siteData && Object.keys(siteData).length > 0) {
      const mostVisitedSite = Object.keys(siteData).reduce((a, b) => {
        const visitsA = siteData[a] ? siteData[a].visits : 0;
        const visitsB = siteData[b] ? siteData[b].visits : 0;
        return visitsA > visitsB ? a : b;
      }, null);
      chrome.storage.local.set({ mostVisitedSite });
    }
  });
});

// New feature: Set user preferences for Focus Popup interval
chrome.storage.local.set({ focusPopupInterval: 30 }); // Set the default interval to 30 minutes
