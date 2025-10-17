# Vue Todo App - AI Coding Agent Instructions

## Architecture Overview

This is a Vue 3 + TypeScript todo application with PrimeVue UI components, Pinia state management, and a json-server backend. Key architectural decisions:

- **Composition API with `<script setup>`** - All components use the Composition API syntax
- **Pinia stores with composition API style** - Uses `defineStore()` with setup function syntax (not options API)
- **PrimeVue with custom theme preset** - Custom theme defined in `src/my-preset.ts` extending Material design
- **Route-level code splitting** - All views are lazy-loaded with `() => import()`

## Development Workflow

### Essential Commands

```bash
# Start dev server with json-server backend
npm run server:dev  # Runs both frontend (port 5300) and json-server (port 3001)

# Individual commands
npm run dev         # Frontend only (port 5300, proxies /api to port 3001)
npm run server      # json-server only (port 3001, watches db.json)
npm test:unit       # Vitest unit tests
npm run build       # Production build with type checking
```

### Backend Mock Server

- Uses `json-server` with `db.json` as the data source
- API base URL: `http://localhost:3001`
- Contains `todos`, `hello`, and `translations` endpoints
- Todo operations use direct axios calls (no API abstraction layer)

## Key Patterns & Conventions

### Store Architecture (Pinia)

```typescript
// All stores use composition API style with reactive refs
export const useTodosStore = defineStore('storeName', () => {
  const data = ref<Type[]>([])
  const computed = computed(() => /* logic */)

  async function asyncAction() {
    // Direct axios calls, no service layer
    const response = await axios.get<Type[]>('http://localhost:3001/endpoint')
    data.value = response.data
  }

  return { data, computed, asyncAction }
})
```

### Component Patterns

- **PrimeVue components**: Import individually (`Button`, `DataTable`, `Toast`, etc.)
- **Form handling**: Use `@primevue/forms` with `Form` component and validation
- **UI feedback**: Combine `useToast()` and `useConfirm()` for user interactions
- **Template refs**: Use `useTemplateRef<ComponentType>('refName')` for component access

### Route Structure

- All routes defined in `src/router/index.ts` with custom `AppRoute` type
- Global navigation guards in `src/guards/loader.guard.ts` manage loading states
- Breadcrumb metadata: `meta.breadcrumb` array with `{ label, to }` objects
- Active link styling: `linkActiveClass: 'bg-primary text-primary-content'`

### Styling & Theming

- **Tailwind CSS v4** with PrimeUI plugin (`tailwindcss-primeui`)
- **Custom PrimeVue theme**: `src/my-preset.ts` extends Material with custom colors
- **Theme system**: Supports light/dark modes with `darkModeSelector: 'system'`
- **Color customization**: Custom purple palette and toast component styling

### TypeScript Models

```typescript
// Models follow this structure pattern
export interface Todo {
  id?: string
  title: string
  completed: boolean
  data: { val: string; code: number } // Nested required objects
  categories: Option[] // Array of reference types
  category: string // Single reference
  hours?: number // Optional primitives
}
```

### Testing Setup

- **Vitest** with jsdom environment
- **Store testing**: Mock axios, use `setActivePinia(createPinia())` in `beforeEach`
- **Mock pattern**: `vi.mock('axios')` then `axios.get.mockResolvedValue({ data: mockData })`
- **Error testing**: Always test both success and error paths with `console.error` spy

## Integration Points

### State Management Flow

1. Components call store actions directly (no additional service layer)
2. Store actions make axios HTTP calls to json-server
3. Store updates reactive refs, components react automatically
4. Loading states managed by global `useAppStore().setLoading()`

### Form Integration

```typescript
// PrimeVue Forms pattern with store integration
const formStore = useMyStore()
const refForm = useTemplateRef<FormInstance>('refForm')

// Initialize from store
:initialValues="formStore.data"

// Manual field updates
refForm.value?.setFieldValue('fieldName', newValue)
```

### Navigation & Loading

- Router guards automatically trigger loading states
- `setupLoaderGuard(router)` in main router file
- Components can manually trigger via `useAppStore().setLoading(boolean)`

## File Organization

- **Views**: Page-level components in `src/views/`
- **Components**: Reusable components in `src/components/` with `__tests__/` subdirectory
- **Stores**: Pinia stores in `src/stores/` with co-located `.test.ts` files
- **Models**: TypeScript interfaces in `src/models/`
- **Guards**: Route guards in `src/guards/`
- **Aliases**: Use `@/` for `src/` directory in imports
