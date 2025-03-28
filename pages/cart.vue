<script setup lang="ts">
import { useCartStore } from "~/stores/cart";
import { useAuthStore } from "~/stores/auth";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const { t: $t } = useI18n();

const cartStore = useCartStore();
const authStore = useAuthStore();
const router = useRouter();

// Load cart items from localStorage on component mount
onMounted(() => {
  cartStore.loadFromLocalStorage();
});

// Functions for cart management
function updateItemQuantity(itemId: number, quantity: number) {
  cartStore.updateQuantity(itemId, quantity);
}

function removeFromCart(itemId: number) {
  cartStore.removeItem(itemId);
}

// Handle checkout - redirect to login if not authenticated
function checkout() {
  if (!authStore.isAuthenticated) {
    // Redirect to login page if not logged in
    router.push("/login?redirect=checkout");
  } else {
    // In a real app, redirect to checkout page
    router.push("/checkout");
  }
}
</script>

<template>
  <div>
    <div class="max-w-5xl mx-auto">
      <h1 class="text-3xl font-bold mb-8 dark:text-white">
        {{ $t("common.shoppingCart") }}
      </h1>

      <div
        v-if="cartStore.cartIsEmpty"
        class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm text-center transition-colors"
      >
        <div class="text-gray-400 dark:text-gray-500 mb-4">
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
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
        <h2 class="text-xl font-semibold mb-2 dark:text-white">
          {{ $t("common.cartIsEmpty") }}
        </h2>
        <p class="text-gray-600 dark:text-gray-300 mb-6">
          {{ $t("common.cartIsEmptyDesc") }}
        </p>
        <Button @click="$router.push('/products')">{{
          $t("common.continueShopping")
        }}</Button>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="md:col-span-2">
          <div
            class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden transition-colors"
          >
            <ul class="divide-y divide-gray-200 dark:divide-gray-700">
              <li v-for="item in cartStore.items" :key="item.id" class="p-4">
                <div class="flex items-center space-x-4">
                  <div
                    class="flex-shrink-0 w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden"
                  >
                    <img
                      :src="item.image"
                      :alt="item.name"
                      class="w-full h-full object-cover"
                    />
                  </div>

                  <div class="flex-1 min-w-0">
                    <p
                      class="text-sm font-medium text-gray-900 dark:text-white truncate"
                    >
                      {{ item.name }}
                    </p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                      ${{ item.price.toFixed(2) }}
                    </p>
                  </div>

                  <div class="flex items-center space-x-2">
                    <button
                      @click="updateItemQuantity(item.id, item.quantity - 1)"
                      class="rounded-full w-8 h-8 flex items-center justify-center border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <span class="sr-only">{{
                        $t("common.decreaseQuantity")
                      }}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M20 12H4"
                        />
                      </svg>
                    </button>

                    <span
                      class="text-gray-700 dark:text-gray-300 w-6 text-center"
                      >{{ item.quantity }}</span
                    >

                    <button
                      @click="updateItemQuantity(item.id, item.quantity + 1)"
                      class="rounded-full w-8 h-8 flex items-center justify-center border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <span class="sr-only">{{
                        $t("common.increaseQuantity")
                      }}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </button>
                  </div>

                  <div class="text-right min-w-0 flex flex-col items-end">
                    <p
                      class="text-sm font-medium text-gray-900 dark:text-white"
                    >
                      ${{ (item.price * item.quantity).toFixed(2) }}
                    </p>
                    <button
                      @click="removeFromCart(item.id)"
                      class="text-sm text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                    >
                      {{ $t("common.remove") }}
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="md:col-span-1">
          <div
            class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm sticky top-4 transition-colors"
          >
            <h2 class="text-lg font-semibold mb-4 dark:text-white">
              {{ $t("common.orderSummary") }}
            </h2>

            <div class="space-y-4">
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-300"
                  >Subtotal ({{ cartStore.itemCount }} items)</span
                >
                <span class="font-medium dark:text-white"
                  >${{ cartStore.totalPrice.toFixed(2) }}</span
                >
              </div>

              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-300">{{
                  $t("common.shipping")
                }}</span>
                <span class="font-medium dark:text-white">{{
                  $t("common.free")
                }}</span>
              </div>

              <div
                class="border-t border-gray-200 dark:border-gray-700 pt-4 flex justify-between"
              >
                <span class="font-semibold dark:text-white">{{
                  $t("common.total")
                }}</span>
                <span class="font-bold text-lg dark:text-white"
                  >${{ cartStore.totalPrice.toFixed(2) }}</span
                >
              </div>
            </div>

            <div class="mt-6">
              <Button class="w-full" size="lg" @click="checkout">
                {{ $t("common.proceedToCheckout") }}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
