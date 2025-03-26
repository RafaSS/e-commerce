<template>
  <div class="group relative overflow-hidden rounded-md border">
    <div class="aspect-square overflow-hidden bg-secondary">
      <NuxtLink :to="`/products/${product.id}`">
        <img
          :src="product.image"
          :alt="product.name"
          class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </NuxtLink>
    </div>
    <div class="p-4">
      <h3 class="text-lg font-medium">
        <NuxtLink :to="`/products/${product.id}`" class="hover:underline">
          {{ product.name }}
        </NuxtLink>
      </h3>
      <div class="mt-1 flex items-center justify-between">
        <p class="text-lg font-semibold">${{ product.price.toFixed(2) }}</p>
        <Button size="sm" @click="addToCart(product)">
          <Icon name="lucide:shopping-cart" class="mr-1 h-4 w-4" />
          Add
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'

const props = defineProps({
  product: {
    type: Object,
    required: true,
    validator: (p: any) => {
      return p.id && p.name && p.price && p.image
    }
  }
})

const cartStore = useCartStore()
const toast = useToast()

// Add the product to cart
const addToCart = (product: any) => {
  cartStore.addToCart({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image
  })
  
  toast.add({
    title: 'Added to cart',
    description: `${product.name} has been added to your cart.`,
    duration: 3000
  })
}
</script>
