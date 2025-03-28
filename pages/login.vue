<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useAuthStore } from "~/stores/auth";
import { useRoute, useRouter } from "vue-router";

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

const isLogin = ref(true);
const email = ref("");
const password = ref("");

// Get redirect path from query parameters
const redirectPath = route.query.redirect?.toString() || "/";
onMounted(() => {
  // Check if user is already logged in
  // authStore.fetchUser();
  // Redirect if user is already logged in
  if (authStore.user) {
    router.push(redirectPath);
  }
});
// Function to handle login or registration
async function handleSubmit() {
  try {
    if (isLogin.value) {
      await authStore.signIn(email.value, password.value);
      // Redirect after successful login
      router.push(redirectPath);
    } else {
      await authStore.signUp(email.value, password.value);
      // Show success message and switch to login form
      isLogin.value = true;
      alert(
        "Registration successful! Please check your email for confirmation."
      );
    }
  } catch (error) {
    // Error is already handled in the store
  }
}
</script>

<template>
  <div class="max-w-md mx-auto py-12">
    <div
      class="bg-white p-8 rounded-lg shadow-sm dark:bg-gray-800 dark:text-white"
    >
      <h1 class="text-2xl font-bold mb-6 text-center dark:text-white">
        {{ isLogin ? "Login" : "Create Account" }}
      </h1>

      <div
        v-if="authStore.error"
        class="bg-red-50 text-red-600 p-3 rounded mb-4 dark:bg-red-900 dark:text-white"
      >
        {{ authStore.error }}
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="space-y-4">
          <div>
            <label
              for="email"
              class="block text-sm font-medium text-gray-700 mb-1 dark:text-white"
              >Email</label
            >
            <input
              id="email"
              v-model="email"
              type="email"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700 mb-1 dark:text-white"
              >Password</label
            >
            <input
              id="password"
              v-model="password"
              type="password"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          <Button type="submit" class="w-full" :disabled="authStore.loading">
            <span v-if="authStore.loading">Processing...</span>
            <span v-else>{{ isLogin ? "Login" : "Create Account" }}</span>
          </Button>
        </div>
      </form>

      <div class="mt-6 text-center text-sm">
        <p v-if="isLogin">
          Don't have an account?
          <button
            @click="isLogin = false"
            class="text-blue-600 hover:underline dark:text-blue-400"
          >
            Sign up
          </button>
        </p>
        <p v-else>
          Already have an account?
          <button @click="isLogin = true" class="text-blue-600 hover:underline">
            Login
          </button>
        </p>
      </div>
    </div>
  </div>
</template>
