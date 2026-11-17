<script lang="ts" setup>
const links = [
  { label: "LinkedIn", to: "https://www.linkedin.com/in/geoffroy-stanger/" },
  { label: "GitHub", to: "https://github.com/GeoffroyS6868" },
] as const;
</script>

<template>
  <nav aria-label="Elsewhere" class="flex flex-wrap gap-x-1 text-sm">
    <NuxtLink
      v-for="link in links"
      :key="link.label"
      :to="link.to"
      external
      rel="noopener"
      target="_blank"
      class="group text-muted hover:text-highlighted focus-visible:text-highlighted inline-flex items-baseline transition-colors"
    >
      <span aria-hidden="true" class="text-dimmed">(</span>
      <span class="relative inline-flex overflow-hidden px-px">
        <span
          class="transition-transform duration-300 ease-out group-hover:-translate-y-full motion-reduce:transition-none"
        >
          {{ link.label }}
        </span>
        <span
          aria-hidden="true"
          class="absolute inset-x-px top-full transition-transform duration-300 ease-out group-hover:-translate-y-full motion-reduce:transition-none"
        >
          {{ link.label }}
        </span>
      </span>
      <span aria-hidden="true" class="text-dimmed">)</span>
    </NuxtLink>
  </nav>
</template>
