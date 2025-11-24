# Amartha Dashboard

A 2-step role-based wizard form (Admin & Ops) and Employee List Page built with React, TypeScript, and Vite.

## Setup & Run Instructions

### Prerequisites

- **Node.js** v18 or higher
- **pnpm** (recommended) or npm/yarn
- **Git** (for cloning the repository)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd amartha-dashboard
```

2. Install dependencies:
```bash
pnpm install
```

### Local Development

#### Option 1: Run Everything Together (Recommended)

Start both the frontend dev server and mock API servers in one command:

```bash
pnpm run dev:all
```

This will start:
- Frontend dev server on `http://localhost:5173` (or next available port)
- API Step 1 server on `http://localhost:4001` (departments, basicInfo)
- API Step 2 server on `http://localhost:4002` (locations, details)

#### Option 2: Run Separately

**Terminal 1 - Start Frontend:**
```bash
pnpm run dev
```

**Terminal 2 - Start Mock APIs:**
```bash
pnpm run dev:api
```

This runs both API servers concurrently:
- `http://localhost:4001` - Step 1 API (departments, basicInfo)
- `http://localhost:4002` - Step 2 API (locations, details)

### Environment Variables

#### Local Development

For local development, the API endpoints default to:
- `http://localhost:4001` (Step 1: departments, basicInfo)
- `http://localhost:4002` (Step 2: locations, details)

No environment variables needed for local development.

#### Production Deployment

For production (Vercel/Netlify/etc.), set these environment variables:

- `VITE_API_STEP1_URL` - API endpoint for step 1 (departments, basicInfo)
- `VITE_API_STEP2_URL` - API endpoint for step 2 (locations, details)

**Example:**
```bash
VITE_API_STEP1_URL=https://your-api-step1.railway.app
VITE_API_STEP2_URL=https://your-api-step2.railway.app
```

**Important:** After setting environment variables in your hosting platform, you must **redeploy** the application for changes to take effect.

### Building for Production

```bash
pnpm run build
```

The built files will be in the `dist` directory. You can preview the production build locally:

```bash
pnpm run preview
```

### Available Scripts

```bash
# Development
pnpm run dev          # Start frontend dev server
pnpm run dev:api      # Start both mock API servers
pnpm run dev:all      # Start frontend + APIs together

# API Servers (individual)
pnpm run api:step1    # Start API server on port 4001
pnpm run api:step2    # Start API server on port 4002

# Building
pnpm run build        # Build for production
pnpm run preview      # Preview production build

# Testing
pnpm test             # Run tests
pnpm test:ui          # Run tests with UI
pnpm test:coverage    # Run tests with coverage report

# Linting
pnpm run lint         # Run ESLint
```

## Hosted Demo URL

**Live Application:** https://amartha-dashboard.vercel.app/

The application is deployed on Vercel. Note that the API endpoints need to be configured via environment variables for the select department and location features to work properly in production.

## Testing Notes

### Test Coverage

- **Total Test Files:** 29
- **Total Tests:** 216
- **Test Framework:** Vitest with React Testing Library
- **Test Status:** ✅ All tests passing

### Test Structure

The test suite follows a user-centric approach, focusing on what users can see and interact with rather than implementation details:

1. **Component Tests** (`src/components/ui/__tests__/`)
   - Button, Select, Stepper, Textfield components
   - Tests verify user interactions and visual feedback

2. **Feature Tests** (`src/features/wizard/__tests__/`)
   - FormAdmin and FormOps wizard forms
   - Tests verify form validation, navigation, and submission flows
   - Tests verify autocomplete functionality for departments and locations

3. **Hook Tests** (`src/hooks/__tests__/`)
   - useDebounce, use-local-storage, use-stepper hooks
   - Tests verify hook behavior and edge cases

4. **Service Tests** (`src/services/__tests__/`)
   - API service layer tests
   - Tests verify data fetching, validation, and error handling

5. **Utility Tests** (`src/utils/__tests__/`)
   - Employee ID generation logic
   - Tests verify ID format and sequential numbering

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode (for development)
pnpm test --watch

# Run tests with UI
pnpm test:ui

# Run tests with coverage report
pnpm test:coverage

# Run specific test file
pnpm test -- src/features/wizard/form-admin/__tests__/FormAdmin.test.tsx
```

### Key Test Scenarios Covered

- ✅ Form field rendering and user interactions
- ✅ Form validation (required fields, email format, etc.)
- ✅ Step navigation (Admin: 2 steps, Ops: 1 step)
- ✅ Employee ID auto-generation based on department
- ✅ Department and Location autocomplete functionality
- ✅ Form submission with sequential POST requests
- ✅ Error handling and loading states
- ✅ File upload for photo field
- ✅ Controlled component behavior for Select fields

### Testing Approach

- **User-Centric Testing:** Tests focus on user-visible behavior and interactions
- **Accessibility:** Tests use semantic queries (getByLabelText, getByRole)
- **Mocking:** External dependencies (API calls, hooks) are properly mocked
- **Isolation:** Each test is independent and doesn't rely on previous test state

## Remaining Features / Future Enhancements

The following features have been identified but are not yet implemented:

### 1. Draft Auto-Save with Toast Notifications
- **Status:** Not implemented
- **Description:** Automatically save form data to localStorage after 2 seconds of inactivity
- **Requirements:**
  - Debounce form values (2 seconds)
  - Save draft data to localStorage using `saveDraft` utility
  - Show success toast notification when draft is saved
  - Separate drafts for Admin (`draft_admin`) and Ops (`draft_ops`) forms
- **Utilities Available:** `useDebounce` hook and `saveDraft` function already exist

### 2. Draft Restore on Page Reload
- **Status:** Not implemented
- **Description:** Restore saved draft data when user returns to the form
- **Requirements:**
  - Load draft from localStorage on component mount
  - Populate form fields with saved data
  - Show toast notification when draft is restored
  - Provide option to clear/ignore restored draft
- **Utilities Available:** `loadDraft` function already exists

### 3. Clear Draft Button
- **Status:** Not implemented
- **Description:** UI button to manually clear saved drafts
- **Requirements:**
  - Add "Clear Draft" button to form UI
  - Clear draft from localStorage when clicked
  - Show confirmation toast after clearing
  - Reset form to default values
- **Utilities Available:** `clearDraft` function already exists

### 4. Image Preview for Photo Upload
- **Status:** Not implemented
- **Description:** Display preview of selected image before form submission
- **Requirements:**
  - Show thumbnail/preview of uploaded image
  - Display preview after file selection
  - Option to remove/replace image
  - Handle image loading errors gracefully
- **Current State:** Photo upload works but only shows filename, no preview

### 5. Progress Bar / Submission Logs
- **Status:** Not implemented
- **Description:** Visual feedback during form submission process
- **Requirements:**
  - Show progress bar during multi-step submission (Admin form)
  - Display step-by-step logs (e.g., "Submitting basic info...", "Submitting details...")
  - Show success/error status for each step
  - Provide detailed error messages if submission fails
- **Current State:** Only shows "Submitting..." text, no visual progress indicator

### Implementation Notes

- All localStorage utilities (`saveDraft`, `loadDraft`, `clearDraft`) are already implemented and tested
- `useDebounce` hook is available for debouncing form values
- Toast notification system infrastructure exists (though components were removed)
- Form submission logic is in place and working
- Photo upload functionality exists but lacks preview

---

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
