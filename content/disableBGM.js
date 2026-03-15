// Currently only works for youtube
console.log("Disable youtube music");

const pauseVideo = () => {
    let videos = document.getElementsByTagName("video");
    videos = Array.from(videos);
    videos[0].pause();
};

browser.runtime.onMessage.addListener((request) => {
    if (request.type == "send_video") {
        pauseVideo();
        // for (let video in videos) {
        //     console.log(video);
        // }
    }
}); 

const handleWindowBGM = async () => {
    // Accessing the local storage of that page 
    // We need to get the local storage from the background script
    let checkedBGM = await browser.storage.local.get("disableBGM");
    checkedBGM = JSON.parse(checkedBGM.disableBGM);

    if (checkedBGM) {
        pauseVideo();
    }
};

// const handleWindowBGM = () => {
//     // Accessing the local storage of that page 
//     // We need to get the local storage from the background script
//     const checkedBGM = JSON.parse(localStorage.getItem("disableBGM"));
//     console.log("blur");
//     if (checkedBGM) {
//         pauseVideo();
//     }
// };

window.addEventListener("blur", handleWindowBGM);
