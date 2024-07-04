const urlMap = {
    bing: "https://www.bing.com/search?q=",
    duckduckgo: "https://www.duckduckgo.com?q=",
    google: "https://google.com/search?q=",
    yahoo: "https://yahoo.com/search?q=",
}


const searchForTextInWeb = (selectedText) => {

    chrome.storage.sync.get(['searchEngine'], (result) => {

        let url;

        if(result.searchEngine) {

            url = `${urlMap[result.searchEngine]}${encodeURIComponent(selectedText)}`;

        } else {

            url = `https://google.com/search?q=${encodeURIComponent(selectedText)}`
        }

        chrome.tabs.create({
            url: url
        });

    });
    
}


chrome.runtime.onInstalled.addListener(() => {

    chrome.contextMenus.create({
        id: 'search-text-selection',
        title: `Search for "%s"`,
        contexts: ["selection"]
    });

    chrome.contextMenus.onClicked.addListener((info) => {

        const menuItemId = info.menuItemId;

        if(menuItemId === 'search-text-selection' && info.selectionText) {

            searchForTextInWeb(info.selectionText);

        }
    })

});