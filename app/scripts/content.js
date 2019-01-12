console.log("FROM CONTENT");

browser.runtime.onMessage.addListener(request => {
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
    }
  }
});
