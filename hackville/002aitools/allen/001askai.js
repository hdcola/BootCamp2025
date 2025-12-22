import { GoogleGenAI, Type } from "@google/genai";
import { runCommand } from "./002runcmd.js";

const api_local = "your-api-key-1";
const model = "gemini-3-pro-preview";

const ai = new GoogleGenAI({
  apiKey: api_local,
  httpOptions: {
    baseUrl: `http://localhost:8317/`,
  },
});

const runCommandTool = {
  name: "run_shell_command",
  description:
    "Execute a shell command and return the output. Use this to interact with the file system, list files, etc.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      runCommand: {
        type: Type.STRING,
        description:
          "The shell command to execute (e.g., 'ls -l', 'pwd', 'find . -name *.js')",
      },
    },
    required: ["runCommand"],
  },
};

// Initialize conversation history
let contents = [
  {
    role: "user",
    parts: [
      {
        text: "查看我mac电脑cpu的详细信息",
      },
    ],
  },
];

const config = {
  tools: [
    {
      functionDeclarations: [runCommandTool],
    },
  ],
};

// Loop to handle multiple function calls
let roundNumber = 0;
while (true) {
  roundNumber++;
  console.log(`\n${"=".repeat(60)}`);
  console.log(`第 ${roundNumber} 轮对话开始`);
  console.log(`${"=".repeat(60)}`);

  const response = await ai.models.generateContent({
    model: model,
    contents: contents,
    config: config,
  });

  // 详细日志：显示 response 的关键信息
  console.log(`\n📊 Response 分析:`);
  console.log(
    `  - response.functionCalls 存在? ${
      response.functionCalls ? "✅ 是" : "❌ 否"
    }`
  );
  if (response.functionCalls) {
    console.log(`  - functionCalls.length: ${response.functionCalls.length}`);
  }
  // 先检查是否有 functionCalls，避免触发 SDK 警告
  const hasText = response.functionCalls ? false : response.text ? true : false;
  console.log(`  - response.text 存在? ${hasText ? "✅ 是" : "❌ 否"}`);
  console.log(
    `  - 条件判断结果: ${
      response.functionCalls && response.functionCalls.length > 0
        ? "✅ TRUE (继续调用函数)"
        : "❌ FALSE (生成最终回答)"
    }`
  );
  console.log(response.functionCalls);

  // Check if model wants to call a function
  if (response.functionCalls && response.functionCalls.length > 0) {
    console.log(`\n🔧 模型决定调用 ${response.functionCalls.length} 个函数:`);
    console.log(`Function Call: ${JSON.stringify(response.functionCalls, 2)}`);
    for (const functionCall of response.functionCalls) {
      console.log(`----------------\nFunction to call: ${functionCall.name}`);
      console.log(
        `Arguments: ${JSON.stringify(functionCall.args)}\n----------------`
      );

      try {
        // Execute the function
        const result = await runCommand(functionCall.args.runCommand);
        console.log(`Result: ${JSON.stringify(result)}`);

        // Add model's function call to history
        contents.push({
          role: "model",
          parts: [{ functionCall: functionCall }],
        });

        // Add function result to history
        contents.push({
          role: "user",
          parts: [
            {
              functionResponse: {
                name: functionCall.name,
                response: { result: result },
              },
            },
          ],
        });
      } catch (error) {
        console.error(`Error executing command: ${error.message}`);

        // Send error back to model
        contents.push({
          role: "model",
          parts: [{ functionCall: functionCall }],
        });

        contents.push({
          role: "user",
          parts: [
            {
              functionResponse: {
                name: functionCall.name,
                response: { error: error.message },
              },
            },
          ],
        });
      }
    }
  } else {
    console.log(`\n${"=".repeat(60)}`);
    console.log(`💬 模型决定: 不再调用函数，给出最终回答`);
    console.log(`${"=".repeat(60)}`);
    console.log(`\n原因分析:`);
    console.log(
      `  1. 模型已经通过之前的 ${roundNumber - 1} 轮函数调用获取了足够的信息`
    );
    console.log(
      `  2. response.functionCalls 为 ${response.functionCalls || "undefined"}`
    );
    console.log(
      `  3. 条件 "response.functionCalls && response.functionCalls.length > 0" = false`
    );
    console.log(`  4. 因此执行 else 分支，输出最终回答并 break 退出循环\n`);
    console.log("最终回答:");
    console.log(response.text);
    break;
  }
}
