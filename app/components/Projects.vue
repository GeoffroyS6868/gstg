<script lang="ts" setup></script>

<template>
  <section class="flex flex-col justify-center">
    <h2 class="text-2xl font-semibold mb-6">Selected Projects</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <UCard>
        <template #header>
          <span class="font-bold">Project Alpha</span>
        </template>
        <p class="text-neutral-500">
          A modern dashboard for tracking productivity. UI/UX focused, built
          with Nuxt and Tailwind.
        </p>
        <template #footer>
          <ULink to="#" class="text-primary-600">View Details</ULink>
        </template>
      </UCard>
      <UCard>
        <template #header>
          <span class="font-bold">Beta Portfolio</span>
        </template>
        <p class="text-neutral-500">
          Personal portfolio template with minimal design and smooth animations.
        </p>
        <template #footer>
          <ULink to="#" class="text-primary-600">View Details</ULink>
        </template>
      </UCard>
    </div>
  </section>
</template>
