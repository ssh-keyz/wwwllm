// In popup.js
document.getElementById('chunkButton').addEventListener('click', () => {
  const statusDiv = document.getElementById('status');
  statusDiv.textContent = 'Processing...';
  
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    if (tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id, {action: "isReady"}, (response) => {
        if (chrome.runtime.lastError) {
          console.log(chrome.runtime.lastError.message);
          statusDiv.textContent = 'Error: Content script not ready. Please refresh the page.';
          return;
        }
        if (response && response.ready) {
          chrome.tabs.sendMessage(tabs[0].id, {action: "chunkText"}, (response) => {
            // Your existing code for handling the response
          });
        } else {
          statusDiv.textContent = 'Error: Content script not ready. Please refresh the page.';
        }
      });
    } else {
      statusDiv.textContent = 'Error: No active tab found.';
    }
  });
});
