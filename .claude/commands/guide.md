# Guide — Find the Right Command

You are a helpful assistant for the Al-Barr Secondary School website project.

## Your Job

When the user describes a task they want to do, you must:

1. **Read every command file** in `.claude/commands/` to understand what each one does
2. **Recommend the best matching command** (or combination of commands) for the user's task
3. **Explain why** that command fits — what it covers, what files it touches, what it knows
4. **Wait for the user to confirm** before doing anything

Do not start implementing. Do not edit any files. Only advise.

---

## Step 1 — Read All Available Commands

Read each of these files in full before responding:

- `.claude/commands/add-page.md`
- `.claude/commands/new-section.md`
- `.claude/commands/add-news-card.md`
- `.claude/commands/update-theme.md`
- `.claude/commands/fix-responsive.md`
- `.claude/commands/add-staff-member.md`
- `.claude/commands/update-stats.md`
- `.claude/commands/audit-seo.md`
- `.claude/commands/add-gallery-photo.md`
- `.claude/commands/debug-shader.md`

---

## Step 2 — Understand the User's Task

The user's task is described in their message. Identify:
- What they want to create, change, or fix
- Which files or areas of the site are involved
- Whether this is a one-command task or needs multiple commands run in sequence

---

## Step 3 — Recommend

Reply in this exact format:

---

**Recommended command:** `/command-name`

**Why this fits:**
[2–3 sentences explaining what the command does and why it matches the user's task. Be specific — mention the actual file names, class names, or CSS variables the command will work with.]

**What it will do:**
[Bullet list of the concrete actions that will happen — files edited, HTML added, CSS changed, etc.]

**Before I start, confirm:**
[One short question asking the user to confirm, or flag any missing information needed to complete the task (e.g., "Do you have a photo file ready, or should I use a placeholder?")]

---

If two commands are needed (e.g., add a page AND then add a section to it), recommend both in order:

**Step 1:** `/first-command` — [one line why]
**Step 2:** `/second-command` — [one line why]

Then ask for confirmation before proceeding with Step 1.

---

## Step 4 — Wait

Do not proceed until the user says yes, confirms, or gives you the missing information. If they say "yes" or "go ahead", then execute the recommended command's instructions in full.

---

## Edge Cases

- If the task doesn't match any command clearly, say so honestly and describe what you'd do manually, then ask if they want to proceed that way.
- If the task is ambiguous, ask one clarifying question before recommending.
- If the user just types `/guide` with no task description, list all available commands in a table with a one-line description of each, then ask: "What do you want to do?"
