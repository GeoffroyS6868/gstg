<script lang="ts" setup>
interface Project {
  description: string;
  dotClass: string;
  domain: string;
  name: string;
}

const projects: Project[] = [
  {
    description: "Rocket League esports news, forum & data",
    domain: "sarpbc.org",
    dotClass: "bg-violet-500",
    name: "sarpbc.org",
  },
  {
    description: "SaaS for second-hand resellers",
    domain: "tissuco.fr",
    dotClass: "bg-orange-500",
    name: "Tissuco",
  },
];
</script>

<template>
  <Frame label="Projects">
    <ul class="flex flex-col">
      <LinkRow
        v-for="project in projects"
        :key="project.domain"
        :to="`https://${project.domain}?utm_source=gstg.fr`"
        :title="project.name"
        :description="project.description"
        :dot-class="project.dotClass"
        :meta="`${project.domain} ↗`"
      />
    </ul>
  </Frame>
</template>
