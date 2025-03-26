<template>
  <div class="container mx-auto flex min-h-[80vh] items-center justify-center">
    <div class="text-center">
      <Icon name="lucide:loader" class="mx-auto h-12 w-12 animate-spin text-primary" />
      <h1 class="mt-4 text-xl font-medium">Processing your login...</h1>
      <p class="mt-2 text-muted-foreground">Please wait while we complete your authentication.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { onMounted } from 'vue'

const cartStore = useCartStore()
const router = useRouter()
const toast = useToast()

// This page handles the OAuth callback and redirects the user
onMounted(async () => {
  // Initialize the cart 
  await cartStore.initializeCart()
  
  // Sync cart with database for the newly authenticated user
  await cartStore.syncWithDatabase()
  
  toast.add({
    title: 'Login successful',
    description: 'You have been successfully logged in.',
    duration: 3000
  })
  
  // Redirect to home page or intended destination
  const redirectTo = '/'
  router.push(redirectTo)
})
</script>
