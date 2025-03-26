<template>
  <div class="container py-8">
    <div v-if="isLoading" class="flex justify-center py-12">
      <div class="text-center">
        <Icon name="lucide:loader" class="mx-auto h-8 w-8 animate-spin" />
        <p class="mt-2 text-sm text-muted-foreground">Loading product...</p>
      </div>
    </div>

    <div v-else-if="!product" class="rounded-lg border p-8 text-center">
      <Icon name="lucide:package-x" class="mx-auto h-12 w-12 text-muted-foreground" />
      <h3 class="mt-4 text-lg font-medium">Product not found</h3>
      <p class="mt-2 text-sm text-muted-foreground">
        The product you're looking for doesn't exist or has been removed.
      </p>
      <NuxtLink to="/products">
        <Button class="mt-4">Browse Products</Button>
      </NuxtLink>
    </div>

    <div v-else>
      <!-- Breadcrumbs -->
      <div class="mb-6 flex items-center space-x-2 text-sm text-muted-foreground">
        <NuxtLink to="/" class="hover:text-foreground">Home</NuxtLink>
        <Icon name="lucide:chevron-right" class="h-4 w-4" />
        <NuxtLink to="/products" class="hover:text-foreground">Products</NuxtLink>
        <Icon name="lucide:chevron-right" class="h-4 w-4" />
        <span class="text-foreground">{{ product.name }}</span>
      </div>

      <div class="grid gap-8 md:grid-cols-2">
        <!-- Product Image -->
        <div class="relative overflow-hidden rounded-lg border bg-background">
          <img :src="product.image" :alt="product.name" class="h-full w-full object-contain" />
        </div>

        <!-- Product Details -->
        <div class="space-y-6">
          <div>
            <h1 class="text-3xl font-bold tracking-tight">{{ product.name }}</h1>
            <p class="mt-2 text-2xl font-bold">${{ product.price.toFixed(2) }}</p>
          </div>

          <div class="space-y-2">
            <div class="flex items-center">
              <div class="flex">
                <Icon v-for="i in 5" :key="i" name="lucide:star" class="h-5 w-5" :class="[
                  i <= productRating ? 'text-yellow-400' : 'text-muted'
                ]" />
              </div>
              <span class="ml-2 text-sm text-muted-foreground">{{ productReviews }} reviews</span>
            </div>
            <div class="flex items-center space-x-2">
              <div class="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800">
                In Stock
              </div>
              <span class="text-sm text-muted-foreground">Ships in 1-2 business days</span>
            </div>
          </div>

          <div class="border-t pt-4">
            <h3 class="mb-2 text-lg font-medium">Description</h3>
            <p class="text-muted-foreground">{{ product.description || 'No description available.' }}</p>
          </div>

          <div class="space-y-4">
            <div class="flex space-x-4">
              <div class="flex w-1/3 items-center space-x-2">
                <Button variant="outline" size="sm" class="h-8 w-8 rounded-md p-0" @click="decrementQuantity"
                  :disabled="quantity <= 1">
                  <Icon name="lucide:minus" class="h-3 w-3" />
                </Button>
                <span class="w-8 text-center">{{ quantity }}</span>
                <Button variant="outline" size="sm" class="h-8 w-8 rounded-md p-0" @click="incrementQuantity">
                  <Icon name="lucide:plus" class="h-3 w-3" />
                </Button>
              </div>
              <Button class="flex-1" size="lg" @click="addToCart" :disabled="isAddingToCart">
                <Icon v-if="isAddingToCart" name="lucide:loader" class="mr-2 h-4 w-4 animate-spin" />
                <Icon v-else name="lucide:shopping-cart" class="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </div>

            <div class="flex space-x-4">
              <Button variant="outline" class="flex-1">
                <Icon name="lucide:heart" class="mr-2 h-4 w-4" />
                Add to Wishlist
              </Button>
              <Button variant="outline" class="flex-1">
                <Icon name="lucide:share" class="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>

          <div class="rounded-md border p-4">
            <div class="grid grid-cols-3 gap-4">
              <div class="flex flex-col items-center text-center">
                <Icon name="lucide:truck" class="mb-2 h-5 w-5 text-primary" />
                <span class="text-xs text-muted-foreground">Free Shipping on orders over $50</span>
              </div>
              <div class="flex flex-col items-center text-center">
                <Icon name="lucide:rotate-ccw" class="mb-2 h-5 w-5 text-primary" />
                <span class="text-xs text-muted-foreground">30 Days Easy Returns</span>
              </div>
              <div class="flex flex-col items-center text-center">
                <Icon name="lucide:shield" class="mb-2 h-5 w-5 text-primary" />
                <span class="text-xs text-muted-foreground">2 Year Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Related Products -->
      <div class="mt-16">
        <h2 class="mb-6 text-2xl font-bold tracking-tight">You Might Also Like</h2>
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <ProductCard v-for="relatedProduct in relatedProducts" :key="relatedProduct.id" :product="relatedProduct" />
        </div>
      </div>
    </div>

    <!-- Toast component for notifications -->
    <Toast />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'
import { ProductCard } from '~/components/ProductCard'
import { useCartStore } from '~/stores/cart'

// Get product ID from route
const route = useRoute()
const productId = Number(route.params.id)

// State
const product = ref<any>(null)
const isLoading = ref(true)
const quantity = ref(1)
const isAddingToCart = ref(false)
const productRating = ref(4)
const productReviews = ref(42)
const toast = useToast()
const cartStore = useCartStore()

// Initialize cart
onMounted(() => {
  cartStore.initializeCart()
  loadProduct()
})

// Load product data
const loadProduct = () => {
  isLoading.value = true

  // In a real app, this would be a Supabase query
  setTimeout(() => {
    // Sample product data
    const sampleProducts = [
      {
        id: 1,
        name: 'Premium Wireless Headphones',
        price: 299.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000',
        category: 'electronics',
        description: 'Experience premium sound quality with our wireless headphones. These over-ear headphones feature active noise cancellation, a comfortable fit for all-day wear, and up to 30 hours of battery life. Perfect for music lovers, travelers, and professionals alike.'
      },
      {
        id: 2,
        name: 'Organic Cotton T-Shirt',
        price: 29.99,
        image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=387',
        category: 'clothing',
        description: 'Made from 100% organic cotton, this t-shirt is both environmentally friendly and incredibly comfortable. Features a relaxed fit and is available in multiple colors. Perfect for everyday wear or casual outings.'
      },
      {
        id: 3,
        name: 'Smart Watch Series 5',
        price: 399.99,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2099',
        category: 'electronics',
        description: 'Stay connected and track your fitness with our latest smartwatch. Features heart rate monitoring, GPS tracking, water resistance up to 50 meters, and a battery life of up to 18 hours. Compatible with both iOS and Android devices.'
      },
      {
        id: 4,
        name: 'Modern Coffee Table',
        price: 249.99,
        image: 'https://images.unsplash.com/photo-1634712282287-14ed57b9cc89?q=80&w=2126',
        category: 'home',
        description: 'Elevate your living space with this modern coffee table. Made from high-quality materials with a sleek design that complements any decor. The spacious surface provides plenty of room for books, decor, and beverages.'
      },
      {
        id: 5,
        name: 'Designer Sunglasses',
        price: 129.99,
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=2080',
        category: 'accessories',
        description: 'Protect your eyes in style with these designer sunglasses. Featuring UV400 protection, polarized lenses, and a durable frame. The timeless design ensures you'll look fashionable for years to come.'
      },
    ]

    product.value = sampleProducts.find(p => p.id === productId) || null
    isLoading.value = false
  }, 500)
}

// Quantity controls
const incrementQuantity = () => {
  quantity.value++
}

const decrementQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

// Add to cart
const addToCart = () => {
  if (!product.value) return

  isAddingToCart.value = true

  // Simulate API delay
  setTimeout(() => {
    cartStore.addToCart({
      id: product.value.id,
      name: product.value.name,
      price: product.value.price,
      image: product.value.image
    })

    toast.add({
      title: 'Added to cart',
      description: `${quantity.value}x ${product.value.name} has been added to your cart.`,
      duration: 3000
    })

    isAddingToCart.value = false
  }, 500)
}

// Related products - in real app, this would be based on product category or tags
const relatedProducts = computed(() => {
  // Sample related products
  const sampleProducts = [
    {
      id: 8,
      name: 'Wireless Charging Pad',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1618424923839-2788d8d1f667?q=80&w=1000',
      category: 'electronics'
    },
    {
      id: 9,
      name: 'Men\'s Leather Wallet',
      price: 59.99,
      image: 'https://images.unsplash.com/photo-1603060196912-f6c0c68e3dad?q=80&w=1974',
      category: 'accessories'
    },
    {
      id: 10,
      name: 'Ceramic Plant Pot',
      price: 34.99,
      image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=2072',
      category: 'home'
    },
    {
      id: 12,
      name: 'Wireless Earbuds',
      price: 149.99,
      image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1932',
      category: 'electronics'
    }
  ]

  return sampleProducts
})
</script>
