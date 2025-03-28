<template>
  <div>
    <div v-if="loading" class="text-center py-12">
      <p class="text-gray-500">Loading product details...</p>
    </div>
    <div v-else-if="error" class="text-center py-12">
      <p class="text-red-500">{{ error }}</p>
      <Button variant="outline" class="mt-4" @click="$router.push('/products')">Back to Products</Button>
    </div>
    <div v-else-if="product" class="max-w-6xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <div class="bg-white rounded-lg overflow-hidden shadow-sm">
            <img :src="product.image_url || 'https://placehold.co/600x400?text=No+Image'" :alt="product.name" class="w-full h-auto object-cover" />
          </div>
        </div>
        
        <div>
          <h1 class="text-3xl font-bold mb-4">{{ product.name }}</h1>
          <div class="text-2xl font-bold text-gray-900 mb-6">${{ product.price.toFixed(2) }}</div>
          
          <p class="text-gray-600 mb-8">{{ product.description }}</p>
          
          <div class="flex items-center space-x-4 mb-8">
            <div class="flex items-center space-x-2">
              <button 
                @click="quantity > 1 ? quantity-- : null"
                class="rounded-full w-8 h-8 flex items-center justify-center border border-gray-300 text-gray-500 hover:bg-gray-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                </svg>
              </button>
              
              <span class="text-gray-700 w-8 text-center">{{ quantity }}</span>
              
              <button 
                @click="quantity++"
                class="rounded-full w-8 h-8 flex items-center justify-center border border-gray-300 text-gray-500 hover:bg-gray-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </div>
            
            <Button size="lg" @click="addToCart" :disabled="product.stock_quantity < 1">
              {{ product.stock_quantity < 1 ? 'Out of Stock' : 'Add to Cart' }}
            </Button>
          </div>

          <div v-if="product.stock_quantity > 0" class="mb-8">
            <p class="text-sm text-green-600 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              In stock ({{ product.stock_quantity }} available)
            </p>
          </div>
          
          <div class="border-t border-gray-200 pt-8 space-y-4">
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-gray-600">Free shipping on orders over $50</span>
            </div>
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-gray-600">30-day money-back guarantee</span>
            </div>
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-gray-600">Secure checkout</span>
            </div>
          </div>
        </div>
      </div>
      
      <div v-if="!loadingRelatedProducts && relatedProducts.length > 0" class="mt-16">
        <h2 class="text-2xl font-bold mb-8">Related Products</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <ProductCard 
            v-for="relatedProduct in relatedProducts" 
            :key="relatedProduct.id" 
            :product="{
              id: relatedProduct.id,
              name: relatedProduct.name,
              price: relatedProduct.price,
              image: relatedProduct.image_url,
              description: relatedProduct.description
            }" 
            @add-to-cart="addToCartDirect"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCartStore } from '~/stores/cart';
import { productService, type Product } from '~/services/supabase';

const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();

const productId = computed(() => Number(route.params.id));
const loading = ref(true);
const error = ref<string | null>(null);
const product = ref<Product | null>(null);
const quantity = ref(1);

// For related products
const relatedProducts = ref<Product[]>([]);
const loadingRelatedProducts = ref(false);

// Fetch product details
onMounted(async () => {
  try {
    loading.value = true;
    
    // Fetch the product details
    product.value = await productService.getById(productId.value);
    
    // If product found, fetch related products
    if (product.value) {
      loadingRelatedProducts.value = true;
      // In a real app, you'd fetch related products based on category or tags
      // For now, we'll just fetch featured products
      relatedProducts.value = await productService.getFeatured(4);
      // Remove the current product from related products if it's in there
      relatedProducts.value = relatedProducts.value.filter(p => p.id !== product.value?.id);
      loadingRelatedProducts.value = false;
    }
    
    loading.value = false;
  } catch (err: any) {
    error.value = err.message || 'Failed to load product details';
    loading.value = false;
    loadingRelatedProducts.value = false;
    console.error('Error loading product details:', err);
  }
});

// Add current product to cart
function addToCart() {
  if (product.value) {
    for (let i = 0; i < quantity.value; i++) {
      cartStore.addItem({
        id: product.value.id,
        name: product.value.name,
        price: product.value.price,
        image: product.value.image_url
      });
    }
    
    // Show notification or redirect to cart
    if (confirm('Product added to cart. View cart now?')) {
      router.push('/cart');
    }
  }
}

// Add other product to cart directly
function addToCartDirect(product: { id: number; name: string; price: number; image: string; }) {
  cartStore.addItem({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image
  });
}
</script>
