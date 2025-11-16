import { GoogleGenAI, FunctionCallingConfigMode , mcpToTool} from '@google/genai';
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

const client = new Client(
  {
    name: "example-client",
    version: "1.0.0"
  }
);

// Configure the client
const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

const transport = new StreamableHTTPClientTransport(
  new URL(`http://localhost:8080/mcp`),
);

// Initialize the connection between client and server
await client.connect(transport);

// Send request to the model with MCP tools
const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: `show me all blog post made by Author "test"?`,
  config: {
    tools: [mcpToTool(client)],  // uses the session, will automatically call the tool
    // Uncomment if you **don't** want the sdk to automatically call the tool
    // automaticFunctionCalling: {
    //   disable: true,
    // },
  },
});
console.log(response.text)

// Close the connection
await client.close();