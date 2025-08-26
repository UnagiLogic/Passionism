# Copilot Instructions for Passionism

## Project Overview

Passionism is a research-based game that combines passion for learning with interactive gameplay. The project allows users to research different subjects, manage time and attributes, and engage with the content through a Discord bot integration.

## Architecture & Technology Stack

### Backend (Root Directory)
- **Runtime**: Deno with TypeScript
- **Database**: PostgreSQL with `pg` client library
- **Main Files**: 
  - `main.ts` - Entry point and core logic
  - `main_test.ts` - Deno tests using `@std/assert`
  - `deno.json` - Deno configuration with tasks and imports

### Frontend (passionism-app/)
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with HMR
- **State Management**: Redux Toolkit with React-Redux
- **Styling**: CSS with nested selectors, CSS modules pattern
- **Linting**: ESLint with TypeScript rules and React-specific plugins

## Code Organization & Conventions

### Directory Structure
```
/                           # Deno backend
├── main.ts                # Backend entry point
├── deno.json             # Deno configuration
└── passionism-app/       # React frontend
    ├── src/              # Source code
    │   ├── PassionismApp.tsx    # Main app component
    │   ├── classes.ts           # Game class definitions
    │   ├── gameSlice.ts         # Redux slice for game state
    │   └── store.ts             # Redux store configuration
    └── Components/       # React components (note: uppercase 'C')
        ├── Researcher.tsx
        ├── ActionBox.tsx
        ├── MainScreen.tsx
        └── *HUD.tsx      # UI overlay components
```

### Important Naming Conventions
- **Components Directory**: Use uppercase `Components/` (not `components/`)
- **React Components**: PascalCase with `.tsx` extension
- **TypeScript Files**: camelCase with `.ts` extension
- **CSS Classes**: kebab-case with BEM-style modifiers

### Import Patterns
```typescript
// Correct import paths (note the uppercase 'C')
import Researcher from '../Components/Researcher'
import ActionBox from '../Components/ActionBox'

// Redux patterns with proper typing
import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '../src/store'
const dispatch = useDispatch<AppDispatch>()
const gameState = useSelector((state: RootState) => state.game)

// Game slice imports
import { sleep, updateTime } from '../src/gameSlice'
```

### Common Import Issues to Avoid
- ❌ `import Component from '../components/Component'` (lowercase 'c')
- ✅ `import Component from '../Components/Component'` (uppercase 'C')
- ❌ Missing RootState type imports in components using useSelector
- ✅ Always import and use proper TypeScript types for Redux

## Key Classes & Components

### Game Classes (`src/classes.ts`)
- `ResearcherClass`: Handles research subjects and research functionality
- Constructor takes a subject string
- Has a `research()` method for logging research activity

### Redux State (`src/gameSlice.ts`)
```typescript
interface GameState {
  currentTime: number        // Timestamp in milliseconds
  timeSpentSleeping: number  // Total sleep time in seconds
  sleepStartTime?: number    // Sleep start timestamp (optional)
  isSleeping: boolean       // Current sleep state
  health: number            // Player health (0-100+)
  mana: number             // Player mana
  focus: number            // Player focus
}
```

### Core Components
- `PassionismApp`: Main application component with HUD layout
- `Researcher`: Manages research state, timing, and subject assignment using React hooks
- `ActionBox`: Game action interface with sleep confirmation dialogs
- `MainScreen`: Primary game display area  
- `*HUD` components: UI overlays (TimeHUD, AttributeHUD, etc.)
- `SleepScreen`: Modal component shown during sleep state

### State Management Patterns
- Use Redux Toolkit's `createSlice` for state management
- Game state includes time tracking, player attributes, and sleep mechanics
- Actions: `updateTime()`, `sleep()` (toggles sleep state and calculates benefits)
- Connect components using `useSelector` and `useDispatch` hooks with proper TypeScript types

## Development Workflow

### Linting & Building
```bash
# Frontend (in passionism-app/)
npm install          # Install dependencies
npm run lint         # Run ESLint
npm run build        # TypeScript compilation + Vite build
npm run dev          # Development server with HMR

# Backend (in root)
deno task dev        # Run with file watching
deno test           # Run tests
```

### Database Integration
- Use PostgreSQL with connection pooling
- Configuration in `database.config.js`
- Implement async query patterns with proper error handling and connection cleanup

## Common Patterns

### Game-Specific Patterns

#### Sleep System Implementation
```typescript
// Sleep action dispatching with confirmation
const handleSleepConfirm = () => {
  dispatch(sleep()) // Toggles sleep state, calculates time/benefits
  setShowSleepConfirmation(false)
  setShowSleepScreen(true)
}

// Wake up action (same action, different UI state)
const handleWakeUp = () => {
  dispatch(sleep()) // Toggles back to awake, applies stat benefits
  setShowSleepScreen(false)
}
```

#### Time Tracking Pattern
```typescript
// Research timer with useEffect cleanup
useEffect(() => {
  let interval: NodeJS.Timer
  if (isResearching) {
    interval = setInterval(() => {
      setResearchTime((prevTime) => prevTime + 1)
    }, 1000)
  } else {
    clearInterval(interval)
  }
  return () => clearInterval(interval) // Always cleanup
}, [isResearching])
```

### React Component Structure
```typescript
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '../src/store'

function ComponentName() {
  const [localState, setLocalState] = useState(initialValue)
  const gameState = useSelector((state: RootState) => state.game)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    // Side effects and cleanup
    return () => cleanup()
  }, [dependencies])

  return (
    <div className="component-name">
      {/* JSX content */}
    </div>
  )
}

export default ComponentName
```

### Database Query Pattern
```typescript
async function query(text: string, params?: any[]) {
  const client = await pool.connect()
  try {
    const result = await client.query(text, params)
    return result.rows
  } catch (err) {
    console.error(err)
    throw err
  } finally {
    client.release()
  }
}
```

### Redux Slice Pattern
```typescript
import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'sliceName',
  initialState,
  reducers: {
    actionName: (state, action) => {
      // Immer-based mutations
    }
  }
})

export const { actionName } = slice.actions
export default slice.reducer
```

## Best Practices

### Code Quality
- Fix unused variable warnings promptly (`@typescript-eslint/no-unused-vars`)
- Use proper TypeScript types, avoid `any` when possible
- Always import `RootState` and `AppDispatch` types for Redux components
- Implement proper error handling in async operations
- Clean up intervals and subscriptions in `useEffect` cleanup functions

### Component Design
- Keep components focused on single responsibilities
- Use custom hooks for reusable stateful logic (e.g., research timer logic)
- Implement proper loading and error states
- Use semantic HTML and accessible markup
- Handle confirmation dialogs for important actions (like sleep)

### Game Development Patterns
- Use millisecond timestamps for precise time tracking
- Apply stat benefits when sleep cycles complete
- Implement confirmation dialogs for state-changing actions
- Use local state for UI concerns, Redux for game state
- Always clean up timers and intervals

### Performance
- Use `useCallback` and `useMemo` for expensive operations
- Implement proper dependency arrays in `useEffect`
- Consider component memoization with `React.memo` where appropriate
- Clean up intervals to prevent memory leaks

## Discord Integration Context
- The project includes Discord.js for bot functionality
- Game actions should be compatible with Discord command interfaces
- Consider Discord message formatting and interaction patterns

## Testing Strategy
- Backend tests use Deno's built-in test runner with `@std/assert`
- Follow existing test patterns in `main_test.ts`
- Test core game logic and database operations
- Component testing should focus on user interactions and state changes

## Known Issues & Troubleshooting

### Common Build Issues
1. **Import Path Casing**: Component imports must use uppercase `Components/` directory
   - ❌ `import Researcher from '../components/Researcher'`
   - ✅ `import Researcher from '../Components/Researcher'`

2. **Missing TypeScript Types**: Always import Redux types
   ```typescript
   import type { RootState, AppDispatch } from '../src/store'
   ```

3. **Unused Variables**: Check ESLint warnings and remove unused imports/variables
   - Common in `useDispatch` imports that aren't used
   - Timer variables that should be typed as `NodeJS.Timer`

### Development Setup
1. Install dependencies: `npm install` in `passionism-app/`
2. For Deno development: Install Deno CLI separately
3. Frontend dev server: `npm run dev` (requires dependency installation)
4. Linting: `npm run lint` (fix import issues before building)

### Game Logic Tips
- Sleep action is a toggle - same action for sleep/wake with different UI states
- Research timers need proper cleanup to prevent memory leaks
- Time tracking uses milliseconds internally, display in seconds/minutes