<template>
  <div class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
    <div class="relative pb-[100%]">
      <img 
        :src="product.image" 
        :alt="product.name" 
        class="absolute top-0 left-0 w-full h-full object-cover"
      />
    </div>
    <div class="p-4">
      <h3 class="font-semibold text-lg mb-1">{{ product.name }}</h3>
      <p class="text-gray-500 text-sm mb-2">{{ truncateDescription(product.description) }}</p>
      <div class="flex justify-between items-center">
        <span class="font-bold text-lg">${{ product.price.toFixed(2) }}</span>
        <Button size="sm" @click="addToCart">Add to Cart</Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

const props = defineProps<{
  product: Product
}>();

const emit = defineEmits<{
  (e: 'addToCart', product: Product): void
}>();

function truncateDescription(text: string): string {
  return text.length > 60 ? `${text.substring(0, 60)}...` : text;
}

function addToCart() {
  emit('addToCart', props.product);
}
</script>
