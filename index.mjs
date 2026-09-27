// index.mjs
// Aquarium World - application entry point.

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import pagesRouter from "./routes/pages.mjs";
import { requestLogger } from "./middleware/logger.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 5000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Custom app-wide request logging middleware.
app.use(requestLogger);

// Serve CSS, client-side JavaScript and images from /public.
app.use(express.static(path.join(__dirname, "public")));

// Parse standard HTML form submissions and AJAX requests sent as
// application/x-www-form-urlencoded data.
app.use(express.urlencoded({ extended: true }));

// Application routes.
app.use("/", pagesRouter);

// Central error handler. Async database routes pass failures here via
// the asyncRoute wrapper in routes/pages.mjs.
app.use((err, req, res, next) => {
  console.error("Something went wrong:", err.message);
  res.status(500).render("error", { pageTitle: "Something Went Wrong" });
});

app.listen(PORT, () => {
  console.log(`Aquarium World running at http://localhost:${PORT}`);
});
