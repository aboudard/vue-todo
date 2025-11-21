import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import BaseInput from '../BaseInput.vue'

// Mock PrimeVue components
vi.mock('primevue', () => ({
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
}))

describe('BaseInput', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders InputNumber and ToggleSwitch components', () => {
    const wrapper = mount(BaseInput, {
      props: {
        hours: 5,
        completed: false,
      },
    })

    expect(wrapper.find('input[type="number"]').exists()).toBe(true)
    expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true)
  })

  it('displays correct initial values', () => {
    const wrapper = mount(BaseInput, {
      props: {
        hours: 10,
        completed: true,
      },
    })

    const numberInput = wrapper.find('input[type="number"]')
    const toggleInput = wrapper.find('input[type="checkbox"]')

    expect((numberInput.element as HTMLInputElement).value).toBe('10')
    expect((toggleInput.element as HTMLInputElement).checked).toBe(true)
  })

  it('emits update:completed when ToggleSwitch changes', async () => {
    const wrapper = mount(BaseInput, {
      props: {
        hours: 5,
        completed: false,
      },
    })

    const toggleInput = wrapper.find('input[type="checkbox"]')
    await toggleInput.setValue(true)

    expect(wrapper.emitted('update:completed')).toBeTruthy()
    expect(wrapper.emitted('update:completed')![0]).toEqual([true])
  })

  it('emits update:hours when InputNumber changes', async () => {
    const wrapper = mount(BaseInput, {
      props: {
        hours: 5,
        completed: false,
      },
    })

    const numberInput = wrapper.find('input[type="number"]')
    await numberInput.setValue('15')

    expect(wrapper.emitted('update:hours')).toBeTruthy()
    expect(wrapper.emitted('update:hours')![0]).toEqual([15])
  })

  it('converts string hours to number correctly', async () => {
    const wrapper = mount(BaseInput, {
      props: {
        hours: 0,
        completed: false,
      },
    })

    const numberInput = wrapper.find('input[type="number"]')
    await numberInput.setValue('25')

    expect(wrapper.emitted('update:hours')![0]).toEqual([25])
    expect(typeof wrapper.emitted('update:hours')![0][0]).toBe('number')
  })

  it('handles undefined hours prop', () => {
    const wrapper = mount(BaseInput, {
      props: {
        completed: true,
      },
    })

    expect(wrapper.find('input[type="number"]').exists()).toBe(true)
    expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true)
  })
})
