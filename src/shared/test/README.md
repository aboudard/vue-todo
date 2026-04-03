# Vue Components Unit Tests

This directory contains comprehensive unit tests for all Vue components in the project. All tests are written using Vitest and Vue Test Utils following the project's architecture guidelines.

## Test Coverage

### Components Tested

- ✅ **UpComp.vue** - Simple component with label prop
- ✅ **SubComp.vue** - Component that uses UpComp as child component
- ✅ **BaseInput.vue** - Form input component with PrimeVue components
- ✅ **FancyStuff.vue** - Component with slots and scoped slots
- ✅ **FancyStuffContent.vue** - Component with events and reactive state
- ✅ **CustomPopover.vue** - Popover component with exposed methods
- ✅ **ArraysInput.vue** - Complex form component with multiple inputs
- ✅ **MenuView.vue** - Navigation component with stores and routing

### Test Patterns Used

#### 1. **PrimeVue Component Mocking**

```typescript
vi.mock('primevue', () => ({
  Button: {
    name: 'Button',
    template: '<button @click="$emit(\'click\')">{{ label }}</button>',
    props: ['label'],
    emits: ['click'],
  },
}))
```

#### 2. **Store Testing with Pinia**

```typescript
beforeEach(() => {
  setActivePinia(createPinia())
  vi.clearAllMocks()
})
```

#### 3. **Router Mocking**

```typescript
vi.mock('vue-router', () => ({
  useRouter: () => mockRouter,
  RouterLink: {
    name: 'RouterLink',
    template: '<a><slot /></a>',
    props: ['to'],
  },
}))
```

#### 4. **Event Testing**

```typescript
await button.trigger('click')
expect(wrapper.emitted('eventName')).toBeTruthy()
expect(wrapper.emitted('eventName')![0]).toEqual([expectedValue])
```

#### 5. **Slot Testing**

```typescript
const wrapper = mount(Component, {
  slots: {
    default: '<p>Test content</p>',
    header: '<h1>Header</h1>',
  },
})
```

#### 6. **Props and Reactive State Testing**

```typescript
expect(wrapper.props('propName')).toBe(expectedValue)
expect(wrapper.text()).toContain('expectedText')
```

## Test Structure

Each test file follows this structure:

1. **Imports and Setup** - Import dependencies and components
2. **Mocking** - Mock external dependencies (PrimeVue, router, etc.)
3. **Test Suite** - Describe block with component name
4. **Setup** - beforeEach with Pinia and mock resets
5. **Test Cases** - Individual test cases covering different scenarios

## Key Testing Scenarios Covered

- ✅ **Props validation** - Correct prop handling and validation
- ✅ **Event emission** - Component events are properly emitted
- ✅ **Slot rendering** - Default and named slots render correctly
- ✅ **Store integration** - Pinia store interactions work properly
- ✅ **User interactions** - Button clicks, form inputs, etc.
- ✅ **Conditional rendering** - Components render based on props/state
- ✅ **Error handling** - Components handle edge cases gracefully
- ✅ **CSS classes** - Correct styling classes are applied
- ✅ **Component composition** - Parent/child component relationships

## Running Tests

```bash
# Run all tests
npm run test:unit

# Run tests in watch mode
npm run test:unit -- --watch

# Run tests with coverage
npm run test:unit -- --coverage
```

## TypeScript Support

All tests are written in TypeScript with proper type checking:

- Proper typing for component props and events
- Type-safe mocking of external dependencies
- ESLint compliance with project rules
- Vue Test Utils type definitions

## Best Practices Followed

1. **Isolated Testing** - Each component tested independently
2. **Comprehensive Coverage** - All component functionality tested
3. **Readable Tests** - Clear test descriptions and assertions
4. **Maintainable Mocks** - Reusable and simple mock implementations
5. **Performance** - Fast test execution with proper cleanup
6. **Documentation** - Clear test structure and comments where needed
