console.log("BACKGROUND STARTED");
// let ports = [];

// function connected(p) {
//   ports[p.sender.tab.id] = p;
//   console.log(ports);
// }

function getCookies() {
  chrome.cookies.get(
    {
      name: "ASP.NET_SessionId",
      url: "https://mitbarnweb.odense.dk/Dialog.aspx"
    },
    cookies => {
      console.log(cookies);
    }
  );
}

// browser.runtime.onConnect.addListener(connected);

// browser.browserAction.onClicked.addListener(() => {
//   ports.forEach(p => {
//     p.postMessage({ greeting: "THE CLICKED" });
//   });
// });

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request);
  getCookies();
  sendResponse({ yaya: "yaya" });
});
