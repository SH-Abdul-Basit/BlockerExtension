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

window.addEventListener("blur", () => {
    const checkedBGB = JSON.parse(localStorage.getItem("disableBGM"));
    if (checkedBGB) {
        pauseVideo();
    }
});
