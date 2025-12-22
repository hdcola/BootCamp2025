import {
  GoogleGenAI,
  FunctionCallingConfigMode,
  mcpToTool,
} from "@google/genai";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

// Create server parameters for stdio connection
const serverParams = new StdioClientTransport({
  command: "npx", // Executable
  args: ["-y", "chrome-devtools-mcp@latest"], // MCP Server
});

const client = new Client({
  name: "example-client",
  version: "1.0.0",
});

// Configure the client
const ai = new GoogleGenAI({
  apiKey: "your-api-key",
});

// Initialize the connection between client and server
await client.connect(serverParams);

// Send request to the model with MCP tools
// Open up a new tab and navigate to https://moodle.concordia.ca/moodle/my/. click "login" and click "COMP 249 D 2252 (Fall 2025)
const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: `How many tabs do i opened in chrome now?`,
  config: {
    tools: [mcpToTool(client)], // uses the session, will automatically call the tool
    // Uncomment if you **don't** want the sdk to automatically call the tool
    automaticFunctionCalling: {
      disable: false,
    },
  },
});
console.log(response.text);

// Close the connection
await client.close();
