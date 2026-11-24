# Wujhati integrations — no upfront expenditure
Status: prepared, not contracted or activated.
- Booking Demand API: https://developers.booking.com/demand/docs/getting-started/prerequisites — managed affiliate approval, agreement, affiliate ID and API token. Start with Search, Look & Redirect; final checkout remains with partner. Request permission for aggregation/deduplication and content use.
- Travelpayouts: https://www.travelpayouts.com/ — request flight search access and permitted display/redirect flow; respect restrictions on combining competing search APIs.
- Welcome Pickups: https://partner.welcomepickups.com/travel-api/ — request API access and commission-only terms.
- Airalo: https://partners.airalo.com/ — request affiliate integration with provider-collected payment, no prepaid wallet or minimum spend.
- VPN and virtual numbers: request authorized product feeds and tracked checkout deep links. Do not scrape or imply a confirmed commission.
- Other providers: request official feeds, booking confirmation and reporting access.
## Acceptance gates
No upfront fees or mandatory purchases; no food/drink or insurance promotion; explicit permission for display, caching, deduplication and attribution; provider collects funds; disclose affiliate links; verify price and availability before handoff. Do not store payment cards. Confirmation only from verified provider responses. No claim of price parity across promotions. Keep credentials in server secrets, never in public GitHub.
## Backend
The Worker is a deployable scaffold, not a live provider integration. Cloudflare account access and partner credentials are not available here. No AI model or paid API is enabled. Keep the free plan and refuse paid upgrades.