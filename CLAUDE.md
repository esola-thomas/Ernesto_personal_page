# Claude AI Assistant Context

This file provides context for Claude AI assistants working with this codebase.

## Project Overview

**Ernesto Sola-Thomas Personal Website**
- Astro-based portfolio site
- Multi-language support (English, Spanish)
- Showcases experience, ventures, projects, and skills
- Focus on silicon verification, entrepreneurship, and emerging technologies

## Repository Structure

```
/
├── src/
│   ├── components/          # Reusable Astro components
│   │   ├── AchievementsSection.astro
│   │   ├── ExperienceTimeline.astro
│   │   ├── VenturesGrid.astro
│   │   ├── ProjectsShowcase.astro
│   │   ├── SkillsShowcase.astro
│   │   ├── PersonalSection.astro
│   │   ├── ContactSection.astro
│   │   ├── Hero.astro
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── LanguageSwitcher.astro
│   │   └── SectionHeading.astro
│   │
│   ├── content/             # Content collections
│   │   ├── config.ts        # Content schema definitions
│   │   ├── site/            # Site metadata
│   │   │   ├── meta.json    # English site data
│   │   │   └── es/
│   │   │       └── meta.json # Spanish site data
│   │   ├── skills/          # Skills catalogs
│   │   │   ├── catalog.json
│   │   │   └── es/catalog.json
│   │   ├── experience/      # Work experience
│   │   │   ├── *.mdx        # English entries
│   │   │   └── es/*.mdx     # Spanish entries
│   │   ├── ventures/        # Entrepreneurial ventures
│   │   │   ├── *.mdx
│   │   │   └── es/*.mdx
│   │   ├── projects/        # Technical projects
│   │   │   ├── *.mdx
│   │   │   └── es/*.mdx
│   │   └── personal/        # Personal values/passions
│   │       ├── *.mdx
│   │       └── es/*.mdx
│   │
│   ├── i18n/                # Internationalization
│   │   └── translations.ts  # UI string translations
│   │
│   ├── layouts/             # Page layouts
│   │   └── SiteLayout.astro
│   │
│   ├── pages/               # Routes
│   │   ├── index.astro      # English homepage (/)
│   │   └── es/
│   │       └── index.astro  # Spanish homepage (/es)
│   │
│   ├── styles/              # Global styles
│   │   └── global.css
│   │
│   └── assets/              # Static assets
│
├── public/                  # Public static files
│
├── docs/                    # Documentation
│   └── ADDING_NEW_LANGUAGE.md
│
├── astro.config.mjs         # Astro configuration
├── tailwind.config.mjs      # Tailwind CSS config
├── tsconfig.json            # TypeScript config
└── package.json
```

## Key Technologies

- **Astro**: Static site framework
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling (via Vite plugin)
- **MDX**: Markdown with JSX for content
- **React**: Used selectively for interactive components

## Content Architecture

### Content Collections

The site uses Astro's content collections system:

1. **site** - Site-wide metadata (hero, contact info)
2. **skills** - Technical skills grouped by category
3. **experience** - Work experience entries
4. **ventures** - Entrepreneurial projects
5. **projects** - Technical projects
6. **personal** - Personal values and passions

Each collection has a schema defined in `src/content/config.ts`.

### Multi-language Content

Content is organized by language:
- Root level: English (default)
- `{collection}/es/`: Spanish
- Future languages: `{collection}/{lang}/`

### Content Filtering

Index pages filter content by language:
```typescript
// Spanish content
const entries = await getCollection("experience", ({ id }) => id.startsWith("es/"));

// English content
const entries = await getCollection("experience", ({ id }) => !id.startsWith("es/"));
```

## Internationalization System

### Translation Strings

UI translations are centralized in `src/i18n/translations.ts`:

```typescript
export const translations = {
  en: { /* English strings */ },
  es: { /* Spanish strings */ }
};
```

All components accept an optional `locale` prop and use `getTranslations(locale)` to access translated strings.

### Adding a New Language

See `docs/ADDING_NEW_LANGUAGE.md` for detailed instructions.

**Quick summary:**
1. Update `astro.config.mjs` with new locale
2. Add translations to `src/i18n/translations.ts`
3. Update `LanguageSwitcher.astro`
4. Create content directories and files
5. Create index page at `src/pages/{lang}/index.astro`

## Component Patterns

All major section components follow this pattern:

```astro
---
import { getTranslations, type Locale } from "../i18n/translations";

interface Props {
  // ... component-specific props
  locale?: Locale;
}

const { locale = 'en', /* ... */ } = Astro.props;
const t = getTranslations(locale);
---
<!-- Use t.section.key for translated strings -->
```

## Development Commands

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run astro        # Run Astro CLI commands
```

## Important Files for Modifications

- **Add new section**: Create component in `src/components/`, add to index pages
- **Modify content schema**: Edit `src/content/config.ts`
- **Change site metadata**: Edit `src/content/site/meta.json` (and language variants)
- **Update translations**: Edit `src/i18n/translations.ts`
- **Modify global styles**: Edit `src/styles/global.css`
- **Configure routing**: Edit `astro.config.mjs`

## Common Tasks

### Adding New Content Entry

1. Create MDX file in appropriate collection directory
2. Include required frontmatter (see schema in `src/content/config.ts`)
3. For translated version, create in `{collection}/{lang}/` subdirectory
4. Content will automatically appear on build

### Updating Component Translations

1. Add translation keys to `src/i18n/translations.ts` for all languages
2. Update component to use `getTranslations(locale)`
3. Replace hardcoded strings with `t.section.key`
4. Ensure component receives `locale` prop from parent

### Styling Guidelines

- Use Tailwind utility classes
- Custom CSS in component `<style>` blocks or `global.css`
- CSS variables for theming (see `global.css`)
- Responsive design: mobile-first approach

## Contact & Deployment

- **Site URL**: https://ernesto.solathomas.com
- **GitHub**: https://github.com/esola-thomas
- **Contact**: ernesto@solathomas.com

## Notes for AI Assistants

When working on this codebase:
- Preserve existing translation patterns
- Maintain content schema compatibility
- Test both English and Spanish versions
- Follow Astro best practices for static sites
- Use TypeScript types for prop interfaces
- Keep components accessible (ARIA labels, semantic HTML)
