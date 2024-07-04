(function() {

    const selectedSearchEngine = document.getElementById('search-engine');
    
    selectedSearchEngine.addEventListener('change', () => {

        const valueText = selectedSearchEngine.value;

        if(valueText) {

            chrome.storage.sync.set({ searchEngine: valueText });

        }

    });

    chrome.storage.sync.get(['searchEngine'], (result) => {

        if(result.searchEngine) {

            selectedSearchEngine.value = result.searchEngine;

        }
    });

})();