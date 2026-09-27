// database/setup.mjs
//
// Run this once with: node database/setup.mjs (or npm run setup-db)
// Creates all tables and seeds them if empty. Safe to re-run: zones
// and events are only seeded the first time, so running this again
// against an existing database won't create duplicates.

import { get, run } from "./db.mjs";

async function addZone(name, slug, description, exhibits) {
  const result = await run(
    "INSERT INTO zones (name, slug, description) VALUES (?, ?, ?)",
    [name, slug, description]
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
    message TEXT NOT NULL
  )`);

  // New this week: the events table backing the events feature.
  await run(`CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    event_date TEXT NOT NULL,
    description TEXT NOT NULL
  )`);

  // Indexes support the most common joins and event filter queries.
  await run("CREATE INDEX IF NOT EXISTS idx_exhibits_zone_id ON exhibits(zone_id)");
  await run("CREATE INDEX IF NOT EXISTS idx_events_date_category ON events(event_date, category)");

  const existingZones = await get("SELECT COUNT(*) AS count FROM zones");

  if (existingZones.count > 0) {
    console.log("Zones already seeded - skipping zone seed.");
  } else {
    await addZone(
      "Coral Reef",
      "coral-reef",
      "A shallow, sunlit reef tank home to brightly coloured reef fish and living coral.",
      [
        { name: "Clownfish Colony", description: "A family group of clownfish sheltering among anemone tentacles." },
        { name: "Staghorn Coral", description: "Fast-growing branching coral that gives the reef its structure." },
      ]
    );

    await addZone(
      "Deep Ocean",
      "deep-ocean",
      "A dark, cold-water tank recreating conditions found far below the surface.",
      [
        { name: "Spotted Wobbegong", description: "A carpet shark that rests camouflaged on the ocean floor." },
        { name: "Giant Pacific Octopus", description: "A highly intelligent octopus known for solving puzzle feeders." },
      ]
    );

    await addZone(
      "Rainforest River",
      "rainforest-river",
      "A warm, humid freshwater zone modelled on a South American river system.",
      [
        { name: "Red-Bellied Piranha", description: "A shoaling freshwater fish found in slow-moving river stretches." },
        { name: "Arapaima", description: "One of the largest freshwater fish in the world, an air-breather." },
      ]
    );

    await addZone(
      "Rockpool Discovery",
      "rockpool-discovery",
      "A hands-on touch pool showing the wildlife found along the local shoreline.",
      [
        { name: "Common Starfish", description: "A five-armed starfish safe to gently touch under staff supervision." },
        { name: "Hermit Crab", description: "A small crab that reuses empty shells for protection as it grows." },
      ]
    );
  }

  const existingEvents = await get("SELECT COUNT(*) AS count FROM events");

  if (existingEvents.count > 0) {
    console.log("Events already seeded - skipping event seed.");
  } else {
    // Event dates are computed relative to TODAY, rather than hard-coded,
    // so this demo always shows correct past/upcoming behaviour no matter
    // when it's actually run.
    const today = new Date();
    function daysFromToday(offset) {
      const d = new Date(today);
      d.setDate(d.getDate() + offset);
      return d.toISOString().slice(0, 10); // YYYY-MM-DD
    }
    const lastYear = today.getFullYear() - 1;

    const events = [
      { title: "Shark Feeding Demo", category: "Feeding Demo", eventDate: daysFromToday(-10),
        description: "Watch our Deep Ocean team hand-feed the resident carpet sharks and explain their diet." },
      { title: "Coral Spawning Talk", category: "Conservation Talk", eventDate: daysFromToday(-30),
        description: "A behind-the-tank look at how our Coral Reef team supports coral spawning and growth." },
      { title: "Octopus Enrichment Session", category: "Behind the Scenes", eventDate: daysFromToday(30),
        description: "See how keepers use puzzle feeders to keep the Giant Pacific Octopus mentally stimulated." },
      { title: "Family Fun Day: Under the Sea", category: "Family Day", eventDate: daysFromToday(90),
        description: "Trails, crafts, and a touch-pool scavenger hunt suitable for all ages." },
      { title: "Winter Reef Talk", category: "Conservation Talk", eventDate: `${lastYear}-12-15`,
        description: "A short talk on how the Coral Reef zone is maintained through the colder months." }
    ];

    for (const event of events) {
      await run(
        "INSERT INTO events (title, category, event_date, description) VALUES (?, ?, ?, ?)",
        [event.title, event.category, event.eventDate, event.description]
      );
    }
  }

  console.log("Database ready.");
  process.exit(0);
}

setup().catch(err => {
  console.error("Error setting up database:", err);
  process.exit(1);
});
