<script lang="ts" setup>
import type { Technology } from "~/types/skills";

const { tag } = defineProps<{
  tag: Technology;
}>();
</script>

<template>
  <div class="w-fit h-12 flex flex-row items-center px-2 gap-2 text-muted">
    <UIcon :name="tag.icon" class="size-8" />
    <h3 class="text-xl font-medium">{{ tag.name }}</h3>
  </div>
</template>
