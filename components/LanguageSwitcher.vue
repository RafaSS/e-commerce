<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useI18n } from "#imports";

const { locale, locales } = useI18n();
console.log(locale.value, locales.value);
const isOpen = ref(false);

const availableLocales = computed(() => {
  return locales.value.filter((l) => l.code === "pt" || l.code === "en");
});

const currentLocaleName = computed(() => {
  const current = locales.value.find((l) => l.code === locale.value);
  return current ? current.name : "";
});

function switchLanguage(localeCode: "pt" | "en") {
  locale.value = localeCode;
  isOpen.value = false;
  console.log(locale.value, locales.value);
}

// Close dropdown when clicking outside
function handleClickOutside(event: Event) {
  const target = event.target as HTMLElement;
  if (isOpen.value && !target.closest(".language-switcher")) {
    isOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <div class="relative language-switcher">
    <button
      @click.stop="isOpen = !isOpen"
      class="flex items-center space-x-1 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="Switch language"
    >
      <span class="text-sm font-medium dark:text-white">{{
        currentLocaleName
      }}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4 dark:text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>

    <div
      v-if="isOpen"
      class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10"
    >
      <button
        v-for="loc in availableLocales"
        :key="loc.code"
        @click="switchLanguage(loc.code as 'en' | 'pt')"
        class="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        {{ loc.name }}
      </button>
    </div>
  </div>
</template>
