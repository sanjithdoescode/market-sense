## 2024-05-18 - Unauthenticated Debug Route Exposed in Production
**Vulnerability:** The `/api/debug/demand` route was missing authentication and was accessible in production, allowing unauthorized users to trigger expensive external API calls (DoS and API quota exhaustion).
**Learning:** Even internal diagnostic or debug endpoints must be strictly protected, especially if they execute expensive backend logic. Furthermore, "debug" or "QA" routes should programmatically enforce environment checks rather than relying purely on comments or documentation.
**Prevention:** Always add authentication middleware (`requireAuth`) to debug endpoints, and explicitly block them in production using a middleware check (e.g. `process.env.NODE_ENV === 'production'`).
## 2024-07-24 - Cross-Site Scripting (XSS) in Markdown Rendering
**Vulnerability:** The application was using `dangerouslySetInnerHTML` to render parsed markdown directly into the DOM without sanitization, leaving it vulnerable to XSS attacks if malicious content was included in the markdown.
**Learning:** React's `dangerouslySetInnerHTML` bypasses React's built-in XSS protections. When rendering user-generated or external content (like parsed markdown) as HTML, it must be explicitly sanitized.
**Prevention:** Always use a robust HTML sanitization library like DOMPurify before passing strings to `dangerouslySetInnerHTML`.
