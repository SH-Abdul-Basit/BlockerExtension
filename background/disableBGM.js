const handleDisableBDM = async (activeInfo) => {
    const checkedBGB = JSON.parse(localStorage.getItem("disableBGM"));
    if (checkedBGB) {
        const prevTab = await browser.tabs.get(activeInfo.previousTabId);
        if (checkBlockedWord(prevTab.url, "youtube")) {
            console.log("Sending...");
            await browser.tabs.sendMessage(prevTab.id, { type: "send_video" });
        }
    }
};

browser.tabs.onActivated.addListener(handleDisableBDM);