# @ekaone/mcp-tools

MCP (Model Context Protocol) server exposing @ekaone utility tools for AI-assisted data masking via stdio transport.

[![npm version](https://img.shields.io/npm/v/@ekaone/mcp-tools.svg)](https://www.npmjs.com/package/@ekaone/mcp-tools)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)

## Tools

| Tool | Package | Description |
|---|---|---|
| `mask_card` | `@ekaone/mask-card` | Masks credit/debit card numbers (PCI DSS compliant) |
| `mask_email` | `@ekaone/mask-email` | Masks email addresses for privacy protection |

## Usage

### 1. With MCP Clients (Windsurf, Cursor, VS Code, Claude Desktop)

Add this configuration to your MCP client:

```json
{
  "mcpServers": {
    "masker": {
      "command": "npx",
      "args": [
        "@ekaone/mcp-tools@latest"
      ]
    }
  }
}
```

### 2. With Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "masker": {
      "command": "npx",
      "args": [
        "@ekaone/mcp-tools@latest"
      ]
    }
  }
}
```

Then just talk to Claude naturally:

```
"Hide all card numbers in this table"
"Mask the email john.doe@example.com"
"Show only last 4 digits of this card: 4532-1234-5678-9012"
```

### 3. Available Commands

Once connected, you can use these commands:

- **Mask email addresses**: "Can you mask this email: user@domain.com?"
- **Mask card numbers**: "Please mask this credit card: 4532-1234-5678-9012"
- **Custom masking**: "Mask this card showing only first 4 digits: 4532-1234-5678-9012"

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
# Install dependencies
pnpm install

# Development with hot reload
pnpm dev

# Run tests
pnpm test

# Build for production
pnpm build

# Test the built package locally
pnpm start
```

## Testing Locally

Test the MCP server locally:

```bash
# Build first
pnpm build

# Test stdio communication
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' | node dist/index.js
```

## Publishing

```bash
# Build and test before publishing
pnpm run prepublishOnly

# Publish to NPM
pnpm publish
```

## Branch Structure

This repository has two main branches:

- **`stdio`** (current branch) - For stdio MCP client usage (this README)
- **`HTTP/SSE`** - For HTTP/SSE endpoint deployment

## License

MIT © [Eka Prasetia](https://prasetia.me/)

## Links

- [npm Package](https://www.npmjs.com/package/@ekaone/mcp-tools)
- [GitHub Repository](https://github.com/ekaone/mcp-tools)
- [Issue Tracker](https://github.com/ekaone/mcp-tools/issues)

---

⭐ If this library helps you, please consider giving it a star on GitHub!