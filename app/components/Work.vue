<script lang="ts" setup>
interface Experience {
  company: string;
  companyUrl: string;
  date: string;
  title: string;
}

const experiences: Experience[] = [
  {
    company: "Join Stories",
    companyUrl: "https://join-stories.com",
    date: "November 2025 - Present",
    title: "Software Engineer",
  },
  {
    company: "Gojob",
    companyUrl: "https://www.gojob.com",
    date: "March 2025 - August 2025",
    title: "Software Engineer Intern",
  },
  {
    company: "Schaeffer Productique",
    companyUrl: "https://www.schaeffer-productique.com",
    date: "September 2024 - February 2025",
    title: "Frontend Engineer Intern",
  },
  {
    company: "Final Advanced Materials",
    companyUrl: "https://www.final-materials.com",
    date: "May 2024 - August 2024",
    title: "Software Engineer Intern",
  },
  {
    company: "Kiwi Backup",
    companyUrl: "https://www.kiwi-backup.com",
    date: "April 2023 - July 2023",
    title: "Go Developer Intern",
  },
  {
    company: "Systancia",
    companyUrl: "https://www.systancia.com",
    date: "October 2022 - March 2023",
    title: "Python Developer Intern",
  },
  {
    company: "Kiwi Backup",
    companyUrl: "https://www.kiwi-backup.com",
    date: "August 2021 - December 2021",
    title: "Go Developer Intern",
  },
];
</script>

<template>
  <section class="flex w-full flex-col gap-8">
    <h2 class="font-serif text-3xl font-normal tracking-tight">Work</h2>
    <div class="flex flex-col gap-4">
      <div
        v-for="experience in experiences"
        :key="`${experience.company}-${experience.date}`"
        class="flex flex-col md:gap-2 md:flex-row md:items-baseline md:justify-between"
      >
        <div class="flex flex-row flex-wrap gap-2 items-baseline">
          <NuxtLink
            :to="experience.companyUrl"
            external
            rel="noopener"
            target="_blank"
            class="group"
          >
            <span
              class="font-sans font-semibold text-md group-hover:text-primary"
            >
              {{ experience.company }}
            </span>
          </NuxtLink>
          <span class="font-sans font-medium text-sm text-muted">
            {{ experience.title }}
          </span>
        </div>
        <span class="font-sans shrink-0 text-sm text-dimmed">
          {{ experience.date }}
        </span>
      </div>
    </div>
  </section>
</template>
