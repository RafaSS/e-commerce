<template>
  <div class="max-w-6xl mx-auto">
    <h1 class="text-3xl font-bold mb-8">Checkout</h1>
    
    <div v-if="cartStore.cartIsEmpty" class="bg-white p-8 rounded-lg shadow-sm text-center">
      <p class="text-gray-600 mb-4">Your cart is empty. Add some products before proceeding to checkout.</p>
      <Button @click="$router.push('/products')">Browse Products</Button>
    </div>
    
    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="md:col-span-2">
        <div class="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h2 class="text-xl font-bold mb-4">Shipping Information</h2>
          
          <form class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="firstName" class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  id="firstName"
                  v-model="shippingInfo.firstName"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  id="lastName"
                  v-model="shippingInfo.lastName"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label for="address" class="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input
                id="address"
                v-model="shippingInfo.address"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label for="city" class="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input
                  id="city"
                  v-model="shippingInfo.city"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label for="state" class="block text-sm font-medium text-gray-700 mb-1">State</label>
                <input
                  id="state"
                  v-model="shippingInfo.state"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label for="zipCode" class="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                <input
                  id="zipCode"
                  v-model="shippingInfo.zipCode"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                id="phone"
                v-model="shippingInfo.phone"
                type="tel"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </form>
        </div>
        
        <div class="bg-white p-6 rounded-lg shadow-sm">
          <h2 class="text-xl font-bold mb-4">Payment Method</h2>
          
          <div class="space-y-4">
            <div>
              <label for="cardNumber" class="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
              <input
                id="cardNumber"
                v-model="paymentInfo.cardNumber"
                type="text"
                placeholder="**** **** **** ****"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="expiryDate" class="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                <input
                  id="expiryDate"
                  v-model="paymentInfo.expiryDate"
                  type="text"
                  placeholder="MM/YY"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label for="cvv" class="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                <input
                  id="cvv"
                  v-model="paymentInfo.cvv"
                  type="text"
                  placeholder="***"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label for="nameOnCard" class="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
              <input
                id="nameOnCard"
                v-model="paymentInfo.nameOnCard"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div class="md:col-span-1">
        <div class="bg-white p-6 rounded-lg shadow-sm sticky top-4">
          <h2 class="text-xl font-bold mb-4">Order Summary</h2>
          
          <div class="space-y-4">
            <div class="max-h-64 overflow-auto">
              <div v-for="item in cartStore.items" :key="item.id" class="flex items-center space-x-3 py-2 border-b border-gray-100">
                <div class="w-12 h-12 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                  <img :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium truncate">{{ item.name }}</p>
                  <p class="text-xs text-gray-500">Qty: {{ item.quantity }}</p>
                </div>
                <div class="text-sm font-medium">${{ (item.price * item.quantity).toFixed(2) }}</div>
              </div>
            </div>
            
            <div class="pt-4 space-y-2">
              <div class="flex justify-between">
                <span class="text-gray-600">Subtotal</span>
                <span class="font-medium">${{ cartStore.totalPrice.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Shipping</span>
                <span class="font-medium">Free</span>
              </div>
              <div v-if="tax > 0" class="flex justify-between">
                <span class="text-gray-600">Tax</span>
                <span class="font-medium">${{ tax.toFixed(2) }}</span>
              </div>
              <div class="border-t border-gray-200 pt-2 mt-2 flex justify-between">
                <span class="font-semibold">Total</span>
                <span class="font-bold text-lg">${{ (cartStore.totalPrice + tax).toFixed(2) }}</span>
              </div>
            </div>
            
            <Button class="w-full" size="lg" @click="placeOrder" :disabled="isProcessing">
              <span v-if="isProcessing">Processing...</span>
              <span v-else>Place Order</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useCartStore } from '~/stores/cart';
import { useAuthStore } from '~/stores/auth';
import { useRouter } from 'vue-router';

const cartStore = useCartStore();
const authStore = useAuthStore();
const router = useRouter();

// Redirect if not authenticated
if (!authStore.isAuthenticated) {
  router.push('/login?redirect=checkout');
}

// Form data
const shippingInfo = ref({
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  phone: ''
});

const paymentInfo = ref({
  cardNumber: '',
  expiryDate: '',
  cvv: '',
  nameOnCard: ''
});

const isProcessing = ref(false);

// Calculate tax (simplified - in a real app this would be more complex)
const tax = computed(() => cartStore.totalPrice * 0.08); // 8% tax rate

// Place order function
async function placeOrder() {
  if (!validateForm()) {
    alert('Please fill in all required fields');
    return;
  }
  
  try {
    isProcessing.value = true;
    
    // In a real application, this would send the data to Supabase or another backend
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
    
    // Clear the cart
    cartStore.clearCart();
    
    // Redirect to success page
    router.push('/checkout/success');
  } catch (error) {
    console.error('Error placing order:', error);
    alert('An error occurred while placing your order. Please try again.');
  } finally {
    isProcessing.value = false;
  }
}

// Simple form validation
function validateForm() {
  // Check if shipping info is complete
  const isShippingComplete = Object.values(shippingInfo.value).every(value => value.trim() !== '');
  
  // Check if payment info is complete
  const isPaymentComplete = Object.values(paymentInfo.value).every(value => value.trim() !== '');
  
  return isShippingComplete && isPaymentComplete;
}
</script>
