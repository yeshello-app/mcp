<p align="center">
  <img src="https://yeshello.app/logo.svg" alt="YesHello" width="200" />
</p>

<h1 align="center">YesHello MCP Server</h1>

<p align="center">
  <strong>Digital business cards, lead capture forms, and service listings - built and managed by AI</strong>
</p>

<p align="center">
  <a href="https://yeshello.app">Website</a> -
  <a href="https://yeshello.app/docs/mcp-connector">Documentation</a> -
  <a href="https://yeshello.app/page/privacy-policy">Privacy Policy</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/tools-63-orange" alt="63 tools" />
  <img src="https://img.shields.io/badge/transport-Streamable%20HTTP-blue" alt="Streamable HTTP" />
  <img src="https://img.shields.io/badge/auth-OAuth%202.0-green" alt="OAuth 2.0" />
  <img src="https://img.shields.io/badge/MCP-2025--11--25-purple" alt="MCP spec" />
</p>

---

## What is this?

YesHello is a platform for creating digital business cards, lead capture forms, and service listings. This MCP server gives AI assistants (Claude, Cursor, VS Code, ChatGPT, and any MCP-compatible client) full control over building and managing your online business presence.

**Give AI a website URL, and it builds your complete digital business card in under 2 minutes.**

## Features

- **63 tools** across 8 categories: Cards, Forms, Submissions, Listings, Media, Interactive, Account, Skills
- **Build from URL** - AI scrapes your website and creates a card with your real content
- **Live editing** - if you have the builder open, watch the AI build your card in real-time
- **Stock photo search** - search and import from Pexels directly
- **Web scraping** - read any URL and extract clean markdown content
- **Browser control** - AI can highlight elements, give guided tours, fill inputs, navigate pages
- **Progressive skills** - AI loads only the knowledge it needs, when it needs it
- **4 themes** - Minimal, Professional, Wave, Cinematic
- **20+ field types** - hero, about, gallery, FAQ, social links, action buttons, video, forms, services, and more

## Quick Start

### Connect to Claude.ai or Claude Desktop

1. Go to **Settings > Connectors > Add Connector**
2. Enter URL: `https://yeshello.app/api/mcp`
3. Click **Connect** and log in to authorize
4. Start chatting - try "Build me a business card from https://mywebsite.com"

### Connect to Claude Code

```bash
claude mcp add yeshello --transport http https://yeshello.app/api/mcp
```

### Connect to Cursor / VS Code / Windsurf

Add to your MCP config file:

```json
{
  "mcpServers": {
    "yeshello": {
      "url": "https://yeshello.app/api/mcp"
    }
  }
}
```

No API key needed - OAuth handles authentication automatically.

## Example Prompts

Try these after connecting:

| Prompt | What happens |
|--------|-------------|
| "Build me a business card from https://mywebsite.com" | AI scrapes your site, extracts content, imports images, builds complete card |
| "Create a contact form with name, email, phone, and message" | AI creates and publishes a lead capture form with webhook delivery |
| "Add a services listing for my photography business" | AI creates a service listing with pricing and booking CTAs |
| "Search for professional headshot photos" | AI searches Pexels and imports stock photos to your media library |
| "Show me around the card builder" | AI highlights UI elements and gives you a guided tour |
| "What cards do I have?" | AI lists your existing cards with status and links |

## Tools

| Category | Count | What it does |
|----------|-------|-------------|
| **Cards** | 16 | Create, edit, publish digital business cards with 20+ field types across 4 themes |
| **Forms** | 8 | Build lead capture forms with 7 field types and webhook delivery |
| **Submissions** | 6 | View form submissions and webhook delivery logs |
| **Listings** | 12 | Create service, product, property, and event listings with items and CTAs |
| **Media** | 8 | Upload images, search Pexels stock photos, scrape web content, manage folders |
| **Interactive** | 4 | Browser highlights, guided tours, page navigation, input filling |
| **Account** | 2 | View account info and usage quotas |
| **Skills** | 6 | On-demand reference guides the AI loads when needed |

## Authentication

The MCP server uses **OAuth 2.0 with PKCE (S256)** via Client ID Metadata Documents (CIMD). No API keys to manage - your AI client handles the OAuth flow automatically.

When you connect for the first time:
1. A browser window opens to `yeshello.app/oauth/authorize`
2. Log in (or register) with your YesHello account
3. Click **Approve** on the consent screen
4. You're connected - tokens refresh automatically

## Privacy

- The MCP server is a **stateless pass-through** - it forwards requests to the YesHello API and returns results
- No additional data is collected beyond what the platform stores
- OAuth tokens are stored as SHA-256 hashes
- You can revoke access anytime from Settings > AI & API
- Full privacy policy: [yeshello.app/page/privacy-policy](https://yeshello.app/page/privacy-policy)

## Pricing

YesHello has a **free tier** - connect the MCP server, build your first card, and publish it at no cost. Upgrade for more cards, custom domains, teams, and premium features.

See [yeshello.app/pricing](https://yeshello.app/pricing) for details.

## Agent Skills

This repo includes installable skills that work with Claude Code, OpenAI Codex, Cursor, Gemini CLI, and any tool supporting the [Agent Skills](https://agentskills.io/) open standard.

### digital-business-card

Build a complete digital business card from a website URL in one conversation. The skill handles the entire pipeline: scrape website, extract content, search stock photos, import images, create card, publish.

**Install:**
```bash
# Copy to your personal skills directory
cp -r skills/digital-business-card ~/.claude/skills/

# Or for a specific project
cp -r skills/digital-business-card .claude/skills/
```

**Use:**
```
/digital-business-card https://mywebsite.com
```

Or just ask naturally: "Build me a digital business card from https://mywebsite.com"

Requires the YesHello MCP server to be connected (`https://yeshello.app/api/mcp`).

## Support

- Documentation: [yeshello.app/docs/mcp-connector](https://yeshello.app/docs/mcp-connector)
- Email: [hello@yeshello.app](mailto:hello@yeshello.app)
- Issues: [github.com/yeshello-app/mcp/issues](https://github.com/yeshello-app/mcp/issues)

## License

This repository contains documentation and configuration for the YesHello MCP server. The server itself is a hosted service at `yeshello.app/api/mcp`. The documentation in this repository is MIT licensed.
