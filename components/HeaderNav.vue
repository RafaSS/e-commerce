<template>
  <header class="sticky top-0 z-40 w-full border-b bg-background">
    <div class="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
      <div class="flex gap-6 md:gap-10">
        <NuxtLink to="/" class="flex items-center space-x-2">
          <Icon name="lucide:shopping-bag" class="h-6 w-6" />
          <span class="inline-block font-bold">ShopEase</span>
        </NuxtLink>
        <nav class="hidden gap-6 md:flex">
          <NuxtLink
            v-for="item in navItems"
            :key="item.href"
            :to="item.href"
            class="flex items-center text-lg font-medium transition-colors hover:text-primary"
          >
            {{ item.title }}
          </NuxtLink>
        </nav>
      </div>
      <div class="flex flex-1 items-center justify-end space-x-4">
        <nav class="flex items-center space-x-2">
          <NuxtLink to="/cart" class="relative">
            <Icon name="lucide:shopping-cart" class="h-6 w-6" />
            <span
              v-if="cartStore.itemCount > 0"
              class="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground"
            >
              {{ cartStore.itemCount }}
            </span>
          </NuxtLink>
          <NuxtLink v-if="!user" to="/auth/login">
            <Button variant="ghost" size="sm">
              <Icon name="lucide:log-in" class="mr-2 h-4 w-4" />
              Login
            </Button>
          </NuxtLink>
          <div v-else class="relative">
            <Button variant="ghost" size="sm" @click="toggleUserMenu">
              <Icon name="lucide:user" class="mr-2 h-4 w-4" />
              {{ user.email?.split('@')[0] }}
              <Icon name="lucide:chevron-down" class="ml-2 h-4 w-4" />
            </Button>
            <div
              v-if="isUserMenuOpen"
              class="absolute right-0 mt-2 w-48 rounded-md bg-background shadow-lg ring-1 ring-black ring-opacity-5"
            >
              <div class="py-1">
                <NuxtLink to="/profile" class="block px-4 py-2 text-sm hover:bg-muted">Profile</NuxtLink>
                <NuxtLink to="/orders" class="block px-4 py-2 text-sm hover:bg-muted">Orders</NuxtLink>
                <a href="#" class="block px-4 py-2 text-sm hover:bg-muted" @click="logout">Logout</a>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'
import { ref, onMounted, onUnmounted } from 'vue'

const cartStore = useCartStore()
const client = useSupabaseAuthClient()
const user = useSupabaseUser()

const navItems = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'Products',
    href: '/products',
  },
  {
    title: 'About',
    href: '/about',
  },
]

const isUserMenuOpen = ref(false)

const toggleUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value
}

const closeUserMenu = (e: MouseEvent) => {
  // Close menu when clicking outside
  if (isUserMenuOpen.value) {
    isUserMenuOpen.value = false
  }
}

const logout = async () => {
  await client.auth.signOut()
  navigateTo('/auth/login')
}

onMounted(() => {
  document.addEventListener('click', closeUserMenu)
})

onUnmounted(() => {
  document.removeEventListener('click', closeUserMenu)
})
</script>
