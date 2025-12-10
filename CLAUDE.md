# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

YearPlanner is a React application for year planning with a whole-year overview and multiple presentation views. The app allows users to mark days with colored events, add labels, and visualize their year in different layouts.

Live at: https://calendar.komlev.me/

## Tech Stack

- **View Layer**: React 19 with TypeScript
- **Styling**: TailwindCSS 4.x + DaisyUI (component library)
- **State Management**: Nanostores with persistent storage
- **Build Tool**: Vite with SWC
- **Linter/Formatter**: Biome (replaces ESLint + Prettier)
- **Utilities**: date-fns, es-toolkit, nanoid

## Development Commands

```bash
# Install dependencies (use pnpm, required by package manager)
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Type checking
pnpm typecheck

# Lint
pnpm lint

# Format (auto-fix lint issues)
pnpm format

# Preview production build
pnpm preview

# Lint commit messages
pnpm lint-commit

# Bundle analysis
ANALYZE=1 pnpm build
```

## Architecture

### State Management with Nanostores

The app uses **Nanostores** for simple, atomic state management with persistence:

- `src/store/calendar.ts` - Main calendar data (events by day ID)
  - Events stored as `{ [dayId: string]: Event }` where `dayId` format is `"day.month.year"` (e.g., "15.3.2024")
  - Each Event has a `type` (color.pattern combo) and optional `label`
  - Persisted to localStorage automatically via `persistentAtom`

- `src/store/settings.ts` - User preferences (color, pattern, active tab, year, help modal state)
  - Defines available tabs: "Months", "Linear", "Columns"
  - Color/pattern selections control the event type for drawing

- `src/store/command.ts` - UI command state (draw mode, selected cell, label editing)
  - Handles drawing interactions and range selection

- `src/store/notifications.ts` - Toast notifications

### View Components

Three main calendar view modes (switched via tabs):

1. **MonthsView** (`src/components/MonthsView/`) - Traditional 12-month grid layout
2. **LinearView** (`src/components/LinearView/`) - Continuous linear timeline
3. **ColumnView** (`src/components/ColumnView/`) - Columnar week-based layout

Each view has a corresponding `use*.ts` hook that generates the calendar data structure using utilities from `src/utils/calendar.ts` and `src/utils/date.ts`.

### Event System

Events are identified by combining color + pattern:

- Day ID format: `"day.month.year"` (e.g., `"25.12.2024"`)
- Event type: `"color.pattern"` (e.g., `"red.waves"` or `"blue.solid"`)
- Users can draw events by clicking/dragging on calendar cells
- Range selection supported via shift+click pattern
- Labels can be added to individual events

### Color/Pattern System

Defined in `src/style/colors.ts`:

- **Colors**: Dynamically generated from Tailwind colors (excluding grays)
- **Patterns**: SVG-based patterns (zigZag, trees, waves, diagonalLines, clouds) + "solid"
- Background property generation in `src/utils/calendar.ts` handles both solid colors and patterned backgrounds

### Key Utilities

- `src/utils/date.ts` - Date manipulation, day ID generation/parsing
- `src/utils/calendar.ts` - Event ID generation, background property creation
- `src/utils/device.ts` - Device detection helpers

## Code Style

The project uses **Biome** for linting and formatting:

- Double quotes for strings (configured in biome.json)
- Editorconfig-based indentation (spaces)
- Auto-organize imports enabled
- Two rules disabled: `noArrayIndexKey`, `noNonNullAssertion`
- Tailwind directives supported in CSS parser

## Commit Conventions

Uses **Commitizen** with **commitlint** (Conventional Commits):

Allowed commit types: `build`, `chore`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor`, `revert`, `style`, `test`, `bump`

Format: `type(scope?): description`

Pre-commit hooks enforce commit message format validation.

## Build Configuration

`vite.config.ts` includes:

- React plugin with SWC
- TailwindCSS Vite plugin
- Custom HTML transform plugin (injects version from package.json)
- Bundle analyzer (enabled via `ANALYZE=1` env var)

## Requirements

- Node.js >= 24.10.0
- pnpm >= 10.20.0 (strict package manager enforcement)
