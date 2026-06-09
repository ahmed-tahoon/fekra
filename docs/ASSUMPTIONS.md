# Assumptions, Dependencies & Flags

Per scope items 20.2 / 20.3 — surfaced before implementation so both sides stay
aligned. Update as decisions are made.

## Assumptions

1. **Content source:** Blog and pages are managed as MDX in the repo for now
   (version-controlled, no recurring cost). If Fekra's non-technical team needs
   to edit content directly, we swap in a headless CMS — only the readers in
   `src/lib/content/` change. (Item 6.1)
2. **Email delivery:** Resend is the transactional email provider. A verified
   sending domain is required before go-live. (Items 6.4, 8.6, 10.3)
3. **Hosting:** Target is Vercel (or a Node host) with a global CDN. Regional
   access (section 18) is a deploy-time configuration. (Items 18.1–18.6)
4. **Locales:** English (default) and Arabic only, with `/en` and `/ar` URL
   prefixes on every page. (Section 11)
5. **Fika:** Delivered as a persona/presentation page only. A functional AI
   chatbot/backend is out of scope unless separately agreed. (Item 7.5)

## Dependencies (third-party / keys needed)

| Dependency             | Needed for                        | Item     |
| ---------------------- | --------------------------------- | -------- |
| Resend API key + domain| Contact & careers notifications   | 6.4/10.3 |
| Cloudflare Turnstile   | Form spam protection (optional)   | 16.2     |
| Calendly URL           | Booking integration (optional)    | 10.6     |
| GA4 / GTM / LinkedIn   | Analytics & campaign tracking     | 17       |
| Legacy WP URL list     | 301 redirect map for migration    | 12.3/12.4|

## Open flags (need Fekra input)

- [ ] Final sitemap of pages & navigation order (sections 2, 3).
- [ ] Inventory of existing WordPress URLs to preserve/redirect (item 12.1).
- [ ] Whether CV files are stored, and where, vs. emailed only (item 8.6).
- [ ] Privacy policy + cookie-consent requirement if analytics ship (item 16.5).
- [ ] Brand assets: logo, OG image, colours to finalize the theme tokens.
