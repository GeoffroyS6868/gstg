<script lang="ts" setup>
const projects: { name: string; description: string; link: string }[] = [
  {
    description: "Rocket League esports news, forum & data",
    link: "https://sarpbc.org",
    name: "sarpbc.org",
  },
  {
    description: "SaaS for second-hand resellers",
    link: "https://tissuco.fr",
    name: "Tissuco",
  },
];
</script>

<template>
  <section class="flex w-full flex-col gap-8">
    <h2 class="font-serif text-3xl font-normal tracking-tight">Projects</h2>
    <div class="flex flex-col gap-4">
      <div
        v-for="project in projects"
        :key="project.name"
        class="flex flex-row flex-wrap gap-2 items-baseline"
      >
        <NuxtLink
          external
          rel="noopener"
          target="_blank"
          :to="`${project.link}?utm_source=gstg.fr`"
          class="group"
        >
          <span
            class="font-sans font-semibold text-md group-hover:text-primary"
          >
            {{ project.name }}
          </span>
        </NuxtLink>
        <span class="font-sans font-medium text-sm text-muted">
          {{ project.description }}
        </span>
      </div>
    </div>
  </section>
</template>
