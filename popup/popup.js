// Blocking keywords
const input = document.getElementById("blockWord");
const addBt = document.getElementById("add");
const settingsBt = document.getElementById("settings");
const followScheduleCheckbox = document.getElementById("followSchedule");

function addBlockWord(word) {
    if (!word || word.length === 0) {
        return;
    }

    const entry = {
        word: word,
        followSchedule: followScheduleCheckbox.checked
    }

    const blockedWords = JSON.parse(localStorage.getItem("blockedWords")) || [];
    blockedWords.push(entry);
    localStorage.setItem("blockedWords", JSON.stringify(blockedWords));
}

addBt.addEventListener("click", () => {
    addBlockWord(input.value);
});

settingsBt.addEventListener("click", () => {
    browser.tabs.create({
        url: browser.runtime.getURL("settings/settings.html")
    });
});

// Disabling background musci playing
const disableBGMCheckbox = document.getElementById("disable-BGM");

const checkedBGB = JSON.parse(localStorage.getItem("disableBGM"));
disableBGMCheckbox.checked = checkedBGB;

disableBGMCheckbox.addEventListener("change", () => {
    localStorage.setItem("disableBGM", disableBGMCheckbox.checked);
})

// localStorage.clear();   