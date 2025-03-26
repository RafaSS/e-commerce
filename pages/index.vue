<template>
  <div>
    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-gray-900 text-white">
      <div class="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-80"></div>
      <div
        class="absolute inset-0 bg-cover bg-center"
        style="background-image: url('https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=2070')">
      </div>
      <div class="container relative z-10 mx-auto flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center md:px-8">
        <h1 class="mb-6 text-4xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl">
          Discover Amazing Products
        </h1>
        <p class="mb-8 max-w-md text-lg md:text-xl">
          Shop the latest trends with confidence. Fast delivery, easy returns.
        </p>
        <div class="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <NuxtLink to="/products">
            <Button size="lg" class="w-full sm:w-auto">Shop Now</Button>
          </NuxtLink>
          <NuxtLink to="/about">
            <Button size="lg" variant="outline" class="w-full bg-background/20 sm:w-auto">Learn More</Button>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="container mx-auto py-16">
      <div class="mb-8 flex items-center justify-between">
        <h2 class="text-3xl font-bold tracking-tight">Featured Products</h2>
        <NuxtLink to="/products" class="text-sm font-medium hover:underline">
          View all
          <Icon name="lucide:arrow-right" class="ml-1 inline h-4 w-4" />
        </NuxtLink>
      </div>
      <div v-if="featuredProducts.length === 0" class="flex justify-center py-8">
        <div class="text-center">
          <Icon name="lucide:loader" class="mx-auto h-8 w-8 animate-spin" />
          <p class="mt-2 text-sm text-muted-foreground">Loading products...</p>
        </div>
      </div>
      <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <ProductCard
          v-for="product in featuredProducts"
          :key="product.id"
          :product="product"
        />
      </div>
    </section>

    <!-- Categories Section -->
    <section class="bg-muted py-16">
      <div class="container mx-auto">
        <h2 class="mb-8 text-center text-3xl font-bold tracking-tight">Shop by Category</h2>
        <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
          <NuxtLink
            v-for="category in categories"
            :key="category.id"
            :to="`/products/category/${category.slug}`"
            class="group relative overflow-hidden rounded-lg bg-card"
          >
            <div class="aspect-square overflow-hidden">
              <img
                :src="category.image"
                :alt="category.name"
                class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div class="absolute bottom-0 left-0 right-0 p-4">
                <h3 class="text-xl font-bold text-white">{{ category.name }}</h3>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Benefits Section -->
    <section class="container mx-auto py-16">
      <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div class="flex flex-col items-center text-center">
          <div class="mb-4 rounded-full bg-primary/10 p-3">
            <Icon name="lucide:truck" class="h-8 w-8 text-primary" />
          </div>
          <h3 class="mb-2 text-xl font-medium">Free Shipping</h3>
          <p class="text-muted-foreground">
            Free shipping on orders over $50. Get your products delivered right to your doorstep.
          </p>
        </div>
        <div class="flex flex-col items-center text-center">
          <div class="mb-4 rounded-full bg-primary/10 p-3">
            <Icon name="lucide:rotate-ccw" class="h-8 w-8 text-primary" />
          </div>
          <h3 class="mb-2 text-xl font-medium">Easy Returns</h3>
          <p class="text-muted-foreground">
            30-day return policy. Not satisfied with your purchase? Send it back hassle-free.
          </p>
        </div>
        <div class="flex flex-col items-center text-center">
          <div class="mb-4 rounded-full bg-primary/10 p-3">
            <Icon name="lucide:shield" class="h-8 w-8 text-primary" />
          </div>
          <h3 class="mb-2 text-xl font-medium">Secure Payments</h3>
          <p class="text-muted-foreground">
            Your payment information is always secure. We use industry-standard encryption.
          </p>
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <section class="bg-primary py-16 text-primary-foreground">
      <div class="container mx-auto">
        <div class="mx-auto max-w-xl text-center">
          <h2 class="mb-4 text-3xl font-bold tracking-tight">Subscribe to Our Newsletter</h2>
          <p class="mb-6">
            Stay updated with our latest offers, product launches, and exclusive deals.
          </p>
          <form class="flex flex-col gap-4 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              class="h-10 flex-1 rounded-md bg-primary-foreground px-3 py-2 text-primary"
            />
            <Button type="submit" size="default" variant="secondary">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
    
    <!-- Toast component for notifications -->
    <Toast />
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'

// Initialize cart
const cartStore = useCartStore()
onMounted(() => {
  cartStore.initializeCart()
})

// Sample data - in a real app, this would come from Supabase
const featuredProducts = ref([
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000',
    category: 'electronics'
  },
  {
    id: 2,
    name: 'Organic Cotton T-Shirt',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=387',
    category: 'clothing'
  },
  {
    id: 3,
    name: 'Smart Watch Series 5',
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2099',
    category: 'electronics'
  },
  {
    id: 4,
    name: 'Modern Coffee Table',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1634712282287-14ed57b9cc89?q=80&w=2126',
    category: 'home'
  }
])

const categories = ref([
  {
    id: 1,
    name: 'Electronics',
    slug: 'electronics',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=2070'
  },
  {
    id: 2,
    name: 'Clothing',
    slug: 'clothing',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2070'
  },
  {
    id: 3,
    name: 'Home & Kitchen',
    slug: 'home',
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1974'
  },
  {
    id: 4,
    name: 'Accessories',
    slug: 'accessories',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1980'
  }
])
</script>
