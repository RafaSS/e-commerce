<template>
  <div>
    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl font-bold mb-8 dark:text-white">All Products</h1>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div class="md:col-span-1">
          <div
            class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm sticky top-4 transition-colors"
          >
            <h2 class="text-lg font-semibold mb-4 dark:text-white">
              Filter Products
            </h2>

            <div class="space-y-4">
              <div>
                <label
                  class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block"
                  >Price Range</label
                >
                <div class="space-y-2">
                  <div class="flex items-center">
                    <input
                      type="radio"
                      id="price-all"
                      value="all"
                      v-model="priceFilter"
                      class="h-4 w-4 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <label
                      for="price-all"
                      class="ml-2 text-sm text-gray-600 dark:text-gray-300"
                      >All</label
                    >
                  </div>
                  <div class="flex items-center">
                    <input
                      type="radio"
                      id="price-under-100"
                      value="under-100"
                      v-model="priceFilter"
                      class="h-4 w-4 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <label
                      for="price-under-100"
                      class="ml-2 text-sm text-gray-600 dark:text-gray-300"
                      >Under $100</label
                    >
                  </div>
                  <div class="flex items-center">
                    <input
                      type="radio"
                      id="price-100-500"
                      value="100-500"
                      v-model="priceFilter"
                      class="h-4 w-4 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <label
                      for="price-100-500"
                      class="ml-2 text-sm text-gray-600 dark:text-gray-300"
                      >$100 - $500</label
                    >
                  </div>
                  <div class="flex items-center">
                    <input
                      type="radio"
                      id="price-over-500"
                      value="over-500"
                      v-model="priceFilter"
                      class="h-4 w-4 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <label
                      for="price-over-500"
                      class="ml-2 text-sm text-gray-600 dark:text-gray-300"
                      >Over $500</label
                    >
                  </div>
                </div>
              </div>

              <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
                <h3
                  class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Categories
                </h3>
                <div class="space-y-2 mt-2">
                  <div
                    v-if="loadingCategories"
                    class="text-sm text-gray-500 dark:text-gray-400"
                  >
                    Loading...
                  </div>
                  <div
                    v-else-if="categories.length === 0"
                    class="text-sm text-gray-500 dark:text-gray-400"
                  >
                    No categories found
                  </div>
                  <div v-else class="space-y-2">
                    <div
                      class="flex items-center"
                      v-for="category in categories"
                      :key="category.id"
                    >
                      <input
                        type="checkbox"
                        :id="`category-${category.id}`"
                        :value="category.slug"
                        v-model="selectedCategories"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                      />
                      <label
                        :for="`category-${category.id}`"
                        class="ml-2 text-sm text-gray-600 dark:text-gray-300"
                        >{{ category.name }}</label
                      >
                    </div>
                  </div>
                </div>
              </div>

              <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button variant="outline" class="w-full" @click="resetFilters">
                  Reset Filters
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div class="md:col-span-3">
          <div class="mb-6 flex justify-between items-center">
            <p class="text-gray-600 dark:text-gray-300">
              Showing {{ filteredProducts.length }} products
            </p>
            <div class="flex items-center space-x-2">
              <label for="sort" class="text-sm text-gray-600 dark:text-gray-300"
                >Sort by:</label
              >
              <select
                id="sort"
                v-model="sortBy"
                class="text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          <div v-if="loading" class="text-center py-12">
            <p class="text-gray-500 dark:text-gray-400">Loading products...</p>
          </div>
          <div v-else-if="error" class="text-center py-12">
            <p class="text-red-500">{{ error }}</p>
          </div>
          <div
            v-else-if="filteredProducts.length === 0"
            class="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm transition-colors"
          >
            <p class="text-gray-600 dark:text-gray-300">
              No products found matching your criteria.
            </p>
            <Button variant="outline" class="mt-4" @click="resetFilters"
              >Reset Filters</Button
            >
          </div>
          <div
            v-else
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <ProductCard
              v-for="product in filteredProducts"
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
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useCartStore } from "~/stores/cart";
import {
  productService,
  categoryService,
  type Product,
  type Category,
} from "~/services/supabase";

const cartStore = useCartStore();
const loading = ref(true);
const error = ref<string | null>(null);
const products = ref<Product[]>([]);
const priceFilter = ref("all");
const sortBy = ref("name-asc");

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
    error.value = err.message || "Failed to load products";
    loading.value = false;
    loadingCategories.value = false;
    console.error("Error loading data:", err);
  }
});

// Filter products based on price range and categories
const filteredProducts = computed(() => {
  let filtered = [...products.value];

  // Apply price filter
  if (priceFilter.value === "under-100") {
    filtered = filtered.filter((product) => product.price < 100);
  } else if (priceFilter.value === "100-500") {
    filtered = filtered.filter(
      (product) => product.price >= 100 && product.price <= 500
    );
  } else if (priceFilter.value === "over-500") {
    filtered = filtered.filter((product) => product.price > 500);
  }

  // Apply category filter
  if (selectedCategories.value.length > 0) {
    // filtered = filtered.filter((product) => {
    //   return selectedCategories.value.includes(product.category?.slug);
    // });
  }

  // Apply sorting
  filtered.sort((a, b) => {
    if (sortBy.value === "name-asc") {
      return a.name.localeCompare(b.name);
    } else if (sortBy.value === "name-desc") {
      return b.name.localeCompare(a.name);
    } else if (sortBy.value === "price-asc") {
      return a.price - b.price;
    } else if (sortBy.value === "price-desc") {
      return b.price - a.price;
    }
    return 0;
  });

  return filtered;
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

// Reset all filters
function resetFilters() {
  priceFilter.value = "all";
  sortBy.value = "name-asc";
  selectedCategories.value = [];
}
</script>
