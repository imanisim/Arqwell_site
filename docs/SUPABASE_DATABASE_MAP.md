# ARQWELL — Supabase Database Map

**Supabase project:** Library (`zerqchjjnktijgzauzfx`) — `https://zerqchjjnktijgzauzfx.supabase.co`
**Status:** Schema and RLS installed. Website integration is not yet connected. Never publish a service-role or secret key.

## Page → database mapping

| Website feature | Public/authenticated source | Protected source |
|---|---|---|
| ArqLib books, podcasts, artifacts, research | `arqwell_library_items` | Member-only rows protected by RLS |
| Homepage compact funding ticker | `arqwell_funding_previews` + `arqwell_feature_slots` and `arqwell_feature_entries` | — |
| Funding page single featured hero | Same public preview and feature tables; use slot `funding_hero` | — |
| Funding page expanded ticker | Same public preview and feature tables; use slot `funding_ticker` | — |
| Funding full opportunity detail | Public preview data | `arqwell_funding_details` gated by active paid subscription |
| Editor-only grant notes | — | `arqwell_funding_editor_notes` |
| Member menu | Supabase Auth + `arqwell_profiles` | Profile readable only by owner |
| Saved content and opportunities | — | `arqwell_saved_items` scoped to owner |
| Subscription access | — | `arqwell_subscriptions`, only updated by trusted backend |
| Live Learning / ARQWELL 101 | `arqwell_live_events` | Optional popup settings in `arqwell_site_settings` |
| Monthly newsletter consent | — | `arqwell_newsletter_preferences` |
| Feature Studio admin | `arqwell_feature_slots`, `arqwell_feature_entries` | Edit policies require `arqwell_admins` |

## Initial featured slots

`home_featured_book`, `home_featured_podcast`, `home_featured_artifact`,
`home_featured_research`, `home_funding_ticker`, `funding_hero`, `funding_ticker`.

Slot modes support `manual`, `scheduled`, `queue`, or `random`. The database stores each existing record reference, ordering, date window and pinned status. A client/server resolver still needs to implement rotation and date selection. Do not duplicate library or funding records as features.

## Access boundary

- Anonymous: published, non-member library records and published funding *teasers*.
- Signed-in members: published member library records, their own profile, saved items and newsletter preferences.
- Paid subscribers: funding details, based on server-written `arqwell_subscriptions` status and period end.
- Admins: editable catalog, events, featured records and site settings via a controlled `arqwell_admins` roster.

**Do not** grant members direct write access to the subscription or admin tables. Stripe webhooks must verify events on a trusted server before writing membership entitlements.

## Remaining steps

1. Configure `assets/config.js` with the correct Project URL and **publishable** API key.
2. Replace sample ticker, library, and event datasets with Supabase queries.
3. Connect site registration and sign-in to Supabase Auth; set up Resend SMTP.
4. Create an avatar Storage bucket via the Storage API or dashboard, with per-user storage policies (not yet configured).
5. Connect Stripe billing, verified webhook, and secure AI search server. Live Learning URLs may point to Eventbrite or the organizer's page.
6. Create ARQWELL admin account and seed real licensed/public-domain library records and verified funding opportunities.
7. Test all visitors / members / paid subscribers / admin access modes before merging the preview branch.

Schema installed 2026-11-01. Existing Arqlib project `fbxwgqlixobamqhnxqjp` was not modified.
