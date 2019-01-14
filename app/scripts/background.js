import axios from "axios";
import jszip from "jszip";

console.log("BACKGROUND STARTED");
const cookieName = "ASP.NET_SessionId";
const cookieDomain = "nemboern.odense.dk";
// let ports = [];

// function connected(p) {
//   ports[p.sender.tab.id] = p;
//   console.log(ports);
// }

function getCookies() {
  return new Promise((resolve, reject) => {
    chrome.cookies.getAll(
      {
        domain: cookieDomain,
        name: cookieName
      },
      cookie => {
        if (!cookie) {
          reject("No Cookie detected");
        }
        resolve(`${cookie[0].name}=${cookie[0].value}`);
      }
    );
  });
}

function getImagesFromUrl(cookie, imageUrls) {
  console.log(cookie, imageUrls[12]);
  return new Promise((resolve, reject) => {
    axios
      .request({
        method: "get",
        url: imageUrls[12],
        headers: { cookie: cookie }
      })
      .then(res => resolve);
  });
}

// browser.runtime.onConnect.addListener(connected);

// browser.browserAction.onClicked.addListener(() => {
//   ports.forEach(p => {
//     p.postMessage({ greeting: "THE CLICKED" });
//   });
// });

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type == "IMG_SOURCE" && request.payload) {
    console.log(request);
    getCookies()
      .then(cookie => {
        console.log(cookie);
        getImagesFromUrl(cookie, request.payload).then(res => {
          console.log(res);
          sendResponse({ yaya: "yaya" });
        });
        return true;
      })
      .catch(e => console.log);
  }
  return true;
});
