# Security Specification — Cuentos con Valores

## 1. Data Invariants
1. **Unauthenticated Create With Strict Schema**: Any visitor may create a document in `/suggestions/{suggestionId}` ONLY if:
   - `suggestionId` matches `^[a-zA-Z0-9_\-]+$` (`<= 128` chars).
   - Payload contains strictly the 8 allowlisted keys (`name`, `email`, `valueSuggestion`, `message`, `createdAt`, `read`, `emailSent`, `provider`).
   - `createdAt == request.time` (server timestamp).
   - `read == false` on creation.
2. **Zero PII Exposure**: Only the verified administrator (`request.auth.token.email == 'jchurizar@gmail.com' && request.auth.token.email_verified == true`) may `get`, `list`, `update`, or `delete` documents in `/suggestions`.
3. **Immutable Audit Fields on Update**: When updating a suggestion, `name`, `email`, `valueSuggestion`, `message`, `createdAt`, `emailSent`, and `provider` must remain unchanged; only `read` may toggle.

## 2. Dirty Dozen Payloads (Must Fail With PERMISSION_DENIED)
1. Shadow field injection on create (`{ ..., isAdmin: true }`)
2. Oversized `message` (> 3000 chars) on create
3. Oversized `name` (> 120 chars) or empty `name` on create
4. Forged client `createdAt` timestamp (`createdAt !== request.time`) on create
5. Pre-marked `read: true` on create
6. Path ID poisoning (`/suggestions/bad$id/..` or `> 128` chars)
7. Unauthenticated `get` or `list` on `/suggestions`
8. Authenticated non-admin user (`other@gmail.com`) attempting `list` or `get`
9. Spoofed admin email with `email_verified: false` attempting `list` or `delete`
10. Admin attempting to mutate immutable `message` or `createdAt` during `update`
11. Non-admin attempting `update` or `delete` on `/suggestions/{id}`
12. Any read or write on an undefined collection (`/users/1`, `/admins/1`, etc.)
