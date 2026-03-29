/**
 * @file server.ts
 * @description Server implementation for @ekaone/mcp-tools.
 * @author Eka Prasetia
 * @website https://prasetia.me
 * @license MIT
 */

import { Hono } from "hono";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { maskCardTool, maskEmailTool } from "./tools/index.js";

const app = new Hono();
const tools = [maskCardTool, maskEmailTool];

// Health check
app.get("/", (c) => {
  return c.json({
    name: "@ekaone/mcp-tools",
    version: "0.1.0",
    tools: tools.map((t) => t.name),
  });
});

// Single endpoint — Streamable HTTP handles both directions
app.post("/mcp", async (c) => {
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

  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined, // stateless mode — fits Cloudflare Workers
  });

  await server.connect(transport);

  return transport.handleRequest(c.req.raw, c.res.raw, await c.req.json());
});

export default app;
