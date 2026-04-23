const root = document.getElementById("root");

const passwordBt = document.getElementById("password");

const startTimeInput = document.getElementById("startTime");

const endTimeInput = document.getElementById("endTime");

const saveScheduleBt = document.getElementById("saveSchedule");

saveScheduleBt.addEventListener("click", async () => {
    // TODO: Add checking password back in
    const startTime = startTimeInput.value;
    const endTime = endTimeInput.value;
    browser.storage.local.set({ startTime, endTime });
});

// let blockedWords = JSON.parse(localStorage.getItem("blockedWords"));

const removeBlockedWord = async (elt) => {
    elt.remove();
    let { blockedWords } = await browser.storage.local.get("blockedWords");
    
    blockedWords = blockedWords.filter(eltWord => {
        return eltWord.word !== elt.innerHTML;
    });
    // localStorage.setItem("blockedWords", JSON.stringify(blockedWords));
    browser.storage.local.set({ blockedWords });
};

// Set the current blocked words display in the setting div
const setWordDivs = async () => {
    const { blockedWords } = await browser.storage.local.get("blockedWords");

    for (let word of blockedWords) {
        const wordDiv = document.createElement('div');
        wordDiv.className = 'chip';
        wordDiv.textContent = word.word;
        wordDiv.setAttribute('title', 'Click to remove');
        wordDiv.setAttribute('role', 'button');
        wordDiv.tabIndex = 0;

        // Removes the word if the user enters a specific word
        const tryRemove = async () => {
            const { password } = await browser.storage.local.get("password");
            // lenght > 0 means the user as not yet set the password
            if (password.length > 0) {
                const enteredPassword = prompt('password:');
                if (enteredPassword === password) {
                    removeBlockedWord(wordDiv);
                }
            } else {
                removeBlockedWord(wordDiv);
            }
        };

        wordDiv.addEventListener('click', tryRemove);
        wordDiv.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                tryRemove();
            }
        });

        root.append(wordDiv);
    }
};


setWordDivs();

passwordBt.addEventListener("click", async () => {
    const { password } = await browser.storage.local.get("password");

    if (password.length > 0) {
        const currentPassword = prompt("Enter current password: ");
        if (currentPassword == password) {
            const newPassword = prompt("Enter new password: ");
            if (newPassword && newPassword.length > 0) {
                browser.storage.local.set({ password: newPassword });
            }
        }
    } else {
        const newPassword = prompt("Enter password: ");
        if (newPassword && newPassword.length > 0) {
            browser.storage.local.set({ password: newPassword });
        }
    }
});