# @ekaone/mcp-tools

> Under Active Development

A hosted MCP (Model Context Protocol) server that exposes data masking utilities as AI-callable tools over SSE/HTTP transport.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)

## Tools

| Tool | Package | Description |
|---|---|---|
| `mask_card` | `@ekaone/mask-card` | Masks credit/debit card numbers (PCI DSS compliant) |
| `mask_email` | `@ekaone/mask-email` | Masks email addresses for privacy protection |

## Usage

### 1. Connect via MCP Client

Point your MCP client to the SSE endpoint:

```
https://your-deployed-server.com/sse
```

### 2. With Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "ekaone-mcp-tools": {
      "url": "https://your-deployed-server.com/sse"
    }
  }
}
```

Then just talk to Claude naturally:

```
"Hide all card numbers in this table"
"Mask the email addresses before exporting"
"Show only the last 4 digits of this card: 4532-1234-5678-9012"
```

### 3. With Your Own Dashboard (Chat UI)

Wire the SSE endpoint into your AI client alongside Claude:

```typescript
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

const response = await client.beta.messages.create({
  model: "claude-sonnet-4-20250514",
  max_tokens: 1024,
  tools: [
    {
      type: "mcp",
      server_url: "https://your-deployed-server.com/sse",
      server_name: "ekaone-mcp-tools",
    },
  ],
  messages: [
    {
      role: "user",
      content: "Mask this card number: 4532-1234-5678-9012",
    },
  ],
  betas: ["mcp-client-2025-04-04"],
});

// Extract text response
const text = response.content
  .filter((block) => block.type === "text")
  .map((block) => block.text)
  .join("\n");

console.log(text);
// "Here is the masked card number: ************9012"
```

## Tool Reference

### `mask_card`

| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `value` | `string` | ✅ | — | Card number to mask |
| `maskChar` | `string` | ❌ | `*` | Masking character |
| `unmaskedStart` | `number` | ❌ | `0` | Digits visible at start |
| `unmaskedEnd` | `number` | ❌ | `4` | Digits visible at end |

**Examples:**

```
Input : "4532-1234-5678-9012"
Output: "************9012"

Input : "4532-1234-5678-9012", unmaskedStart: 4
Output: "4532********9012"

Input : "4532-1234-5678-9012", maskChar: "•"
Output: "••••••••••••9012"
```

### `mask_email`

| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `email` | `string` | ✅ | — | Email address to mask |
| `maskChar` | `string` | ❌ | `*` | Masking character |
| `visibleChars` | `number` | ❌ | `2` | Characters visible at start |
| `maskDomain` | `boolean` | ❌ | `false` | Also mask the domain |

**Examples:**

```
Input : "john.doe@example.com"
Output: "jo******@example.com"

Input : "john.doe@example.com", visibleChars: 4
Output: "john**@example.com"

Input : "john.doe@example.com", maskDomain: true
Output: "jo******@e******.com"
```

## Local Development

```bash
# Install
pnpm install

# Dev server (hot reload)
pnpm dev

# Run tests
pnpm test

# Build
pnpm build

# Start production
pnpm start
```

Server runs on `http://localhost:3000` by default.

Set a custom port via environment variable:

```bash
PORT=8080 pnpm dev
```

## Health Check

```bash
curl http://localhost:3000/
```

```json
{
  "name": "@ekaone/mcp-tools",
  "version": "0.1.0",
  "tools": ["mask_card", "mask_email"]
}
```

## Deployment

Any platform that supports Node.js works:

```bash
# Railway / Fly.io / Render
# Set environment variable:
PORT=3000
```

## License

MIT © Eka Prasetia
