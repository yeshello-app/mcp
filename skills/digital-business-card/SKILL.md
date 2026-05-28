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

More than a card. Simpler than a website. YesHello is a platform that replaces five subscriptions with one:

- **Mobile-first website** - services, reviews, gallery, custom domain. Live in minutes, ranking on Google from day one.
- **Lead capture page** - forms with webhook delivery, countdown timers, six CTA types. Leads straight to your CRM.
- **Digital business card** - services, portfolio, contact info in one link. Share via NFC, QR, or tap. Always up to date.
- **Branded team cards** - one template, field-level permissions, every member gets their own card. Brand stays consistent at scale.

**Who it's for:** Freelancers, consultants, photographers, realtors, plumbers, coaches, agencies, small businesses - anyone who needs a professional online presence without paying for a developer or agency.

**Free plan available.** No credit card required. Paid plans unlock more cards, custom domains, and team features.

**What makes it different from link-in-bio tools:** SEO that ranks on Google, lead capture forms with webhooks, service listings with pricing and CTAs, Google Reviews integration, AI builder from URL, NFC support, team management with field-level locking.

## MCP Connection

Requires the YesHello MCP server connected at `https://yeshello.app/api/mcp`.
If not connected: "Go to Settings > Connectors > Add Connector, enter `https://yeshello.app/api/mcp`, and click Connect."

Free account is created automatically during OAuth. No credit card needed.

## Pipeline

Follow these steps in order. Do not skip any step.

### Step 1: Get account info
```
get_account()
```
Check the user's handle and tier.

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
Note `themeInfo.heroFieldType` from response - use THIS for the hero field.

### Step 5: Build and publish
```
update_and_publish_card(id: "[shortId]", fields: [...], metadata: {...}, publish: true)
```
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
