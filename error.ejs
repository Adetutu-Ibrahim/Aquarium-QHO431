// public/js/main.js
// Client-side contact form validation plus progressive AJAX submission.
// Server-side validation still runs for every submission.

const contactForm = document.getElementById("contact-form");

if (contactForm) {
  const statusRegion = document.getElementById("contact-status");
  const submitButton = contactForm.querySelector('button[type="submit"]');

  contactForm.addEventListener("submit", handleContactSubmit);

  ["name", "email", "message"].forEach(id => {
    const field = document.getElementById(id);
    if (field) {
      field.addEventListener("input", () => clearFieldError(field));
    }
  });

  async function handleContactSubmit(event) {
    const errors = validateContactForm();

    if (errors.length > 0) {
      event.preventDefault();
      showValidationSummary(errors);
      errors[0].field.focus();
      return;
    }

    // Keep the ordinary /contact POST as a no-JavaScript fallback, but
    // enhance capable browsers by sending the same data with fetch().
    const ajaxAction = contactForm.dataset.ajaxAction;
    if (!ajaxAction || typeof fetch !== "function") {
      return;
    }

    event.preventDefault();
    clearStatus();
    setSubmitting(true);

    try {
      const body = new URLSearchParams(new FormData(contactForm));
      const response = await fetch(ajaxAction, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          Accept: "application/json"
        },
        body
      });

      const payload = await response.json();

      if (!response.ok) {
        const messages = Array.isArray(payload.errors)
          ? payload.errors
          : ["Please check your details and try again."];
        showServerErrors(messages);
        return;
      }

      contactForm.reset();
      showSuccess(payload.message || "Thank you - your message has been sent!");
    } catch (err) {
      console.error("Contact form submission failed:", err);
      showServerErrors(["We could not send your message just now. Please try again."]);
    } finally {
      setSubmitting(false);
    }
  }

  function validateContactForm() {
    const errors = [];
    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");
    const messageField = document.getElementById("message");

    [nameField, emailField, messageField].forEach(field => {
      if (field) clearFieldError(field);
    });

    if (nameField && nameField.value.trim().length === 0) {
      const message = "Please enter your name.";
      showFieldError(nameField, message);
      errors.push({ field: nameField, message });
    } else if (nameField && nameField.value.trim().length > 100) {
      const message = "Please keep your name to 100 characters or fewer.";
      showFieldError(nameField, message);
      errors.push({ field: nameField, message });
    }

    if (emailField && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value.trim())) {
      const message = "Please enter a valid email address.";
      showFieldError(emailField, message);
      errors.push({ field: emailField, message });
    } else if (emailField && emailField.value.trim().length > 254) {
      const message = "Please keep your email address to 254 characters or fewer.";
      showFieldError(emailField, message);
      errors.push({ field: emailField, message });
    }

    if (messageField && messageField.value.trim().length === 0) {
      const message = "Please enter a message.";
      showFieldError(messageField, message);
      errors.push({ field: messageField, message });
    } else if (messageField && messageField.value.trim().length > 2000) {
      const message = "Please keep your message to 2000 characters or fewer.";
      showFieldError(messageField, message);
      errors.push({ field: messageField, message });
    }

    return errors;
  }

  function showFieldError(field, message) {
    field.setAttribute("aria-invalid", "true");
    const errorId = `${field.id}-error`;
    let errorElement = document.getElementById(errorId);

    if (!errorElement) {
      errorElement = document.createElement("p");
      errorElement.id = errorId;
      errorElement.className = "field-error";
      field.insertAdjacentElement("afterend", errorElement);
    }

    errorElement.textContent = message;

    const describedBy = new Set((field.getAttribute("aria-describedby") || "").split(/\s+/).filter(Boolean));
    describedBy.add(errorId);
    field.setAttribute("aria-describedby", [...describedBy].join(" "));
  }

  function clearFieldError(field) {
    field.removeAttribute("aria-invalid");
    const errorId = `${field.id}-error`;
    const errorElement = document.getElementById(errorId);
    if (errorElement) errorElement.remove();

    const describedBy = (field.getAttribute("aria-describedby") || "")
      .split(/\s+/)
      .filter(id => id && id !== errorId);

    if (describedBy.length > 0) {
      field.setAttribute("aria-describedby", describedBy.join(" "));
    } else {
      field.removeAttribute("aria-describedby");
    }
  }

  function showValidationSummary(errors) {
    showServerErrors(errors.map(error => error.message));
  }

  function showServerErrors(messages) {
    clearStatus();
    const wrapper = document.createElement("div");
    wrapper.className = "error-summary";
    wrapper.setAttribute("role", "alert");

    const intro = document.createElement("p");
    intro.textContent = "Please fix the following:";
    const list = document.createElement("ul");

    messages.forEach(message => {
      const item = document.createElement("li");
      item.textContent = message;
      list.appendChild(item);
    });

    wrapper.append(intro, list);
    statusRegion.appendChild(wrapper);
  }

  function showSuccess(message) {
    clearStatus();
    const success = document.createElement("p");
    success.className = "success-message";
    success.setAttribute("role", "status");
    success.textContent = message;
    statusRegion.appendChild(success);
  }

  function clearStatus() {
    if (statusRegion) statusRegion.replaceChildren();
  }

  function setSubmitting(isSubmitting) {
    if (!submitButton) return;
    submitButton.disabled = isSubmitting;
    submitButton.textContent = isSubmitting ? "Sending..." : "Send Message";
  }
}
