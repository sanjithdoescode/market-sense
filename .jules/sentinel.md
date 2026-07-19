## 2024-05-18 - Unauthenticated Debug Route Exposed in Production
**Vulnerability:** The `/api/debug/demand` route was missing authentication and was accessible in production, allowing unauthorized users to trigger expensive external API calls (DoS and API quota exhaustion).
**Learning:** Even internal diagnostic or debug endpoints must be strictly protected, especially if they execute expensive backend logic. Furthermore, "debug" or "QA" routes should programmatically enforce environment checks rather than relying purely on comments or documentation.
**Prevention:** Always add authentication middleware (`requireAuth`) to debug endpoints, and explicitly block them in production using a middleware check (e.g. `process.env.NODE_ENV === 'production'`).
