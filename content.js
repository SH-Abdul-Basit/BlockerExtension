function sendContentToBackground() {
    const pageContent = document.body.innerHTML;
    browser.runtime.sendMessage({
        dataType: "pageContent",
        content: pageContent
    });
}
sendContentToBackground();
setInterval(sendContentToBackground, 5000);


// TODO: Mutation for observing changes in the page content
// const observerCallback = function(mutationsList, observer) {
//     console.log(mutationsList);
//     // for (const mutation of mutationsList) {
//     //     if (mutation.type === 'childList') {
//     //         console.log('A child node has been added or removed.');
//     //     } else if (mutation.type === 'attributes') {
//     //         console.log(`The ${mutation.attributeName} attribute was modified.`);
//     //     }
//     // }
// };

// const observer = new MutationObserver(observerCallback);
