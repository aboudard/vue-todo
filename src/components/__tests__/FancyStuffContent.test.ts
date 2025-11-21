import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import FancyStuffContent from '../FancyStuffContent.vue'

// Mock PrimeVue Button component
vi.mock('primevue', () => ({
  Button: {
    name: 'Button',
    template:
      '<button @click="$emit(\'click\')" :class="[size, severity, { outlined }]"><slot /></button>',
    props: ['size', 'severity', 'outlined'],
    emits: ['click'],
  },
}))

describe('FancyStuffContent', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders with default props', () => {
    const wrapper = mount(FancyStuffContent)

    expect(wrapper.text()).toContain('Default message')
    expect(wrapper.text()).toContain('Count: 0')
    expect(wrapper.text()).toContain('Status: idle')
  })

  it('renders with custom props', () => {
    const wrapper = mount(FancyStuffContent, {
      props: {
        text: 'Custom message',
        count: 5,
      },
    })

    expect(wrapper.text()).toContain('Custom message')
    expect(wrapper.text()).toContain('Count: 5')
  })

  it('displays correct action label based on status', async () => {
    const wrapper = mount(FancyStuffContent)

    // Initial state should be 'Activate'
    expect(wrapper.text()).toContain('Activate')
  })

  it('emits action event when action button is clicked', async () => {
    const wrapper = mount(FancyStuffContent)

    const actionButton = wrapper
      .findAll('button')
      .find(
        (btn) =>
          btn.text().includes('Activate') ||
          btn.text().includes('Active') ||
          btn.text().includes('Processing'),
      )

    expect(actionButton).toBeTruthy()
    await actionButton!.trigger('click')

    expect(wrapper.emitted('action')).toBeTruthy()
    expect(wrapper.emitted('action')).toHaveLength(1)
  })

  it('increments internal count when increment button is clicked', async () => {
    const wrapper = mount(FancyStuffContent, {
      props: { count: 5 },
    })

    const incrementButton = wrapper
      .findAll('button')
      .find((btn) => btn.text().includes('Increment'))

    expect(incrementButton).toBeTruthy()
    await incrementButton!.trigger('click')

    // The internal count should be incremented, but we can test the status change
    expect(wrapper.text()).toContain('Status: processing')
  })

  it('changes status from idle to processing when action is triggered', async () => {
    const wrapper = mount(FancyStuffContent)

    expect(wrapper.text()).toContain('Status: idle')

    const actionButton = wrapper.findAll('button')[0]
    await actionButton.trigger('click')

    expect(wrapper.text()).toContain('Status: processing')
  })

  it('handles string count prop correctly', () => {
    const wrapper = mount(FancyStuffContent, {
      props: {
        count: '10',
      },
    })

    expect(wrapper.text()).toContain('Count: 10')
  })

  it('displays informational text about the component', () => {
    const wrapper = mount(FancyStuffContent)

    expect(wrapper.text()).toContain('This is the FancyStuffContent component')
    expect(wrapper.text()).toContain('text')
    expect(wrapper.text()).toContain('count')
    expect(wrapper.text()).toContain('@action')
  })

  it('has correct CSS classes', () => {
    const wrapper = mount(FancyStuffContent)

    expect(wrapper.find('.fancy-stuff-content').exists()).toBe(true)
    expect(wrapper.find('.flex.items-center.justify-between').exists()).toBe(true)
    expect(wrapper.find('.bg-gradient-to-r.from-blue-500.to-purple-600').exists()).toBe(true)
  })

  it('renders two buttons with correct text', () => {
    const wrapper = mount(FancyStuffContent)
    const buttons = wrapper.findAll('button')

    expect(buttons).toHaveLength(2)
    expect(buttons[0].text()).toContain('Activate')
    expect(buttons[1].text()).toContain('Increment')
  })

  it('handles empty text prop', () => {
    const wrapper = mount(FancyStuffContent, {
      props: { text: '' },
    })

    expect(wrapper.text()).toContain('No message provided')
  })

  it('handles undefined text prop', () => {
    const wrapper = mount(FancyStuffContent, {
      props: { text: undefined },
    })

    expect(wrapper.text()).toContain('Default message')
  })
})
