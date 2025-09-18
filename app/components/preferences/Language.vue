<script lang="ts" setup>
const languages: ("fr" | "en")[] = ["fr", "en"];

const { locale, setLocale } = useI18n();
const selectedLanguage = ref(locale.value);
const open = ref(false);

async function handleLanguageChange(payload: "fr" | "en") {
  open.value = false;
  selectedLanguage.value = payload;
  await setLocale(payload);
}
</script>

<template>
  <UPopover v-model:open="open">
    <UButton :label="selectedLanguage" color="neutral" variant="ghost" />

    <template #content>
      <UButtonGroup>
        <UButton
          v-for="lang in languages"
          :key="lang"
          color="neutral"
          variant="ghost"
          :label="lang"
          :value="lang"
          @click="handleLanguageChange(lang)"
        />
      </UButtonGroup>
    </template>
  </UPopover>
</template>
