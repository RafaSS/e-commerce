<template>
  <footer class="border-t">
    <div class="container py-8 md:py-12">
      <div class="grid grid-cols-1 gap-8 md:grid-cols-4">
        <div class="space-y-4">
          <div class="flex items-center space-x-2">
            <Icon name="lucide:shopping-bag" class="h-6 w-6" />
            <span class="text-lg font-bold">ShopEase</span>
          </div>
          <p class="text-sm text-muted-foreground">
            Modern shopping experience with a focus on user experience and design.
          </p>
        </div>
        <div class="space-y-4">
          <h3 class="text-lg font-bold">Shopping</h3>
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/products" class="text-sm text-muted-foreground hover:text-foreground">
                All Products
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/products/category/electronics" class="text-sm text-muted-foreground hover:text-foreground">
                Electronics
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/products/category/clothing" class="text-sm text-muted-foreground hover:text-foreground">
                Clothing
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/products/category/home" class="text-sm text-muted-foreground hover:text-foreground">
                Home & Kitchen
              </NuxtLink>
            </li>
          </ul>
        </div>
        <div class="space-y-4">
          <h3 class="text-lg font-bold">Company</h3>
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/about" class="text-sm text-muted-foreground hover:text-foreground">
                About Us
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contact" class="text-sm text-muted-foreground hover:text-foreground">
                Contact
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/terms" class="text-sm text-muted-foreground hover:text-foreground">
                Terms & Conditions
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/privacy" class="text-sm text-muted-foreground hover:text-foreground">
                Privacy Policy
              </NuxtLink>
            </li>
          </ul>
        </div>
        <div class="space-y-4">
          <h3 class="text-lg font-bold">Connect</h3>
          <div class="flex items-center space-x-4">
            <a href="#" class="text-muted-foreground hover:text-foreground">
              <Icon name="lucide:twitter" class="h-5 w-5" />
              <span class="sr-only">Twitter</span>
            </a>
            <a href="#" class="text-muted-foreground hover:text-foreground">
              <Icon name="lucide:instagram" class="h-5 w-5" />
              <span class="sr-only">Instagram</span>
            </a>
            <a href="#" class="text-muted-foreground hover:text-foreground">
              <Icon name="lucide:facebook" class="h-5 w-5" />
              <span class="sr-only">Facebook</span>
            </a>
          </div>
          <div class="space-y-2">
            <h4 class="text-sm font-medium">Subscribe to our newsletter</h4>
            <form class="flex space-x-2">
              <input
                type="email"
                placeholder="Email"
                class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
              <Button type="submit" size="sm">Subscribe</Button>
            </form>
          </div>
        </div>
      </div>
      <div class="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
        &copy; {{ new Date().getFullYear() }} ShopEase. All rights reserved.
      </div>
    </div>
  </footer>
</template>
