const btn = document.getElementById("get-pics");
const btnTest = document.getElementById("get-testing-pics");
const loader = document.getElementById("loader");
const popupMenu = document.getElementById("popup-menu");

btn.addEventListener("click", getTab);

function generateErrorElm(target, msg) {
  const p = document.createElement("p");
  p.style.color = "red";
  p.textContent = msg;
  target.appendChild(p);
}

function toggleBtn(_btn, _loader) {
  if (btn.classList.contains("hide-elm")) {
    _btn.classList.remove("hide-elm");
    _loader.classList.add("hide-elm");
  } else {
    _btn.classList.add("hide-elm");
    _loader.classList.remove("hide-elm");
  }
}

function getPics(tabs) {
  console.log("send GET_PICS");
  console.log(tabs);
  toggleBtn(btn, loader);
  browser.tabs.sendMessage(tabs[0].id, { type: "GET_PICS" });
}

function getTab() {
  browser.tabs
    .query({
      currentWindow: true,
      active: true
    })
    .then(getPics)
    .catch(console.log);
}

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type == "IMAGES_ZIP") {
    toggleBtn(btn, loader);
    console.log(request);
  }
  if (request.type == "CANCEL_LOADER") {
    toggleBtn(btn, loader);
    // TODO: better error handler
    generateErrorElm(popupMenu, request.payload);
  }
});
