<script setup lang="ts">
const { label, to } = defineProps<{
  label?: string;
  to: string;
}>();
</script>

<template>
  <NuxtLink
    :to="to"
    class="flex flex-row items-center p-1 rounded-[6px] text-highlighted font-light hover:bg-accented/50 duration-200 transition-bg"
  >
    <template v-if="label">{{ label }}</template>
    <template v-else><slot /></template>
  </NuxtLink>
</template>
