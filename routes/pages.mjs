// routes/pages.mjs

import { Router } from "express";
import { all, get, run } from "../database/db.mjs";
import { validateContact } from "../middleware/validateContact.mjs";

const router = Router();

router.get("/", async (req, res) => {
  const zones = await all("SELECT * FROM zones");
  res.render("home", { pageTitle: "Aquarium World", zones });
});

router.get("/faq", (req, res) => {
  res.render("faq", { pageTitle: "FAQ" });
});

// The original interactive activity, tied to the Coral Reef zone.
// A dedicated route and view, exactly like any other page on the site.
router.get("/activity/coral-reef-facts", (req, res) => {
  res.render("activity", { pageTitle: "Coral Reef Fact Reveal" });
});

router.get("/zone/:slug", async (req, res) => {
  const zone = await get("SELECT * FROM zones WHERE slug = ?", [req.params.slug]);

  if (!zone) {
    return res.status(404).render("404", { pageTitle: "Not Found", path: req.originalUrl });
  }

  const exhibits = await all("SELECT * FROM exhibits WHERE zone_id = ?", [zone.id]);
  res.render("zone", { pageTitle: zone.name, zone, exhibits });
});

router.get("/contact", (req, res) => {
  res.render("contact", { pageTitle: "Contact Us", errors: null, submitted: false });
});

// Notice the extra argument: validateContact runs FIRST. Only if it
// calls next() does this second function ever run at all. This is
// middleware chaining on a single route, rather than app-wide.
router.post("/contact", validateContact, async (req, res, next) => {
  const { name, email, message } = req.body;

  try {
    await run(
      "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)",
      [name.trim(), email.trim(), message.trim()]
    );
    res.render("contact", { pageTitle: "Contact Us", errors: null, submitted: true });
  } catch (err) {
    // Passing an error to next() skips every remaining normal
    // middleware and jumps straight to the error-handling middleware
    // defined in index.mjs.
    next(err);
  }
});

// Catch-all: anything that didn't match a route above (a typo'd URL,
// a path that was never defined at all) falls through to here rather
// than Express's plain-text default 404. This must stay the LAST
// thing registered on the router - Express tries routes top to
// bottom, and this one matches literally everything.
router.use((req, res) => {
  res.status(404).render("404", { pageTitle: "Not Found", path: req.originalUrl });
});

export default router;
