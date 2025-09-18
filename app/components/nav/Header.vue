<script setup lang="ts">
const menuOpen = ref(false);

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}
</script>

<template>
  <header
    class="w-full flex flex-row items-center justify-center fixed top-0 left-0 right-0 z-50 border-b border-default px-4 md:px-8 lg:px-16"
  >
    <div
      class="w-full flex justify-center border-x border-default bg-default px-4"
    >
      <nav class="w-full max-w-5xl flex justify-between items-center h-16">
        <div class="flex flex-row gap-3">
          <NuxtLink
            :to="$localePath('/')"
            class="size-8 hover:scale-110 transition-transform duration-200"
          >
            <GstgLogo />
          </NuxtLink>
          <div class="hidden md:flex flex-row items-center gap-1">
            <UiLink label="Experiences" to="#experiences" />
            <UiLink label="Projects" to="#projects" />
            <UiLink label="Contact" to="#contact" />
          </div>
        </div>
        <div class="hidden md:flex flex-row gap-3">
          <PreferencesLanguage />
          <PreferencesColormode />
        </div>
        <UButton
          :icon="
            !menuOpen
              ? 'i-fluent-text-align-justify-24-regular'
              : 'i-fluent-dismiss-24-regular'
          "
          color="neutral"
          variant="ghost"
          class="md:hidden flex items-center justify-center h-10 w-10 ml-2"
          aria-label="Open menu"
          @click="toggleMenu()"
        />
      </nav>
    </div>
  </header>

  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-[-100%]"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition-all duration-300 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-[-100%]"
  >
    <div
      v-if="menuOpen"
      class="md:hidden fixed inset-0 z-40 bg-default border-b border-default"
    >
      <div
        class="flex flex-col items-center justify-center h-full px-8 space-y-8"
      >
        <div class="flex flex-col items-center space-y-6">
          <UiLink
            label="Experiences"
            to="#experiences"
            class="text-2xl font-medium hover:scale-105 transition-transform duration-200"
            @click="toggleMenu()"
          />
          <UiLink
            label="Projects"
            to="#projects"
            class="text-2xl font-medium hover:scale-105 transition-transform duration-200"
            @click="toggleMenu()"
          />
          <UiLink
            label="Contact"
            to="#contact"
            class="text-2xl font-medium hover:scale-105 transition-transform duration-200"
            @click="toggleMenu()"
          />
        </div>

        <div class="flex flex-row gap-6 pt-8">
          <PreferencesLanguage />
          <PreferencesColormode />
        </div>
      </div>
    </div>
  </Transition>
</template>
