<script lang="ts" setup>
import type { Skill } from "~/types/skills";

const { skill } = defineProps<{
  skill: Skill;
}>();
</script>

<template>
  <div class="w-full grid grid-cols-5">
    <h2
      class="h-12 flex flex-row col-span-2 text-3xl font-semibold items-center uppercase"
    >
      {{ skill.name }}
    </h2>
    <div class="col-span-3 flex flex-wrap gap-4">
      <SkillsTag
        v-for="tech in skill.technologies"
        :key="tech.name"
        :tag="tech"
      />
    </div>
  </div>
</template>
