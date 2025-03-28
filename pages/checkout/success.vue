<template>
  <div class="max-w-lg mx-auto text-center py-16">
    <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm transition-colors">
      <div class="text-green-500 dark:text-green-400 mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-16 w-16 mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      <h1 class="text-2xl font-bold mb-4 dark:text-white">Order Placed Successfully!</h1>
      <p class="text-gray-600 dark:text-gray-300 mb-8">
        Thank you for your purchase. Your order has been received and is being
        processed.
      </p>

      <div class="border-t border-gray-200 dark:border-gray-700 pt-6 mb-6">
        <p class="text-gray-500 dark:text-gray-400 mb-2">
          Order confirmation has been sent to your email.
        </p>
        <p class="text-gray-500 dark:text-gray-400">
          You'll receive updates on your order status.
        </p>
      </div>

      <div class="flex justify-center space-x-4">
        <Button variant="outline" @click="$router.push('/products')"
          >Continue Shopping</Button
        >
        <Button @click="$router.push('/account/orders')">View Orders</Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
</script>
