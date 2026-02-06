# Testing Suite Skill

## Description
This skill provides the tools and workflows for testing the application code. It uses **Vitest** for unit and component testing, and provides a setup for **Playwright** for end-to-end testing.

## Commands
- `npm run test`: Run unit and component tests.
- `npm run test:e2e`: Run E2E tests (requires Playwright setup).
- `npx playwright test`: Run Playwright tests manually.

## Writing Tests
- Place unit tests next to the file being tested or in a `__tests__` directory.
- Use `*.test.tsx` or `*.spec.ts` extensions.
- Import `render`, `screen`, etc. from `@testing-library/react`.

### Example Component Test
```tsx
import { render, screen } from '@testing-library/react';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    // render(<MyComponent />);
    // expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

## E2E Testing
To run E2E tests for the first time:
1. `npx playwright install` to download browsers.
2. `npm run test:e2e`
