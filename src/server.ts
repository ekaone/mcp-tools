/**
 * @file server.ts
 * @description Server implementation for @ekaone/mcp-tools.
 * @author Eka Prasetia
 * @website https://prasetia.me
 * @license MIT
 */

import { Hono } from "hono";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { maskCardTool, maskEmailTool } from "./tools/index.js";
import type { Tool } from "./types.js";

const app = new Hono();
const tools: Tool[] = [maskCardTool, maskEmailTool];

// Health check
app.get("/", (c) => {
  return c.json({
    name: "@ekaone/mcp-tools",
    version: "0.1.0",
    tools: tools.map((t) => t.name),
  });
});

// SSE endpoint — MCP client connects here
app.get("/sse", async (c) => {
  const server = new McpServer({
    name: "@ekaone/mcp-tools",
    version: "0.1.0",
  });

  // Register all tools
  for (const tool of tools) {
    server.tool(
      tool.name,
      tool.description,
      tool.inputSchema.properties,
      tool.handler,
    );
  }

  const transport = new SSEServerTransport("/messages", c.res);
  await server.connect(transport);

  return new Response(transport.stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
  });
});

// POST endpoint — MCP client sends tool calls here
app.post("/messages", async (c) => {
  return c.json({ ok: true });
});

export default app;
