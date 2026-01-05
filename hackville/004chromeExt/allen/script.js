/**
 * Creates and injects a floating UI element to display messages on the page.
 * @param {string} message The text content to display.
 * @param {boolean} isError If true, the background color will be reddish.
 */
function displayInPageNotification(message, isError = false) {
  // Remove any existing notification
  const existingNotification = document.getElementById(
    "gemini-summary-container"
  );
  if (existingNotification) {
    existingNotification.remove();
  }

  const notificationDiv = document.createElement("div");
  notificationDiv.id = "gemini-summary-container";

  // --- Styling ---
  Object.assign(notificationDiv.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    zIndex: "2147483647", // Max z-index
    backgroundColor: isError ? "#fff0f0" : "white",
    color: "#333",
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "16px",
    maxWidth: "400px",
    fontFamily: "sans-serif",
    fontSize: "14px",
    lineHeight: "1.5",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    transition: "transform 0.3s ease-out",
    transform: "translateX(120%)",
  });

  const messageP = document.createElement("p");
  messageP.textContent = message;
  Object.assign(messageP.style, {
    margin: "0",
    padding: "0",
  });

  const closeButton = document.createElement("button");
  closeButton.textContent = "Close";
  Object.assign(closeButton.style, {
    display: "block",
    marginTop: "12px",
    padding: "5px 10px",
    border: "1px solid #aaa",
    borderRadius: "4px",
    cursor: "pointer",
  });

  notificationDiv.appendChild(messageP);
  notificationDiv.appendChild(closeButton);
  document.body.appendChild(notificationDiv);

  // Animate it into view
  setTimeout(() => {
    notificationDiv.style.transform = "translateX(0)";
  }, 10);

  // Close button functionality
  closeButton.onclick = () => {
    notificationDiv.style.transform = "translateX(120%)";
    setTimeout(() => notificationDiv.remove(), 300);
  };
}

function displayInSidePanel(message, isError = false) {
  console.log("Sending message to side panel...");
  chrome.runtime.sendMessage({
    type: isError ? "GEMINI_ERROR" : "GEMINI_SUMMARY",
    content: message,
  });
}

var content = document.body.innerText.replace(/\s+/g, " ").slice(0, 100000);
console.log("Extracted content length:", content.length);

// 从 chrome.storage.sync 读取配置
chrome.storage.sync.get(
  ["url", "prompt", "apiKey", "model"],
  function (settings) {
    // 使用默认值如果没有设置
    const API_BASE_URL = settings.url;
    const API_KEY = settings.apiKey;
    const MODEL = settings.model;
    const SYSTEM_PROMPT =
      settings.prompt ||
      "The output should be in Chinese. Structure the paragraph using markdown syntax. Separate different sections with headers for better readability for human.\nSummarize the following text in one paragraph, and elaborate details: \n\n";

    const API_URL = `${API_BASE_URL}/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

    const requestBody = {
      systemInstruction: {
        parts: [
          {
            text: SYSTEM_PROMPT,
          },
        ],
      },
      contents: [
        {
          parts: [
            {
              text: content,
            },
          ],
        },
      ],
    };

    console.log("Sending request to Gemini API...");

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    })
      .then(async (response) => {
        if (!response.ok) {
          const text = await response.text();
          throw new Error(
            `API request failed with status ${response.status}: ${text}`
          );
        }
        return response.json();
      })
      .then((data) => {
        console.log("API Response:", data);
        const summary = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (summary) {
          console.log("Generated Summary:", summary);
          displayInSidePanel(summary);
        } else {
          const errorMsg =
            "AI could not generate a summary for this page. The response did not contain the expected text.";
          console.error(errorMsg);
          displayInSidePanel(errorMsg, true);
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        displayInSidePanel(
          "Failed to get summary. Please check your settings. Error: " +
            error.message,
          true
        );
      });
  }
);
