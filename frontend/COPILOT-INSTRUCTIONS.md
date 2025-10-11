# GitHub Copilot Instructions - EVS Frontend

## Operation Mode

**Mode**: Auto
**Logging**: Active
**Auto-Commit**: Enabled
**Auto-Tag**: Enabled for releases

## Project Context

This is the **EVS Next.js Basic Web** frontend - a professional German landing page template built with Next.js 15, React 19, and Tailwind CSS 4.

**Brand**: EverVibe Studios
**Owner**: Nenad Trujanovic
**Location**: Hamburg, Deutschland
**Contact**: info@evervibestudios.com

## Development Priorities

1. **Branding Consistency**: Always use "EverVibe Studios" (not "EverVibe Solutions")
2. **German Language**: All user-facing content must be in German
3. **Dark Mode**: Must work flawlessly with localStorage persistence
4. **SEO Excellence**: Maintain Lighthouse scores ≥95
5. **Code Quality**: TypeScript strict, ESLint compliant, Prettier formatted

## Commit & Tag Behavior

### Commit Message Format
```
type(scope): brief description

Longer description if needed

BREAKING CHANGE: description if applicable
```

**Types**: feat, fix, docs, style, refactor, perf, test, chore, release

**Scopes**: component, layout, seo, darkmode, style, build, deps

### Examples
- `feat(darkmode): add useTheme hook with FOUC prevention`
- `fix(seo): update og:url metadata`
- `docs(changelog): add v1.3.0 release notes`
- `release(frontend): v1.3.0 final master`

### Tagging Releases
For version releases, create annotated tags:
```bash
git tag -a v1.3.0 -m "Release v1.3.0 - Final Master"
git push origin v1.3.0
```

## File Organization

### Directory Structure
```
frontend/
├── app/              # Next.js App Router pages
├── components/       # React components
├── hooks/           # Custom React hooks
├── public/          # Static assets
├── docs/            # Documentation
│   ├── CHANGELOG.md
│   └── agent_logs/  # Development logs
├── AGENTS.md        # Agent configuration
└── COPILOT-INSTRUCTIONS.md  # This file
```

### Naming Conventions
- **Components**: PascalCase (e.g., `DarkModeToggle.tsx`)
- **Hooks**: camelCase with "use" prefix (e.g., `useTheme.ts`)
- **Pages**: kebab-case folders (e.g., `datenschutz/page.tsx`)
- **CSS classes**: Tailwind utility classes

## Code Style Guidelines

### TypeScript
- Use strict mode
- Prefer functional components
- Use TypeScript types, not interfaces for props
- Export types separately from components

### React
- Use "use client" directive for client components
- Implement proper loading states
- Handle errors gracefully
- Avoid hydration mismatches

### CSS/Tailwind
- Use Tailwind utility classes
- Use dark: variant for dark mode
- Prefer bg-background, text-foreground semantic tokens
- Mobile-first responsive design

### Accessibility
- Include aria-labels on interactive elements
- Use semantic HTML
- Maintain keyboard navigation
- Test with screen readers

## Testing Checklist

Before committing changes, verify:
- [ ] `npm run lint` passes without errors
- [ ] `npm run build` succeeds
- [ ] Dark mode toggle works correctly
- [ ] No hydration mismatches
- [ ] All links are functional
- [ ] Responsive design maintained
- [ ] German content preserved
- [ ] TypeScript has no errors

## Logging Requirements

### Agent Log Format
Create logs in `docs/agent_logs/<YYYY-MM-DD>_<TASK>.md`

**Template**:
```markdown
# EVS Frontend - <Task Name>

**Date**: YYYY-MM-DD
**Agent**: GitHub Copilot
**Version**: vX.Y.Z
**Task**: Brief description

## Changes Made

### Files Modified
- path/to/file.tsx - Description of change

### Files Added
- path/to/new/file.ts - Purpose

### Files Deleted
- path/to/old/file.tsx - Reason

## QA Results

### Build Status
✅/❌ Build successful
✅/❌ Lint passed
✅/❌ TypeScript checks passed

### Feature Testing
- [ ] Feature A tested and working
- [ ] Feature B tested and working

### Lighthouse Scores
- Performance: XX/100
- Accessibility: XX/100
- Best Practices: XX/100
- SEO: XX/100

## Notes

Any additional context or known issues.
```

## Restrictions & Warnings

### ⛔ Never Do
- Modify backend folder (out of scope)
- Change license file
- Remove attribution to EverVibe Studios
- Break existing functionality
- Commit without testing
- Use external APIs without approval

### ⚠️ Requires Approval
- Dependency updates (major versions)
- Third-party integrations
- Structural changes
- Domain changes
- Legal page content changes

### ✅ Always Do
- Test dark mode after UI changes
- Update CHANGELOG.md for releases
- Maintain German language content
- Keep documentation synchronized
- Follow semantic versioning
- Create agent logs for significant changes

## Environment Variables

Currently, no environment variables are required. The template is fully self-contained.

## Deployment Notes

**Platform**: Vercel (recommended)
**Root Directory**: `frontend`
**Build Command**: `npm run build`
**Output Directory**: `.next`
**Node Version**: >=18

## Support & Escalation

For issues beyond autonomous capability:
1. Document the issue in agent logs
2. Mark PR as "needs-review"
3. Tag @evervibe for human oversight

**Emergency Contact**: info@evervibestudios.com

---

*Last Updated: 2025-01-08 | v1.3.0*
