<script setup lang="ts">
const { label, to } = defineProps<{
  label?: string;
  to: string;
}>();
</script>

<template>
  <NuxtLink
    :to="to"
    class="flex flex-row items-center py-1 px-2 text-highlighted font-light hover:bg-accented/50 duration-200 transition-bg"
  >
    <template v-if="label">{{ label }}</template>
    <template v-else><slot /></template>
  </NuxtLink>
</template>
