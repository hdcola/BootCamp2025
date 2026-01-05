async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  console.log(typeof tab);
  console.log(JSON.stringify(tab, 2, null));
  return tab;
}

// 更新主内容的函数
function updateMainContent(content) {
  const mainContent = document.getElementById("main-content");
  const refreshIcon = document.getElementById("refresh-icon");
  const refreshBtn = document.getElementById("refresh-btn");

  // 停止旋转动画并恢复按钮状态
  if (refreshIcon) {
    refreshIcon.classList.remove("rotating");
  }
  if (refreshBtn) {
    refreshBtn.disabled = false;
    refreshBtn.style.opacity = "1";
    refreshBtn.style.cursor = "pointer";
  }

  if (mainContent) {
    mainContent.innerHTML = marked.parse(content);
  } else {
    console.error("Side panel 'main-content' element not found.");
  }
}

// 显示错误消息的函数
function displayError(errorMessage) {
  const mainContent = document.getElementById("main-content");
  const refreshIcon = document.getElementById("refresh-icon");
  const refreshBtn = document.getElementById("refresh-btn");

  // 停止旋转动画并恢复按钮状态
  if (refreshIcon) {
    refreshIcon.classList.remove("rotating");
  }
  if (refreshBtn) {
    refreshBtn.disabled = false;
    refreshBtn.style.opacity = "1";
    refreshBtn.style.cursor = "pointer";
  }

  if (mainContent) {
    mainContent.innerHTML = `
      <div style="
        background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
        color: white;
        border-radius: 12px;
        padding: 24px;
        text-align: center;
        box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
      ">
        <div style="font-size: 48px; margin-bottom: 16px;">⚠️</div>
        <h3 style="margin: 0 0 12px 0; font-size: 20px; font-weight: 600;">错误</h3>
        <p style="margin: 0; font-size: 14px; line-height: 1.6; opacity: 0.95;">${errorMessage}</p>
      </div>
    `;
  } else {
    console.error("Side panel 'main-content' element not found.");
  }
}

// 刷新内容函数
function refreshContent() {
  const mainContent = document.getElementById("main-content");
  const refreshIcon = document.getElementById("refresh-icon");
  const refreshBtn = document.getElementById("refresh-btn");

  // 添加旋转动画
  if (refreshIcon) {
    refreshIcon.classList.add("rotating");
  }

  // 禁用按钮防止重复点击
  if (refreshBtn) {
    refreshBtn.disabled = true;
    refreshBtn.style.opacity = "0.7";
    refreshBtn.style.cursor = "not-allowed";
  }

  if (mainContent) {
    mainContent.innerHTML =
      '<div style="text-align: center; padding: 40px; color: #667eea;"><div style="display: inline-block; width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #667eea; border-radius: 50%; animation: spin 1s linear infinite;"></div><p style="margin-top: 16px; font-weight: 600;">正在刷新...</p></div>';
  }

  // 重新执行脚本获取最新内容
  getCurrentTab().then((tab) => {
    chrome.scripting
      .executeScript({
        target: { tabId: tab.id },
        files: ["script.js"],
      })
      .finally(() => {
        // 移除旋转动画并恢复按钮状态
        setTimeout(() => {
          if (refreshIcon) {
            refreshIcon.classList.remove("rotating");
          }
          if (refreshBtn) {
            refreshBtn.disabled = false;
            refreshBtn.style.opacity = "1";
            refreshBtn.style.cursor = "pointer";
          }
        }, 500);
      });
  });
}

export { getCurrentTab, updateMainContent, displayError, refreshContent };
