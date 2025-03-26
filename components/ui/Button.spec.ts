import { mount } from '@vue/test-utils'
import Button from './Button.vue'

describe('Button Component', () => {
  test('renders properly with default props', () => {
    const wrapper = mount(Button, {
      props: {
        type: 'button'
      },
      slots: {
        default: 'Click me'
      }
    })
    
    expect(wrapper.text()).toBe('Click me')
    expect(wrapper.attributes('type')).toBe('button')
    expect(wrapper.classes()).toContain('button')
    expect(wrapper.classes()).toContain('variant-default')
    expect(wrapper.classes()).toContain('size-default')
  })
  
  test('applies different variants correctly', async () => {
    const wrapper = mount(Button, {
      props: {
        type: 'button',
        variant: 'outline'
      },
      slots: {
        default: 'Outline Button'
      }
    })
    
    expect(wrapper.classes()).toContain('variant-outline')
    
    await wrapper.setProps({ variant: 'ghost' })
    expect(wrapper.classes()).toContain('variant-ghost')
    
    await wrapper.setProps({ variant: 'link' })
    expect(wrapper.classes()).toContain('variant-link')
  })
  
  test('applies different sizes correctly', async () => {
    const wrapper = mount(Button, {
      props: {
        type: 'button',
        size: 'sm'
      }
    })
    
    expect(wrapper.classes()).toContain('size-sm')
    
    await wrapper.setProps({ size: 'lg' })
    expect(wrapper.classes()).toContain('size-lg')
  })
  
  test('shows loading state correctly', async () => {
    const wrapper = mount(Button, {
      props: {
        type: 'button',
        isLoading: true
      },
      slots: {
        default: 'Loading'
      }
    })
    
    // Should show loading icon and be disabled
    expect(wrapper.find('[data-testid="loading-spinner"]').exists()).toBe(true)
    expect(wrapper.attributes('disabled')).toBeDefined()
  })
  
  test('emits click event when clicked', async () => {
    const wrapper = mount(Button, {
      props: {
        type: 'button'
      },
      slots: {
        default: 'Click me'
      }
    })
    
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })
  
  test('does not emit click event when disabled', async () => {
    const wrapper = mount(Button, {
      props: {
        type: 'button',
        disabled: true
      },
      slots: {
        default: 'Disabled'
      }
    })
    
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })
})
