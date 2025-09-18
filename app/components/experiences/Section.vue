<script setup>
const { t, te } = useI18n();

function lines(base) {
  const out = [];
  let i = 1;
  while (te(`${base}.desc${i}`)) {
    out.push(t(`${base}.desc${i}`));
    i++;
    if (i > 20) break;
  }
  return out;
}
</script>

<template>
  <section
    id="experiences"
    class="w-full max-w-5xl flex flex-col justify-center py-16 md:py-32"
  >
    <h2 class="text-2xl font-semibold mb-6">
      {{ $t("components.experiences.title") }}
    </h2>
    <div class="flex flex-col gap-6">
      <ExperiencesCard
        :title="$t('components.experiences.gojob.role')"
        :date="$t('components.experiences.gojob.date')"
        :lines="lines('components.experiences.gojob')"
      />
      <ExperiencesCard
        :title="$t('components.experiences.schaeffer.role')"
        :date="$t('components.experiences.schaeffer.date')"
        :lines="lines('components.experiences.schaeffer')"
      />
      <ExperiencesCard
        :title="$t('components.experiences.fam.role')"
        :date="$t('components.experiences.fam.date')"
        :lines="lines('components.experiences.fam')"
      />
      <ExperiencesCard
        :title="$t('components.experiences.kiwi2023.role')"
        :date="$t('components.experiences.kiwi2023.date')"
        :lines="lines('components.experiences.kiwi2023')"
      />
      <ExperiencesCard
        :title="$t('components.experiences.systancia.role')"
        :date="$t('components.experiences.systancia.date')"
        :lines="lines('components.experiences.systancia')"
      />
      <ExperiencesCard
        :title="$t('components.experiences.kiwi2021.role')"
        :date="$t('components.experiences.kiwi2021.date')"
        :lines="lines('components.experiences.kiwi2021')"
      />
    </div>
  </section>
</template>
