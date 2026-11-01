# ARQWELL pricing & annual maintenance plan — proposed, not published

Prepared 2026-11-01. **Stripe account in live mode:** no products or prices created. Supabase `arqwell_offerings` has proposed, unpublished prices with checkout_enabled=false. Do not treat these as active sales.

## Hosting decision
GitHub Pages is appropriate for repository preview but GitHub Pages terms prohibit use as free hosting for a commercial SaaS or e-commerce site primarily facilitating transactions. Retain GitHub for version control; migrate production deployment to a suitable commercial web host before launching subscription checkout. Keep account and payment operations in secure Supabase Edge Functions or another trusted backend.

## Proposed membership catalog (USD)
| Offering | Monthly | Annual paid upfront | Deliverables | Limits |
|--|--:|--:|--|--|
| Explorer | Free | Free | Open library links, public funding teasers, event notices, optional member account | no premium eligibility details |
| Funding Intelligence | $15 | $150 | Funding details, source links, eligibility filters, bookmarks, monthly digest | no AI searches |
| Funding Intelligence AI | $39 | $390 | All Intel features, AI matching, summaries and specialty suggestions | propose 50 AI research queries per month; monitor costs |
| Studio | $99 | $990 | Up to 3 member seats, organization filters, shared lists and AI matching | propose 150 pooled AI queries per month; launch only after organization/team access control implemented |

Annual prices equivalent to 10 paid months. Do not claim features are live before fully implemented.

## Complementary offerings (recommendations, not active)
- ArqLib public-domain source links: free; retain custom catalog cover only where original artwork or license clearly permits. Link to original source; never repackage copyrighted source contents without permission.
- Paid live-learning workshops: instructor and delivery cost + target margin. Trial $25-$65 per ticket; free sessions external Eventbrite registration.
- Archive featured placement: draft $49/30 days, $89/60 days, $129/90 days, paid only after approval with publish and expiration rules.
- Funding sponsor slots: from $99/month, manual approval, labeled sponsorship, no guaranteed visibility until traffic established.
- AEC design/research services: quote/invoice by scope; keep outside subscription tiers.
- AI usage over the cap: disable once consumed or offer additional bundles only after per-query cost tracking and abuse controls.

## Annual cost budget (estimate; not actual invoices)
| Cost category | Planning annual cost | Note |
|--|--:|--|
| Commercial static hosting | $120 | Placeholder, verify provider |
| Supabase Pro | $300 | Starting $25/mo for first project; project/usage extras possible |
| Resend email | $0–240 | Free until traffic warrants Pro at $20/mo |
| AI API | $180–600 | Strict budgets, model selection, per-user caps |
| Domain, monitoring, misc. | $60–180 | Planning allowance |
| Technical maintenance | $2,400 | 4h/month at $50/h opportunity cost |
| Editorial/curation labor | $1,920 | 4h/month at $40/h |
| **Combined** | **$4,980–$5,760** | Excludes marketing, tax, legal, additional editorial labor and major development |

Plan against approximately **$5,500/year** or **$458/month** to protect labor allowance. These are cost assumptions, not actual observed expenses.

## Estimated recurring-payment processing costs
For U.S. online card payments with Stripe Billing pay-as-you-go, approximate cost = 2.9% + $0.30 per transaction plus 0.7% Billing volume, excluding taxes, disputes, foreign cards, premium features or negotiated rates.

Monthly net receipts per subscription, approximate:
- Intel $15 → $14.16 after card + Billing fees
- AI $39 → $37.30
- Studio $99 → $95.14

At $5,500/year base cost ($458.33/month), break even with approximately 33 Intel-only monthly subscriptions, 13 AI-only monthly subscriptions, or 5 Studio-only subscriptions; excludes incremental AI cost from additional customers. A mixed target of 20 Intel + 5 AI + 1 Studio yields ~$564.82/month or ~$6,778/year after processing, **~$1,278/year operating surplus before tax** at this modeled cost, assuming monthly billing, no churn, no refunds, costs staying within budget, and limits enforced.

## Manual account-level checklist
- [ ] Select commercial production host and confirm `arqwell.org` / `arqwell.net` domain roles; preserve DNS.
- [ ] Review Stripe prices and approve exact products before any live product creation; separately set refund/cancellation terms and tax approach.
- [ ] Confirm Stripe legal business details, payout bank, brand statement descriptor, and email.
- [ ] Create Stripe recurring monthly/annual Prices and Stripe-hosted Checkout + Customer Portal after approval.
- [ ] Set secrets only in trusted server / Supabase Edge Functions; configure webhook endpoint and verify Stripe signature before updating entitlements.
- [ ] Update subscription RLS/data model for multiple paid tiers and organization seats before enabling their checkout.
- [ ] Enable Supabase production Auth settings, email redirect URLs, anti-abuse protections; configure Resend SMTP.
- [ ] Set up cover-policy review queue for public-domain books and institution archive media; never assume covers, scans, translations or photos have the same rights as underlying text.
- [ ] Verify relevant source link/API access, attribution and any API rate limits; bulk catalog imports need ingestion scripts and deduplication.
- [ ] Add production funding records with validated source URLs and deadlines; ensure demos are clearly marked and never advertised as active grants.
- [ ] Test free member, paid member, canceled member, expired member, team member and admin sessions; test payment retries/cancelations and RLS.
- [ ] Set up usage alerts, expense/tax/savings reserves, uptime monitoring, backups, and review financial performance monthly.

References checked 2026-11-01:
- https://supabase.com/pricing
- https://resend.com/pricing
- https://stripe.com/payments/checkout
- https://stripe.com/billing/pricing
- https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits
