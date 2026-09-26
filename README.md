# Aquarium World

An interactive zone explorer for a fictional aquarium, built with
Express, EJS, and SQLite — including an original fact-reveal activity
tied to the Coral Reef zone.

## Features

| Feature | Where to look |
|---|---|
| Router-based routes, separate from the app entrypoint | `routes/pages.mjs` |
| App-wide custom middleware (request logging) | `middleware/logger.mjs` |
| Route-specific middleware (contact form validation) | `middleware/validateContact.mjs`, chained onto `POST /contact` in `routes/pages.mjs` |
| Centralized error-handling middleware (4-argument signature) | `index.mjs` — renders `views/error.ejs` |
| A styled 404 page for unknown zones | `views/404.ejs` |
| One-to-many data relationships | `zones` → `exhibits`, joined by `zone_id` |
| An original interactive activity | `routes/pages.mjs` — `/activity/coral-reef-facts` |
| DOM selection, event listeners, and plain-JS state | `public/js/activity.js` |
| A defensive guard against a real edge case (double-clicking a revealed tile) | `public/js/activity.js` |
| Content present in the DOM from the start (works without JS, and for assistive tech) | `views/activity.ejs` — fact text sits behind each tile, not injected afterward |
| `aria-live` announcing form results and activity progress automatically | `views/contact.ejs`, `views/activity.ejs` |
| A skip link, visible focus states, and meaningful image alt text | `views/partials/header.ejs`, `public/css/style.css`, `views/home.ejs` |
| Client-side validation as a UX nicety, never a substitute for server-side validation | `public/js/main.js` vs. `middleware/validateContact.mjs` |
| Contrast-checked badge colours (a naive `--ocean-mid` badge fails WCAG AA at 3.96:1) | `public/css/style.css` — see the comment above `.badge-saltwater` |

## Zones

- **Coral Reef** (Saltwater) — clownfish and staghorn coral
- **Deep Ocean** (Saltwater) — a wobbegong shark and a giant Pacific octopus
- **Rainforest River** (Freshwater) — red-bellied piranha and arapaima
- **Rockpool Discovery** (Touch Pool) — starfish and hermit crabs, hands-on

## Running it

```
npm install
npm run setup-db
node index.mjs
```

Visit http://localhost:5000. The database is created fresh on first
run of `setup-db`; running it again is safe and just skips reseeding.

Try the activity at http://localhost:5000/activity/coral-reef-facts —
click through all six tiles.

## A note on the artwork

The zone images are simple hand-authored SVG illustrations in the
site's own colour palette, not photographs — there was no image
source available to pull real aquarium photography from. Swap the
files in `public/images/` for real photos any time; the `<img>` tags
and their alt text in `views/home.ejs` and `views/zone.ejs` don't need
to change, since they reference the files by zone slug regardless of
what's actually inside them.
