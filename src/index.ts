/**
 * @file index.ts
 * @description Main entry point for @ekaone/mcp-tools package.
 * @author Eka Prasetia
 * @website https://prasetia.me
 * @license MIT
 *
 * This file serves as the main entry point when the package is installed via npm
 * and executed with `npx @ekaone/mcp-tools@latest`
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { maskCardTool, maskEmailTool } from "./tools/index.js";

// Initialize the MCP Server
const server = new McpServer({
  name: "@ekaone/mcp-tools",
  version: "1.0.0",
});

// Register the masking tools
server.tool(
  maskCardTool.name,
  maskCardTool.description,
  maskCardTool.inputSchema,
  maskCardTool.handler,
);

server.tool(
  maskEmailTool.name,
  maskEmailTool.description,
  maskEmailTool.inputSchema,
  maskEmailTool.handler,
);

// Connect using Stdio Transport for MCP client communication
const transport = new StdioServerTransport();

async function run() {
  await server.connect(transport);
  // Use console.error for logging to avoid interfering with stdio stream
  console.error("@ekaone/mcp-tools running via stdio");
}

run().catch((error) => {
  console.error("Fatal error running server:", error);
  process.exit(1);
});
