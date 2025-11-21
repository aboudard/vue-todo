import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import SubComp from '../sub/SubComp.vue'
import UpComp from '../UpComp.vue'

describe('SubComp', () => {
  it('renders the label prop correctly', () => {
    const label = 'Test Sub Component'
    const wrapper = mount(SubComp, {
      props: { label },
      global: {
        components: { UpComp },
      },
    })

    expect(wrapper.text()).toContain(label)
  })

  it('renders UpComp with correct label', () => {
    const label = 'Test Sub Component'
    const wrapper = mount(SubComp, {
      props: { label },
      global: {
        components: { UpComp },
      },
    })

    const upComp = wrapper.findComponent(UpComp)
    expect(upComp.exists()).toBe(true)
    expect(upComp.props('label')).toBe('Up Component')
  })

  it('displays both components with separator', () => {
    const label = 'Test Label'
    const wrapper = mount(SubComp, {
      props: { label },
      global: {
        components: { UpComp },
      },
    })

    const text = wrapper.text()
    expect(text).toContain(label)
    expect(text).toContain('-')
    expect(text).toContain('Up Component')
  })
})
