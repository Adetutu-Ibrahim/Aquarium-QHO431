// middleware/validateContact.mjs
//
// A route-specific middleware, rather than an app-wide one. This only
// runs for the one route it's attached to (see routes/pages.mjs),
// instead of every single request like requestLogger does.
//
// Its job is entirely to check the incoming data and decide whether
// to let the request continue (next()) or stop it early with an
// error response - it does NOT save anything to the database itself.

export function validateContact(req, res, next) {
  const { name, email, message } = req.body;
  const errors = [];

  if (!name || name.trim().length === 0) {
    errors.push("Please enter your name.");
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("Please enter a valid email address.");
  }

  if (!message || message.trim().length === 0) {
    errors.push("Please enter a message.");
  }

  if (errors.length > 0) {
    // Stop here - render the form again with errors, and do NOT call
    // next(). The route handler after this middleware never runs.
    return res.status(400).render("contact", { pageTitle: "Contact Us", errors, submitted: false });
  }

  // Everything is valid - pass control on to the actual route handler.
  next();
}
