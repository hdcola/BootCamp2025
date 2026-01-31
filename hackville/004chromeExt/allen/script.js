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
