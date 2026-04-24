// Is run the first tie the extension is installed and sets up the local storage for blocked words and password.
const initStorage = async () => {
    console.log("Extension installed");
    await browser.storage.local.clear();

    // "amv", "mmv", "gmv", "music", "song", "tiktok"
    const data = {
        blockedWords: [],
        disableBGM: false,
        password: "",
        startTime: "",
        endTime: ""
    };

    browser.storage.local.set(data);
};

browser.runtime.onInstalled.addListener(initStorage);

function checkBlockedWord(url, word) {
    const pattern = new RegExp(word, "i");
    return pattern.test(url);
}

function closeSpecificTab(tabId) {
  browser.tabs.remove(tabId);
}

async function closeTabsWithBlockedWords(text, tabId) {
    const { blockedWords } = await browser.storage.local.get("blockedWords");
    // console.log(blockedWords);
    // TODO: The keyword detection fails if a keyword is set with sechedule and then that same keyword is removed
    // and then add back with different schedule which is not yet 
    // TODO: Why does blockedWords sometimes become undefined?

    if (blockedWords) { // Temporary solution to detect when blockedWords becomes undefined
        for (let word of blockedWords) {
            // console.log("FollowSchdule: " + word.followSchedule, "CheckSchedule: " + await checkWithinSchedule());
            if (word.followSchedule) {
                // This if is inside inorder to do nothing to a following word even if it is a match
                if (await checkWithinSchedule()) {
                    if (text && checkBlockedWord(text, word.word)) {
                    closeSpecificTab(tabId);
                    }
                } 
            } else {
                //console.log("Not following words...");
                if (text && checkBlockedWord(text, word.word)) {
                    console.log("text: " + text);
                    console.log("word: " + word.word);
                    closeSpecificTab(tabId);
                }
            }
        }
    }
    
}

async function checkWithinSchedule() {
    const { startTime } = await browser.storage.local.get("startTime");
    const { endTime } = await browser.storage.local.get("endTime");

    if (!startTime || !endTime) {
        return false;
    }

    const now = new Date();
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);
    const startDate = new Date();
    startDate.setHours(startHour, startMinute, 0, 0);
    const endDate = new Date();
    endDate.setHours(endHour, endMinute, 0, 0);
    return now >= startDate && now <= endDate;
}

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    closeTabsWithBlockedWords(changeInfo.url, tabId);
});


browser.runtime.onMessage.addListener((request) => {
    if (request.type === "html_content") {
        browser.tabs.query({ active: true, currentWindow: true })
        .then((tabs) => {
            closeTabsWithBlockedWords(request.data, tabs[0].id);
        });
    }
});