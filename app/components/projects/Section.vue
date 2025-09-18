<template>
  <section id="projects" class="w-full max-w-5xl flex flex-col py-16 md:py-32">
    <h2 class="text-2xl font-semibold mb-6">
      {{ $t("components.projects.title") }}
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ProjectsCard
        name="sarpbc.org"
        year="2025"
        :description="$t('components.projects.sarpbc.description')"
        link="https://sarpbc.org"
      />
      <ProjectsCard
        name="Tissuco"
        year="2025"
        :description="$t('components.projects.tissuco.description')"
        link="https://tissuco.fr"
      />
    </div>
  </section>
</template>
