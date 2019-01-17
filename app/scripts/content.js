console.log("FROM CONTENT");

function sendToBackground(payload) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ ...payload }, res => {
      if (!res) reject("ERROR");
      resolve(res);
    });
  });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "GET_PICS") {
    const picsList = document.getElementById("gallery");
    if (picsList) {
      const liList = picsList.querySelectorAll("ul.gallery_grid li");
      let hrefList = [];
      liList.forEach(elmLi => {
        let elmLinks = elmLi.getElementsByTagName("a");
        if (elmLinks.length > 0) {
          hrefList.push(elmLinks[0].href);
        }
      });
      console.log(hrefList);
      console.log(sender);
      sendToBackground({ type: "IMG_SOURCE", payload: hrefList }).then(res => {
        console.log("Message back from BG", res);
        sendToBackground(res).then(() => {});
        return true;
      });
    }
  }
});
