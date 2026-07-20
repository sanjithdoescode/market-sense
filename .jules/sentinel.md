## 2024-05-18 - Unauthenticated Debug Route Exposed in Production
**Vulnerability:** The `/api/debug/demand` route was missing authentication and was accessible in production, allowing unauthorized users to trigger expensive external API calls (DoS and API quota exhaustion).
**Learning:** Even internal diagnostic or debug endpoints must be strictly protected, especially if they execute expensive backend logic. Furthermore, "debug" or "QA" routes should programmatically enforce environment checks rather than relying purely on comments or documentation.
**Prevention:** Always add authentication middleware (`requireAuth`) to debug endpoints, and explicitly block them in production using a middleware check (e.g. `process.env.NODE_ENV === 'production'`).
## 2025-02-18 - XSS in Markdown Parser
**Vulnerability:** The client app used `dangerouslySetInnerHTML` directly with the output of a custom markdown parser without sanitization.
**Learning:** Custom markdown parsers need to have their output sanitized before being rendered to the DOM, as user input or AI-generated output can contain malicious scripts.
**Prevention:** Always use a well-tested library like `DOMPurify` to sanitize HTML content before passing it to `dangerouslySetInnerHTML`.
