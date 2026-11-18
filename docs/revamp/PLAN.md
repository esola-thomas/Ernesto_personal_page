# Site Revamp Plan

Goal: make ernesto.solathomas.com a site that sounds like Ernesto, shows only what he chooses to make public, and meets a state-of-the-art bar in craft and performance.

Audience, in priority order (confirm in Round 1): partners, clients, investors, mentees.

## Definition of done (the bar)

- [ ] A stranger can say what Ernesto does and why it matters after 10 seconds on the homepage.
- [ ] Zero sentences that could sit on someone else's site unchanged. Every paragraph has a specific noun, number, or story.
- [ ] Every public fact is on the approved list in `PRIVACY.md`. Nothing employer-confidential.
- [ ] Each audience has an obvious path: investor → Huitzo + writing, client → offer + booking, partner → contact, mentee → journey.
- [ ] English and Spanish both read as originals, not translations.
- [ ] Lighthouse 98+ in all four categories on mobile; LCP < 1.5s; CLS < 0.05.
- [ ] WCAG 2.2 AA.
- [ ] A reusable voice guide (`VOICE.md`) that also serves Huitzo, LinkedIn, and essays.

## Phases

### Phase 0: Voice and boundaries (M, mostly Ernesto's time)
- [ ] Round 1 interview: identity, motivation, beliefs, life outside work
- [ ] Round 2 interview: Huitzo, Microsoft, other ventures
- [ ] Round 3 interview: projects and research worth keeping
- [ ] Round 4 interview: advice for mentees, speaking topics
- [ ] `VOICE.md` distilled from answers (words you use, words you never use, rhythm, tone)
- [ ] `PRIVACY.md`: approved public facts, off-limits list, employer boundary
- Success: Ernesto reads `VOICE.md` and says "that's how I write."

### Phase 1: Positioning and information architecture (M)
- [ ] One-line positioning plus a three-line expansion
- [ ] Homepage section order by audience priority
- [ ] Cut, merge, or keep each page and section (paused ventures, the 12 projects, speaking, research)
- [ ] Proof inventory: what evidence exists (papers, demos, customers, quotes, photos) and what's missing
- Success: a sitemap and homepage wireframe Ernesto approves before any rewriting.

### Phase 2: Copy rewrite, EN + ES (L)
- [ ] Hero, story chapters, values/passions
- [ ] Experience and ventures
- [ ] Projects and research
- [ ] Journey and speaking
- [ ] Metadata, OG text, `llms.txt`, JSON-LD
- Success: section-by-section diff review; every line passes the "only Ernesto could say this" test.

### Phase 3: Proof assets (M to L, depends on external input)
- [ ] 2–4 testimonials (mentors, collaborators, design partners), permission obtained
- [ ] Real photos: working, speaking, on the water (if approved)
- [ ] First essay published (draft exists: verifying silicon / trusting inference)
- [ ] One or two deep case studies instead of many thin project cards
- Success: every major claim on the homepage links to evidence.

### Phase 4: Craft (L)
- [ ] Design audit: typography, spacing, motion, dark mode, mobile
- [ ] Performance pass: images (AVIF/WebP, sizes), fonts, JS budget
- [ ] Accessibility audit and fixes
- [ ] Per-page OG cards
- Success: the numbers in "Definition of done" pass, verified with Lighthouse and axe in CI.

### Phase 5: Privacy hardening and discoverability (S)
- [ ] Apply `PRIVACY.md` across content, JSON-LD, `llms.txt`, sitemap
- [ ] Image metadata stripped; stray files removed
- [ ] Contact path that filters spam; one booking link with screening questions
- [ ] Search/LLM presence matches what's approved, nothing more
- Success: grep and structured-data audit show only approved facts.

### Phase 6: Operating rhythm (S)
- [ ] Publishing cadence for writing
- [ ] Quarterly review checklist (role changes, Huitzo milestones, privacy re-check)

## Open decisions
- Location: Raleigh, region, or omitted?
- Spanish: written by Ernesto, or translated by Claude then edited by Ernesto?
- Paused ventures: fold into "earlier experiments," or remove?
- Microsoft content: confirm the public-safe description against the employer policy.
