# Add News / Announcement Card

Add a new news article card to `news.html` and optionally sync it to the "Latest News" strip on `index.html`.

## Instructions

The user will provide: article title, date, category, short description, and optionally a longer body.

### News Card HTML Structure

Insert this block inside the news cards grid in `news.html`:
```html
<article class="news-card fade-up">
  <div class="news-card-img">
    <div class="ph large-ph">
      <span class="ph-icon">📰</span>
    </div>
    <span class="badge badge-[COLOR]">[Category]</span>
  </div>
  <div class="news-card-body">
    <div class="news-card-meta">
      <span>[Month DD, YYYY]</span>
      <span>[Category]</span>
    </div>
    <h3>[Article Title]</h3>
    <p>[2–3 sentence description of the news item. Write in a factual, school-newsletter tone.]</p>
    <a href="#" class="news-card-link">Read More →</a>
  </div>
</article>
```

### Badge Color Mapping

Choose based on category:
- Announcements → `badge-navy`
- Events → `badge-gold`
- Achievements → `badge-sky`
- Academic → `badge-navy`
- Sports → `badge-sky`
- Community → `badge-gold`

### Ordering

Insert newest cards **first** (top of the grid). News should always be in reverse-chronological order.

### Sync to Homepage

If the user asks to show it on the homepage, or if this is one of the 3 most recent articles, also update the "Latest News & Announcements" section in `index.html`. That section contains exactly 3 `.news-card` elements — replace the oldest one with the new article using the same card HTML structure above.

### Placeholder Image

Until a real image is available, use the `.ph.large-ph` placeholder div. When a real image path is provided by the user, replace it with:
```html
<img src="assets/images/[filename]" alt="[Descriptive alt text]" loading="lazy">
```

### Content Tone

Write in a warm, professional school-newsletter tone. Be specific — mention student names, grade levels, or event details if the user provides them. Avoid vague filler sentences.
