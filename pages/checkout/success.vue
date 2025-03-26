<template>
  <div class="container mx-auto max-w-2xl py-12">
    <div class="rounded-lg border bg-card p-8 text-center shadow-sm">
      <div class="mb-4 flex justify-center">
        <div class="rounded-full bg-green-100 p-3">
          <Icon name="lucide:check" class="h-8 w-8 text-green-600" />
        </div>
      </div>
      
      <h1 class="mb-2 text-2xl font-bold">Order Confirmed!</h1>
      <p class="text-muted-foreground">
        Your order <span class="font-medium">{{ orderNumber }}</span> has been placed successfully.
      </p>
      
      <div class="mt-8 space-y-4">
        <div class="rounded-md bg-muted p-4 text-left">
          <h3 class="mb-2 font-medium">What happens next?</h3>
          <ol class="ml-4 list-decimal space-y-2 text-sm text-muted-foreground">
            <li>Your order has been received and is being processed</li>
            <li>You'll receive a confirmation email shortly</li>
            <li>Once your order ships, we'll send you tracking information</li>
            <li>Your items should arrive within 3-5 business days</li>
          </ol>
        </div>
        
        <div class="grid grid-cols-2 gap-4">
          <NuxtLink to="/products">
            <Button variant="outline" class="w-full">Continue Shopping</Button>
          </NuxtLink>
          <NuxtLink to="/account/orders">
            <Button class="w-full">View Order History</Button>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()

// Get order number from query params
const orderNumber = computed(() => {
  return route.query.order || 'Unknown'
})

// If no order number is provided, redirect to home
onMounted(() => {
  if (!route.query.order) {
    router.push('/')
  }
})
</script>
