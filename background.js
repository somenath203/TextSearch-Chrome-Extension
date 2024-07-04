const searchForTextInWeb = (selectedText) => {

  chrome.tabs.create({
    url: `https://google.com/search?q=${encodeURIComponent(selectedText)}`,
  });

};

chrome.runtime.onInstalled.addListener(() => {

  chrome.contextMenus.create({
    id: 'search-text-selection',
    title: 'Search for "%s"',
    contexts: ['selection'],
  });

});

chrome.contextMenus.onClicked.addListener((info) => {

  if (info.menuItemId === 'search-text-selection' && info.selectionText) {

    searchForTextInWeb(info.selectionText);

  }
  
});
