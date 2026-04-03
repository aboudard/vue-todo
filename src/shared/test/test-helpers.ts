import type { VueWrapper } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { expect, vi } from 'vitest'

/**
 * Test helper utilities for Vue components
 */

/**
 * Setup Pinia store for testing
 * Call this in beforeEach to ensure clean store state
 */
export function setupTestPinia() {
  setActivePinia(createPinia())
}

/**
 * Common PrimeVue component mocks for testing
 */
export const primeVueMocks = {
  Button: {
    name: 'Button',
    template: '<button @click="$emit(\'click\')" :class="className">{{ label }}</button>',
    props: ['label', 'size', 'severity', 'outlined', 'className'],
    emits: ['click'],
  },
  InputText: {
    name: 'InputText',
    template:
      '<input type="text" :value="modelValue" @input="$emit(\'input\', $event.target.value)" />',
    props: ['modelValue', 'placeholder', 'name', 'fluid'],
    emits: ['input'],
  },
  InputNumber: {
    name: 'InputNumber',
    template:
      '<input type="number" :value="value" @input="$emit(\'value-change\', $event.target.value)" />',
    props: ['value', 'name', 'fluid'],
    emits: ['value-change'],
  },
  ToggleSwitch: {
    name: 'ToggleSwitch',
    template:
      '<input type="checkbox" :checked="value" @change="$emit(\'value-change\', $event.target.checked)" />',
    props: ['value', 'name'],
    emits: ['value-change'],
  },
  Checkbox: {
    name: 'Checkbox',
    template: '<input type="checkbox" @change="$emit(\'value-change\', $event.target.checked)" />',
    props: ['inputId', 'name', 'value', 'modelValue'],
    emits: ['value-change'],
  },
  RadioButton: {
    name: 'RadioButton',
    template: '<input type="radio" @change="$emit(\'value-change\', $event.target.value)" />',
    props: ['inputId', 'name', 'value', 'modelValue'],
    emits: ['value-change'],
  },
  Badge: {
    name: 'Badge',
    template: '<span class="badge" :data-value="value">{{ value }}</span>',
    props: ['value', 'severity'],
  },
  Toast: {
    name: 'Toast',
    template: '<div class="toast"></div>',
  },
  Card: {
    name: 'Card',
    template: '<div class="card"><slot /></div>',
  },
  Popover: {
    name: 'Popover',
    template: '<div class="popover"><slot /></div>',
    methods: {
      toggle: vi.fn(),
    },
  },
}

/**
 * Common Vue Router mocks for testing
 */
export const routerMocks = {
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    go: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
  }),
  useRoute: () => ({
    params: { id: '1' },
    query: {},
    path: '/',
    name: 'home',
  }),
  RouterLink: {
    name: 'RouterLink',
    template: '<a><slot /></a>',
    props: ['to'],
  },
}

/**
 * Mock vue-i18n for internationalization testing
 */
export const i18nMocks = {
  useI18n: () => ({
    locale: { value: 'en' },
    t: (key: string) => key,
  }),
}

/**
 * Helper to find component by test-id
 */
export function findByTestId(wrapper: VueWrapper, testId: string) {
  return wrapper.find(`[data-testid="${testId}"]`)
}

/**
 * Helper to wait for Vue's next tick and any async operations
 */
export async function nextTickAndWait(wrapper: VueWrapper, ms = 0) {
  await wrapper.vm.$nextTick()
  if (ms > 0) {
    await new Promise((resolve) => setTimeout(resolve, ms))
  }
}

/**
 * Helper to simulate user typing in an input field
 */
export async function typeInInput(wrapper: VueWrapper, selector: string, text: string) {
  const input = wrapper.find(selector)
  await input.setValue(text)
  await input.trigger('input')
  await wrapper.vm.$nextTick()
}

/**
 * Helper to simulate clicking a button by selector or test-id
 */
export async function clickButton(wrapper: VueWrapper, selectorOrTestId: string) {
  const button = selectorOrTestId.startsWith('[data-testid=')
    ? findByTestId(wrapper, selectorOrTestId.slice(13, -2))
    : wrapper.find(selectorOrTestId)

  await button.trigger('click')
  await wrapper.vm.$nextTick()
  return button
}

interface MountOptionsOverrides {
  global?: {
    components?: Record<string, unknown>
    mocks?: Record<string, unknown>
    stubs?: Record<string, unknown>
  }
}

/**
 * Common mount options for testing Vue components
 */
export function createMountOptions(overrides: MountOptionsOverrides = {}) {
  return {
    global: {
      components: {
        'router-link': routerMocks.RouterLink,
        ...overrides.global?.components,
      },
      mocks: overrides.global?.mocks || {},
      stubs: overrides.global?.stubs || {},
    },
  }
}

/**
 * Assert that an event was emitted with expected payload
 */
export function expectEventEmitted(
  wrapper: VueWrapper,
  eventName: string,
  expectedPayload?: unknown,
) {
  expect(wrapper.emitted(eventName)).toBeTruthy()

  if (expectedPayload !== undefined) {
    const events = wrapper.emitted(eventName)!
    const lastEvent = events.at(-1)
    expect(lastEvent).toEqual(Array.isArray(expectedPayload) ? expectedPayload : [expectedPayload])
  }

  return wrapper.emitted(eventName)!.length
}

/**
 * Mock console methods for testing
 */
export function mockConsole() {
  return {
    log: vi.spyOn(console, 'log').mockImplementation(() => {}),
    error: vi.spyOn(console, 'error').mockImplementation(() => {}),
    warn: vi.spyOn(console, 'warn').mockImplementation(() => {}),
    info: vi.spyOn(console, 'info').mockImplementation(() => {}),
  }
}
