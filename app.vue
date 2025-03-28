<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-white shadow-sm">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <NuxtLink to="/" class="text-xl font-bold">E-Shop</NuxtLink>
        <div class="flex items-center space-x-4">
          <NuxtLink to="/cart" class="relative">
            <span class="sr-only">Shopping Cart</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <!-- Dynamic cart item count badge -->
            <span v-if="cartStore.itemCount > 0" class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {{ cartStore.itemCount > 99 ? '99+' : cartStore.itemCount }}
            </span>
          </NuxtLink>
          <NuxtLink v-if="!authStore.isAuthenticated" to="/login" class="text-sm font-medium">Login</NuxtLink>
          <div v-else class="relative group">
            <button class="text-sm font-medium flex items-center">
              My Account
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
              <NuxtLink to="/account" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</NuxtLink>
              <NuxtLink to="/account/orders" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Orders</NuxtLink>
              <button @click="logout" class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>

    <main class="flex-grow container mx-auto px-4 py-8">
      <NuxtPage />
    </main>

    <footer class="bg-gray-100">
      <div class="container mx-auto px-4 py-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 class="text-lg font-semibold mb-4">E-Shop</h3>
            <p class="text-gray-600">Your one-stop shop for all your needs.</p>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-4">Links</h3>
            <ul class="space-y-2">
              <li><NuxtLink to="/" class="text-gray-600 hover:text-gray-900">Home</NuxtLink></li>
              <li><NuxtLink to="/products" class="text-gray-600 hover:text-gray-900">Products</NuxtLink></li>
              <li><NuxtLink to="/about" class="text-gray-600 hover:text-gray-900">About</NuxtLink></li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-4">Contact</h3>
            <address class="not-italic text-gray-600">
              <p>123 Shopping Street</p>
              <p>Market City, MC 12345</p>
              <p>Email: info@e-shop.com</p>
            </address>
          </div>
        </div>
        <div class="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {{ new Date().getFullYear() }} E-Shop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useCartStore } from '~/stores/cart';
import { useAuthStore } from '~/stores/auth';
import { onMounted } from 'vue';

const cartStore = useCartStore();
const authStore = useAuthStore();

// Load cart from localStorage on app mount
onMounted(() => {
  cartStore.loadFromLocalStorage();
  // Check if user is already logged in
  authStore.fetchUser();
});

// Logout function
async function logout() {
  await authStore.signOut();
  // Optional: redirect to home page
  navigateTo('/');
}
</script>
