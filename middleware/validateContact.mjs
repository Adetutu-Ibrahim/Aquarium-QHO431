// middleware/validateContact.mjs
// Shared validation for both the normal HTML form submission and the
// AJAX contact endpoint. Server-side validation remains essential even
// though the browser also performs client-side checks.

function asText(value) {
  return typeof value === "string" ? value.trim() : "";
}

export function getContactErrors(body = {}) {
  const name = asText(body.name);
  const email = asText(body.email);
  const message = asText(body.message);
  const errors = [];

  if (name.length === 0) {
    errors.push("Please enter your name.");
  } else if (name.length > 100) {
    errors.push("Please keep your name to 100 characters or fewer.");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("Please enter a valid email address.");
  } else if (email.length > 254) {
    errors.push("Please keep your email address to 254 characters or fewer.");
  }

  if (message.length === 0) {
    errors.push("Please enter a message.");
  } else if (message.length > 2000) {
    errors.push("Please keep your message to 2000 characters or fewer.");
  }

  return errors;
}

export function validateContact(req, res, next) {
  const errors = getContactErrors(req.body);

  if (errors.length > 0) {
    return res.status(400).render("contact", {
      pageTitle: "Contact Us",
      errors,
      submitted: false,
      values: req.body
    });
  }

  next();
}

export function validateContactApi(req, res, next) {
  const errors = getContactErrors(req.body);

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
}
