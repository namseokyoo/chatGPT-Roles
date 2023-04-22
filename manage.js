function displayRoles(roles) {
    const rolesList = document.getElementById('rolesList');
    rolesList.innerHTML = '';

    for (const role in roles) {
        const li = document.createElement('li');
        const roleText = document.createElement('span');
        const deleteButton = document.createElement('button');

        roleText.innerText = `${role}: ${roles[role]}`;
        deleteButton.innerText = '삭제';
        deleteButton.addEventListener('click', (event) => {
            chrome.storage.sync.get('roles', ({ roles }) => {
                delete roles[role];
                chrome.storage.sync.set({ roles: roles }, () => {
                    event.target.parentElement.remove();
                });
            });
        });

        li.appendChild(roleText);
        li.appendChild(deleteButton);
        rolesList.appendChild(li);
    }
}

chrome.storage.sync.get('roles', ({ roles }) => {
    if (!roles) {
        roles = {};
    }

    displayRoles(roles);
});

document.getElementById('addRoleForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const roleName = document.getElementById('roleName').value;
    const roleText = document.getElementById('roleText').value;

    chrome.storage.sync.get('roles', ({ roles }) => {
        if (!roles) {
            roles = {};
        }

        // 기존에 같은 이름의 역할이 있으면 덮어쓰는 대신 새로 추가합니다.
        if (roles[roleName]) {
            let count = 1;
            while (roles[`${roleName} (${count})`]) {
                count++;
            }
            roles[`${roleName} (${count})`] = roleText;
        } else {
            roles[roleName] = roleText;
        }

        chrome.storage.sync.set({ roles });
        displayRoles(roles);
    });

    document.getElementById('roleName').value = '';
    document.getElementById('roleText').value = '';
});


document.getElementById('deleteAllRolesButton').addEventListener('click', () => {
    if (confirm('모든 역할을 삭제하시겠습니까?')) {
        chrome.storage.sync.set({ roles: {} }, () => {
            const rolesList = document.getElementById('rolesList');
            rolesList.innerHTML = '';
        });
    }
});


