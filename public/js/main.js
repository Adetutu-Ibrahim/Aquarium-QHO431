// public/js/main.js
//
// Client-side validation. This runs BEFORE the form is submitted,
// purely for a faster, friendlier experience - it is NOT a substitute
// for the server-side validateContact middleware, which is what
// actually protects the data. A user can disable JavaScript entirely
// and bypass everything in this file; they cannot bypass the server.

const form = document.getElementById("contact-form");

if (form) {
  form.addEventListener("submit", (event) => {
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");
    let valid = true;

    clearFieldErrors();

    if (name.value.trim().length === 0) {
      showFieldError(name, "Please enter your name.");
      valid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
      showFieldError(email, "Please enter a valid email address.");
      valid = false;
    }

    if (message.value.trim().length === 0) {
      showFieldError(message, "Please enter a message.");
      valid = false;
    }

    if (!valid) {
      event.preventDefault();
    }
  });
}

function showFieldError(field, text) {
  const error = document.createElement("p");
  error.className = "field-error";
  error.textContent = text;
  field.insertAdjacentElement("afterend", error);
  field.setAttribute("aria-invalid", "true");
}

function clearFieldErrors() {
  document.querySelectorAll(".field-error").forEach(el => el.remove());
  document.querySelectorAll("[aria-invalid]").forEach(el => el.removeAttribute("aria-invalid"));
}
