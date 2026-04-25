# Vigilon Tech Brand Color Implementation Guide

## Overview
This document outlines how the Vigilon Tech brand colors have been implemented across the website, following the official branding guidelines.

## Color Palette

### Primary Colors
- **Midnight Blue** `#0B1F3F` - Primary brand color
  - Used for: Headers, navigation, dark sections, primary text
  - CSS var: `var(--color-midnight-blue)` or `var(--color-primary)`

- **Intelligent Blue** `#1E5F8C` - Secondary elements
  - Used for: Subheadings, links, secondary buttons, icon boxes
  - CSS var: `var(--color-intelligent-blue)` or `var(--color-secondary)`

- **Electric Cyan** `#00D4FF` - Interactive elements
  - Used for: Interactive highlights, hover states, data visualizations, tech features
  - CSS var: `var(--color-electric-cyan)` or `var(--color-accent)`

- **Alert Orange** `#FF6B35` - CTAs and urgent elements
  - Used for: Primary CTAs, urgent notifications, warnings (use sparingly for impact)
  - CSS var: `var(--color-alert-orange)` or `var(--color-cta)`

### Supporting Colors
- **Cool White** `#F8F4F8` - Backgrounds and clean space
  - CSS var: `var(--color-cool-white)` or `var(--color-surface)`

- **Deep Space** `#07080A` - Dark mode and contrast
  - CSS var: `var(--color-deep-space)`

- **Slate Navy** `#14294A` - Alternative dark blue
  - CSS var: `var(--color-slate-navy)`

## Component Usage

### Buttons
- **Primary CTA**: Alert Orange (`btn-primary`)
- **Secondary**: Intelligent Blue (`btn-secondary`)
- **Outline**: Electric Cyan border (`btn-outline`)

### Navigation
- **Background**: Midnight Blue with 97% opacity
- **Active/Hover**: Electric Cyan background
- **CTA Button**: Alert Orange

### Hero Section
- **Background**: Gradient from Midnight Blue → Slate Navy → Deep Space
- **Pattern overlay**: Electric Cyan at 8% opacity
- **Text**: White with Electric Cyan accents

### Cards & Icons
- **Icon Boxes**: Electric Cyan (default), Intelligent Blue (secondary), Alert Orange (CTA variant)
- **Feature Icons**: Gradient from Electric Cyan to Intelligent Blue
- **Card Hover**: Subtle lift with shadow

### Forms
- **Focus State**: Electric Cyan border with 15% opacity shadow

## Icon Library

14 custom cybersecurity-themed icons available in `/public/icons/`:
- shield.svg - Security, protection
- lock.svg - Encryption
- certificate.svg - Compliance
- check-circle.svg - Verification
- document.svg - Documentation
- chart.svg - Analytics
- cloud.svg - Cloud security
- network.svg - IoT/Networking
- alert.svg - Warnings
- search.svg - Penetration testing
- target.svg - Threat assessment
- code.svg - Development
- users.svg - Teams/consulting
- eye.svg - Monitoring

All icons use `currentColor` for easy color customization via CSS.

## Best Practices

1. **Alert Orange** should be used sparingly for maximum impact on CTAs
2. **Electric Cyan** works best for interactive and tech-forward elements
3. **Midnight Blue** provides trust and authority for primary content
4. **Intelligent Blue** bridges the gap between primary and interactive elements
5. Use **Cool White** for breathing room and clean sections

## Directory Structure

```
public/
├── icons/          # SVG icons (cybersecurity themed)
├── images/         # Static images (coming soon)
└── assets/         # Other static assets
```

## Examples

### Using Colors in Components
```css
/* Electric Cyan accent */
.highlight { color: var(--color-accent); }

/* CTA button */
.btn-cta { background: var(--color-cta); }

/* Primary section */
.section-primary { background: var(--color-primary); }
```

### Using Icons
```astro
<img src="/icons/shield.svg" alt="Security" class="icon-lg" />
<div class="icon-box">
  <img src="/icons/certificate.svg" alt="" />
</div>
```

## Updates Made

### CSS (global.css)
- Replaced all color variables with brand palette
- Updated button styles to use Alert Orange for primary CTAs
- Changed hero gradient to use brand colors
- Updated all accent colors from old blue to Electric Cyan
- Added icon and image utility classes

### Components
- Updated Header logo to use Electric Cyan
- Updated Footer logo to use Electric Cyan
- Added icons to Footer contact section
- Changed nav CTA to Alert Orange

### Pages
- Added icons to all service cards on homepage
- Updated trust bar numbers with varied brand colors
- Added feature icons to "Why Vigilon" section
- Updated hero button styling

---

Last updated: April 24, 2026
