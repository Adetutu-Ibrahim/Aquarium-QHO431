// public/js/activity.js
//
// The interactive fact-reveal activity's logic. No framework, no
// libraries - plain DOM manipulation.

const tiles = document.querySelectorAll(".fact-tile");
const progressText = document.getElementById("progress");
const completionMessage = document.getElementById("completion-message");
const totalFacts = tiles.length;
let revealedCount = 0;

// A defensive check before doing anything - if this page somehow
// doesn't have any tiles (or this script accidentally loads on a
// different page), fail silently rather than throwing an error.
if (totalFacts > 0) {
  tiles.forEach(tile => {
    tile.addEventListener("click", handleTileClick);
  });
}

function handleTileClick(event) {
  const tile = event.currentTarget;

  // Guard against double-counting if a tile is somehow clicked again
  // after being revealed (shouldn't be possible once hidden, but
  // defensive checks like this are exactly what prevents console
  // errors from edge cases you didn't originally plan for).
  if (tile.classList.contains("revealed")) {
    return;
  }

  tile.classList.add("revealed");
  revealedCount += 1;
  updateProgress();
}

function updateProgress() {
  progressText.textContent = `${revealedCount} of ${totalFacts} facts revealed`;

  if (revealedCount === totalFacts) {
    completionMessage.hidden = false;
  }
}
