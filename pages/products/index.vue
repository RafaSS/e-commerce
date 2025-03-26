<template>
  <div class="container py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold tracking-tight">All Products</h1>
      <p class="text-muted-foreground">Browse our collection of high-quality products</p>
    </div>

    <div class="flex flex-col gap-6 md:flex-row">
      <!-- Filters Sidebar -->
      <div class="w-full md:w-64 md:flex-shrink-0">
        <div class="sticky top-20 rounded-lg border p-4">
          <h2 class="mb-4 text-lg font-medium">Filters</h2>
          
          <!-- Categories -->
          <div class="mb-6">
            <h3 class="mb-2 text-sm font-medium">Categories</h3>
            <div class="space-y-2">
              <label v-for="category in categories" :key="category.id" class="flex items-center">
                <input
                  type="checkbox"
                  :value="category.slug"
                  v-model="selectedCategories"
                  class="mr-2 h-4 w-4 rounded border-gray-300"
                />
                {{ category.name }}
              </label>
            </div>
          </div>
          
          <!-- Price Range -->
          <div class="mb-6">
            <h3 class="mb-2 text-sm font-medium">Price Range</h3>
            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="sr-only">Min</label>
                <input
                  type="number"
                  min="0"
                  v-model="priceRange.min"
                  placeholder="Min"
                  class="w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
                />
              </div>
              <div>
                <label class="sr-only">Max</label>
                <input
                  type="number"
                  min="0"
                  v-model="priceRange.max"
                  placeholder="Max"
                  class="w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
                />
              </div>
            </div>
          </div>
          
          <!-- Sort By -->
          <div class="mb-6">
            <h3 class="mb-2 text-sm font-medium">Sort By</h3>
            <select 
              v-model="sortBy"
              class="w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
            >
              <option value="default">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </div>
          
          <Button @click="applyFilters" class="w-full">Apply Filters</Button>
          <Button @click="resetFilters" variant="outline" class="mt-2 w-full">Reset Filters</Button>
        </div>
      </div>
      
      <!-- Products Grid -->
      <div class="flex-1">
        <div v-if="isLoading" class="flex justify-center py-12">
          <div class="text-center">
            <Icon name="lucide:loader" class="mx-auto h-8 w-8 animate-spin" />
            <p class="mt-2 text-sm text-muted-foreground">Loading products...</p>
          </div>
        </div>
        
        <div v-else-if="filteredProducts.length === 0" class="rounded-lg border p-8 text-center">
          <Icon name="lucide:package-x" class="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 class="mt-4 text-lg font-medium">No products found</h3>
          <p class="mt-2 text-sm text-muted-foreground">
            Try adjusting your filters or search criteria.
          </p>
          <Button @click="resetFilters" variant="outline" class="mt-4">Reset Filters</Button>
        </div>
        
        <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ProductCard
            v-for="product in filteredProducts"
            :key="product.id"
            :product="product"
          />
        </div>
        
        <!-- Pagination (simplified) -->
        <div v-if="filteredProducts.length > 0" class="mt-8 flex justify-center">
          <div class="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              :disabled="currentPage === 1"
              @click="currentPage--"
            >
              <Icon name="lucide:chevron-left" class="h-4 w-4" />
              Previous
            </Button>
            <span class="text-sm text-muted-foreground">
              Page {{ currentPage }} of {{ totalPages }}
            </span>
            <Button 
              variant="outline" 
              size="sm"
              :disabled="currentPage === totalPages"
              @click="currentPage++"
            >
              Next
              <Icon name="lucide:chevron-right" class="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
    
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
// Extended product list
const allProducts = ref([
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
  },
  {
    id: 5,
    name: 'Designer Sunglasses',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=2080',
    category: 'accessories'
  },
  {
    id: 6,
    name: 'Ergonomic Office Chair',
    price: 349.99,
    image: 'https://images.unsplash.com/photo-1505843490578-27522a6a0785?q=80&w=1974',
    category: 'home'
  },
  {
    id: 7,
    name: 'Smartphone Case',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1592286927505-1def25115558?q=80&w=2070',
    category: 'accessories'
  },
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
    id: 11,
    name: 'Denim Jacket',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=2070',
    category: 'clothing'
  },
  {
    id: 12,
    name: 'Wireless Earbuds',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1932',
    category: 'electronics'
  }
])

const categories = ref([
  {
    id: 1,
    name: 'Electronics',
    slug: 'electronics',
  },
  {
    id: 2,
    name: 'Clothing',
    slug: 'clothing',
  },
  {
    id: 3,
    name: 'Home & Kitchen',
    slug: 'home',
  },
  {
    id: 4,
    name: 'Accessories',
    slug: 'accessories',
  }
])

// Filters and sorting state
const selectedCategories = ref<string[]>([])
const priceRange = ref({ min: null as number | null, max: null as number | null })
const sortBy = ref('default')
const isLoading = ref(false)
const currentPage = ref(1)
const itemsPerPage = 6

// Apply filters
const applyFilters = () => {
  isLoading.value = true
  
  // Simulate API call latency
  setTimeout(() => {
    isLoading.value = false
  }, 500)
}

// Reset filters
const resetFilters = () => {
  selectedCategories.value = []
  priceRange.value = { min: null, max: null }
  sortBy.value = 'default'
  currentPage.value = 1
  
  applyFilters()
}

// Computed properties for filtered products
const filteredProducts = computed(() => {
  let result = [...allProducts.value]
  
  // Apply category filter
  if (selectedCategories.value.length > 0) {
    result = result.filter(product => 
      selectedCategories.value.includes(product.category)
    )
  }
  
  // Apply price range filter
  if (priceRange.value.min !== null) {
    result = result.filter(product => product.price >= priceRange.value.min!)
  }
  
  if (priceRange.value.max !== null) {
    result = result.filter(product => product.price <= priceRange.value.max!)
  }
  
  // Apply sorting
  switch (sortBy.value) {
    case 'price-asc':
      result.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      result.sort((a, b) => b.price - a.price)
      break
    case 'name-asc':
      result.sort((a, b) => a.name.localeCompare(b.name))
      break
    case 'name-desc':
      result.sort((a, b) => b.name.localeCompare(a.name))
      break
    default:
      // Default sorting - no change
      break
  }
  
  // Calculate pagination
  const startIndex = (currentPage.value - 1) * itemsPerPage
  return result.slice(startIndex, startIndex + itemsPerPage)
})

// Total pages for pagination
const totalPages = computed(() => {
  let filteredCount = allProducts.value.length
  
  // Apply same filters as filteredProducts but without pagination
  if (selectedCategories.value.length > 0) {
    filteredCount = allProducts.value.filter(product => 
      selectedCategories.value.includes(product.category)
    ).length
  }
  
  return Math.ceil(filteredCount / itemsPerPage)
})
</script>
