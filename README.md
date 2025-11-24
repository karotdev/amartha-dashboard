# Amartha Dashboard

A 2-step role-based wizard form (Admin & Ops) and Employee List Page built with React, TypeScript, and Vite.

## Setup & Run Instructions

### Prerequisites
- Node.js (v18 or higher)
- pnpm (or npm/yarn)

### Installation
```bash
pnpm install
```

### Development

1. Start the development server:
```bash
pnpm run dev
```

2. In a separate terminal, start the mock API servers:
```bash
pnpm run dev:api
```

Or run both together:
```bash
pnpm run dev:all
```

### Environment Variables

For **production**, you need to set the following environment variables:

- `VITE_API_STEP1_URL` - API endpoint for step 1 (departments, basicInfo)
- `VITE_API_STEP2_URL` - API endpoint for step 2 (locations, details)

**Example for production:**
```bash
VITE_API_STEP1_URL=https://api.example.com:4001
VITE_API_STEP2_URL=https://api.example.com:4002
```

**For local development**, these default to:
- `http://localhost:4001` (step 1)
- `http://localhost:4002` (step 2)

### Building for Production

```bash
pnpm run build
```

The built files will be in the `dist` directory.

### Testing

```bash
# Run tests
pnpm test

# Run tests with UI
pnpm test:ui

# Run tests with coverage
pnpm test:coverage
```

## Hosted Demo URL

[Add your hosted demo URL here]

## Testing Notes

[Add your testing notes here]

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
