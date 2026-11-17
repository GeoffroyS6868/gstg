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
      class="group text-muted hover:text-highlighted focus-visible:text-highlighted inline-flex items-baseline outline-none"
    >
      <span
        aria-hidden="true"
        class="text-dimmed group-hover:text-primary group-focus-visible:text-primary"
        >(</span
      ><span class="px-px">{{ link.label }}</span
      ><span
        aria-hidden="true"
        class="text-dimmed group-hover:text-primary group-focus-visible:text-primary"
        >)</span
      >
    </NuxtLink>
  </nav>
</template>
