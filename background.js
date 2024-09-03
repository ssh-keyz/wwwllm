chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      chrome.tabs.executeScript(tab.id, { file: 'content.js' });
    });
  });
});
