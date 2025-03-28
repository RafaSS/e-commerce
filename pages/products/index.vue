<template>
  <div>
    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl font-bold mb-8">All Products</h1>
      
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div class="md:col-span-1">
          <div class="bg-white p-6 rounded-lg shadow-sm sticky top-4">
            <h2 class="text-lg font-semibold mb-4">Filter Products</h2>
            
            <div class="space-y-4">
              <div>
                <label class="text-sm font-medium text-gray-700 mb-1 block">Price Range</label>
                <div class="space-y-2">
                  <div class="flex items-center">
                    <input 
                      type="radio" 
                      id="price-all" 
                      value="all" 
                      v-model="priceFilter"
                      class="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <label for="price-all" class="ml-2 text-sm text-gray-600">All</label>
                  </div>
                  <div class="flex items-center">
                    <input 
                      type="radio" 
                      id="price-under-100" 
                      value="under-100" 
                      v-model="priceFilter"
                      class="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <label for="price-under-100" class="ml-2 text-sm text-gray-600">Under $100</label>
                  </div>
                  <div class="flex items-center">
                    <input 
                      type="radio" 
                      id="price-100-500" 
                      value="100-500" 
                      v-model="priceFilter"
                      class="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <label for="price-100-500" class="ml-2 text-sm text-gray-600">$100 - $500</label>
                  </div>
                  <div class="flex items-center">
                    <input 
                      type="radio" 
                      id="price-over-500" 
                      value="over-500" 
                      v-model="priceFilter"
                      class="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <label for="price-over-500" class="ml-2 text-sm text-gray-600">Over $500</label>
                  </div>
                </div>
              </div>
              
              <div class="pt-4 border-t border-gray-200">
                <h3 class="text-sm font-medium text-gray-700 mb-1">Categories</h3>
                <div class="space-y-2 mt-2">
                  <div v-if="loadingCategories" class="text-sm text-gray-500">Loading...</div>
                  <div v-else-if="categories.length === 0" class="text-sm text-gray-500">No categories found</div>
                  <div v-else class="space-y-2">
                    <div class="flex items-center" v-for="category in categories" :key="category.id">
                      <input 
                        type="checkbox" 
                        :id="`category-${category.id}`" 
                        :value="category.slug" 
                        v-model="selectedCategories"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <label :for="`category-${category.id}`" class="ml-2 text-sm text-gray-600">{{ category.name }}</label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="pt-4 border-t border-gray-200">
                <Button variant="outline" class="w-full" @click="resetFilters">
                  Reset Filters
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="md:col-span-3">
          <div class="mb-6 flex justify-between items-center">
            <p class="text-gray-600">Showing {{ filteredProducts.length }} products</p>
            <div class="flex items-center space-x-2">
              <label for="sort" class="text-sm text-gray-600">Sort by:</label>
              <select 
                id="sort" 
                v-model="sortBy"
                class="text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
          
          <div v-if="loading" class="text-center py-12">
            <p class="text-gray-500">Loading products...</p>
          </div>
          <div v-else-if="error" class="text-center py-12">
            <p class="text-red-500">{{ error }}</p>
          </div>
          <div v-else-if="filteredProducts.length === 0" class="text-center py-12 bg-white rounded-lg shadow-sm">
            <p class="text-gray-600">No products found matching your criteria.</p>
            <Button variant="outline" class="mt-4" @click="resetFilters">Reset Filters</Button>
          </div>
          <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProductCard 
              v-for="product in filteredProducts" 
              :key="product.id" 
              :product="{
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image_url,
                description: product.description
              }" 
              @add-to-cart="addToCart"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useCartStore } from '~/stores/cart';
import { productService, categoryService, type Product, type Category } from '~/services/supabase';

const cartStore = useCartStore();
const loading = ref(true);
const error = ref<string | null>(null);
const products = ref<Product[]>([]);
const priceFilter = ref('all');
const sortBy = ref('name-asc');

// Categories
const categories = ref<Category[]>([]);
const loadingCategories = ref(true);
const selectedCategories = ref<string[]>([]);

// Load products and categories
onMounted(async () => {
  try {
    // Load products
    loading.value = true;
    products.value = await productService.getAll();
    loading.value = false;

    // Load categories
    loadingCategories.value = true;
    categories.value = await categoryService.getAll();
    loadingCategories.value = false;
  } catch (err: any) {
    error.value = err.message || 'Failed to load products';
    loading.value = false;
    loadingCategories.value = false;
    console.error('Error loading data:', err);
  }
});

// Filter products based on price range and categories
const filteredProducts = computed(() => {
  let filtered = [...products.value];
  
  // Apply price filter
  if (priceFilter.value === 'under-100') {
    filtered = filtered.filter(product => product.price < 100);
  } else if (priceFilter.value === '100-500') {
    filtered = filtered.filter(product => product.price >= 100 && product.price <= 500);
  } else if (priceFilter.value === 'over-500') {
    filtered = filtered.filter(product => product.price > 500);
  }
  
  // Apply category filter
  if (selectedCategories.value.length > 0) {
    // In a real app with proper relationships, you'd use a join
    // For now, we'll simulate this client-side
    filtered = filtered.filter(product => {
      // This is a simplified approach - in a real app you'd have category relationships
      // Let's assume for now each product has one category for simplicity
      return selectedCategories.value.includes(product.category?.slug);
    });
  }
  
  // Apply sorting
  filtered.sort((a, b) => {
    if (sortBy.value === 'name-asc') {
      return a.name.localeCompare(b.name);
    } else if (sortBy.value === 'name-desc') {
      return b.name.localeCompare(a.name);
    } else if (sortBy.value === 'price-asc') {
      return a.price - b.price;
    } else if (sortBy.value === 'price-desc') {
      return b.price - a.price;
    }
    return 0;
  });
  
  return filtered;
});

// Add product to cart
function addToCart(product: { id: number; name: string; price: number; image: string; }) {
  cartStore.addItem({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image
  });
}

// Reset all filters
function resetFilters() {
  priceFilter.value = 'all';
  sortBy.value = 'name-asc';
  selectedCategories.value = [];
}
</script>
