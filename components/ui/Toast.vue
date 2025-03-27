<template>
  <div class="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      :class="[
        'relative flex w-72 items-center justify-between space-x-4 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all',
        toast.type === 'error'
          ? 'border-red-600 bg-red-50 text-red-900'
          : 'border-green-600 bg-green-50 text-green-900',
      ]"
    >
      <div class="flex w-full items-start gap-2">
        <Icon
          :name="
            toast.type === 'error'
              ? 'lucide:alert-circle'
              : 'lucide:check-circle'
          "
          class="h-5 w-5 flex-shrink-0"
        />
        <div class="flex-1">
          <h3 class="text-sm font-medium">{{ toast.title }}</h3>
          <p
            v-if="toast.description"
            class="mt-1 text-xs text-muted-foreground"
          >
            {{ toast.description }}
          </p>
        </div>
      </div>
      <button
        @click="() => removeToast(toast.id)"
        class="inline-flex h-4 w-4 items-center justify-center rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none"
      >
        <Icon name="lucide:x" class="h-3 w-3" />
        <span class="sr-only">Close</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from "../ui/toast";

const { toasts, remove: removeToast } = useToast();
</script>
