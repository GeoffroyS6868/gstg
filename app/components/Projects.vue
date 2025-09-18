<template>
  <section id="projects" class="w-full max-w-5xl flex flex-col py-32">
    <h2 class="text-2xl font-semibold mb-6">
      {{ $t("components.projects.title") }}
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <UCard :ui="{ root: 'flex flex-col', body: 'flex flex-col flex-1' }">
        <template #header>
          <span class="font-bold">
            {{ $t("components.projects.sarpbc.name") }}
          </span>
          <span class="text-xs text-dimmed ml-2"> 2025 </span>
        </template>
        <div>
          <p>
            {{ $t("components.projects.sarpbc.description") }}
          </p>
        </div>
        <template #footer>
          <div class="flex-none">
            <UButton
              to="https://sarpbc.org"
              target="_blank"
              color="primary"
              variant="ghost"
              trailing-icon="i-fluent-arrow-up-right-24-regular"
              :label="$t('components.projects.view')"
            />
          </div>
        </template>
      </UCard>
      <UCard :ui="{ root: 'flex flex-col', body: 'flex flex-col flex-1' }">
        <template #header>
          <span class="font-bold">
            {{ $t("components.projects.tissuco.name") }}
          </span>
          <span class="text-xs text-dimmed ml-2"> 2025 </span>
        </template>
        <div>
          <p>
            {{ $t("components.projects.tissuco.description") }}
          </p>
        </div>
        <template #footer>
          <div class="flex-none">
            <UButton
              to="https://tissuco.fr"
              target="_blank"
              color="primary"
              variant="ghost"
              trailing-icon="i-fluent-arrow-up-right-24-regular"
              :label="$t('components.projects.view')"
            />
          </div>
        </template>
      </UCard>
    </div>
  </section>
</template>
