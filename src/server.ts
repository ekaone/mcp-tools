/**
 * @file server.ts
 * @description Server implementation for @ekaone/mcp-tools.
 * @author Eka Prasetia
 * @website https://prasetia.me
 * @license MIT
 */

import { createServer } from "node:http";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { maskCardTool, maskEmailTool } from "./tools/index.js";

const toolNames = [maskCardTool.name, maskEmailTool.name];

function createMcpServer(): McpServer {
  const server = new McpServer({
    name: "@ekaone/mcp-tools",
    version: "0.1.0",
  });

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

  return server;
}

const httpServer = createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", `http://${req.headers.host}`);

  // Health check
  if (req.method === "GET" && url.pathname === "/") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        name: "@ekaone/mcp-tools",
        version: "0.1.0",
        tools: toolNames,
      }),
    );
    return;
  }

  // MCP endpoint — Streamable HTTP
  if (req.method === "POST" && url.pathname === "/mcp") {
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: () => crypto.randomUUID(),
    });

    const server = createMcpServer();
    await server.connect(transport as Parameters<typeof server.connect>[0]);
    await transport.handleRequest(req, res);
    return;
  }

  res.writeHead(404);
  res.end("Not found");
});

const port = Number(process.env["PORT"]) || 3000;

httpServer.listen(port, () => {
  console.log(`@ekaone/mcp-tools running on http://localhost:${port}`);
  console.log(`MCP endpoint: http://localhost:${port}/mcp`);
});
