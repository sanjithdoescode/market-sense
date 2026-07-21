## 2024-05-18 - Unauthenticated Debug Route Exposed in Production
**Vulnerability:** The `/api/debug/demand` route was missing authentication and was accessible in production, allowing unauthorized users to trigger expensive external API calls (DoS and API quota exhaustion).
**Learning:** Even internal diagnostic or debug endpoints must be strictly protected, especially if they execute expensive backend logic. Furthermore, "debug" or "QA" routes should programmatically enforce environment checks rather than relying purely on comments or documentation.
**Prevention:** Always add authentication middleware (`requireAuth`) to debug endpoints, and explicitly block them in production using a middleware check (e.g. `process.env.NODE_ENV === 'production'`).
## 2024-05-18 - XSS in AI Chat Response
**Vulnerability:** XSS vulnerability in client/src/pages/Chat.jsx through `dangerouslySetInnerHTML` rendering of AI chat response.
**Learning:** Client-side markdown rendering should always be sanitized with DOMPurify or a similar library, as AI-generated output is untrusted.
**Prevention:** Avoid `dangerouslySetInnerHTML` where possible. If necessary, wrap untrusted input in `DOMPurify.sanitize(...)`.
