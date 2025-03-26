<template>
  <div class="container mx-auto flex min-h-[80vh] items-center justify-center py-8">
    <div class="mx-auto w-full max-w-md space-y-6">
      <div class="text-center">
        <h1 class="text-3xl font-bold">Create an Account</h1>
        <p class="mt-2 text-muted-foreground">Sign up to get started with ShopEase</p>
      </div>

      <div class="rounded-lg border bg-card p-6 shadow-sm">
        <VeeForm @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
          <div class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-2">
                <label for="firstName" class="text-sm font-medium">First Name</label>
                <VeeField
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  :class="[
                    'w-full rounded-md border px-3 py-2 text-sm',
                    errors.firstName ? 'border-red-500' : 'border-input'
                  ]"
                />
                <VeeErrorMessage name="firstName" class="text-xs text-red-500" />
              </div>
              
              <div class="space-y-2">
                <label for="lastName" class="text-sm font-medium">Last Name</label>
                <VeeField
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  :class="[
                    'w-full rounded-md border px-3 py-2 text-sm',
                    errors.lastName ? 'border-red-500' : 'border-input'
                  ]"
                />
                <VeeErrorMessage name="lastName" class="text-xs text-red-500" />
              </div>
            </div>
            
            <div class="space-y-2">
              <label for="email" class="text-sm font-medium">Email</label>
              <VeeField
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                autocomplete="email"
                :class="[
                  'w-full rounded-md border px-3 py-2 text-sm',
                  errors.email ? 'border-red-500' : 'border-input'
                ]"
              />
              <VeeErrorMessage name="email" class="text-xs text-red-500" />
            </div>
            
            <div class="space-y-2">
              <label for="password" class="text-sm font-medium">Password</label>
              <VeeField
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                autocomplete="new-password"
                :class="[
                  'w-full rounded-md border px-3 py-2 text-sm',
                  errors.password ? 'border-red-500' : 'border-input'
                ]"
              />
              <VeeErrorMessage name="password" class="text-xs text-red-500" />
            </div>
            
            <div class="space-y-2">
              <label for="confirmPassword" class="text-sm font-medium">Confirm Password</label>
              <VeeField
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                autocomplete="new-password"
                :class="[
                  'w-full rounded-md border px-3 py-2 text-sm',
                  errors.confirmPassword ? 'border-red-500' : 'border-input'
                ]"
              />
              <VeeErrorMessage name="confirmPassword" class="text-xs text-red-500" />
            </div>
            
            <div class="space-y-2">
              <div class="flex items-center space-x-2">
                <VeeField
                  id="terms"
                  name="terms"
                  type="checkbox"
                  v-slot="{ field }"
                >
                  <input 
                    type="checkbox"
                    v-bind="field"
                    class="h-4 w-4 rounded border-gray-300"
                    :class="errors.terms ? 'border-red-500' : ''"
                  />
                </VeeField>
                <label for="terms" class="text-sm text-muted-foreground">
                  I agree to the
                  <NuxtLink to="/terms" class="text-primary hover:underline">
                    Terms of Service
                  </NuxtLink>
                  and
                  <NuxtLink to="/privacy" class="text-primary hover:underline">
                    Privacy Policy
                  </NuxtLink>
                </label>
              </div>
              <VeeErrorMessage name="terms" class="text-xs text-red-500" />
            </div>
            
            <p v-if="errorMessage" class="text-center text-xs text-red-500">
              {{ errorMessage }}
            </p>
            
            <div>
              <Button
                type="submit"
                class="w-full"
                :is-loading="isSubmitting"
                :disabled="isSubmitting"
              >
                Create Account
              </Button>
            </div>
            
            <div class="relative flex items-center justify-center">
              <div class="absolute inset-0 flex items-center">
                <span class="w-full border-t"></span>
              </div>
              <span class="relative bg-card px-2 text-xs text-muted-foreground">OR</span>
            </div>
            
            <div>
              <Button 
                type="button" 
                variant="outline" 
                class="w-full" 
                @click="signInWithGoogle"
                :disabled="isSubmitting"
              >
                <Icon name="logos:google-icon" class="mr-2 h-4 w-4" />
                Sign up with Google
              </Button>
            </div>
          </div>
        </VeeForm>
      </div>
      
      <div class="text-center text-sm">
        Already have an account?
        <NuxtLink to="/auth/login" class="text-primary hover:underline">
          Sign in
        </NuxtLink>
      </div>
    </div>
    
    <!-- Toast component for notifications -->
    <Toast />
  </div>
</template>

<script setup lang="ts">
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { useCartStore } from '~/stores/cart'

// Define validation schema with Zod
const validationSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
  terms: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the terms and conditions' }),
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

// Convert Zod schema to VeeValidate compatible schema
const schema = toTypedSchema(validationSchema)

// State
const errorMessage = ref('')
const client = useSupabaseAuthClient()
const user = useSupabaseUser()
const cartStore = useCartStore()
const toast = useToast()
const router = useRouter()

// Initialize cart and check if user is already logged in
onMounted(() => {
  cartStore.initializeCart()
  
  // If user is already logged in, redirect to home page
  if (user.value) {
    router.push('/')
  }
})

// Register with email and password
const onSubmit = async (values: any) => {
  try {
    errorMessage.value = ''
    
    const { data, error } = await client.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          first_name: values.firstName,
          last_name: values.lastName,
          full_name: `${values.firstName} ${values.lastName}`,
        }
      }
    })
    
    if (error) throw error
    
    // Success, sync cart with database
    if (data.user) {
      await cartStore.syncWithDatabase()
      
      toast.add({
        title: 'Account created!',
        description: 'Your account has been created successfully.',
        duration: 5000
      })
      
      router.push('/')
    } else {
      // Email confirmation required
      toast.add({
        title: 'Check your email',
        description: 'We\'ve sent a confirmation link to your email address.',
        duration: 5000
      })
      
      router.push('/auth/login')
    }
    
  } catch (error: any) {
    errorMessage.value = error.message || 'Failed to create account. Please try again.'
  }
}

// Sign in with Google
const signInWithGoogle = async () => {
  try {
    const { error } = await client.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })
    
    if (error) throw error
    
  } catch (error: any) {
    errorMessage.value = error.message || 'Failed to sign in with Google. Please try again.'
  }
}
</script>
