<script lang="ts" setup>
const { name, year, description, link } = defineProps<{
  name: string;
  year: string;
  description: string;
  link: string;
}>();
</script>

<template>
  <UCard
    :ui="{
      root: 'flex flex-col',
      body: 'flex flex-col flex-1',
    }"
  >
    <template #header>
      <span class="font-bold">
        {{ name }}
      </span>
      <span class="text-xs text-dimmed ml-2"> {{ year }} </span>
    </template>
    <p>
      {{ description }}
    </p>
    <template #footer>
      <div class="flex-none">
        <UButton
          :to="link"
          target="_blank"
          color="primary"
          variant="ghost"
          trailing-icon="i-fluent-arrow-up-right-24-regular"
          :label="$t('components.projects.view')"
        />
      </div>
    </template>
  </UCard>
</template>
