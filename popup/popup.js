// Blocking keywords
const input = document.getElementById("blockWord");
const addBt = document.getElementById("add");
const settingsBt = document.getElementById("settings");
const followScheduleCheckbox = document.getElementById("followSchedule");

async function addBlockWord(word) {
    const { blockedWords } = await browser.storage.local.get("blockedWords");

    if (blockedWords.includes(word)) {
        return 
    }

    const entry = {
        word: word,
        followSchedule: followScheduleCheckbox.checked
    }

    blockedWords.push(entry);

    browser.storage.local.set({ blockedWords })
    // localStorage.setItem("blockedWords", JSON.stringify(blockedWords));
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

const setBGMChecboxOnload = async () => {
    let checkedBGM = await browser.storage.local.get("disableBGM");
    checkedBGM = JSON.parse(checkedBGM.disableBGM);
    disableBGMCheckbox.checked = checkedBGM;
};

setBGMChecboxOnload();


disableBGMCheckbox.addEventListener("change", () => {
    // localStorage.setItem("disableBGM", disableBGMCheckbox.checked);
     browser.storage.local.set({ "disableBGM": disableBGMCheckbox.checked });
})

// localStorage.clear();   