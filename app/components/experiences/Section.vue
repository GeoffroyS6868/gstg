<template>
  <section class="w-full max-w-5xl flex flex-col justify-center py-32">
    <h2 class="text-2xl font-semibold mb-6">
      {{ $t("components.experiences.title") }}
    </h2>
    <div class="flex flex-col gap-6">
      <UCard>
        <template #header>
          <span class="font-bold">{{
            $t("components.experiences.gojob.role")
          }}</span>
          <span class="text-xs text-dimmed ml-2">
            {{ $t("components.experiences.gojob.date") }}
          </span>
        </template>
        <p class="text-muted">
          {{ $t("components.experiences.gojob.desc") }}
        </p>
      </UCard>
      <UCard>
        <template #header>
          <span class="font-bold">{{
            $t("components.experiences.schaeffer.role")
          }}</span>
          <span class="text-xs text-dimmed ml-2">
            {{ $t("components.experiences.schaeffer.date") }}
          </span>
        </template>
        <p class="text-muted">
          {{ $t("components.experiences.schaeffer.desc") }}
        </p>
      </UCard>
      <UCard>
        <template #header>
          <span class="font-bold">{{
            $t("components.experiences.fam.role")
          }}</span>
          <span class="text-xs text-dimmed ml-2">
            {{ $t("components.experiences.fam.date") }}
          </span>
        </template>
        <p class="text-muted">
          {{ $t("components.experiences.fam.desc") }}
        </p>
      </UCard>
      <UCard>
        <template #header>
          <span class="font-bold">{{
            $t("components.experiences.kiwi2023.role")
          }}</span>
          <span class="text-xs text-dimmed ml-2">
            {{ $t("components.experiences.kiwi2023.date") }}
          </span>
        </template>
        <p class="text-muted">
          {{ $t("components.experiences.kiwi2023.desc") }}
        </p>
      </UCard>
      <UCard>
        <template #header>
          <span class="font-bold">{{
            $t("components.experiences.systancia.role")
          }}</span>
          <span class="text-xs text-dimmed ml-2">
            {{ $t("components.experiences.systancia.date") }}
          </span>
        </template>
        <p class="text-muted">
          {{ $t("components.experiences.systancia.desc") }}
        </p>
      </UCard>
      <UCard>
        <template #header>
          <span class="font-bold">{{
            $t("components.experiences.kiwi2021.role")
          }}</span>
          <span class="text-xs text-dimmed ml-2">
            {{ $t("components.experiences.kiwi2021.date") }}
          </span>
        </template>
        <p class="text-muted">
          {{ $t("components.experiences.kiwi2021.desc") }}
        </p>
      </UCard>
    </div>
  </section>
</template>
