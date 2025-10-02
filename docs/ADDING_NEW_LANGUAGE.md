# Adding a New Language to the Site

This guide explains how to add support for a new language to the Ernesto Sola-Thomas personal website.

## Overview

The site uses a custom i18n system with:
- Translation strings in `src/i18n/translations.ts`
- Language-specific content in subdirectories (e.g., `src/content/*/es/`)
- Language routing via Astro's i18n configuration

## Step-by-Step Guide

### 1. Update Astro Configuration

**File:** `astro.config.mjs`

Add your new language code to the `locales` array:

```javascript
export default defineConfig({
  // ... other config
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es", "fr"], // Add "fr" for French, for example
    routing: {
      prefixDefaultLocale: false
    }
  },
  // ... rest of config
});
```

### 2. Add Translation Strings

**File:** `src/i18n/translations.ts`

Add a new language object with all translated strings. Copy the structure from an existing language (e.g., `en` or `es`):

```typescript
export const translations = {
  en: { /* ... */ },
  es: { /* ... */ },
  fr: {  // Example: Adding French
    nav: {
      about: "À propos",
      experience: "Expérience",
      ventures: "Entreprises",
      projects: "Projets",
      skills: "Compétences",
      contact: "Contact",
      collaborate: "Collaborer"
    },
    headings: {
      achievements: "Réalisations et Domaines",
      achievementsEyebrow: "Points forts",
      // ... continue translating all keys
    },
    // ... translate all sections
  }
} as const;
```

**Important:** Ensure you translate **all** keys from the English version. Missing keys will cause TypeScript errors.

### 3. Update Language Switcher

**File:** `src/components/LanguageSwitcher.astro`

Add your new language to the `languages` array:

```typescript
const languages = [
  { code: 'en', label: 'EN', name: 'English', url: '/' },
  { code: 'es', label: 'ES', name: 'Español', url: '/es' },
  { code: 'fr', label: 'FR', name: 'Français', url: '/fr' }  // Add new language
];
```

### 4. Create Content Directories

Create language-specific subdirectories for all content types:

```bash
mkdir -p src/content/site/fr
mkdir -p src/content/skills/fr
mkdir -p src/content/experience/fr
mkdir -p src/content/ventures/fr
mkdir -p src/content/projects/fr
mkdir -p src/content/personal/fr
```

### 5. Translate Content Files

For each content type, create translated versions:

#### Site Metadata
**File:** `src/content/site/fr/meta.json`

```json
{
  "hero": {
    "name": "Ernesto Sola-Thomas",
    "title": "Ingénieur Électrique et Informatique",
    "tagline": "Ingénieur à l'intersection...",
    // ... translate all fields
  },
  // ... rest of the file
}
```

#### Skills Catalog
**File:** `src/content/skills/fr/catalog.json`

```json
[
  {
    "label": "Silicium et Systèmes Embarqués",
    "items": [
      "Vérification de puces",
      // ... translate all skills
    ]
  }
  // ... rest of categories
]
```

#### Experience, Ventures, Projects, Personal

For MDX files, create translated versions following the naming pattern:

```
src/content/experience/fr/microsoft-silicon.mdx
src/content/ventures/fr/knowonomy.mdx
src/content/projects/fr/fpga-vision-prosthetics.mdx
src/content/personal/fr/values.mdx
```

Each file should maintain the same frontmatter structure but with translated content.

### 6. Create Language-Specific Index Page

**File:** `src/pages/fr/index.astro`

Copy the structure from `src/pages/es/index.astro` and update the locale:

```astro
---
import { getCollection, getEntry } from "astro:content";
// ... imports

const siteMeta = await getEntry("site", "fr/meta");
const skillsEntry = await getEntry("skills", "fr/catalog");

const experiences = (await getCollection("experience", ({ id }) => id.startsWith("fr/"))).sort(/*...*/);
const ventures = (await getCollection("ventures", ({ id }) => id.startsWith("fr/"))).sort(/*...*/);
const projects = (await getCollection("projects", ({ id }) => id.startsWith("fr/"))).sort(/*...*/);
const personal = await getCollection("personal", ({ id }) => id.startsWith("fr/"));

const achievements = [
  {
    title: "Focus professionnel",  // Translate these
    description: "..."
  },
  // ... translate all achievements
];
---
<SiteLayout
  title="Ernesto Sola-Thomas • Ingénieur Électrique et Informatique"
  description="Portfolio, entreprises et recherche..."
  siteMeta={siteMeta}
  locale="fr"
>
  <Hero hero={siteMeta.data.hero} quickFacts={siteMeta.data.quickFacts} locale="fr" />
  <AchievementsSection achievements={achievements} locale="fr" />
  <!-- ... all other components with locale="fr" -->
</SiteLayout>
```

## Checklist

Before deploying a new language, verify:

- [ ] Language added to `astro.config.mjs`
- [ ] All translation strings added to `src/i18n/translations.ts`
- [ ] Language added to `LanguageSwitcher.astro`
- [ ] All content directories created
- [ ] All content files translated:
  - [ ] Site metadata (`meta.json`)
  - [ ] Skills catalog (`catalog.json`)
  - [ ] Experience entries (3 files)
  - [ ] Ventures entries (3 files)
  - [ ] Projects entries (12 files)
  - [ ] Personal entries (2 files)
- [ ] Index page created at `src/pages/{language}/index.astro`
- [ ] Achievement translations added to index page
- [ ] All components receive correct `locale` prop
- [ ] Test language switcher works correctly
- [ ] Verify no content from other languages appears

## Content Filtering

The site filters content by language using the `id` field. Content in `src/content/{type}/fr/` will have IDs starting with `"fr/"`.

The filtering pattern in index pages:
```typescript
// Include only French content
const entries = await getCollection("experience", ({ id }) => id.startsWith("fr/"));

// Exclude French content (for English page)
const entries = await getCollection("experience", ({ id }) => !id.startsWith("fr/"));
```

## Testing

1. Start the dev server: `npm run dev`
2. Navigate to your new language route (e.g., `http://localhost:4321/fr`)
3. Verify:
   - All UI text is translated
   - Content is in the correct language
   - Language switcher shows your new language
   - No content from other languages appears
   - All links work correctly

## Common Issues

### TypeScript Errors
- Ensure all translation keys exist in your new language object
- Check that the structure matches existing languages exactly

### Content Not Appearing
- Verify file paths match the pattern: `src/content/{type}/{lang}/{filename}`
- Check that content filtering in index page uses correct language code
- Ensure frontmatter schema is valid

### Language Switcher Not Working
- Confirm language code in `LanguageSwitcher.astro` matches directory names
- Verify URL paths are correct

## Need Help?

If you encounter issues, check:
1. Existing language implementations (`en`, `es`) for reference
2. Console for TypeScript or runtime errors
3. Network tab to verify content files are loading correctly
