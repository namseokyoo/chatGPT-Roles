
if (document.getElementById('addRoleButton')) {
    document.getElementById('addRoleButton').addEventListener('click', () => {
        chrome.tabs.create({ url: chrome.runtime.getURL('manage.html') });
    });
}
chrome.storage.sync.get('roles', ({ roles }) => {
    if (!roles) {
        roles = {};
    }

    const rolesList = document.getElementById('rolesList');
    for (const role in roles) {
        const roleDiv = document.createElement('div');
        roleDiv.innerText = role;
        const applyButton = document.createElement('button');
        applyButton.innerText = '적용';
        applyButton.addEventListener('click', () => {
            sendMessageToContentScript(roles[role]);
        });

        const roleContainer = document.createElement('div');
        roleContainer.classList.add('role-container');
        roleContainer.appendChild(roleDiv);
        roleContainer.appendChild(applyButton);

        rolesList.appendChild(roleContainer);
    }
});


function sendMessageToContentScript(roleText) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentTab = tabs[0];
        if (currentTab.url.includes('chat.openai.com')) {
            chrome.tabs.sendMessage(currentTab.id, { roleText: roleText });
        } else {
            chrome.tabs.create({ url: 'https://chat.openai.com/' }, (newTab) => {
                chrome.tabs.executeScript(newTab.id, { file: 'content.js' }, () => {
                    chrome.tabs.sendMessage(newTab.id, { roleText: roleText });
                });
            });
        }
    });
}



