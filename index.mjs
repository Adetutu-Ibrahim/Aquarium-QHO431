// index.mjs
//
// Middleware order matters - each app.use() call adds another link in
// a chain every request passes through, top to bottom.

import express from "express";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import pagesRouter from "./routes/pages.mjs";
import { requestLogger } from "./middleware/logger.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 5000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// --- Middleware, in the order it runs for every request ---

// 1. Third-party middleware: morgan logs a compact one-line summary
//    of every request to the terminal. "dev" is one of morgan's
//    built-in output formats.
app.use(morgan("dev"));

// 2. Custom middleware: our own hand-written logger, for comparison
//    against morgan - see middleware/logger.mjs.
app.use(requestLogger);

// 3. Built-in middleware: serves files from /public (CSS, client JS,
//    images) directly, without needing a route for each one.
app.use(express.static(path.join(__dirname, "public")));

// 4. Built-in middleware: without this line, req.body would be
//    undefined on every POST request - this is what makes form data
//    readable at all.
app.use(express.urlencoded({ extended: true }));

// --- Routes ---
app.use("/", pagesRouter);

// --- Error-handling middleware ---
// This has FOUR arguments (err, req, res, next) instead of three -
// that's how Express recognises it as an error handler specifically.
// It must be defined AFTER all normal routes and middleware.
app.use((err, req, res, next) => {
  console.error("Something went wrong:", err.message);
  res.status(500).render("error", { pageTitle: "Something Went Wrong" });
});

app.listen(PORT, () => {
  console.log(`Aquarium World running at http://localhost:${PORT}`);
});
