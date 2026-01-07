import {
  updateMainContent,
  refreshContent,
  displayError,
  getCurrentTab,
  checkInternalPageError,
} from "./utils.js";

chrome.runtime.onMessage.addListener(function (request) {
  if (request.type === "GEMINI_SUMMARY") {
    updateMainContent(request.content);
  } else if (request.type === "GEMINI_ERROR") {
    displayError(request.content);
  }
});

// 等待DOM加载完成后绑定事件
document.addEventListener("DOMContentLoaded", function () {
  const refreshBtn = document.getElementById("refresh-btn");
  if (refreshBtn) {
    refreshBtn.addEventListener("click", refreshContent);
  }
  getCurrentTab().then((tab) => {
    checkInternalPageError(tab);
  });
});
