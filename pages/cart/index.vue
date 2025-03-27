<template>
  <div class="container py-8">
    <h1 class="mb-6 text-3xl font-bold tracking-tight">Your Shopping Cart</h1>

    <div
      v-if="cartStore.items.length === 0"
      class="rounded-lg border p-8 text-center"
    >
      <Icon
        name="lucide:shopping-cart"
        class="mx-auto h-12 w-12 text-muted-foreground"
      />
      <h3 class="mt-4 text-lg font-medium">Your cart is empty</h3>
      <p class="mt-2 text-sm text-muted-foreground">
        Looks like you haven't added anything to your cart yet.
      </p>
      <NuxtLink to="/products">
        <Button class="mt-4">Browse Products</Button>
      </NuxtLink>
    </div>

    <div v-else class="grid gap-8 md:grid-cols-3">
      <!-- Cart Items -->
      <div class="md:col-span-2">
        <div class="rounded-lg border">
          <div class="flex justify-between p-4 font-medium">
            <div class="w-1/2">Product</div>
            <div class="w-1/4 text-center">Quantity</div>
            <div class="w-1/4 text-right">Price</div>
          </div>
          <div class="divide-y">
            <div v-for="item in cartStore.items" :key="item.id" class="p-4">
              <div class="flex items-center">
                <div class="w-1/2">
                  <div class="flex items-center">
                    <div class="h-16 w-16 overflow-hidden rounded-md">
                      <img
                        :src="item.image"
                        :alt="item.name"
                        class="h-full w-full object-cover"
                      />
                    </div>
                    <div class="ml-4">
                      <NuxtLink
                        :to="`/products/${item.id}`"
                        class="font-medium hover:underline"
                      >
                        {{ item.name }}
                      </NuxtLink>
                      <Button
                        variant="ghost"
                        size="sm"
                        class="mt-1 text-sm text-muted-foreground"
                        @click="removeItem(item.id)"
                      >
                        <Icon name="lucide:trash-2" class="mr-1 h-3 w-3" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
                <div class="w-1/4 text-center">
                  <div class="inline-flex items-center">
                    <Button
                      variant="outline"
                      size="sm"
                      class="h-8 w-8 rounded-full p-0"
                      @click="decrementQuantity(item.id)"
                      :disabled="item.quantity <= 1"
                    >
                      <Icon name="lucide:minus" class="h-3 w-3" />
                    </Button>
                    <span class="mx-2 w-8 text-center">{{
                      item.quantity
                    }}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      class="h-8 w-8 rounded-full p-0"
                      @click="incrementQuantity(item.id)"
                    >
                      <Icon name="lucide:plus" class="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div class="w-1/4 text-right font-medium">
                  ${{ (item.price * item.quantity).toFixed(2) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Order Summary -->
      <div>
        <div class="rounded-lg border p-6">
          <h2 class="mb-4 text-lg font-medium">Order Summary</h2>

          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-muted-foreground">Subtotal</span>
              <span>${{ cartStore.totalPrice.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">Shipping</span>
              <span>${{ shipping.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">Tax</span>
              <span>${{ tax.toFixed(2) }}</span>
            </div>
            <div class="border-t pt-3">
              <div class="flex justify-between font-medium">
                <span>Total</span>
                <span>${{ totalWithTaxAndShipping.toFixed(2) }}</span>
              </div>
            </div>
          </div>

          <div class="mt-6 space-y-4">
            <div class="space-y-2">
              <label for="coupon" class="text-sm font-medium"
                >Coupon Code</label
              >
              <div class="flex">
                <input
                  id="coupon"
                  type="text"
                  v-model="couponCode"
                  placeholder="Enter coupon code"
                  class="flex-1 rounded-l-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
                />
                <Button variant="outline" class="rounded-l-none">Apply</Button>
              </div>
            </div>

            <Button
              class="w-full"
              size="lg"
              @click="proceedToCheckout"
              :disabled="isProcessing"
            >
              <Icon
                v-if="isProcessing"
                name="lucide:loader"
                class="mr-2 h-4 w-4 animate-spin"
              />
              Checkout
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
import { useCartStore } from "../../stores/cart";
import { useToast } from "../../components/ui/toast";

// Initialize cart
const cartStore = useCartStore();
const toast = useToast();
const user = useSupabaseUser();

onMounted(() => {
  cartStore.initializeCart();
});

// Order summary calculations
const shipping = computed(() => {
  return cartStore.totalPrice > 50 ? 0 : 5.99;
});

const tax = computed(() => {
  return cartStore.totalPrice * 0.08; // Assuming 8% tax rate
});

const totalWithTaxAndShipping = computed(() => {
  return cartStore.totalPrice + shipping.value + tax.value;
});

// Form fields
const couponCode = ref("");
const isProcessing = ref(false);

// Cart actions
const incrementQuantity = (productId: number) => {
  const item = cartStore.items.find((item) => item.id === productId);
  if (item) {
    cartStore.updateQuantity(productId, item.quantity + 1);
  }
};

const decrementQuantity = (productId: number) => {
  const item = cartStore.items.find((item) => item.id === productId);
  if (item && item.quantity > 1) {
    cartStore.updateQuantity(productId, item.quantity - 1);
  }
};

const removeItem = (productId: number) => {
  cartStore.removeFromCart(productId);
  toast.add({
    title: "Item removed",
    description: "The item has been removed from your cart.",
    duration: 3000,
  });
};

const proceedToCheckout = () => {
  isProcessing.value = true;

  // Simulate processing
  setTimeout(() => {
    isProcessing.value = false;

    if (user.value) {
      // If user is logged in, redirect to checkout page
      navigateTo("/checkout");
    } else {
      // If user is not logged in, redirect to login page
      navigateTo("/auth/login");
    }
  }, 1000);
};
</script>
