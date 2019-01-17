import axios from "axios";
import * as JSZip from "jszip";
import { saveAs } from "file-saver";

console.log("BACKGROUND STARTED");
const cookieName = "ASP.NET_SessionId";
const cookieDomain = "nemboern.odense.dk";

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
    return axios
      .request({
        method: "get",
        url: imageUrls[11],
        responseType: "blob"
        // headers: { cookie: cookie }
      })
      .then(res => resolve(res));
  });
}

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type == "IMG_SOURCE" && request.payload) {
    console.log(request);
    getCookies()
      .then(cookie => {
        console.log(cookie);
        getImagesFromUrl(cookie, request.payload).then(res => {
          console.log(typeof res.data);
          const zip = new JSZip();
          zip.file("test.jpg", res.data, { binary: true });
          zip.generateAsync({ type: "blob" }).then(content => {
            console.log(content);
            saveAs(content, "test.zip");
          });

          console.log("response after image should be here", res);
          setTimeout(() => {
            sendResponse({ type: "IMAGES_ZIP", payload: "test" });
          }, 5000);
          return true;
        });
        return true;
      })
      .catch(e => console.log);
  }
  return true;
});
