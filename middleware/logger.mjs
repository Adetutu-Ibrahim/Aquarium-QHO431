// middleware/logger.mjs
//
// A custom, app-wide middleware. Every middleware function receives
// (req, res, next) - its job is to do something, then call next() to
// pass control along to whatever comes after it. If it never calls
// next(), the request stops here forever and the browser hangs.

export function requestLogger(req, res, next) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next(); // without this line, every request would hang indefinitely
}
