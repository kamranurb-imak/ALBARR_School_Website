---
paths:
  - "js/form.js"
  - "admissions.html"
  - "contact.html"
---

# Forms

`js/form.js` validates two forms:

| Form ID | Page |
|---|---|
| `#admForm` | `admissions.html` |
| `#contactForm` | `contact.html` |

## Validation pattern

- On failed submit, each invalid field gets the `.error` class.
- The sibling error span (class `form-error`) gets class `show` to become visible.
- Error span IDs **must** follow the pattern `err-<fieldId>` — e.g. field `id="email"` → error span `id="err-email"`.
- On `input` event, `.error` and `.show` are cleared immediately.
- Submit button shows a loading state ("Sending…"), then a success state ("✓ … Submitted!") before resetting after 4 seconds.
