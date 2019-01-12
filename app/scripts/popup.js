function getPics(tabs) {
  console.log("send GET_PICS");
  console.log(tabs);
  for (let tab of tabs) {
    browser.tabs.sendMessage(tab.id, { type: "GET_PICS" }).then(res => {
      console.log("got response from content:", res);
    });
  }
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

document.getElementById("getPics").addEventListener("click", getTab);
