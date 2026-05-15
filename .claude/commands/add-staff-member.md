# Add Staff / Faculty Member

Add a new teacher or staff member card to `about.html` (faculty section) and optionally to `academics.html`.

## Instructions

The user will provide: name, subject/role, and optionally a photo path, qualification, and a short bio.

### Teacher Card HTML

Insert into the faculty grid in `about.html`:
```html
<div class="teacher-card fade-up">
  <div class="teacher-avatar">
    <!-- If photo provided: -->
    <img src="assets/images/staff/[filename]" alt="[Name] — [Subject] Teacher" loading="lazy">
    <!-- If no photo yet: -->
    <div class="ph" style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:2.5rem;">👤</div>
  </div>
  <h4>[Full Name]</h4>
  <p class="section-text" style="color:var(--color-accent);font-weight:600;">[Subject / Role]</p>
  <p style="font-size:var(--text-sm);color:var(--color-text-muted);">[Short bio or qualification, 1–2 sentences]</p>
</div>
```

### Faculty Grid Location

In `about.html`, the faculty grid is inside the section with the heading "Meet Our Faculty". Add the new card at the end of the grid, or in alphabetical order by last name if the user requests it.

### Principal Card (Special Case)

If the user is updating the **principal's** information, that is a separate component — `.principal-card` — not part of the faculty grid. Edit the existing `.principal-card` block directly. Do not add a new `.teacher-card` for the principal.

Principal card structure in `about.html`:
```html
<div class="principal-card">
  <div class="principal-photo">
    <div class="ph" ...>🎓</div>
  </div>
  <div class="principal-content">
    <div class="principal-info">
      <h3>[Principal Name]</h3>
      <p>[Title / Qualification]</p>
    </div>
    <blockquote>[Quote from principal]</blockquote>
    <p class="principal-full">[Extended message, 2–3 paragraphs]</p>
  </div>
</div>
```

### Photo Placement

Staff photos should be placed at `assets/images/staff/[firstname-lastname].jpg`. If the user provides a photo path that differs, use it as-is. Always add descriptive `alt` text: `"[Name] — [Subject] Teacher at Al-Barr Secondary School"`.

### Content

If no bio is provided, write a one-sentence realistic placeholder:
> "Mr. [Name] brings [X] years of experience in [Subject] and is committed to helping students achieve their full academic potential."

Keep it warm and professional — consistent with the tone of existing staff bios on the page.
