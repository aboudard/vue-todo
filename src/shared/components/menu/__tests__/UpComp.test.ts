import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import UpComp from '../UpComp.vue'

describe('UpComp', () => {
  it('renders the label prop correctly', () => {
    const label = 'Test Label'
    const wrapper = mount(UpComp, {
      props: { label },
    })

    expect(wrapper.text()).toBe(label)
  })

  it('renders with empty label', () => {
    const wrapper = mount(UpComp, {
      props: { label: '' },
    })

    expect(wrapper.text()).toBe('')
  })

  it('has correct props interface', () => {
    const wrapper = mount(UpComp, {
      props: { label: 'Test' },
    })

    expect(wrapper.props('label')).toBe('Test')
  })
})
