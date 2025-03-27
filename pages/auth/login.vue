<template>
  <div
    class="container mx-auto flex min-h-[80vh] items-center justify-center py-8"
  >
    <div class="mx-auto w-full max-w-md space-y-6">
      <div class="text-center">
        <h1 class="text-3xl font-bold">Welcome Back</h1>
        <p class="mt-2 text-muted-foreground">
          Sign in to your account to continue
        </p>
      </div>

      <div class="rounded-lg border bg-card p-6 shadow-sm">
        <VeeForm
          @submit="onSubmit"
          :validation-schema="schema"
          v-slot="{ errors, isSubmitting }"
        >
          <div class="space-y-4">
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
                  errors.email ? 'border-red-500' : 'border-input',
                ]"
              />
              <VeeErrorMessage name="email" class="text-xs text-red-500" />
            </div>

            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <label for="password" class="text-sm font-medium"
                  >Password</label
                >
                <NuxtLink
                  to="/auth/forgot-password"
                  class="text-xs text-primary hover:underline"
                >
                  Forgot password?
                </NuxtLink>
              </div>
              <VeeField
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                autocomplete="current-password"
                :class="[
                  'w-full rounded-md border px-3 py-2 text-sm',
                  errors.password ? 'border-red-500' : 'border-input',
                ]"
              />
              <VeeErrorMessage name="password" class="text-xs text-red-500" />
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
                Sign In
              </Button>
            </div>

            <div class="relative flex items-center justify-center">
              <div class="absolute inset-0 flex items-center">
                <span class="w-full border-t"></span>
              </div>
              <span class="relative bg-card px-2 text-xs text-muted-foreground"
                >OR</span
              >
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
                Sign in with Google
              </Button>
            </div>
          </div>
        </VeeForm>
      </div>

      <div class="text-center text-sm">
        Don't have an account?
        <NuxtLink to="/auth/register" class="text-primary hover:underline">
          Sign up
        </NuxtLink>
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
import { useRoute, useRouter } from "vue-router";
import { useToast } from "../../components/ui/toast";
import { onMounted, ref } from "vue";

// Define validation schema with Zod
const validationSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Convert Zod schema to VeeValidate compatible schema
const schema = toTypedSchema(validationSchema);

// State
const errorMessage = ref("");
const client = useSupabaseClient();
const user = useSupabaseUser();
const cartStore = useCartStore();
const toast = useToast();
const route = useRoute();
const router = useRouter();

// Check for redirect and message from query parameters
onMounted(() => {
  if (route.query.message) {
    toast.add({
      title: "Sign in required",
      description: route.query.message as string,
      duration: 5000,
    });
  }

  // Initialize cart
  cartStore.initializeCart();

  // If user is already logged in, redirect to home page
  if (user.value) {
    const redirectTo = (route.query.redirect as string) || "/";
    router.push(redirectTo);
  }
});

// Sign in with email and password
const onSubmit = async (values: any) => {
  try {
    errorMessage.value = "";

    const { error } = await client.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error) throw error;

    // Success, sync cart with database
    await cartStore.syncWithDatabase();

    toast.add({
      title: "Welcome back!",
      description: "You have successfully signed in.",
      duration: 3000,
    });

    // Redirect user
    const redirectTo = (route.query.redirect as string) || "/";
    router.push(redirectTo);
  } catch (error: any) {
    errorMessage.value =
      error.message || "Failed to sign in. Please try again.";
  }
};

// Sign in with Google
const signInWithGoogle = async () => {
  try {
    const { error } = await client.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) throw error;
  } catch (error: any) {
    errorMessage.value =
      error.message || "Failed to sign in with Google. Please try again.";
  }
};
</script>
