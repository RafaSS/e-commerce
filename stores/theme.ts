import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useThemeStore = defineStore("theme", () => {
  // State
  const isDarkMode = ref(false);

  // Initial setup - check system preference or local storage
  const initializeTheme = () => {
    // First check if user has saved preference
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      isDarkMode.value = savedTheme === "dark";
    } else {
      // Use system preference as fallback
      isDarkMode.value = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
    }

    applyTheme();
  };

  // Apply theme to document
  const applyTheme = () => {
    // Add or remove dark class on document element
    if (isDarkMode.value) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Save preference to localStorage
    localStorage.setItem("theme", isDarkMode.value ? "dark" : "light");
  };

  // Toggle theme
  const toggleTheme = () => {
    isDarkMode.value = !isDarkMode.value;
    applyTheme();
  };

  // Watch for changes to system preference
  const setupSystemPreferenceListener = () => {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        // Only update if user hasn't explicitly set a preference
        if (!localStorage.getItem("theme")) {
          isDarkMode.value = e.matches;
          applyTheme();
        }
      });
  };

  return {
    isDarkMode,
    toggleTheme,
    initializeTheme,
    setupSystemPreferenceListener,
  };
});
