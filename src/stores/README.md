# Todos Store Configuration

## Environment-Based Data Source

The todos store can now switch between real API calls (axios) and mocked data based on environment variables.

### Environment Variables

**`VITE_USE_MOCK_DATA`**: Set to `'true'` to use mocked data, or `'false'` to use real axios API calls.

### Configuration Files

- **`.env`** - Default configuration with **mocked data enabled** (committed to git)
- **`.env.local`** - Local override for **real API development** (git-ignored, create from `.env.local.example`)
- **`.env.test`** - Test environment (uses mocked data)

### Simple Setup

By default, the app uses **mocked data** (no backend required):

```bash
npm run dev  # Uses mocked data from .env
```

For local development with the **real API**:

1. Create `.env.local` (already done if it exists)
2. Run the dev server with json-server:

```bash
npm run server:dev  # .env.local sets VITE_USE_MOCK_DATA=false
```

#### Testing

```bash
# Uses .env.test (VITE_USE_MOCK_DATA=true)
npm run test:unit
```

#### Production Build

```bash
# Uses .env.production (VITE_USE_MOCK_DATA=true)
npm run build
```

The GitHub Actions workflow (`.github/workflows/deploy.yml`) is configured to build with `VITE_USE_MOCK_DATA=true` for deployment to GitHub Pages.

### Mock Data

Mock data is defined in `src/stores/todos.mock.ts` and includes:

- 3 sample todos with different properties
- Simulated network delays (200-300ms)
- Full CRUD operations (fetch, fetchById, add, delete, update)

### Implementation Details

The store checks `import.meta.env.VITE_USE_MOCK_DATA` at initialization:

- When `'true'`: Uses `mockApi` functions from `todos.mock.ts`
- When `'false'`: Uses axios to call `http://localhost:3001/todos`

All store methods (`fetchTodos`, `fetchTodoById`, `addTodo`, `deleteTodo`) support both modes transparently.

### Benefits

✅ **Simple setup** - Works out of the box with mocked data  
✅ **No backend required by default** - Perfect for quick demos and testing  
✅ **Easy local development** - Just create `.env.local` to use real API  
✅ **Git-friendly** - `.env.local` is ignored, each dev has their own config  
✅ **Production ready** - Deploys with mocked data automatically

### Quick Reference

```bash
# Default: Mocked data (no backend needed)
npm run dev

# Local dev with real API: Create .env.local first
npm run server:dev

# Testing: Always uses mocked data
npm run test:unit

# Production build: Uses mocked data from .env
npm run build
```

### Environment Priority

Vite loads environment files in this order (later files override earlier):

1. `.env` - Base config (mocked data)
2. `.env.local` - Local overrides (real API) - **git-ignored**
3. `.env.test` - Test environment (mocked data)

GitHub Actions uses only `.env` (mocked data) for deployment.

### Customizing Mock Data

Edit `src/stores/todos.mock.ts` to modify:

- Initial todos in `mockTodos` array
- Network delay durations
- Mock API behavior and error handling
