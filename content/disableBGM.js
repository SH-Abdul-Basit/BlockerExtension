console.log("Disable youtube music");

browser.runtime.onMessage.addListener((request) => {
    if (request.type == "send_video") {
        let videos = document.getElementsByTagName("video");
        videos = Array.from(videos);
        videos[0].pause();
        // for (let video in videos) {
        //     console.log(video);
        // }
    }
}); 