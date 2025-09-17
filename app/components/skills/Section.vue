<script lang="ts" setup>
const { t } = useI18n();

const skills = [
  {
    name: "Frontend",
    technologies: [
      { name: "TypeScript", icon: "i-logos-typescript-icon" },
      { name: "JavaScript", icon: "i-logos-javascript" },
      { name: "Vue.js", icon: "i-logos-vue" },
      { name: "Nuxt.js", icon: "i-logos-nuxt-icon" },
      { name: "React", icon: "i-logos-react" },
      { name: "Next.js", icon: "i-logos-nextjs-icon" },
      { name: "Tailwind CSS", icon: "i-logos-tailwindcss-icon" },
    ],
  },
  {
    name: "Backend",
    technologies: [
      { name: "Node.js", icon: "i-logos-nodejs-icon" },
      { name: "Nest.js", icon: "i-logos-nestjs" },
      { name: "Fastify", icon: "i-logos-fastify-icon" },
      { name: "Express.js", icon: "i-simple-icons-express" },
    ],
  },
  {
    name: t("components.skills.databases"),
    technologies: [
      { name: "PostgreSQL", icon: "i-logos-postgresql" },
      { name: "MongoDB", icon: "i-logos-mongodb-icon" },
      { name: "MySQL", icon: "i-logos-mysql" },
    ],
  },
  {
    name: "DevOps",
    technologies: [
      { name: "Docker", icon: "i-logos-docker-icon" },
      { name: "Git", icon: "i-logos-git-icon" },
      { name: "GitHub Actions", icon: "i-logos-github-icon" },
    ],
  },
];
</script>

<template>
  <section class="w-full max-w-5xl flex flex-col justify-center py-32 gap-8">
    <h2 class="text-2xl font-semibold">{{ $t("components.skills.title") }}</h2>
    <div class="flex flex-wrap gap-8">
      <SkillsRow v-for="skill in skills" :key="skill.name" :skill="skill" />
    </div>
  </section>
</template>
