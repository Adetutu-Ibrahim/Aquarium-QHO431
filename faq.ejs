// routes/pages.mjs

import { Router } from "express";
import { all, get, run } from "../database/db.mjs";
import { validateContact, validateContactApi } from "../middleware/validateContact.mjs";

const router = Router();

// Express 4 does not automatically forward rejected async route
// promises to the error handler. This wrapper ensures every database
// error reaches the central error middleware in index.mjs.
const asyncRoute = handler => (req, res, next) => {
  Promise.resolve(handler(req, res, next)).catch(next);
};

router.get("/", asyncRoute(async (req, res) => {
  const zones = await all("SELECT * FROM zones ORDER BY id");
  res.render("home", { pageTitle: "Aquarium World", zones });
}));

router.get("/faq", (req, res) => {
  res.render("faq", { pageTitle: "FAQ" });
});

router.get("/activity/coral-reef-facts", (req, res) => {
  res.render("activity", { pageTitle: "Coral Reef Fact Reveal" });
});

// AJAX search API. Parameterised SQL prevents the search text being
// interpreted as SQL, while the client updates results without a reload.
router.get("/api/search", asyncRoute(async (req, res) => {
  const query = (req.query.q || "").trim();

  if (query.length === 0) {
    return res.json([]);
  }

  const results = await all(
    `SELECT exhibits.id, exhibits.name, exhibits.description,
            zones.slug AS zone_slug, zones.name AS zone_name
     FROM exhibits
     JOIN zones ON exhibits.zone_id = zones.id
     WHERE exhibits.name LIKE ? OR exhibits.description LIKE ?
     ORDER BY exhibits.name`,
    [`%${query}%`, `%${query}%`]
  );

  res.json(results);
}));

router.get("/zone/:slug", asyncRoute(async (req, res) => {
  const zone = await get("SELECT * FROM zones WHERE slug = ?", [req.params.slug]);

  if (!zone) {
    return res.status(404).render("404", {
      pageTitle: "Page Not Found",
      path: req.originalUrl
    });
  }

  const exhibits = await all(
    "SELECT * FROM exhibits WHERE zone_id = ? ORDER BY id",
    [zone.id]
  );

  res.render("zone", { pageTitle: zone.name, zone, exhibits });
}));

router.get("/contact", (req, res) => {
  res.render("contact", {
    pageTitle: "Contact Us",
    errors: null,
    submitted: false,
    values: {}
  });
});

// --- Events feature ---

async function findEvents({ year, category }) {
  let sql = "SELECT * FROM events WHERE strftime('%Y', event_date) = ?";
  const params = [String(year)];

  if (category && category !== "all") {
    sql += " AND category = ?";
    params.push(category);
  }

  sql += " ORDER BY event_date ASC";
  return all(sql, params);
}

async function findEventYears() {
  const rows = await all(
    `SELECT DISTINCT strftime('%Y', event_date) AS year
     FROM events
     WHERE event_date IS NOT NULL
     ORDER BY year DESC`
  );

  return rows.map(row => Number(row.year)).filter(Number.isInteger);
}

function normaliseYear(rawYear, fallbackYear) {
  const text = String(rawYear ?? "");
  return /^\d{4}$/.test(text) ? Number(text) : fallbackYear;
}

router.get("/events", asyncRoute(async (req, res) => {
  const currentYear = new Date().getFullYear();
  const selectedYear = normaliseYear(req.query.year, currentYear);
  const selectedCategory = req.query.category || "all";

  const [events, categoryRows, databaseYears] = await Promise.all([
    findEvents({ year: selectedYear, category: selectedCategory }),
    all("SELECT DISTINCT category FROM events ORDER BY category"),
    findEventYears()
  ]);

  // Ensure the current/selected years are always selectable even if a
  // particular year currently has no events in the seed data.
  const eventYears = [...new Set([...databaseYears, currentYear, selectedYear])]
    .sort((a, b) => b - a);

  res.render("events", {
    pageTitle: "Aquarium World Events",
    events,
    selectedYear,
    selectedCategory,
    categories: categoryRows.map(row => row.category),
    eventYears,
    currentYear
  });
}));

router.get("/api/events", asyncRoute(async (req, res) => {
  const currentYear = new Date().getFullYear();
  const year = normaliseYear(req.query.year, currentYear);
  const category = req.query.category || "all";

  const events = await findEvents({ year, category });
  res.json(events);
}));

router.get("/events/:id", asyncRoute(async (req, res) => {
  const event = await get("SELECT * FROM events WHERE id = ?", [req.params.id]);

  if (!event) {
    return res.status(404).render("404", {
      pageTitle: "Page Not Found",
      path: req.originalUrl
    });
  }

  const eventDate = new Date(`${event.event_date}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const hasOccurred = eventDate < today;

  res.render("event", { pageTitle: event.title, event, hasOccurred });
}));

async function saveContactMessage(req) {
  const { name, email, message } = req.body;
  await run(
    "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)",
    [name.trim(), email.trim(), message.trim()]
  );
}

// Progressive enhancement: this normal POST still works if JavaScript
// is disabled, while /api/contact below supports the AJAX version.
router.post("/contact", validateContact, asyncRoute(async (req, res) => {
  await saveContactMessage(req);
  res.render("contact", {
    pageTitle: "Contact Us",
    errors: null,
    submitted: true,
    values: {}
  });
}));

router.post("/api/contact", validateContactApi, asyncRoute(async (req, res) => {
  await saveContactMessage(req);
  res.status(201).json({
    message: "Thank you - your message has been sent!"
  });
}));

// Final catch-all so unknown URLs receive the site's styled 404 page
// instead of Express's plain default response.
router.use((req, res) => {
  res.status(404).render("404", {
    pageTitle: "Page Not Found",
    path: req.originalUrl
  });
});

export default router;
