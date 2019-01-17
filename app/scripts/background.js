import axios from "axios";
import * as JSZip from "jszip";
import { saveAs } from "file-saver";

console.log("BACKGROUND STARTED");
const prevSender = [];

function getNumberOfTimes(array, id) {
  let count = 0;
  array.forEach(v => v === id && count++);
  return count;
}

function getImagesFromUrl(imageUrls) {
  console.log(imageUrls[12]);
  return new Promise((resolve, reject) => {
    const responseData = [],
      promises = [];

    imageUrls.forEach(url => {
      promises.push(
        axios.request({
          method: "get",
          url: url,
          responseType: "blob"
        })
      );
    });

    return axios.all(promises).then(results => {
      results.forEach((response, index) => {
        responseData.push({ name: "image" + index, data: response.data });
      });
      resolve(responseData);
    });
  });
}

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type == "IMG_SOURCE" && request.payload) {
    console.log(request);
    if (getNumberOfTimes(prevSender, request.payload.id) >= 1) {
      return sendResponse({
        type: "CANCEL_LOADER",
        payload:
          "Gallery already downloaded once. Refresh page to download again"
      });
    }
    prevSender.push(request.payload.id);
    getImagesFromUrl(request.payload.hrefList)
      .then(res => {
        console.log(prevSender);
        const zip = new JSZip();
        // zip.file("test.jpg", res.data, { binary: true });
        res.map(dataObj => {
          zip.file(`${dataObj.name}.jpg`, dataObj.data, { binary: true });
        });
        zip.generateAsync({ type: "blob" }).then(content => {
          saveAs(content, "images.zip");
          sendResponse({ type: "IMAGES_ZIP", payload: "test" });
        });

        return true;
      })
      .catch(e => console.log(e));
  }
  return true;
});
