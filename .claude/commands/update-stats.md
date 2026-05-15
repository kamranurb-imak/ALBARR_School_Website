# Update School Statistics

Update the animated counter stats displayed on the homepage stats bar and any other stat displays across the site.

## Instructions

The user will provide new numbers for one or more stats. Update all occurrences across the site.

### Stats Bar — `index.html`

The stats bar is the navy `.stats-bar` section on the homepage. Each stat follows this structure:
```html
<div class="stat-item">
  <div class="stat-num" data-target="[NUMBER]" data-suffix="[SUFFIX]">0[SUFFIX]</div>
  <div class="stat-lbl">[Label]</div>
</div>
```

**Current stats:**
| Label | data-target | data-suffix | Display |
|---|---|---|---|
| Students Enrolled | `850` | `+` | 850+ |
| Qualified Teachers | `45` | `+` | 45+ |
| Years of Excellence | `5` | `+` | 5+ |
| Board Pass Rate | `94` | `%` | 94% |

To update a number:
1. Change `data-target="[NUMBER]"` to the new value
2. Change the initial text content `0[SUFFIX]` to match (e.g., `0+` or `0%`)
3. Do NOT change `data-suffix` unless the suffix itself changes

The counter animation runs from 0 to `data-target` when the stats bar scrolls into view. This logic is in `js/main.js` — do not modify it for a simple number update.

### Hero Info Card — `index.html`

The `.hero-info-card` on the homepage shows a few quick facts. Check if any stat-like numbers appear there and update them to match.

### About Page

Check `about.html` for any hardcoded stat figures (student count, teacher count, founding year 2020, pass rate). Update any that are inconsistent with the new values. These are typically in the school history section or the principal's message.

### Years of Excellence Calculation

"Years of Excellence" is calculated from the founding year **2020**. If the current year changes, update the `data-target` accordingly:
- Formula: `current_year - 2020`
- Example: 2025 → `data-target="5"`, 2026 → `data-target="6"`

### Checklist After Updating

- [ ] `data-target` updated in `index.html` stats bar
- [ ] Text content initial value updated (e.g., `0+`) in `index.html`
- [ ] Hero info card checked and updated if needed
- [ ] `about.html` text references checked and updated
- [ ] Numbers are consistent across all pages
