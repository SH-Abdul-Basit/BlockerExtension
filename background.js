// Is run the first tie the extension is installed and sets up the local storage for blocked words and password.
browser.runtime.onInstalled.addListener(() => {
    console.log("Extension installed");
    localStorage.setItem("blockedWords", "[]");
    localStorage.setItem("password", "");
    localStorage.setItem("schedule", JSON.stringify({ startTime: null, endTime: null }));
});

function checkBlockedWord(url, word) {
    const pattern = new RegExp(word, "i");
    return pattern.test(url);
}

function closeSpecificTab(tabId) {
  browser.tabs.remove(tabId).then(() => {
    console.log(`Closed tab: ${tabId}`);
  }).catch((error) => {
    console.error(`Error closing tab: ${error}`);
  });
}

async function handleContentBlocking(message) {
  try {
    // Query for the active tab in the current window
    const tabs = await browser.tabs.query({ currentWindow: true, active: true });
    
    // The query returns an array; the first element is the active tab
    const activeTab = tabs[0];
    const tabId = activeTab.id;

    if (message.dataType === "pageContent") {
        closeTabsWithBlockedWords(message.content, tabId);
    }

  } catch (error) {
    console.error(`Error getting active tab: ${error}`);
  }
}

function closeTabsWithBlockedWords(text, tabId) {
    const blockedWords = JSON.parse(localStorage.getItem("blockedWords"));
    for (let word of blockedWords) {
        if (!word.followSchedule || (word.followSchedule && checkWithinSchedule())) {
            if (text && checkBlockedWord(text, word.word)) {
                console.log("word: " + word.word);
                closeSpecificTab(tabId);
            }
        }
    }
}

function checkWithinSchedule() {
    const schedule = JSON.parse(localStorage.getItem("schedule"));

    if (!schedule.startTime || !schedule.endTime) {
        return false;
    }

    const now = new Date();
    const [startHour, startMinute] = schedule.startTime.split(":").map(Number);
    const [endHour, endMinute] = schedule.endTime.split(":").map(Number);
    const startDate = new Date();
    startDate.setHours(startHour, startMinute, 0, 0);
    const endDate = new Date();
    endDate.setHours(endHour, endMinute, 0, 0);
    return now >= startDate && now <= endDate;
}

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    closeTabsWithBlockedWords(changeInfo.url, tabId);
});


browser.runtime.onMessage.addListener(handleContentBlocking);