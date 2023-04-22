// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     const textarea = document.querySelector('textarea');
//     const sendButton = document.querySelector('button[disabled][class*="absolute"]');

//     if (textarea && sendButton) {
//         textarea.value = request.roleText;

//         // 입력 이벤트를 트리거합니다.
//         textarea.dispatchEvent(new Event('input', { bubbles: true }));

//         // 활성화된 전송 버튼을 클릭합니다.
//         sendButton.click();
//     }
// });




let roleText;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.roleText) {
    roleText = request.roleText;
    insertRoleText();
  }
});

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

function waitForContentScript() {
  if (document.querySelector('textarea') && document.querySelector('button[disabled][class*="absolute"]')) {
    insertRoleText();
  } else {
    setTimeout(waitForContentScript, 100);
  }
}

waitForContentScript();
