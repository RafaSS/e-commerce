<script setup lang="ts">
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

const props = defineProps<{
  product: Product;
}>();

const emit = defineEmits<{
  (e: "addToCart", product: Product): void;
}>();

const router = useRouter();

function truncateDescription(text: string): string {
  return text.length > 60 ? `${text.substring(0, 60)}...` : text;
}

function addToCart(event: Event) {
  event.stopPropagation(); // Prevent navigation when clicking the button
  emit("addToCart", props.product);
}

function navigateToProduct() {
  router.push(`/products/${props.product.id}`);
}
</script>

<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
    @click="navigateToProduct"
  >
    <div class="relative pb-[100%]">
      <img
        :src="product.image"
        :alt="product.name"
        class="absolute top-0 left-0 w-full h-full object-cover"
      />
    </div>
    <div class="p-4">
      <h3 class="font-semibold text-lg mb-1 dark:text-white">
        {{ product.name }}
      </h3>
      <p class="text-gray-600 text-sm mb-3 dark:text-gray-300">
        {{ truncateDescription(product.description) }}
      </p>
      <div class="flex items-center justify-between">
        <span class="font-bold dark:text-white"
          >${{ product.price.toFixed(2) }}</span
        >
        <button
          @click.stop="addToCart"
          class="bg-white dark:bg-gray-950 hover:bg-blue-700 text-white py-1 px-3 rounded-md text-sm transition-colors"
        >
          {{ t("product.addToCart") }}
        </button>
      </div>
    </div>
  </div>
</template>
