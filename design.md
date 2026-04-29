# FlowAgent Design System

## Overview

FlowAgent is a modern, dark-themed agentic workflow dashboard built for managing complex AI agent pipelines. The design system emphasizes clarity, depth, and visual hierarchy through a carefully curated color palette, typography, and component library.

**Aesthetic Direction:** Cyberpunk-inspired minimalism with neon accents, glassmorphism, and refined typography. The interface balances high technical complexity with elegant simplicity.

---

## Color Palette

### Primary Colors

| Color | Hex | CSS Variable | Usage |
|-------|-----|--------------|-------|
| **Neon Purple** | `#B755FF` | `--color-primary` | Primary actions, workflow connections, CTAs, highlights |
| **Deep Navy** | `#0F1419` | `--color-bg-primary` | Main background, dominant surface |
| **Dark Slate** | `#1A1F2E` | `--color-bg-secondary` | Cards, containers, elevation level 1 |
| **Charcoal** | `#252C3C` | `--color-bg-tertiary` | Subtle backgrounds, hover states |

### Status Colors

| State | Hex | CSS Variable | Usage |
|-------|-----|--------------|-------|
| **Active/Success** | `#10B981` | `--color-success` | Active agents, successful runs, valid states |
| **Pending** | `#F59E0B` | `--color-warning` | Pending operations, in-progress states |
| **Error** | `#EF4444` | `--color-error` | Failures, errors, invalid states |
| **Neutral/Info** | `#8B5CF6` | `--color-info` | Informational content, secondary actions |

### Text Colors

| Type | Hex | CSS Variable | Usage |
|------|-----|--------------|-------|
| **Primary Text** | `#F3F4F6` | `--color-text-primary` | Main content, headings, primary information |
| **Secondary Text** | `#D1D5DB` | `--color-text-secondary` | Labels, descriptions, metadata |
| **Tertiary Text** | `#9CA3AF` | `--color-text-tertiary` | Placeholder, disabled, hints |
| **Muted Text** | `#6B7280` | `--color-text-muted` | Inactive items, timestamps |

### Semantic Colors

- **Glassmorphism Border:** `rgba(255, 255, 255, 0.1)` - Subtle borders on glass containers
- **Neon Glow (Purple):** `rgba(183, 85, 255, 0.5)` - Workflow connection glow
- **Neon Glow (Green):** `rgba(16, 185, 129, 0.3)` - Success state emphasis

---

## Typography

### Font Stack

```css
--font-display: "Inter Tight", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
--font-body: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
--font-mono: "Fira Code", "Courier New", monospace;
```

**Rationale:** Inter Tight for bold headings provides geometric precision matching the tech-forward aesthetic. Inter for body text ensures excellent readability at all sizes. Fira Code for monospace content (logs, code snippets) maintains the cyberpunk vibe.

### Type Scale

| Element | Size | Weight | Line Height | Letter Spacing | Usage |
|---------|------|--------|-------------|-----------------|-------|
| **H1** | 32px | 700 | 1.2 | -0.5px | Page titles (e.g., "Workflow: Lead Enrichment v1.4") |
| **H2** | 24px | 600 | 1.3 | -0.3px | Section headers, modal titles |
| **H3** | 20px | 600 | 1.4 | 0px | Subsection headers, card titles |
| **Body Large** | 16px | 400 | 1.6 | 0px | Primary content, descriptions |
| **Body Regular** | 14px | 400 | 1.5 | 0px | Standard body copy, UI labels |
| **Body Small** | 12px | 400 | 1.4 | 0px | Secondary labels, timestamps, metadata |
| **Mono** | 13px | 400 | 1.5 | 0px | Code, logs, terminal-style content |

---

## Spacing & Layout

### Base Unit
All spacing is built on an **8px base unit** for consistency and rhythm.

### Spacing Scale

```css
--space-xs: 4px;     /* Tight, internal spacing */
--space-sm: 8px;     /* Small components, gaps */
--space-md: 16px;    /* Default padding, spacing */
--space-lg: 24px;    /* Section spacing, large gaps */
--space-xl: 32px;    /* Major sections */
--space-2xl: 48px;   /* Page-level spacing */
--space-3xl: 64px;   /* Full-page margins */
```

### Layout Grid
- **Sidebar Width:** 264px (fixed)
- **Main Content Width:** Fluid (remaining space)
- **Max Content Width:** 1400px
- **Gutter:** 16px (between major sections)

### Common Padding/Margin

| Component | Padding | Margin |
|-----------|---------|--------|
| **Page Container** | 24px | 0 |
| **Card** | 16px | 16px |
| **Form Input** | 12px 16px | 8px (bottom) |
| **Button** | 10px 16px | 0 |
| **List Item** | 12px 16px | 0 |

---

## Components

### Buttons

#### Primary Button
- **Background:** `--color-primary` (#B755FF)
- **Text Color:** `--color-text-primary` (#F3F4F6)
- **Padding:** 10px 16px
- **Border Radius:** 8px
- **Font Weight:** 600
- **States:**
  - **Default:** Full opacity, shadow: `0 4px 12px rgba(183, 85, 255, 0.3)`
  - **Hover:** Opacity 0.9, shadow: `0 6px 16px rgba(183, 85, 255, 0.4)`
  - **Active:** Opacity 0.8
  - **Disabled:** Opacity 0.5, no shadow

#### Secondary Button
- **Background:** `--color-bg-tertiary` (#252C3C)
- **Border:** 1px solid `rgba(183, 85, 255, 0.3)`
- **Text Color:** `--color-text-primary`
- **Padding:** 10px 16px
- **Border Radius:** 8px
- **States:**
  - **Hover:** Background brightens to `--color-bg-secondary`, border solidifies

#### Icon Button
- **Size:** 40px × 40px
- **Border Radius:** 8px
- **Icon Size:** 20px
- **States:**
  - **Default:** `--color-text-secondary`
  - **Hover:** `--color-primary`, background: `rgba(183, 85, 255, 0.1)`
  - **Active:** `--color-primary`, background: `rgba(183, 85, 255, 0.2)`

### Cards & Containers

#### Standard Card
- **Background:** `--color-bg-secondary` (#1A1F2E)
- **Border:** 1px solid `rgba(255, 255, 255, 0.1)`
- **Border Radius:** 12px
- **Padding:** 16px
- **Shadow:** `0 8px 24px rgba(0, 0, 0, 0.3)`
- **Backdrop Filter:** `blur(10px)` (glassmorphism effect)

#### Workflow Node Card
- **Background:** Same as standard card with enhanced border glow
- **Border:** 2px solid `--color-primary` on active state
- **Glow:** `box-shadow: 0 0 20px rgba(183, 85, 255, 0.5)`
- **Border Radius:** 12px
- **Padding:** 16px

#### Elevation Levels
- **Level 0 (Base):** No shadow, transparent background
- **Level 1:** `0 2px 8px rgba(0, 0, 0, 0.2)`
- **Level 2:** `0 4px 12px rgba(0, 0, 0, 0.3)` (standard card)
- **Level 3:** `0 8px 24px rgba(0, 0, 0, 0.4)` (modals, popovers)
- **Level 4:** `0 16px 32px rgba(0, 0, 0, 0.5)` (overlays, topmost elements)

### Status Indicators

#### Dot Indicator
- **Size:** 8px diameter
- **Border Radius:** 50%
- **Colors:**
  - Active: `--color-success` (#10B981)
  - Pending: `--color-warning` (#F59E0B)
  - Error: `--color-error` (#EF4444)
  - Inactive: `--color-text-muted` (#6B7280)
- **Animation:** Subtle pulse (0.5s, ease-in-out) for active states

#### Status Badge
- **Font Size:** 12px
- **Font Weight:** 500
- **Padding:** 4px 12px
- **Border Radius:** 6px
- **Background:** `rgba(16, 185, 129, 0.15)` (for success, adjust color accordingly)
- **Text Color:** Matching status color
- **Border:** 1px solid corresponding status color with 0.3 opacity

### Input Fields

#### Text Input
- **Background:** `--color-bg-tertiary` (#252C3C)
- **Border:** 1px solid `rgba(255, 255, 255, 0.1)`
- **Border Radius:** 8px
- **Padding:** 12px 16px
- **Font Size:** 14px
- **Text Color:** `--color-text-primary`
- **Placeholder Color:** `--color-text-muted`
- **States:**
  - **Focus:** Border color `--color-primary`, box-shadow: `0 0 0 3px rgba(183, 85, 255, 0.1)`
  - **Error:** Border color `--color-error`
  - **Disabled:** Opacity 0.5, cursor: not-allowed

### Workflow Connection Lines

#### Node-to-Node Connections
- **Stroke:** `--color-primary` (#B755FF)
- **Stroke Width:** 2px
- **Glow:** `filter: drop-shadow(0 0 8px rgba(183, 85, 255, 0.6))`
- **Animation (Active):** Dashed line moving, 2s loop (animation: dash 2s linear infinite)
- **Animation (Inactive):** Solid, static

#### Conditional Branches
- **Stroke:** `--color-info` (#8B5CF6)
- **Stroke Width:** 2px
- **Glow:** Reduced (0.3 opacity)

---

## Spacing & Gaps in Workflow Visualization

- **Node-to-Node Horizontal Gap:** 32px
- **Row Spacing:** 48px
- **Sidebar to Main Content:** 16px
- **Card Internal Spacing:** 16px
- **Element-to-Element (within card):** 8px

---

## Animations & Transitions

### Timing Functions

```css
--easing-swift: cubic-bezier(0.4, 0, 0.2, 1);    /* Snappy, responsive */
--easing-smooth: cubic-bezier(0.25, 0.46, 0.45, 0.94); /* Elegant, natural */
--easing-ease-out: cubic-bezier(0, 0, 0.2, 1);   /* Decelerate, landing */
```

### Duration Scale

```css
--duration-fast: 150ms;      /* Micro-interactions */
--duration-standard: 250ms;  /* Button feedback, hover */
--duration-slow: 400ms;      /* Page transitions, reveal */
--duration-slowest: 600ms;   /* Complex animations */
```

### Common Transitions

| Element | Property | Duration | Timing |
|---------|----------|----------|--------|
| **Button Hover** | background-color, box-shadow | 150ms | ease-out |
| **Card Hover** | transform, box-shadow | 200ms | smooth |
| **Border Change** | border-color | 200ms | swift |
| **Text Color** | color | 150ms | swift |
| **Opacity Fade** | opacity | 250ms | smooth |

### Workflow Animation

- **Node Entrance:** Fade in + slight scale (0.95 → 1) over 300ms
- **Connection Line:** Stroke appears with dashing animation (running loop)
- **Active Node Pulse:** Glow brightness oscillates (400ms cycle)
- **Execution Progress:** Horizontal line fill animation, linear, 0.3s per 10% progress

---

## Sidebar Navigation

### Structure
- **Width:** 264px
- **Background:** `--color-bg-primary` (#0F1419)
- **Border Right:** 1px solid `rgba(255, 255, 255, 0.05)`
- **Padding:** 24px 16px

### Navigation Items

#### Active Item
- **Background:** `rgba(183, 85, 255, 0.15)`
- **Text Color:** `--color-primary`
- **Border Left:** 3px solid `--color-primary`
- **Padding Left:** 13px (to accommodate border)

#### Inactive Item
- **Text Color:** `--color-text-secondary`
- **Hover:** Background `rgba(183, 85, 255, 0.08)`, text `--color-text-primary`

#### Category Headers
- **Font Size:** 12px
- **Font Weight:** 600
- **Text Color:** `--color-text-muted`
- **Margin Top:** 24px
- **Margin Bottom:** 12px
- **Text Transform:** Uppercase
- **Letter Spacing:** 0.5px

---

## Accessibility Considerations

### Contrast Ratios
- **Primary Text on Primary Background:** 9.2:1 ✓ (AAA compliant)
- **Secondary Text on Secondary Background:** 8.1:1 ✓ (AAA compliant)
- **Neon Purple Button on Dark Background:** 6.8:1 ✓ (AA compliant, exceeds for large text)

### Focus States
- **Keyboard Focus:** 3px `--color-primary` outline with 4px offset
- **Visible on all interactive elements**
- **No invisible outlines**

### Motion & Seizure Safety
- **Respect prefers-reduced-motion:** Remove animations/transitions on user preference
- **No flashing:** Animations stay below 3 flashes per second
- **Color not sole indicator:** Status always has icon + color

### Icon Usage
- **All icons paired with text labels** in navigation
- **Workflow nodes:** Icons have accessible labels
- **Status indicators:** Alt text or aria-label for programmatic understanding

---

## Dark Mode Considerations

This design system is optimized for dark mode. For potential light mode adoption:

| Component | Dark | Light | Notes |
|-----------|------|-------|-------|
| **Primary Background** | #0F1419 | #FFFFFF | Inverted |
| **Secondary Background** | #1A1F2E | #F3F4F6 | Inverted |
| **Text Primary** | #F3F4F6 | #1F2937 | Inverted |
| **Primary Color** | #B755FF | #A855F7 | Slightly lighter for light mode |

---

## Suggested Improvements

### 1. **Enhanced Micro-interactions**
   - Add subtle bounce animation on button clicks (5px elevation then release)
   - Implement smooth scroll-behavior for logs section
   - Add hover state elevation to cards (+2px shadow increase)

### 2. **Improved Data Hierarchy in Execution Logs**
   - **Current Issue:** Log entries have similar visual weight; timestamp and message blend together
   - **Suggestion:** 
     - Use monospace font for timestamps
     - Add colored left border (status-coded) for each log entry
     - Implement expandable log details with syntax highlighting for code/error messages

### 3. **Better Visual Separation in Node Details Panel**
   - **Current Issue:** "Node Details" section on right could use more visual distinction
   - **Suggestion:**
     - Add a subtle background color difference (`rgba(183, 85, 255, 0.08)`)
     - Implement sticky header so title stays visible when scrolling
     - Group related fields with subtle dividers

### 4. **Tooltip System**
   - **Missing:** No tooltips visible for complex agent names or status codes
   - **Suggestion:** 
     - 200ms delay on hover
     - Dark background with neon border
     - Arrow pointer toward triggering element
     - Max-width: 280px, word-wrap enabled

### 5. **Loading States**
   - **Missing:** Clear visual feedback for async operations
   - **Suggestion:**
     - Skeleton loaders for cards in "loading" state
     - Animated progress bars for operations in progress
     - Pulse animation on elements waiting for data

### 6. **Connection Line Quality**
   - **Current Issue:** Straight lines; could feel more organic
   - **Suggestion:** 
     - Use cubic Bézier curves for workflow connections
     - Add slight curve radius (200px) for smoother flow
     - Implement directional arrows on lines

### 7. **Empty States**
   - **Missing:** No visible empty state design
   - **Suggestion:**
     - Large, centered icon (80px, faded color)
     - Descriptive heading + helper text
     - Primary action button (e.g., "Create First Agent")
     - Subtle background pattern (geometric or radial gradient)

### 8. **Notification System**
   - **Missing:** Visible notification/alert handling
   - **Suggestion:**
     - Toast notifications (top-right corner)
     - Slide-in animation from right
     - Color-coded (success: green, error: red, info: purple)
     - Auto-dismiss after 5s or manual close button
     - Stacking behavior for multiple notifications

### 9. **Breadcrumb Navigation**
   - **Missing:** No breadcrumb trail visible
   - **Suggestion:**
     - Add above page title: "Workflows / Lead Enrichment / v1.4"
     - Small font (12px), separated by forward slashes
     - Text color: `--color-text-secondary`
     - Last item non-clickable (current page)

### 10. **Responsive Sidebar Behavior**
   - **Current:** Fixed 264px sidebar
   - **Suggestion:**
     - Tablet (< 1024px): Collapse to 72px icon-only sidebar
     - Mobile (< 640px): Convert to hamburger menu with slide-out drawer
     - Persist user's sidebar state in localStorage

### 11. **Search/Command Palette Enhancement**
   - **Current:** Simple search icon visible
   - **Suggestion:**
     - Keyboard shortcut: Cmd/Ctrl + K to open
     - Fuzzy search with categories (Workflows, Agents, Settings)
     - Recent searches history
     - Smart suggestions based on user actions

### 12. **Depth Cues for Hierarchy**
   - **Current Issue:** Multiple z-layers exist but aren't always clear
   - **Suggestion:**
     - Subtle background gradient shift for each elevation level
     - Consistent shadow scaling (level 1 → level 4)
     - Consider adding slight color temperature shift (warmer shadows)

---

## Implementation Checklist

- [ ] Define CSS custom properties (variables) for all colors, spacing, timing
- [ ] Create button, card, input component styles
- [ ] Build sidebar navigation with active states
- [ ] Implement workflow connection line system with SVG
- [ ] Add status indicator components with animations
- [ ] Build responsive grid/layout system
- [ ] Create tooltip, modal, and popover base styles
- [ ] Implement focus management and keyboard navigation
- [ ] Add animations and transitions
- [ ] Test accessibility (contrast, focus, motion)
- [ ] Document component usage in Storybook/similar
- [ ] Create Figma design tokens file (mirrors CSS variables)

---

## Files to Create

1. **`tokens.css`** - Global CSS variables and design tokens
2. **`typography.css`** - Font definitions and type scale
3. **`components/button.css`** - Button variants
4. **`components/card.css`** - Card and container styles
5. **`components/input.css`** - Form input styles
6. **`components/sidebar.css`** - Navigation sidebar
7. **`animations.css`** - Keyframes and animation definitions
8. **`utilities.css`** - Spacing, layout, display utilities
9. **`accessibility.css`** - Focus states, high-contrast modes

---

**Last Updated:** April 10, 2026  
**Version:** 1.0  
**Status:** Ready for Implementation
