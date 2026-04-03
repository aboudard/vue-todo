import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import FancyStuff from '../FancyStuff.vue'

// Mock window.alert
global.alert = vi.fn()

describe('FancyStuff', () => {
  it('renders default slot content', () => {
    const wrapper = mount(FancyStuff, {
      slots: {
        default: '<p>Test content</p>',
      },
    })

    expect(wrapper.html()).toContain('<p>Test content</p>')
  })

  it('renders header slot when provided', () => {
    const wrapper = mount(FancyStuff, {
      slots: {
        header: '<h1>Custom Header</h1>',
        default: '<p>Test content</p>',
      },
    })

    expect(wrapper.html()).toContain('<h1>Custom Header</h1>')
  })

  it('renders footer slot when provided', () => {
    const wrapper = mount(FancyStuff, {
      slots: {
        footer: '<div class="custom-footer">Custom Footer</div>',
        default: '<p>Test content</p>',
      },
    })

    expect(wrapper.html()).toContain('<div class="custom-footer">Custom Footer</div>')
  })

  it('renders default footer when footer slot not provided', () => {
    const wrapper = mount(FancyStuff, {
      slots: {
        default: '<p>Test content</p>',
      },
    })

    expect(wrapper.text()).toContain('Empty Footer')
  })

  it('provides scoped slot props to default slot', () => {
    const wrapper = mount(FancyStuff, {
      slots: {
        default: `
          <template #default="{ text, count, myCall }">
            <div>
              <span class="text">{{ text }}</span>
              <span class="count">{{ count }}</span>
              <button @click="myCall" class="call-btn">Call Function</button>
            </div>
          </template>
        `,
      },
    })

    expect(wrapper.find('.text').text()).toBe('Hello from FancyStuff!')
    expect(wrapper.find('.count').text()).toBe('12')
  })

  it('calls alert when myCall function is invoked', async () => {
    const wrapper = mount(FancyStuff, {
      slots: {
        default: `
          <template #default="{ myCall }">
            <button @click="myCall" class="call-btn">Call Function</button>
          </template>
        `,
      },
    })

    await wrapper.find('.call-btn').trigger('click')
    expect(global.alert).toHaveBeenCalledWith('Called from FancyStuff!')
  })

  it('has correct CSS classes', () => {
    const wrapper = mount(FancyStuff, {
      slots: {
        default: '<p>Test content</p>',
      },
    })

    const container = wrapper.find('div')
    expect(container.classes()).toContain('border')
    expect(container.classes()).toContain('rounded')
    expect(container.classes()).toContain('bg-gray-200')
    expect(container.classes()).toContain('p-4')
    expect(container.classes()).toContain('mb-3')
  })

  it('handles empty slots gracefully', () => {
    const wrapper = mount(FancyStuff)

    expect(wrapper.text()).toContain('Empty Footer')
    // Should not throw errors when mounted without any slots
    expect(wrapper.vm).toBeDefined()
  })
})
