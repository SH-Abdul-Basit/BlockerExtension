// function sendContentToBackground() {
//     const pageContent = document.body.innerHTML;
//     browser.runtime.sendMessage({
//         dataType: "pageContent",
//         content: pageContent
//     });
// }
// sendContentToBackground();
// setInterval(sendContentToBackground, 5000);
const pageContent = document.body.innerText;
browser.runtime.sendMessage({
  type: "html_content",
  data: pageContent
});

// browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     if (request.command === "send_html") {
//         console.log("Received command to send HTML content.");
//     }

//   if (request.command === "send_html") {
//     // Process the message and interact with the webpage DOM
//     //alert(request.data.message);
//     console.log("Received command to send HTML content.");

//     // Send a response back to the background script
//     sendResponse({ result: "Message received and processed!" });
//   }

  // To send an asynchronous response using a Promise, return true or a Promise object
  // return Promise.resolve({ result: "Message received asynchronously!" });
// });

