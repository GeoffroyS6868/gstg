<script lang="ts" setup>
const { title, date, lines } = defineProps<{
  title: string;
  date: string;
  lines: string[] | string;
}>();
</script>

<template>
  <UCard :ui="{ header: 'flex !flex-col md:!flex-row md:gap-2' }">
    <template #header>
      <span class="font-bold">
        {{ title }}
      </span>
      <span class="text-xs text-dimmed">{{ date }}</span>
    </template>
    <div class="text-muted">
      <template v-if="Array.isArray(lines) && lines.length">
        <ul class="list-disc pl-5">
          <li v-for="(line, i) in lines" :key="i">
            {{ line }}
          </li>
        </ul>
      </template>
      <template v-else>
        <p>{{ lines }}</p>
      </template>
    </div>
  </UCard>
</template>
