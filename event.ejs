// public/js/search.js
// AJAX exhibit search. Results are constructed with DOM methods and
// textContent so database text is never interpreted as executable HTML.

const searchInput = document.getElementById("exhibit-search");
const resultsList = document.getElementById("search-results");

if (searchInput && resultsList) {
  let debounceTimer;

  searchInput.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    const query = searchInput.value.trim();

    if (query.length === 0) {
      resultsList.replaceChildren();
      resultsList.setAttribute("aria-busy", "false");
      return;
    }

    debounceTimer = setTimeout(() => runSearch(query), 250);
  });
}

async function runSearch(query) {
  resultsList.setAttribute("aria-busy", "true");

  try {
    const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
      headers: { Accept: "application/json" }
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }

    const results = await response.json();
    renderResults(results);
  } catch (err) {
    console.error("Search failed:", err);
    resultsList.replaceChildren(createSearchMessage("Something went wrong with the search. Please try again."));
  } finally {
    resultsList.setAttribute("aria-busy", "false");
  }
}

function createSearchMessage(message) {
  const li = document.createElement("li");
  li.textContent = message;
  return li;
}

function renderResults(results) {
  resultsList.replaceChildren();

  if (results.length === 0) {
    resultsList.appendChild(createSearchMessage("No exhibits found."));
    return;
  }

  results.forEach(exhibit => {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = `/zone/${exhibit.zone_slug}`;

    const strong = document.createElement("strong");
    strong.textContent = exhibit.name;

    link.appendChild(strong);
    link.append(` (${exhibit.zone_name})`);

    const description = document.createElement("p");
    description.textContent = exhibit.description;

    li.appendChild(link);
    li.appendChild(description);
    resultsList.appendChild(li);
  });
}
