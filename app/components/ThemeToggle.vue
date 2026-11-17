<script lang="ts" setup>
const colorMode = useColorMode();

const isDark = computed(() => colorMode.value === "dark");

const toggle = () => {
  colorMode.preference = isDark.value ? "light" : "dark";
};
</script>

<template>
  <ClientOnly>
    <button
      type="button"
      class="text-muted hover:bg-elevated hover:text-highlighted focus-visible:ring-primary/60 flex size-8 items-center justify-center rounded-md transition-colors focus-visible:ring-2 focus-visible:outline-none"
      :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
      @click="toggle"
    >
      <svg
        v-if="isDark"
        aria-hidden="true"
        class="size-4"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-width="1.5"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="4" />
        <path
          d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
        />
      </svg>
      <svg
        v-else
        aria-hidden="true"
        class="size-4"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        viewBox="0 0 24 24"
      >
        <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472 7 7 0 0 0 9.473 9.472Z" />
      </svg>
    </button>
    <template #fallback>
      <span class="size-8" />
    </template>
  </ClientOnly>
</template>
