// In popup.js
document.getElementById('chunkButton').addEventListener('click', () => {
  const statusDiv = document.getElementById('status');
  statusDiv.textContent = 'Processing...';
  
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {action: "chunkText"}, (response) => {
      if (chrome.runtime.lastError) {
        statusDiv.textContent = 'Error: ' + chrome.runtime.lastError.message;
        return;
      }
      if (response && response.chunksText) {
        // ... (download code) ...
        statusDiv.textContent = 'File downloaded!';
      } else {
        statusDiv.textContent = 'Error: Unexpected response';
      }
    });
  });
});
