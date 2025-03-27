<template>
  <div class="container py-8">
    <h1 class="mb-6 text-3xl font-bold tracking-tight">Checkout</h1>

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
        Add some items to your cart before checking out.
      </p>
      <NuxtLink to="/products">
        <Button class="mt-4">Browse Products</Button>
      </NuxtLink>
    </div>

    <div v-else class="grid gap-8 lg:grid-cols-3">
      <!-- Checkout Form -->
      <div class="lg:col-span-2">
        <VeeForm
          @submit="placeOrder"
          :validation-schema="schema"
          v-slot="{ errors, isSubmitting }"
        >
          <div class="space-y-8">
            <!-- Shipping Information -->
            <div class="rounded-lg border p-6">
              <h2 class="mb-4 text-xl font-medium">Shipping Information</h2>

              <div class="space-y-4">
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div class="space-y-2">
                    <label for="firstName" class="text-sm font-medium"
                      >First Name</label
                    >
                    <VeeField
                      id="firstName"
                      name="firstName"
                      type="text"
                      :class="[
                        'w-full rounded-md border px-3 py-2 text-sm',
                        errors.firstName ? 'border-red-500' : 'border-input',
                      ]"
                    />
                    <VeeErrorMessage
                      name="firstName"
                      class="text-xs text-red-500"
                    />
                  </div>
                  <div class="space-y-2">
                    <label for="lastName" class="text-sm font-medium"
                      >Last Name</label
                    >
                    <VeeField
                      id="lastName"
                      name="lastName"
                      type="text"
                      :class="[
                        'w-full rounded-md border px-3 py-2 text-sm',
                        errors.lastName ? 'border-red-500' : 'border-input',
                      ]"
                    />
                    <VeeErrorMessage
                      name="lastName"
                      class="text-xs text-red-500"
                    />
                  </div>
                </div>

                <div class="space-y-2">
                  <label for="address" class="text-sm font-medium"
                    >Address</label
                  >
                  <VeeField
                    id="address"
                    name="address"
                    type="text"
                    :class="[
                      'w-full rounded-md border px-3 py-2 text-sm',
                      errors.address ? 'border-red-500' : 'border-input',
                    ]"
                  />
                  <VeeErrorMessage
                    name="address"
                    class="text-xs text-red-500"
                  />
                </div>

                <div class="space-y-2">
                  <label for="apartment" class="text-sm font-medium"
                    >Apartment, suite, etc. (optional)</label
                  >
                  <VeeField
                    id="apartment"
                    name="apartment"
                    type="text"
                    :class="[
                      'w-full rounded-md border px-3 py-2 text-sm',
                      errors.apartment ? 'border-red-500' : 'border-input',
                    ]"
                  />
                  <VeeErrorMessage
                    name="apartment"
                    class="text-xs text-red-500"
                  />
                </div>

                <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div class="space-y-2">
                    <label for="city" class="text-sm font-medium">City</label>
                    <VeeField
                      id="city"
                      name="city"
                      type="text"
                      :class="[
                        'w-full rounded-md border px-3 py-2 text-sm',
                        errors.city ? 'border-red-500' : 'border-input',
                      ]"
                    />
                    <VeeErrorMessage name="city" class="text-xs text-red-500" />
                  </div>
                  <div class="space-y-2">
                    <label for="state" class="text-sm font-medium"
                      >State / Province</label
                    >
                    <VeeField
                      id="state"
                      name="state"
                      type="text"
                      :class="[
                        'w-full rounded-md border px-3 py-2 text-sm',
                        errors.state ? 'border-red-500' : 'border-input',
                      ]"
                    />
                    <VeeErrorMessage
                      name="state"
                      class="text-xs text-red-500"
                    />
                  </div>
                  <div class="space-y-2">
                    <label for="postalCode" class="text-sm font-medium"
                      >Postal Code</label
                    >
                    <VeeField
                      id="postalCode"
                      name="postalCode"
                      type="text"
                      :class="[
                        'w-full rounded-md border px-3 py-2 text-sm',
                        errors.postalCode ? 'border-red-500' : 'border-input',
                      ]"
                    />
                    <VeeErrorMessage
                      name="postalCode"
                      class="text-xs text-red-500"
                    />
                  </div>
                </div>

                <div class="space-y-2">
                  <label for="country" class="text-sm font-medium"
                    >Country</label
                  >
                  <VeeField
                    as="select"
                    id="country"
                    name="country"
                    :class="[
                      'w-full rounded-md border px-3 py-2 text-sm',
                      errors.country ? 'border-red-500' : 'border-input',
                    ]"
                  >
                    <option value="">Select a country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="MX">Mexico</option>
                    <option value="BR">Brazil</option>
                    <option value="GB">United Kingdom</option>
                    <option value="FR">France</option>
                    <option value="DE">Germany</option>
                    <option value="JP">Japan</option>
                    <option value="AU">Australia</option>
                  </VeeField>
                  <VeeErrorMessage
                    name="country"
                    class="text-xs text-red-500"
                  />
                </div>

                <div class="space-y-2">
                  <label for="phone" class="text-sm font-medium">Phone</label>
                  <VeeField
                    id="phone"
                    name="phone"
                    type="tel"
                    :class="[
                      'w-full rounded-md border px-3 py-2 text-sm',
                      errors.phone ? 'border-red-500' : 'border-input',
                    ]"
                  />
                  <VeeErrorMessage name="phone" class="text-xs text-red-500" />
                </div>
              </div>
            </div>

            <!-- Payment Information -->
            <div class="rounded-lg border p-6">
              <h2 class="mb-4 text-xl font-medium">Payment Information</h2>

              <div class="space-y-4">
                <div class="space-y-2">
                  <label for="cardName" class="text-sm font-medium"
                    >Name on Card</label
                  >
                  <VeeField
                    id="cardName"
                    name="cardName"
                    type="text"
                    :class="[
                      'w-full rounded-md border px-3 py-2 text-sm',
                      errors.cardName ? 'border-red-500' : 'border-input',
                    ]"
                  />
                  <VeeErrorMessage
                    name="cardName"
                    class="text-xs text-red-500"
                  />
                </div>

                <div class="space-y-2">
                  <label for="cardNumber" class="text-sm font-medium"
                    >Card Number</label
                  >
                  <VeeField
                    id="cardNumber"
                    name="cardNumber"
                    type="text"
                    placeholder="**** **** **** ****"
                    :class="[
                      'w-full rounded-md border px-3 py-2 text-sm',
                      errors.cardNumber ? 'border-red-500' : 'border-input',
                    ]"
                  />
                  <VeeErrorMessage
                    name="cardNumber"
                    class="text-xs text-red-500"
                  />
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div class="space-y-2">
                    <label for="expiryDate" class="text-sm font-medium"
                      >Expiry Date</label
                    >
                    <VeeField
                      id="expiryDate"
                      name="expiryDate"
                      type="text"
                      placeholder="MM/YY"
                      :class="[
                        'w-full rounded-md border px-3 py-2 text-sm',
                        errors.expiryDate ? 'border-red-500' : 'border-input',
                      ]"
                    />
                    <VeeErrorMessage
                      name="expiryDate"
                      class="text-xs text-red-500"
                    />
                  </div>
                  <div class="space-y-2">
                    <label for="cvc" class="text-sm font-medium">CVC</label>
                    <VeeField
                      id="cvc"
                      name="cvc"
                      type="text"
                      placeholder="***"
                      :class="[
                        'w-full rounded-md border px-3 py-2 text-sm',
                        errors.cvc ? 'border-red-500' : 'border-input',
                      ]"
                    />
                    <VeeErrorMessage name="cvc" class="text-xs text-red-500" />
                  </div>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              class="w-full"
              size="lg"
              :is-loading="isSubmitting"
              :disabled="isSubmitting"
            >
              Complete Order
            </Button>
          </div>
        </VeeForm>
      </div>

      <!-- Order Summary -->
      <div>
        <div class="sticky top-20 rounded-lg border p-6">
          <h2 class="mb-4 text-lg font-medium">Order Summary</h2>

          <div class="divide-y">
            <div class="max-h-64 space-y-3 overflow-auto py-2">
              <div
                v-for="item in cartStore.items"
                :key="item.id"
                class="flex items-center space-x-4"
              >
                <div
                  class="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border"
                >
                  <img
                    :src="item.image"
                    :alt="item.name"
                    class="h-full w-full object-cover"
                  />
                </div>
                <div class="flex-1">
                  <h3 class="text-sm font-medium">{{ item.name }}</h3>
                  <p class="text-xs text-muted-foreground">
                    Qty: {{ item.quantity }}
                  </p>
                </div>
                <p class="text-sm font-medium">
                  ${{ (item.price * item.quantity).toFixed(2) }}
                </p>
              </div>
            </div>

            <div class="space-y-3 py-4">
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
            </div>

            <div class="py-4">
              <div class="flex justify-between font-medium">
                <span>Total</span>
                <span>${{ totalWithTaxAndShipping.toFixed(2) }}</span>
              </div>
            </div>
          </div>

          <div class="mt-4 rounded-md bg-muted p-4 text-sm">
            <p class="flex items-center">
              <Icon
                name="lucide:shield-check"
                class="mr-2 h-4 w-4 text-primary"
              />
              Secure checkout with 256-bit encryption
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast component for notifications -->
    <Toast />
  </div>
</template>

<script setup lang="ts">
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useCartStore } from "../../stores/cart";
import { useToast } from "../../components/ui/toast";

// Define validation schema with Zod
const validationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  address: z.string().min(1, "Address is required"),
  apartment: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State/Province is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  country: z.string().min(1, "Country is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  cardName: z.string().min(1, "Name on card is required"),
  cardNumber: z
    .string()
    .min(16, "Card number is required")
    .regex(/^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/, "Invalid card number format"),
  expiryDate: z
    .string()
    .regex(
      /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
      "Invalid expiry date format (MM/YY)"
    ),
  cvc: z
    .string()
    .min(3, "CVC is required")
    .max(4, "CVC must be 3-4 digits")
    .regex(/^\d{3,4}$/, "CVC must be 3-4 digits"),
});

// Convert Zod schema to VeeValidate compatible schema
const schema = toTypedSchema(validationSchema);

// Initialize cart
const cartStore = useCartStore();
const toast = useToast();
const router = useRouter();
const supabase = useSupabaseClient();
const user = useSupabaseUser();

onMounted(() => {
  cartStore.initializeCart();

  // Redirect if cart is empty
  if (cartStore.items.length === 0) {
    router.push("/cart");
  }

  // Redirect if user is not logged in
  if (!user.value) {
    router.push(
      "/auth/login?redirect=/checkout&message=Please log in to complete checkout"
    );
  }
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

// Place order
const placeOrder = async (values: any) => {
  try {
    if (!user.value) {
      toast.add({
        title: "Error",
        description: "You must be logged in to place an order.",
        type: "error",
        duration: 5000,
      });
      return;
    }

    // In a real app, this would be an API call to Supabase
    // For now, we'll simulate a successful order

    // Create a simulated order number
    const orderNumber = `ORD-${Date.now().toString().slice(-8)}`;

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Clear the cart
    cartStore.clearCart();

    // Show success message
    toast.add({
      title: "Order Placed!",
      description: `Your order #${orderNumber} has been placed successfully.`,
      duration: 5000,
    });

    // Redirect to success page
    router.push(`/checkout/success?order=${orderNumber}`);
  } catch (error: any) {
    console.error("Error placing order:", error);
    toast.add({
      title: "Error",
      description: "There was a problem placing your order. Please try again.",
      type: "error",
      duration: 5000,
    });
  }
};
</script>
