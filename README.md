# Aquarium World

A promotional website for a fictional indoor aquarium, built with the technologies specified in the assessment brief: HTML, CSS, JavaScript, Node.js, Express, SQLite3 and EJS.

## Main features

- Four database-driven aquarium zones with database-driven exhibits/experiences
- Opening times displayed prominently across the site
- FAQ and contact pages
- Contact form with client-side JavaScript validation, server-side validation, parameterised SQLite insertion and AJAX submission with a normal POST fallback
- Original Coral Reef fact-reveal JavaScript activity
- AJAX exhibit search backed by SQLite
- Database-driven special events feature
- Event filtering by year and category using AJAX
- Individual event detail pages showing whether an event is upcoming or has already occurred
- Styled 404 and error pages
- Responsive layout, skip link, visible keyboard focus, labelled form controls, live regions and meaningful image alternative text

## Run the project

The submitted database is already included.

```text
npm install
node index.mjs
```

Then visit:

```text
http://localhost:5000
```

The optional database setup script can be used to create/seed a fresh database if needed:

```text
npm run setup-db
```

## Project structure

- `index.mjs` - Express application entry point and central error handler
- `routes/pages.mjs` - website routes plus AJAX API routes
- `database/site.db` - submitted SQLite database
- `database/db.mjs` - SQLite connection and Promise helpers
- `database/setup.mjs` - schema/seed script
- `middleware/` - custom logging and contact validation middleware
- `views/` - EJS pages and partials
- `public/css/` - site styling and responsive rules
- `public/js/` - client-side JavaScript for search, events, contact form and activity
- `public/images/` - hand-authored SVG artwork used by the zone pages

## AJAX/database features

The exhibit search calls `/api/search`, which performs a parameterised database query and returns JSON. The browser then updates the result list without reloading the page.

The events page calls `/api/events` when the year or category changes. The server queries the `events` table and returns JSON; the browser replaces the event list without a page reload. Available event years are also derived from the database.

The contact form is progressively enhanced. With JavaScript enabled it sends the validated form to `/api/contact` using `fetch()`. If JavaScript is unavailable, the standard `/contact` POST route continues to work.

## Notes

The site is promotional only and does not include ticket sales, ticket prices or booking functionality.
