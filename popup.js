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
            if (chrome.runtime.lastError) {
              console.error(chrome.runtime.lastError.message);
              statusDiv.textContent = 'Error: Failed to chunk text. Please try again.';
              return;
            }
            if (response && response.chunksText && response.chunkCount) {
              const blob = new Blob([response.chunksText], {type: 'text/plain'});
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'chunked_text.txt';
              a.click();
              URL.revokeObjectURL(url);
              statusDiv.textContent = `Successfully chunked into ${response.chunkCount} parts. Download started.`;
            } else {
              statusDiv.textContent = 'Error: Invalid response from content script.';
            }
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
