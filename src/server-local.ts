/**
 * @file server-local.ts
 * @description Stdio implementation for @ekaone/mcp-tools on local machine.
 * @author Eka Prasetia
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { maskCardTool, maskEmailTool } from "./tools/index.js";

// 1. Initialize the MCP Server
const server = new McpServer({
  name: "@ekaone/mcp-tools",
  version: "0.1.0",
});

// 2. Register your tools (Using your existing tool definitions)
// @ts-ignore
server.tool(
  maskCardTool.name,
  maskCardTool.description,
  maskCardTool.inputSchema,
  maskCardTool.handler,
);

// @ts-ignore
server.tool(
  maskEmailTool.name,
  maskEmailTool.description,
  maskEmailTool.inputSchema,
  maskEmailTool.handler,
);

/**
 * 3. Connect using Stdio Transport
 * This allows Windsurf to "pipe" commands directly to your script.
 */
const transport = new StdioServerTransport();

async function run() {
  await server.connect(transport);
  // Important: Use console.error for logging so you don't break the stdio stream
  console.error("@ekaone/mcp-tools running via stdio");
}

run().catch((error) => {
  console.error("Fatal error running server:", error);
  process.exit(1);
});
