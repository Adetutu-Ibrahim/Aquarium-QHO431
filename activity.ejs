// public/js/activity.js
// Plain client-side JavaScript for the Coral Reef fact-reveal activity.

const tiles = document.querySelectorAll(".fact-tile");
const progressText = document.getElementById("progress");
const completionMessage = document.getElementById("completion-message");
const totalFacts = tiles.length;
let revealedCount = 0;

if (totalFacts > 0) {
  tiles.forEach(tile => {
    tile.addEventListener("click", handleTileClick);
  });
}

function handleTileClick(event) {
  const tile = event.currentTarget;

  if (tile.classList.contains("revealed")) {
    return;
  }

  tile.classList.add("revealed");
  tile.setAttribute("aria-expanded", "true");

  const factText = document.getElementById(`fact-${tile.dataset.factId}`);
  if (factText) {
    factText.classList.add("revealed");
  }

  revealedCount += 1;
  updateProgress();
}

function updateProgress() {
  if (progressText) {
    progressText.textContent = `${revealedCount} of ${totalFacts} facts revealed`;
  }

  if (completionMessage && revealedCount === totalFacts) {
    completionMessage.hidden = false;
  }
}
