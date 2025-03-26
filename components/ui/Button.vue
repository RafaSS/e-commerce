<template>
  <component
    :is="component"
    :class="[
      'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      variants[variant],
      sizes[size],
      className,
    ]"
    :disabled="isLoading || disabled"
    v-bind="props"
  >
    <Icon v-if="isLoading" name="lucide:loader-2" class="mr-2 h-4 w-4 animate-spin" />
    <slot />
  </component>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (val: string) =>
      ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'].includes(val),
  },
  size: {
    type: String,
    default: 'default',
    validator: (val: string) => ['default', 'sm', 'lg', 'icon'].includes(val),
  },
  className: {
    type: String,
    default: '',
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  asChild: {
    type: Boolean,
    default: false,
  },
  as: {
    type: String,
    default: 'button',
  },
})

const component = computed(() => props.as)

const variants = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/90',
  destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
  outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
  link: 'text-primary underline-offset-4 hover:underline',
}

const sizes = {
  default: 'h-10 px-4 py-2',
  sm: 'h-9 rounded-md px-3',
  lg: 'h-11 rounded-md px-8',
  icon: 'h-10 w-10',
}
</script>
