document.addEventListener('DOMContentLoaded', function () {
    // Retrieve data from storage and update the popup
    chrome.storage.local.get(['totalVisits', 'mostVisitedSite'], function (data) {
      document.getElementById('totalVisits').textContent = data.totalVisits || 0;
      document.getElementById('mostVisitedSite').textContent = data.mostVisitedSite || 'None';
    });
  
    // New feature: Focus Popup
    const focusPopup = document.getElementById('focusPopup');
    const yesButton = document.getElementById('yesButton');
    const noButton = document.getElementById('noButton');
  
    // Event listeners for yes and no buttons
    yesButton.addEventListener('click', function () {
      focusPopup.style.display = 'none';
    });
  
    noButton.addEventListener('click', function () {
      // Change popup text to "FOCUS"
      focusPopup.innerHTML = '<p>FOCUS</p>';
      setTimeout(function () {
        focusPopup.style.display = 'none';
      }, 3000); // Fade away after 3 seconds
    });
  });
  
  // New feature: Show Focus Popup based on user preferences
  chrome.storage.local.get('focusPopupInterval', function (data) {
    const interval = data.focusPopupInterval || 0;
  
    if (interval > 0) {
      setTimeout(function () {
        document.getElementById('focusPopup').style.display = 'block';
      }, interval * 60 * 1000); // Convert minutes to milliseconds
    }
  });
  