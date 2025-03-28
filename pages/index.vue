<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useCartStore } from "~/stores/cart";
import { productService, type Product } from "~/services/supabase";
import { useI18n } from "vue-i18n";
const { t: $t } = useI18n();
const cartStore = useCartStore();
const loading = ref(true);
const error = ref<string | null>(null);
const featuredProducts = ref<Product[]>([]);

// Load featured products from Supabase
onMounted(async () => {
  try {
    loading.value = true;
    featuredProducts.value = await productService.getFeatured(4);
    loading.value = false;
  } catch (err: any) {
    error.value = err.message || "Failed to load products";
    loading.value = false;
    console.error("Error loading products:", err);
  }
});

// Add product to cart
function addToCart(product: {
  id: number;
  name: string;
  price: number;
  image: string;
}) {
  cartStore.addItem({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
  });
}
</script>

<template>
  <div>
    <section
      class="bg-gray-100 py-12 dark:bg-gray-800 dark:text-white rounded-lg"
    >
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto text-center">
          <h1 class="text-4xl font-bold mb-4 dark:text-white">
            {{ $t("common.shopName") }}
          </h1>
          <p class="text-lg text-gray-600 mb-8 dark:text-gray-300">
            {{ $t("common.shopDescription") }}
          </p>
          <Button size="lg" @click="$router.push('/products')">{{
            $t("common.shopButton")
          }}</Button>
        </div>
      </div>
    </section>

    <section class="py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-8 text-center">
          {{ $t("common.featuredProducts") }}
        </h2>
        <div v-if="loading" class="text-center py-12">
          <p class="text-gray-500">{{ $t("common.loadingProducts") }}</p>
        </div>
        <div v-else-if="error" class="text-center py-12">
          <p class="text-red-500">{{ error }}</p>
        </div>
        <div
          v-else
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <ProductCard
            v-for="product in featuredProducts"
            :key="product.id"
            :product="{
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image_url,
              description: product.description,
            }"
            @add-to-cart="addToCart"
          />
        </div>
        <div class="text-center mt-8">
          <NuxtLink
            to="/products"
            class="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
          >
            {{ $t("common.viewAllProducts") }}
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
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="bg-gray-100 py-16 dark:bg-gray-800 dark:text-white">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            class="bg-white p-6 rounded-lg shadow-sm flex items-center dark:bg-gray-800"
          >
            <div class="mr-4 text-blue-600 dark:text-blue-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                />
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-lg mb-1 dark:text-white">
                {{ $t("common.freeShipping") }}
              </h3>
              <p class="text-gray-600 dark:text-gray-300">
                {{ $t("common.freeShippingDescription") }}
              </p>
            </div>
          </div>
          <div
            class="bg-white p-6 rounded-lg shadow-sm flex items-center dark:bg-gray-800"
          >
            <div class="mr-4 text-blue-600 dark:text-blue-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-lg mb-1 dark:text-white">
                {{ $t("common.247Support") }}
              </h3>
              <p class="text-gray-600 dark:text-gray-300">
                {{ $t("common.247SupportDescription") }}
              </p>
            </div>
          </div>
          <div
            class="bg-white p-6 rounded-lg shadow-sm flex items-center dark:bg-gray-800"
          >
            <div class="mr-4 text-blue-600 dark:text-blue-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-lg mb-1 dark:text-white">
                {{ $t("common.securePayments") }}
              </h3>
              <p class="text-gray-600 dark:text-gray-300">
                {{ $t("common.securePaymentsDescription") }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
