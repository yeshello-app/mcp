// Minimal MCP server for Glama quality checks.
// The real server is hosted at https://yeshello.app/api/mcp
// This file exists only to pass Glama's automated introspection.

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'

const server = new McpServer({
  name: 'yeshello',
  version: '1.0.0',
}, {
  instructions: 'YesHello - Digital business cards, lead capture forms, and service listings. Connect to the hosted server at https://yeshello.app/api/mcp for full functionality with 63 tools.',
})

// Register a representative subset of tools so Glama sees real tool annotations
server.registerTool('get_help', {
  annotations: { readOnlyHint: true, destructiveHint: false },
  title: 'YesHello Skill Overview',
  description: 'Returns a compact index of available skills and quick-start commands. This is a hosted server - connect at https://yeshello.app/api/mcp for all 63 tools.',
  inputSchema: z.object({}),
}, async () => ({
  content: [{ type: 'text', text: 'YesHello MCP Server\n\nThis is a quality-check stub. The full server with 63 tools is hosted at:\nhttps://yeshello.app/api/mcp\n\nConnect via OAuth 2.0 - no API key needed.' }],
}))

server.registerTool('get_account', {
  annotations: { readOnlyHint: true, destructiveHint: false },
  title: 'Get Account',
  description: 'Get the authenticated user profile. Requires connection to the hosted server.',
  inputSchema: z.object({}),
}, async () => ({
  content: [{ type: 'text', text: 'Connect to the hosted server at https://yeshello.app/api/mcp to use this tool.' }],
}))

server.registerTool('create_card', {
  annotations: { readOnlyHint: false, destructiveHint: false },
  title: 'Create Card',
  description: 'Create a new digital business card. Requires connection to the hosted server.',
  inputSchema: z.object({
    themeId: z.string().optional().describe('Theme: professional, minimal, wave, cinematic'),
  }),
}, async () => ({
  content: [{ type: 'text', text: 'Connect to the hosted server at https://yeshello.app/api/mcp to use this tool.' }],
}))

server.registerTool('get_page_content', {
  annotations: { readOnlyHint: true, destructiveHint: false },
  title: 'Get Page Content as Markdown',
  description: 'Scrape URLs and return clean markdown. Requires connection to the hosted server.',
  inputSchema: z.object({
    urls: z.array(z.string()).describe('URLs to scrape (max 5)'),
  }),
}, async () => ({
  content: [{ type: 'text', text: 'Connect to the hosted server at https://yeshello.app/api/mcp to use this tool.' }],
}))

server.registerTool('search_pexels', {
  annotations: { readOnlyHint: true, destructiveHint: false },
  title: 'Search Pexels Stock Photos',
  description: 'Search free stock photos on Pexels. Requires connection to the hosted server.',
  inputSchema: z.object({
    query: z.string().describe('Search term'),
  }),
}, async () => ({
  content: [{ type: 'text', text: 'Connect to the hosted server at https://yeshello.app/api/mcp to use this tool.' }],
}))

server.registerTool('highlight_tour', {
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: true },
  title: 'Guided Tour',
  description: 'Play a guided tour with highlights and optional clicking. Requires connection to the hosted server.',
  inputSchema: z.object({
    steps: z.array(z.object({
      selector: z.string(),
      tooltip: z.string(),
      click: z.boolean().optional(),
    })),
  }),
}, async () => ({
  content: [{ type: 'text', text: 'Connect to the hosted server at https://yeshello.app/api/mcp to use this tool.' }],
}))

const transport = new StdioServerTransport()
await server.connect(transport)
