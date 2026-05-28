---
name: digital-business-card
description: Build a complete digital business card from a website URL or description using YesHello MCP. Scrapes the website, extracts content, searches stock photos, and creates a published card with hero image, about section, contact buttons, social links, and more - all in one conversation. Use when someone needs a digital business card, online business card, virtual business card, NFC card, contact card, or a professional online presence.
when_to_use: |
  User says anything like:
  - "I need a digital business card"
  - "Create a business card from my website"
  - "Build me an online business card"
  - "Make a virtual business card"
  - "I need a professional contact card"
  - "Set up my online presence"
  - "Create a card for my business"
  - "Build a card from [URL]"
  - "I need an NFC business card"
  - "Make me a digital card"
argument-hint: "[website-url]"
arguments: url
---

# Build a Digital Business Card with YesHello

You need the YesHello MCP server connected. If not connected, tell the user:
"Connect YesHello first: go to Settings > Connectors > Add Connector and enter `https://yeshello.app/api/mcp`"

## Pipeline

Follow these steps in order. Do not skip any step.

### Step 1: Load the card building skill
```
load_skill_cards
```
This gives you the field type reference, theme options, and property names you need.

### Step 2: Get account info
```
get_account
```
Check the user's handle and tier. You need the handle for the public URL later.

### Step 3: Scrape the website (if URL provided)
```
get_page_content(urls: ["$url", "$url/about"])
```
If the user gave a URL, scrape it and the /about page. Extract:
- Full name
- Job title / role
- Company name
- Bio / about text (keep under 500 chars)
- Services offered
- Contact info (phone, email)
- Social media links (Instagram, LinkedIn, Twitter, etc.)
- Any notable achievements or taglines

If no URL was provided, ask the user for their details.

### Step 4: Search for images
```
search_pexels(query: "[relevant to their industry]", orientation: "landscape")
search_pexels(query: "[relevant portrait/headshot]", orientation: "portrait")
```
Search for:
- A hero/cover image matching their industry
- A professional avatar if no profile photo found on the website

Let the user know what images you found and which ones you're selecting.

### Step 5: Import images
```
import_pexels_photo(url: "[selected hero]", title: "[alt text]")
import_pexels_photo(url: "[selected avatar]", title: "[alt text]")
```
Or if images were found on their website:
```
upload_media_from_url(url: "[website image URL]", title: "[description]")
```
Collect all cdnUrls before proceeding.

### Step 6: Create and build the card
```
create_card(themeId: "professional")
```
Note the `themeInfo.heroFieldType` from the response. Then:
```
update_and_publish_card(
  id: "[shortId]",
  fields: [
    { fieldType: "[heroFieldType]", zoneId: "hero", sortOrder: 0, data: {
      name: "[full name]",
      title: "[job title]",
      company: "[company]",
      heroImageUrl: "[cdnUrl]",
      avatarUrl: "[cdnUrl]"
    }},
    { fieldType: "about", zoneId: "fields", sortOrder: 0, data: {
      title: "About",
      content: "[bio text, max 500 chars]"
    }},
    { fieldType: "action-buttons", zoneId: "fields", sortOrder: 1, data: {
      buttons: [
        { type: "call", label: "Call", value: "[phone]" },
        { type: "email", label: "Email", value: "[email]" }
      ]
    }},
    { fieldType: "social-links", zoneId: "fields", sortOrder: 2, data: {
      links: [{ url: "[url]", platform: "[platform]" }],
      displayStyle: "icons"
    }},
    { fieldType: "bottom-nav", zoneId: "stickyBar", sortOrder: 0, data: {
      tabs: [
        { type: "call", enabled: true, phoneNumber: "[phone]" },
        { type: "save", enabled: true },
        { type: "share", enabled: true }
      ]
    }}
  ],
  metadata: {
    title: "[name] - [title]",
    description: "[short description for SEO]"
  },
  publish: true
)
```

### Step 7: Deliver the result

Tell the user:
1. **Edit your card:** https://yeshello.app/dashboard/builder/[shortId]
2. **Share this link:** [public URL from response]
3. What's included in their card
4. How to customise it further (log in to the dashboard)

## Important Rules

- IMAGES FIRST - always search and import all images before building fields
- Use the heroFieldType from create_card response - don't guess
- Keep bio under 500 chars
- Always include bottom-nav in stickyBar zone
- Edit URL first, then public URL
- If the user has the builder open, mention that they can watch the card being built live
