// Content script (content.js)
function chunkText(text) {
  const MAX_HEADING_LENGTH = 7;
  const MAX_HEADING_CONTENT_LENGTH = 200;
  // ... (other constants)

  const chunkRegex = new RegExp(
    "(" +
    // ... (regex pattern, same as in the original script)
    ")",
    "gmu"
  );

  return text.match(chunkRegex) || [];
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "chunkText") {
    const pageText = document.body.innerText;
    const chunks = chunkText(pageText);
    const chunksText = chunks.map((chunk, index) => `Chunk ${index + 1}:\n${chunk}\n\n`).join('');
    sendResponse({chunksText: chunksText, chunkCount: chunks.length});
  }
});

// Popup script (popup.js)
document.getElementById('chunkButton').addEventListener('click', () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {action: "chunkText"}, (response) => {
      if (response && response.chunksText) {
        const blob = new Blob([response.chunksText], {type: 'text/plain'});
        const url = URL.createObjectURL(blob);
        
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = 'text_chunks.txt';
        
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        
        URL.revokeObjectURL(url);
        
        document.getElementById('chunkCount').textContent = `Total chunks: ${response.chunkCount}`;
        document.getElementById('downloadMessage').textContent = 'File downloaded!';
      }
    });
  });
});

// Manifest (manifest.json)
{
  "manifest_version": 2,
  "name": "Text Chunker",
  "version": "1.0",
  "description": "Chunks text on the current page and provides a downloadable file",
  "permissions": ["activeTab"],
  "browser_action": {
    "default_popup": "popup.html"
  },
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content.js"]
    }
  ]
}

// Popup HTML (popup.html)
<!DOCTYPE html>
<html>
<head>
  <style>
    body { width: 200px; text-align: center; }
    button { margin: 10px 0; }
  </style>
</head>
<body>
  <button id="chunkButton">Chunk and Download</button>
  <div id="chunkCount"></div>
  <div id="downloadMessage"></div>
  <script src="popup.js"></script>
</body>
</html>
