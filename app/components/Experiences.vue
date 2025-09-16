<script lang="ts" setup></script>

<template>
  <section class="flex flex-col justify-center">
    <h2 class="text-2xl font-semibold mb-6">Experience</h2>
    <div class="flex flex-col gap-6">
      <UCard>
        <template #header>
          <span class="font-bold">UI/UX Designer — Fake Studio</span>
          <span class="text-xs text-neutral-400 ml-2">2023 - 2025</span>
        </template>
        <p class="text-neutral-500">
          Collaborated with product teams to design and prototype user
          interfaces for web and mobile apps. Led design sprints and usability
          testing.
        </p>
      </UCard>
      <UCard>
        <template #header>
          <span class="font-bold">Frontend Engineer — Imaginary Corp</span>
          <span class="text-xs text-neutral-400 ml-2">2021 - 2023</span>
        </template>
        <p class="text-neutral-500">
          Developed scalable web applications with Nuxt and Vue. Worked closely
          with designers to implement pixel-perfect UI and smooth user
          experiences.
        </p>
      </UCard>
    </div>
  </section>
</template>
