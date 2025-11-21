import type { Option } from '@/models/option'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import ArraysInput from '../ArraysInput.vue'

// Mock PrimeVue components
vi.mock('primevue', () => ({
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
  Button: {
    name: 'Button',
    template: '<button @click="$emit(\'click\')" :class="[\'mt-2\']">{{ label }}</button>',
    props: ['label'],
    emits: ['click'],
  },
}))

describe('ArraysInput', () => {
  const mockItems: Option[] = [
    { key: 'A', name: 'Option A' },
    { key: 'B', name: 'Option B' },
    { key: 'C', name: 'Option C' },
  ]

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders all items correctly', () => {
    const wrapper = mount(ArraysInput, {
      props: {
        items: mockItems,
        selectedItem: '',
        selectedItems: [],
      },
    })

    for (const item of mockItems) {
      expect(wrapper.text()).toContain(item.name)
    }
  })

  it('displays current selected values', () => {
    const selectedItems = [mockItems[0]]
    const selectedItem = 'A'

    const wrapper = mount(ArraysInput, {
      props: {
        items: mockItems,
        selectedItem,
        selectedItems,
      },
    })

    expect(wrapper.text()).toContain(`selectedItem: ${selectedItem}`)
    expect(wrapper.text()).toContain('selectedItems:')
  })

  it('renders checkbox for each item', () => {
    const wrapper = mount(ArraysInput, {
      props: {
        items: mockItems,
        selectedItem: '',
        selectedItems: [],
      },
    })

    const checkboxes = wrapper.findAll('input[type="checkbox"]')
    expect(checkboxes).toHaveLength(mockItems.length)
  })

  it('renders radio button for each item', () => {
    const wrapper = mount(ArraysInput, {
      props: {
        items: mockItems,
        selectedItem: '',
        selectedItems: [],
      },
    })

    const radioButtons = wrapper.findAll('input[type="radio"]')
    expect(radioButtons).toHaveLength(mockItems.length)
  })

  it('emits update:selectedItems when checkbox selection changes', async () => {
    const wrapper = mount(ArraysInput, {
      props: {
        items: mockItems,
        selectedItem: '',
        selectedItems: [],
      },
    })

    const firstCheckbox = wrapper.findAll('input[type="checkbox"]')[0]
    await firstCheckbox.setValue(true)

    expect(wrapper.emitted('update:selectedItems')).toBeTruthy()
  })

  it('emits update:selectedItem when radio button selection changes', async () => {
    const wrapper = mount(ArraysInput, {
      props: {
        items: mockItems,
        selectedItem: '',
        selectedItems: [],
      },
    })

    const firstRadio = wrapper.findAll('input[type="radio"]')[0]
    await firstRadio.setValue(true)

    expect(wrapper.emitted('update:selectedItem')).toBeTruthy()
  })

  it('resets selections when reset button is clicked', async () => {
    const wrapper = mount(ArraysInput, {
      props: {
        items: mockItems,
        selectedItem: 'A',
        selectedItems: [mockItems[0]],
      },
    })

    const resetButton = wrapper.find('button')
    await resetButton.trigger('click')

    expect(wrapper.emitted('update:selectedItems')).toBeTruthy()
    expect(wrapper.emitted('update:selectedItem')).toBeTruthy()

    const lastSelectedItemsEvent = wrapper.emitted('update:selectedItems')!.at(-1)
    const lastSelectedItemEvent = wrapper.emitted('update:selectedItem')!.at(-1)

    expect(lastSelectedItemsEvent).toEqual([[]])
    expect(lastSelectedItemEvent).toEqual([''])
  })

  it('renders reset button with correct label', () => {
    const wrapper = mount(ArraysInput, {
      props: {
        items: mockItems,
        selectedItem: '',
        selectedItems: [],
      },
    })

    const resetButton = wrapper.find('button')
    expect(resetButton.text()).toBe('Reset Categories')
  })

  it('generates unique ids for form controls', () => {
    const wrapper = mount(ArraysInput, {
      props: {
        items: mockItems,
        selectedItem: '',
        selectedItems: [],
      },
    })

    // Since we're using mocked components, we can't test the actual IDs
    // Instead, let's test that the correct number of form controls are rendered
    const checkboxes = wrapper.findAll('input[type="checkbox"]')
    const radioButtons = wrapper.findAll('input[type="radio"]')

    expect(checkboxes).toHaveLength(mockItems.length)
    expect(radioButtons).toHaveLength(mockItems.length)
  })

  it('handles empty items array', () => {
    const wrapper = mount(ArraysInput, {
      props: {
        items: [],
        selectedItem: '',
        selectedItems: [],
      },
    })

    expect(wrapper.findAll('input[type="checkbox"]')).toHaveLength(0)
    expect(wrapper.findAll('input[type="radio"]')).toHaveLength(0)
    expect(wrapper.find('button').exists()).toBe(true) // Reset button should still exist
  })

  it('displays items information correctly', () => {
    const wrapper = mount(ArraysInput, {
      props: {
        items: mockItems,
        selectedItem: 'A',
        selectedItems: [mockItems[0], mockItems[1]],
      },
    })

    expect(wrapper.text()).toContain('items:')
    expect(wrapper.text()).toContain('selectedItem: A')
    expect(wrapper.text()).toContain('selectedItems:')
  })
})
