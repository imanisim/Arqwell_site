# ARQWELL preview branch

This branch contains a **staged website preview**. The production `main` branch has not been changed.

## Files
- `index.html` — homepage, media hero and compact funding ticker
- `funding.html` — single featured funding banner, public-teaser AI search ribbon, full scrolling funding ticker and access prompt
- `library.html` — ArqLib books, podcasts, artifacts and research collection
- `learning.html` — ARQWELL 101 free/paid events and optional promotion
- `register.html`, `signin.html`, `member.html` — account and member pages
- `privacy.html` — privacy starter requiring review
- `assets/` — shared JavaScript, styles, posters and example media

## How to preview
Static site files should be served via HTTP(S), not opened through a `file://` URL. For local review run `python -m http.server 8000` in this repository, then visit `http://localhost:8000/` and `/funding.html`. The funding ticker uses native ES modules, which most browsers block on `file://` pages.

## Before launch
Set Supabase project URL and publishable key in `assets/config.js`; configure email auth redirects and Resend SMTP; run and audit the **funding RLS lockdown** migration from the separate numbered installation kit. Do **not** commit SQL migrations or secret keys to the public web root. This branch contains illustrative grants, not live opportunities. The AI search is a keyword-based demo, and subscription billing is not enabled. No paywall access should be granted based on client-only settings.

This branch preserves the existing CNAME and README on main; no production deployment was initiated.
