---
name: digital-business-card
description: Build a complete digital business card from a website URL or description using YesHello MCP. Scrapes the website, extracts content, searches stock photos, and creates a published card with hero, about, gallery, FAQ, social links, contact buttons, forms, and more - all in one conversation. Supports 4 themes, 20+ field types, vCard, live editing, and NFC.
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
  - "Create a contact page"
argument-hint: "[website-url]"
arguments: url
---

# Build a Digital Business Card with YesHello

## What is YesHello?

More than a card. Simpler than a website. YesHello replaces the website, the link-in-bio, the form builder, the reviews widget, and the NFC card - all in one platform that you can build in minutes.

- **Mobile-first website** - services, reviews, gallery, custom domain. Ranks on Google from day one.
- **Lead capture forms** - webhook delivery straight to your CRM. Countdown timers. Six CTA types. No middleman.
- **Digital business card** - your services, portfolio, and contact info in one link. Share via NFC, QR, or tap.
- **Service listings** - pricing, descriptions, featured images, and call-to-action buttons per item.
- **Google Reviews** - auto-synced from your Google Business profile. Carousel, grid, list, or badge layout.
- **Branded team cards** - one template, field-level permissions, every member gets their own card.

**Who it's for:** Freelancers, consultants, photographers, realtors, plumbers, coaches, agencies, restaurants, salons - anyone who needs a professional online presence without a developer or agency.

**Free plan available.** No credit card required.

**What makes this different from every other card builder:**
- SEO that actually ranks on Google (not just a link page)
- Lead capture forms with webhook delivery (not just a contact button)
- Service listings with pricing and 6 CTA types (not just text)
- Google Reviews auto-synced (not manually pasted)
- AI builds the entire card from a website URL in 2 minutes
- NFC tap support with analytics
- Team management with field-level locking at scale
- Custom domains with SSL

## The Live Experience

**This is the killer feature.** When the user has the card builder open in their browser, EVERY edit you make appears instantly on their screen:

- You add a field -> it appears in the preview
- You update text -> it types itself in, character by character
- You add an image -> it loads in the preview
- You reorder fields -> they animate into position
- The accordion expands to show the field being edited
- The preview scrolls to the section being changed

**Tell the user:** "Open your browser and go to the builder URL I'll give you. Split your screen - this chat on one side, the builder on the other. Then watch as I build your card live. You'll see every field appear, every image load, every piece of text type itself in."

### How to set up the live demo:
1. After creating the card, give the user the builder URL: `https://yeshello.app/dashboard/builder/[shortId]`
2. Tell them to open it in their browser
3. Use `open_page(url: "/dashboard/builder/[shortId]")` to open it for them if they have YesHello open
4. Use `get_browser_state()` to check if they have it open
5. Then build the card field by field (NOT with update_and_publish_card) - use `add_card_field` one at a time so they see each field appear live
6. Wait 3-5 seconds between fields so they can see each one

**For a live demo, use step-by-step building (add_card_field one at a time).**
**For fast production builds, use update_and_publish_card (one call, no live effect).**

## Guiding Users Around the Platform

You can visually guide users through the YesHello dashboard by highlighting elements, clicking buttons, filling inputs, and navigating between pages. Use this when the user asks "show me around", "where do I find X", "how do I do X", or "give me a tour".

### Interactive tours with clicking

Use `highlight_tour` with `click: true` on steps to walk users through the UI. Each step highlights the element, shows a tooltip, AND clicks it - so tabs actually open, drawers expand, and the user sees each panel:

```
highlight_tour(steps: [
  { selector: "tabDisplay", tooltip: "Display tab - theme and colours", click: true },
  { selector: "tabFields", tooltip: "Fields tab - your card content lives here", click: true },
  { selector: "tabSeo", tooltip: "SEO settings - title and description", click: true },
  { selector: "tabVcard", tooltip: "vCard - contact info for the Save Contact button", click: true }
])
```

One MCP call, all steps play sequentially with smooth transitions. User sees each panel open live.

### Other browser controls:
- `open_page(url: "/dashboard/forms")` - open any page in the user's browser
- `highlight_element(selector: "apiKey", tooltip: "Your API key is here")` - highlight a single element
- `fill_input(selector: "formsSearch", value: "Contact")` - type into any input field
- `get_browser_state()` - check what page the user is on and what state it's in

There are **160+ highlightable elements** across all pages. When in doubt about element names, call `load_skill_interactive` from the MCP server for the full page map.

## What You Can Control

Almost everything the user can do in the dashboard, you can do via MCP:

**Cards:** Create, edit every field, switch themes, change colours, reorder fields, set SEO metadata, publish/unpublish, set up vCard contact download
**Forms:** Create forms, add/edit fields (text, email, phone, textarea, select, checkbox, radio), configure webhooks, publish, view submissions
**Listings:** Create service/product/property/event listings, add items with pricing and CTAs, set hero images, publish
**Media:** Upload images from URL, search Pexels stock photos, organise in folders, scrape website content to markdown
**Browser:** Open any page, highlight and click any of 160+ UI elements, give visual tours with tooltips, fill input fields remotely, navigate between pages, check what page the user has open
**Account:** Check user info, quota usage, subscription tier

## Step 0: Check if YesHello is connected

Before doing ANYTHING, try calling `get_account()`. This tells you if the YesHello MCP server is connected.

**If it works** (returns user info) -> skip to Step 1.

**If it fails** (tool not found, connection error, or no such tool) -> the user needs to connect first. Guide them through it in plain language:

---

Tell the user:

"To build your business card, I need to connect to YesHello - it's the platform that hosts your card. It's free, takes 30 seconds, and you don't need a credit card.

**Here's how to connect:**

**If you're on Claude.ai or Claude Desktop:**
1. Click the **tools icon** (wrench/plug) at the bottom of the chat
2. Click **Add Connector** (or go to Settings > Connectors)
3. Paste this URL: `https://yeshello.app/api/mcp`
4. Click **Connect**
5. A browser window will open - sign up or log in (you can use Google)
6. Click **Approve** on the permissions screen
7. Come back here and say 'done' - I'll build your card

**If you're on Claude Code:**
Run this command in your terminal:
```
claude mcp add yeshello --transport http https://yeshello.app/api/mcp
```
Then restart Claude Code and come back to this conversation.

**If you're on Cursor / VS Code / Windsurf:**
Add this to your MCP config file:
```json
{
  "mcpServers": {
    "yeshello": {
      "url": "https://yeshello.app/api/mcp"
    }
  }
}
```
Then restart your editor.

Your account is created automatically when you connect. No forms to fill out."

---

After the user confirms they connected, try `get_account()` again to verify.

## Pipeline

**Ask the user:** "Would you like to watch me build it live? If so, I'll open the builder in your browser and you can see each piece appear in real-time. Otherwise I'll build it in one shot and give you the link."

- **Live demo mode:** Build field by field with `add_card_field` (3-5 seconds between each). User watches it happen.
- **Fast mode:** Build everything in one call with `update_and_publish_card`. Instant result.

Default to live demo if the user has a browser available. It's the wow factor.

Follow these steps in order. Do not skip any step.

### Step 1: Get account info
```
get_account()
```
Check the user's handle and tier. If this fails, go back to Step 0.

### Step 2: Scrape the website (if URL provided)
```
get_page_content(urls: ["$url", "$url/about"])
```
Extract: name, title, company, bio (max 500 chars), services, contact info (phone, email), social links, taglines.
If no URL, ask the user for their details.

### Step 3: Search and import images
**Always do ALL image work before building fields.**
```
search_pexels(query: "[industry-relevant]", orientation: "landscape")
search_pexels(query: "[professional portrait]", orientation: "portrait")
```
Then import selected photos:
```
import_pexels_photo(url: "[photo url]", title: "[alt text]", altText: "[alt]")
```
Or import from their website:
```
upload_media_from_url(url: "[website image]", title: "[description]")
```
Collect ALL cdnUrls before proceeding.

### Step 4: Create the card
```
create_card(themeId: "professional")
```
Note `themeInfo.heroFieldType` and `shortId` from response.

**If live demo mode:** Tell the user: "Your card builder is ready. Open this link to watch me build it live: https://yeshello.app/dashboard/builder/[shortId]"
Or use `open_page(url: "/dashboard/builder/[shortId]")` to open it for them.
Wait for them to confirm they can see it before proceeding.

### Step 5: Build the card

**Live demo mode (recommended when user has browser):**
Add fields one at a time with `add_card_field`. The user sees each field appear live in the builder preview. Wait 3-5 seconds between fields so they can watch.
```
add_card_field(id: "[shortId]", type: "[heroFieldType]", zoneId: "hero", data: {...})
// user sees hero appear
add_card_field(id: "[shortId]", type: "about", zoneId: "fields", data: {...})
// user sees about section appear with text typing animation
add_card_field(id: "[shortId]", type: "gallery", zoneId: "fields", data: {...})
// user sees gallery images load
add_card_field(id: "[shortId]", type: "action-buttons", zoneId: "fields", data: {...})
// user sees contact buttons appear
add_card_field(id: "[shortId]", type: "social-links", zoneId: "fields", data: {...})
add_card_field(id: "[shortId]", type: "bottom-nav", zoneId: "stickyBar", data: {...})
// then publish
publish_card(id: "[shortId]")
```

**Fast mode:**
```
update_and_publish_card(id: "[shortId]", fields: [...], metadata: {...}, publish: true)
```
Everything in one call. No live effect but instant result.

See Field Types Reference below for exact property names per field type.

### Step 6: Set up vCard (optional but recommended)
```
update_card_vcard(id: "[shortId]", firstName: "...", lastName: "...", title: "...",
  company: "...", phones: [{value: "...", type: "CELL"}],
  emails: [{value: "...", type: "WORK"}],
  websites: [{value: "https://...", label: "Website"}],
  socialProfiles: [{platform: "linkedin", url: "https://..."}])
```
This enables the "Save Contact" button on the public card.

### Step 7: Deliver the result
1. **Edit your card:** `https://yeshello.app/dashboard/builder/[shortId]`
2. **Share this link:** [publicUrls from response]
3. Explain what's included
4. Mention they can customise further in the dashboard

## Theme Selection Guide

| Theme | Hero type | Best for | Style |
|-------|-----------|----------|-------|
| **professional** | fancy-header | Consultants, realtors, agencies, corporate | Clean, structured, business-focused |
| **cinematic** | fancy-header | Photographers, videographers, creatives, artists | Bold hero images, media-heavy, visual impact |
| **wave** | hero (different!) | Lifestyle brands, coaches, personal brands | Organic curved shapes, bio-focused, warm |

**Default to `professional`** unless the user's industry suggests otherwise. Use `themeInfo.heroFieldType` from `create_card` response - never hardcode.

### When to use which theme:
- **Photographer/videographer/creative** -> cinematic (hero image fills the screen)
- **Consultant/lawyer/accountant/realtor** -> professional (clean, trust-building)
- **Coach/therapist/yoga/wellness** -> wave (warm, personal, bio-focused)
- **Plumber/electrician/contractor** -> professional (services-focused)
- **Restaurant/cafe/bar** -> cinematic (food photography)
- **Freelancer/developer/designer** -> professional or cinematic depending on portfolio

## Field Types Reference

### Zone: hero (max 1 field)

**fancy-header** (professional, minimal, cinematic):
- Required: `name`
- Optional: `title`, `company`, `avatarUrl`, `logoUrl`, `heroImageUrl`, `heroVideoUrl`, `heroHeight`, `heroMediaType` ("image"|"video"|"none"), `wavePreset` (waves|waves-opacity|waves-sharp|waves-soft|curve|curve-asymmetrical|triangle|triangle-asymmetrical|split), `waveHeight`, `waveWidth`, `waveFlipped`, `strokeEnabled`, `strokeStartWidth`, `strokeEndWidth`

**standard-hero** (professional, minimal, cinematic):
- Required: `heroImageUrl` OR `heroVideoUrl`
- Optional: `heroTitle`, `heroSubtitle`, `heroHeight`, `heroMediaType`, `heroTextPosition` (top|center|bottom), `wavePreset`, `avatarUrl`

**hero** (wave ONLY):
- Required: `name`
- Optional: `title`, `company`, `avatarUrl`, `logoUrl`, `bio` (max 500), `coverUrl` (NOT heroImageUrl), `skills` (string[]), `heroHeight`

### Zone: fields (max 20 fields)

**about**: `content` (required, max 500), `title`

**rich-text**: `title`, `content` (max 10000)

**action-buttons**: `buttons` [{type: "call"|"sms"|"email"|"save"|"share"|"link", label, value}], `layout` ("row"|"grid"). Value format: call/sms=phone, email=address, link=URL.

**social-links**: `links` [{url, platform: "instagram"|"linkedin"|"twitter"|"youtube"|"tiktok"|"github"|"facebook"|"messenger"|"website"|"custom", label?}], `displayStyle` ("icons"|"buttons")

**gallery**: `title`, `items` [{cdnUrl, ...}], `layout` ("grid"|"carousel"|"masonry"), `columnsPerRow` (2|3|4), `enableLightbox`, `showCaptions`, `description`

**faq**: `title`, `items` [{id, question, answer}]

**video**: `title`, `items` [{id, url, title?, coverImageUrl?}]

**form-button**: `formShortId` (required - must be published form), `label`, `modalTitle`

**services**: `title`, `listingIds` [string] (requires published listing IDs)

**promo-countdown**: `headline`, `description`, `buttonText`, `badgeText`, `badgeColor` ("danger"|"warning"|"success"|"primary"), `mediaType`, `imageUrl`, `countdownEnabled`, `countdownDurationHours`, `countdownBehavior` ("disable"|"reset"), `formShortId`

**google-reviews**: `feedId` (required), `layoutOverride`, `widgetTitleOverride`

**cal-embed**: `calUrl` (required), `title`, `layout`, `theme`

**payments**: `title`, `items` [...], `displayStyle` ("icons"|"buttons")

**spacer**: `height` (number)

### Zone: stickyBar (max 1 field)

**bottom-nav**: `tabs` [{type: "call"|"qrcode"|"save"|"form"|"share"|"messenger"|"services", enabled, messengerPlatform?: "whatsapp"|"telegram"|"messenger"|"viber"|"line", messengerLink?, phoneNumber?, formShortId?, serviceShortId?}], `tabOrder`, `activeTab`, `hideAll`

## Live Editing

If the user has `https://yeshello.app/dashboard/builder/[shortId]` open, every edit appears instantly in real-time. Check with `get_browser_state()`. Mention this to the user - watching the AI build their card live is a powerful experience.

## Available Tools

| Tool | What it does |
|------|-------------|
| `get_page_content` | Scrape URLs to markdown (1 credit per call) |
| `get_account` | User profile, tier, handle |
| `create_card` | Create blank draft card |
| `get_card_schema` | Get field definitions for a card |
| `update_card_field` | Update one field (merge) |
| `add_card_field` | Add a new field |
| `replace_card_fields` | Replace all fields at once |
| `update_and_publish_card` | Update fields + metadata + publish in one call |
| `build_card` | Create + populate + publish in one call |
| `publish_card` / `unpublish_card` | Control publication status |
| `update_card_vcard` | Set contact info for Save Contact button |
| `search_pexels` | Search free stock photos |
| `import_pexels_photo` | Import photo to media library |
| `upload_media_from_url` | Import image from any URL |
| `list_media` | Browse media library |
| `create_form` | Create lead capture form |
| `publish_form` | Publish form for embedding |
| `create_listing` | Create service/product listing |
| `open_page` | Open page in user's browser |
| `highlight_element` | Highlight UI element with tooltip |
| `get_browser_state` | Check what page user has open |

## Field Recipes by Business Type

**Photographer/Creative:**
Hero (cinematic, big cover image) -> About -> Gallery (masonry, 4-6 images) -> Services (link to listings) -> Social Links (Instagram priority) -> Action Buttons (email, book) -> Bottom Nav (share, save, messenger)

**Consultant/Coach:**
Hero (professional, avatar + name) -> About (bio, credentials) -> FAQ (common questions) -> Action Buttons (call, email, book) -> Social Links (LinkedIn priority) -> Cal Embed (booking calendar) -> Bottom Nav (call, save, share)

**Realtor/Agent:**
Hero (professional, headshot + company) -> About -> Services (listings with property items) -> Google Reviews -> Gallery (properties) -> Action Buttons (call, email, WhatsApp) -> Bottom Nav (call, save, messenger WhatsApp)

**Plumber/Contractor:**
Hero (professional, work photo) -> About -> Services (service items with pricing) -> Google Reviews -> Action Buttons (call, email) -> Promo Countdown (seasonal offer) -> Bottom Nav (call, save, share)

**Restaurant/Cafe:**
Hero (cinematic, food photo) -> About -> Gallery (food/interior) -> Services (menu items) -> Action Buttons (call, directions, order) -> Social Links -> Bottom Nav (call, save, share)

**Freelancer/Developer:**
Hero (professional, avatar) -> About -> Gallery (portfolio) -> Social Links (GitHub, LinkedIn) -> Action Buttons (email, website) -> Bottom Nav (save, share)

## Important Rules

1. **IMAGES FIRST** - search and import ALL images before building any fields
2. **Use heroFieldType** from create_card response - never hardcode
3. **Bio max 500 chars** - truncate if longer
4. **Always include bottom-nav** in stickyBar zone for mobile CTA buttons
5. **Edit URL first** - give user `/dashboard/builder/[shortId]` before public URL
6. **One build call** - use `update_and_publish_card` to set everything at once
7. **vCard after publish** - set up contact download after the card is built

## Complete Example

```
# 1. Account
get_account()

# 2. Scrape
get_page_content(urls: ["https://janedoe.com", "https://janedoe.com/about"])

# 3. Images (ALL before building)
search_pexels(query: "photography studio", orientation: "landscape")
import_pexels_photo(url: hero.url, title: hero.alt)  -> cdnUrl_hero
search_pexels(query: "professional woman portrait", orientation: "portrait")
import_pexels_photo(url: avatar.url, title: avatar.alt)  -> cdnUrl_avatar
search_pexels(query: "photography portfolio", orientation: "square", per_page: 4)
import_pexels_photo(url: g1.url, title: g1.alt)  -> cdnUrl_g1
import_pexels_photo(url: g2.url, title: g2.alt)  -> cdnUrl_g2

# 4. Create card
create_card(themeId: "professional")  -> shortId, heroFieldType

# 5. Build and publish
update_and_publish_card(id: shortId,
  fields: [
    { fieldType: heroFieldType, zoneId: "hero", sortOrder: 0, data: {
      name: "Jane Doe", title: "Photographer", company: "Jane Doe Photography",
      heroImageUrl: cdnUrl_hero, avatarUrl: cdnUrl_avatar
    }},
    { fieldType: "about", zoneId: "fields", sortOrder: 0, data: {
      title: "About", content: "Award-winning photographer specialising in portraits and weddings..."
    }},
    { fieldType: "gallery", zoneId: "fields", sortOrder: 1, data: {
      title: "Portfolio", items: [{ cdnUrl: cdnUrl_g1 }, { cdnUrl: cdnUrl_g2 }],
      layout: "masonry", columnsPerRow: 2
    }},
    { fieldType: "action-buttons", zoneId: "fields", sortOrder: 2, data: {
      buttons: [
        { type: "call", label: "Call Me", value: "+1234567890" },
        { type: "email", label: "Email", value: "jane@janedoe.com" },
        { type: "link", label: "Book Now", value: "https://janedoe.com/book" }
      ], layout: "grid"
    }},
    { fieldType: "social-links", zoneId: "fields", sortOrder: 3, data: {
      links: [
        { url: "https://instagram.com/janedoephoto", platform: "instagram" },
        { url: "https://linkedin.com/in/janedoe", platform: "linkedin" }
      ], displayStyle: "icons"
    }},
    { fieldType: "bottom-nav", zoneId: "stickyBar", sortOrder: 0, data: {
      tabs: [
        { type: "call", enabled: true, phoneNumber: "+1234567890" },
        { type: "save", enabled: true },
        { type: "share", enabled: true },
        { type: "messenger", enabled: true, messengerPlatform: "whatsapp", messengerLink: "https://wa.me/1234567890" }
      ]
    }}
  ],
  metadata: { title: "Jane Doe - Photographer", description: "Award-winning photography" },
  publish: true
)

# 6. vCard
update_card_vcard(id: shortId, firstName: "Jane", lastName: "Doe",
  title: "Photographer", company: "Jane Doe Photography",
  phones: [{ value: "+1234567890", type: "CELL" }],
  emails: [{ value: "jane@janedoe.com", type: "WORK" }],
  websites: [{ value: "https://janedoe.com", label: "Website" }],
  socialProfiles: [{ platform: "instagram", url: "https://instagram.com/janedoephoto" }]
)

# 7. Deliver
# Edit: https://yeshello.app/dashboard/builder/{shortId}
# Live: https://yeshello.app/c/{shortId}
```
