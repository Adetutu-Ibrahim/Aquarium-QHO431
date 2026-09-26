// database/setup.mjs
//
// Run this once with: node database/setup.mjs
// Creates zones, exhibits (one-to-many), and messages, then seeds four
// zones with two exhibits each.

import { db, run } from "./db.mjs";

async function addZone(name, slug, habitatType, description, exhibits) {
  const result = await run(
    "INSERT INTO zones (name, slug, habitat_type, description) VALUES (?, ?, ?, ?)",
    [name, slug, habitatType, description]
  );
  for (const exhibit of exhibits) {
    await run(
      "INSERT INTO exhibits (zone_id, name, description) VALUES (?, ?, ?)",
      [result.lastID, exhibit.name, exhibit.description]
    );
  }
}

async function setup() {
  await run(`CREATE TABLE IF NOT EXISTS zones (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    habitat_type TEXT NOT NULL DEFAULT 'Saltwater',
    description TEXT NOT NULL
  )`);

  await run(`CREATE TABLE IF NOT EXISTS exhibits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    zone_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    FOREIGN KEY (zone_id) REFERENCES zones(id)
  )`);

  await run(`CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    submitted_at TEXT DEFAULT CURRENT_TIMESTAMP
  )`);

  // Safe to re-run: bail out before seeding again if this database
  // already has zones in it, rather than crashing on the UNIQUE slug
  // constraint the second time setup is run.
  const existing = await new Promise((resolve, reject) => {
    db.get("SELECT COUNT(*) AS count FROM zones", (err, row) => {
      if (err) reject(err); else resolve(row.count);
    });
  });

  if (existing > 0) {
    console.log("Database already has data - skipping seed.");
    process.exit(0);
  }

  await addZone(
    "Coral Reef",
    "coral-reef",
    "Saltwater",
    "A shallow, sunlit reef tank home to brightly coloured reef fish and living coral.",
    [
      { name: "Clownfish Colony", description: "A family group of clownfish sheltering among anemone tentacles." },
      { name: "Staghorn Coral", description: "Fast-growing branching coral that gives the reef its structure." },
    ]
  );

  await addZone(
    "Deep Ocean",
    "deep-ocean",
    "Saltwater",
    "A dark, cold-water tank recreating conditions found far below the surface.",
    [
      { name: "Spotted Wobbegong", description: "A carpet shark that rests camouflaged on the ocean floor." },
      { name: "Giant Pacific Octopus", description: "A highly intelligent octopus known for solving puzzle feeders." },
    ]
  );

  await addZone(
    "Rainforest River",
    "rainforest-river",
    "Freshwater",
    "A warm, humid freshwater zone modelled on a South American river system.",
    [
      { name: "Red-Bellied Piranha", description: "A shoaling freshwater fish found in slow-moving river stretches." },
      { name: "Arapaima", description: "One of the largest freshwater fish in the world, an air-breather." },
    ]
  );

  await addZone(
    "Rockpool Discovery",
    "rockpool-discovery",
    "Touch Pool",
    "A hands-on touch pool showing the wildlife found along the local shoreline.",
    [
      { name: "Common Starfish", description: "A five-armed starfish safe to gently touch under staff supervision." },
      { name: "Hermit Crab", description: "A small crab that reuses empty shells for protection as it grows." },
    ]
  );

  console.log("Database created and seeded.");
  process.exit(0);
}

setup().catch(err => {
  console.error("Error setting up database:", err);
  process.exit(1);
});
