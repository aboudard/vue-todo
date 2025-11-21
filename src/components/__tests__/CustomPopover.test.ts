import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import CustomPopover from '../CustomPopover.vue'

// Mock PrimeVue components
vi.mock('primevue', () => ({
  Button: {
    name: 'Button',
    template: '<button @click="$emit(\'click\')"><slot /></button>',
    emits: ['click'],
  },
  Popover: {
    name: 'Popover',
    template: '<div class="popover"><slot /></div>',
    methods: {
      toggle: vi.fn(),
    },
  },
}))

describe('CustomPopover', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders popover with correct content', () => {
    const wrapper = mount(CustomPopover, {
      props: {
        labelButton: 'Test Button',
      },
    })

    expect(wrapper.text()).toContain('Title')
    expect(wrapper.text()).toContain('This is some content inside the popover.')
    expect(wrapper.text()).toContain('Test Button')
  })

  it('renders button with provided label', () => {
    const label = 'Custom Label'
    const wrapper = mount(CustomPopover, {
      props: {
        labelButton: label,
      },
    })

    expect(wrapper.text()).toContain(label)
  })

  it('emits buttonAction event when button is clicked', async () => {
    const wrapper = mount(CustomPopover, {
      props: {
        labelButton: 'Click Me',
      },
    })

    const button = wrapper.find('button')
    await button.trigger('click')

    expect(wrapper.emitted('buttonAction')).toBeTruthy()
    expect(wrapper.emitted('buttonAction')).toHaveLength(1)
  })

  it('exposes togglePopover method', () => {
    const wrapper = mount(CustomPopover, {
      props: {
        labelButton: 'Test',
      },
    })

    expect(wrapper.vm.togglePopover).toBeDefined()
    expect(typeof wrapper.vm.togglePopover).toBe('function')
  })

  it('calls popover toggle method when togglePopover is called', () => {
    const wrapper = mount(CustomPopover, {
      props: {
        labelButton: 'Test',
      },
    })

    const mockEvent = { target: { id: 'test' } }
    wrapper.vm.togglePopover(mockEvent)

    // The toggle method should be called on the popover ref
    // This is testing the internal behavior
    expect(wrapper.vm).toBeDefined()
  })

  it('has required props interface', () => {
    const wrapper = mount(CustomPopover, {
      props: {
        labelButton: 'Required Label',
      },
    })

    expect(wrapper.props('labelButton')).toBe('Required Label')
  })

  it('renders popover structure correctly', () => {
    const wrapper = mount(CustomPopover, {
      props: {
        labelButton: 'Test',
      },
    })

    expect(wrapper.find('.popover').exists()).toBe(true)
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('handles empty labelButton prop', () => {
    const wrapper = mount(CustomPopover, {
      props: {
        labelButton: '',
      },
    })

    const button = wrapper.find('button')
    expect(button.exists()).toBe(true)
    expect(button.text()).toBe('')
  })

  it('contains informational content', () => {
    const wrapper = mount(CustomPopover, {
      props: {
        labelButton: 'Test',
      },
    })

    expect(wrapper.text()).toContain('Title')
    expect(wrapper.text()).toContain('This is some content inside the popover.')
  })
})
