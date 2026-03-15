const handleTabChange = async (activeInfo) => {
    // const checkedBGM = JSON.parse(localStorage.getItem("disableBGM"));
    const checkedBGM = await browser.storage.local.get("disableBGM");
    if (checkedBGM) {
        const prevTab = await browser.tabs.get(activeInfo.previousTabId);
        if (checkBlockedWord(prevTab.url, "youtube")) {
            console.log("Sending...");
            browser.tabs.sendMessage(prevTab.id, { type: "send_video" });
        }
    }
};

browser.tabs.onActivated.addListener(handleTabChange);

// const handleWindowChange = () => {
//     console.log("Window Changed");
// };

// browser.windows.onFocusChanged.addListener(handleWindowChange);