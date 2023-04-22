// content-loader.js
// window.addEventListener('DOMContentLoaded', () => {
//     chrome.runtime.sendMessage({ from: 'content-loader', loaded: true });
// });


// window.addEventListener('DOMContentLoaded', () => {
//     console.log('DOMContentLoaded event fired, sending message');
//     chrome.runtime.sendMessage({ from: 'content-loader', loaded: true }, (response) => {
//         console.log('Response from popup:', response);
//     });
// });


function insertRoleText() {
    const textarea = document.querySelector('textarea');
    const sendButton = document.querySelector('button[disabled][class*="absolute"]');

    if (textarea && sendButton && roleText) {
        textarea.value = roleText;

        // 입력 이벤트를 트리거합니다.
        textarea.dispatchEvent(new Event('input', { bubbles: true }));

        // 활성화된 전송 버튼을 클릭합니다.
        sendButton.click();
    }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.roleText) {
        roleText = request.roleText;
        insertRoleText();
    }
});

chrome.runtime.sendMessage({ from: 'content-loader', loaded: true }, (response) => {
    console.log('Response from popup:', response);
});
