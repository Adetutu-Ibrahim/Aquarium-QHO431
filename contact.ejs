// public/js/events.js
// AJAX filtering for the database-driven events feature. The form still
// works as a normal GET request if JavaScript is unavailable.

const filterForm = document.getElementById("event-filter-form");
const yearSelect = document.getElementById("year-select");
const categorySelect = document.getElementById("category-select");
const eventsList = document.getElementById("events-list");

if (filterForm && yearSelect && categorySelect && eventsList) {
  filterForm.addEventListener("submit", event => {
    event.preventDefault();
    updateEvents();
  });

  yearSelect.addEventListener("change", updateEvents);
  categorySelect.addEventListener("change", updateEvents);
}

async function updateEvents() {
  const year = yearSelect.value;
  const category = categorySelect.value;
  eventsList.setAttribute("aria-busy", "true");

  try {
    const response = await fetch(
      `/api/events?year=${encodeURIComponent(year)}&category=${encodeURIComponent(category)}`,
      { headers: { Accept: "application/json" } }
    );

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }

    const events = await response.json();
    renderEvents(events);

    const url = new URL(window.location.href);
    url.searchParams.set("year", year);
    if (category === "all") {
      url.searchParams.delete("category");
    } else {
      url.searchParams.set("category", category);
    }
    window.history.replaceState({}, "", url);
  } catch (err) {
    console.error("Failed to update events:", err);
    eventsList.replaceChildren(createListMessage("Something went wrong loading events. Please try again."));
  } finally {
    eventsList.setAttribute("aria-busy", "false");
  }
}

function createListMessage(message) {
  const li = document.createElement("li");
  li.textContent = message;
  return li;
}

function renderEvents(events) {
  eventsList.replaceChildren();

  if (events.length === 0) {
    eventsList.appendChild(createListMessage("No events found for this year and category."));
    return;
  }

  events.forEach(event => {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = `/events/${event.id}`;

    const strong = document.createElement("strong");
    strong.textContent = event.title;

    link.appendChild(strong);
    link.append(` — ${event.event_date} (${event.category})`);

    li.appendChild(link);
    eventsList.appendChild(li);
  });
}
