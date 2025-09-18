<script lang="ts" setup>
import { ref } from "vue";
import { useI18n, type Locale } from "vue-i18n";

type LanguageOption = {
  value: Locale;
  label: string;
};

const languages: LanguageOption[] = [
  { value: "fr", label: "Français" },
  { value: "en", label: "English" },
];

const { locale, setLocale } = useI18n();
const selectedLanguage = ref(locale.value);

async function handleLanguageChange(
  payload: boolean | string | number | undefined
) {
  if (typeof payload !== "string") {
    return;
  }
  await setLocale(payload as Locale);
  window.location.reload();
}
</script>

<template>
  <UPopover>
    <UButton :label="selectedLanguage" color="neutral" variant="ghost" />

    <template #content>
      <UButtonGroup>
        <UButton
          v-for="lang in languages"
          :key="lang.value"
          color="neutral"
          variant="ghost"
          :label="lang.value"
          :value="lang.value"
          @click="handleLanguageChange(lang.value)"
        />
      </UButtonGroup>
    </template>
  </UPopover>
</template>
