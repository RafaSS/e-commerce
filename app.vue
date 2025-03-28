<script setup lang="ts">
import { useCartStore } from "~/stores/cart";
import { useAuthStore } from "~/stores/auth";
import { useThemeStore } from "~/stores/theme";
import { onMounted } from "vue";
import LanguageSwitcher from "~/components/LanguageSwitcher.vue";
import { useI18n } from "vue-i18n";
const { t: $t } = useI18n();

const cartStore = useCartStore();
const authStore = useAuthStore();
const themeStore = useThemeStore();

// Load cart from localStorage on app mount
onMounted(() => {
  cartStore.loadFromLocalStorage();
  // Check if user is already logged in
  // authStore.fetchUser();
  // Initialize theme
  themeStore.initializeTheme();
  themeStore.setupSystemPreferenceListener();
});

// Logout function
async function logout() {
  await authStore.signOut();
  // Optional: redirect to home page
  navigateTo("/");
}
</script>

<style>
/* Base styles for dark mode support */
:root {
  color-scheme: light;
}

.dark {
  color-scheme: dark;
}
</style>

<template>
  <div class="min-h-screen flex flex-col dark:bg-gray-950 dark:text-white">
    <header
      class="bg-white dark:bg-gray-900 dark:text-white shadow-sm transition-colors duration-200"
    >
      <div
        class="container mx-auto px-4 py-4 flex justify-between items-center"
      >
        <NuxtLink to="/" class="text-xl font-bold dark:text-white">{{
          $t("common.shopName")
        }}</NuxtLink>
        <div class="flex items-center space-x-4">
          <!-- <LanguageSwitcher /> -->
          <button
            @click="themeStore.toggleTheme"
            class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle dark mode"
          >
            <!-- Sun icon for dark mode -->
            <svg
              v-if="themeStore.isDarkMode"
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-yellow-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <!-- Moon icon for light mode -->
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          </button>
          <NuxtLink to="/cart" class="relative">
            <span class="sr-only">{{ $t("navigation.cart") }}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 dark:text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <!-- Dynamic cart item count badge -->
            <span
              v-if="cartStore.itemCount > 0"
              class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
            >
              {{ cartStore.itemCount > 99 ? "99+" : cartStore.itemCount }}
            </span>
          </NuxtLink>
          <NuxtLink
            v-if="!authStore.isAuthenticated"
            to="/login"
            class="text-sm font-medium dark:text-white"
            >{{ $t("navigation.login") }}</NuxtLink
          >
          <div v-else class="relative group">
            <button
              class="text-sm font-medium flex items-center dark:text-white"
            >
              {{ $t("navigation.myAccount") }}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 hidden group-hover:block"
            >
              <NuxtLink
                to="/account"
                class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >{{ $t("navigation.profile") }}</NuxtLink
              >
              <NuxtLink
                to="/account/orders"
                class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >{{ $t("navigation.orders") }}</NuxtLink
              >
              <button
                @click="logout"
                class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {{ $t("navigation.logout") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>

    <main
      class="flex-grow container mx-auto px-4 py-8 dark:bg-gray-950 dark:text-white transition-colors duration-200"
    >
      <NuxtPage />
    </main>

    <footer class="bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <div class="container mx-auto px-4 py-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 class="text-lg font-semibold mb-4 dark:text-white">
              {{ $t("common.shopName") }}
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              {{ $t("common.shopDescription") }}
            </p>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-4 dark:text-white">
              {{ $t("footer.links") }}
            </h3>
            <ul class="space-y-2">
              <li>
                <NuxtLink
                  to="/"
                  class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >{{ $t("navigation.home") }}</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="/products"
                  class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >{{ $t("navigation.products") }}</NuxtLink
                >
              </li>
              <!-- <li>
                <NuxtLink to="/about" class="text-gray-600 hover:text-gray-900"
                  >About</NuxtLink
                >
              </li> -->
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-4 dark:text-white">
              {{ $t("footer.contact") }}
            </h3>
            <address class="not-italic text-gray-600 dark:text-gray-400">
              <p>123 Shopping Street</p>
              <p>Market City, MC 12345</p>
              <p>Email: info@e-shop.com</p>
            </address>
          </div>
        </div>
        <div
          class="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center text-gray-500 dark:text-gray-400 text-sm"
        >
          <p>
            &copy; {{ new Date().getFullYear() }} {{ $t("common.shopName") }}.
            {{ $t("footer.allRightsReserved") }}
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>
