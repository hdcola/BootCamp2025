// Tab 切换函数
function switchTab(tab) {
  const mainTab = document.getElementById("main-tab");
  const settingsTab = document.getElementById("settings-tab");
  const mainBtn = document.getElementById("tab-main");
  const settingsBtn = document.getElementById("tab-settings");

  if (tab === "main") {
    mainTab.style.display = "block";
    settingsTab.style.display = "none";
    mainBtn.style.background = "white";
    mainBtn.style.color = "#667eea";
    mainBtn.style.fontWeight = "600";
    mainBtn.style.borderBottom = "3px solid #667eea";
    settingsBtn.style.background = "transparent";
    settingsBtn.style.color = "#6c757d";
    settingsBtn.style.fontWeight = "500";
    settingsBtn.style.borderBottom = "3px solid transparent";
  } else {
    mainTab.style.display = "none";
    settingsTab.style.display = "block";
    settingsBtn.style.background = "white";
    settingsBtn.style.color = "#667eea";
    settingsBtn.style.fontWeight = "600";
    settingsBtn.style.borderBottom = "3px solid #667eea";
    mainBtn.style.background = "transparent";
    mainBtn.style.color = "#6c757d";
    mainBtn.style.fontWeight = "500";
    mainBtn.style.borderBottom = "3px solid transparent";
  }
}

// 表单提交处理
document
  .getElementById("settings-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const loadingIndicator = document.getElementById("loading-indicator");
    const successMessage = document.getElementById("success-message");
    const submitBtn = e.target.querySelector('button[type="submit"]');

    // 显示加载动画
    loadingIndicator.style.display = "block";
    successMessage.style.display = "none";
    submitBtn.disabled = true;

    // 获取表单数据
    const formData = {
      url: document.getElementById("api-url").value,
      prompt: document.getElementById("prompt").value,
      apiKey: document.getElementById("api-key").value,
      model: document.getElementById("model").value,
    };

    // 保存到 chrome.storage.sync
    if (typeof chrome !== "undefined" && chrome.storage) {
      chrome.storage.sync.set(formData, function () {
        loadingIndicator.style.display = "none";
        successMessage.style.display = "block";
        submitBtn.disabled = false;

        // 3秒后隐藏成功消息
        setTimeout(() => {
          successMessage.style.display = "none";
        }, 3000);
      });
    } else {
      // 如果不在 Chrome 扩展环境中，使用 localStorage
      localStorage.setItem("settings", JSON.stringify(formData));
      loadingIndicator.style.display = "none";
      successMessage.style.display = "block";
      submitBtn.disabled = false;

      setTimeout(() => {
        successMessage.style.display = "none";
      }, 3000);
    }
  });

// 添加 Tab 按钮事件监听器
document.getElementById("tab-main").addEventListener("click", function () {
  switchTab("main");
});

document.getElementById("tab-settings").addEventListener("click", function () {
  switchTab("settings");
});

// 页面加载时读取保存的设置
window.addEventListener("load", function () {
  if (typeof chrome !== "undefined" && chrome.storage) {
    chrome.storage.sync.get(
      ["url", "prompt", "apiKey", "model"],
      function (result) {
        if (result.url) document.getElementById("api-url").value = result.url;
        if (result.prompt)
          document.getElementById("prompt").value = result.prompt;
        if (result.apiKey)
          document.getElementById("api-key").value = result.apiKey;
        if (result.model) document.getElementById("model").value = result.model;
      }
    );
  } else {
    // 从 localStorage 读取
    const saved = localStorage.getItem("settings");
    if (saved) {
      const settings = JSON.parse(saved);
      if (settings.url) document.getElementById("api-url").value = settings.url;
      if (settings.prompt)
        document.getElementById("prompt").value = settings.prompt;
      if (settings.apiKey)
        document.getElementById("api-key").value = settings.apiKey;
      if (settings.model)
        document.getElementById("model").value = settings.model;
    }
  }
});
