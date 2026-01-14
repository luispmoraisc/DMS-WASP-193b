import {
  Counter,
  Histogram,
  collectDefaultMetrics,
  Registry,
} from "prom-client";

export const register = new Registry();
collectDefaultMetrics({ register });

export const httpRequestDuration = new Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "status"],
  registers: [register],
});

export const httpRequestsTotal = new Counter({
  name: "http_requests_total",
  help: "Total count of HTTP requests",
  labelNames: ["method", "route", "status"],
  registers: [register],
});

export const httpRequestSize = new Histogram({
  name: "http_request_size_bytes",
  help: "Size of HTTP requests in bytes",
  labelNames: ["method", "route"],
  registers: [register],
});

export const httpResponseSize = new Histogram({
  name: "http_response_size_bytes",
  help: "Size of HTTP responses in bytes",
  labelNames: ["method", "route", "status"],
  registers: [register],
});
