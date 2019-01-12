console.log("BACKGROUND STARTED");
let ports = [];

function connected(p) {
  ports[p.sender.tab.id] = p;
  console.log(ports);
}

browser.runtime.onConnect.addListener(connected);

// browser.browserAction.onClicked.addListener(() => {
//   ports.forEach(p => {
//     p.postMessage({ greeting: "THE CLICKED" });
//   });
// });
