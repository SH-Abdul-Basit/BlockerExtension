const root = document.getElementById("root");

const passwordBt = document.getElementById("password");

const startTimeInput = document.getElementById("startTime");

const endTimeInput = document.getElementById("endTime");

const saveScheduleBt = document.getElementById("saveSchedule");

saveScheduleBt.addEventListener("click", () => {
    const schedule = JSON.parse(localStorage.getItem("schedule"));

    if (schedule.startTime && schedule.endTime) {
        const password = localStorage.getItem("password");
        const enteredPassword = prompt('password:');
        if (password && password.length > 0) {
            if (enteredPassword === password) {
                const startTime = startTimeInput.value;
                const endTime = endTimeInput.value;
                localStorage.setItem("schedule", JSON.stringify({ startTime, endTime }));
            }
        } 
    } else {
        // Setings for the first time, when there is no schedule set.
        const startTime = startTimeInput.value;
        const endTime = endTimeInput.value;
        localStorage.setItem("schedule", JSON.stringify({ startTime, endTime }));
    }
});

let blockedWords = JSON.parse(localStorage.getItem("blockedWords"));

function removeBlockedWord(elt) {
    elt.remove();
    blockedWords = blockedWords.filter(eltWord => {
        return eltWord.word !== elt.innerHTML;
    });
    localStorage.setItem("blockedWords", JSON.stringify(blockedWords));
}

if (blockedWords) {
    for (let word of blockedWords) {
        const wordDiv = document.createElement('div');
        wordDiv.className = 'chip';
        wordDiv.textContent = word.word;
        wordDiv.setAttribute('title', 'Click to remove');
        wordDiv.setAttribute('role', 'button');
        wordDiv.tabIndex = 0;

        const tryRemove = () => {
            const password = localStorage.getItem("password");
            const enteredPassword = prompt('password:');
            if (password && password.length > 0) {
                if (enteredPassword === password) {
                    removeBlockedWord(wordDiv);
                }
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
}

passwordBt.addEventListener("click", () => {
    const password = localStorage.getItem("password");
    if (password.length > 0) {
        const currentPassword = prompt("Enter current password: ");
        if (currentPassword == password) {
            const newPassword = prompt("Enter new password: ");
            if (newPassword && newPassword.length > 0) {
                localStorage.setItem("password", newPassword);
            }
        }
    } else {
        const setPassword = prompt("Enter password: ");
        localStorage.setItem("password",setPassword);
    }
});