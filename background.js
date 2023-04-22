chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'openTab') {
        chrome.tabs.create({ url: 'https://chat.openai.com/' }, (newTab) => {
            chrome.tabs.executeScript(newTab.id, { file: 'contentScript.js', runAt: 'document_idle' }, () => {
                chrome.tabs.sendMessage(newTab.id, { roleText: request.roleText });
            });
        });
        return true;
    }
});
