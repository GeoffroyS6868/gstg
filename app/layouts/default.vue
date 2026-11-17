<script lang="ts" setup>
const year = new Date().getFullYear();
</script>

<template>
  <div
    class="bg-default text-default relative isolate flex min-h-dvh flex-col overflow-x-clip font-sans"
  >
    <Backdrop />
    <div
      class="relative mx-auto flex w-full max-w-2xl flex-1 flex-col px-4 sm:px-8"
    >
      <div
        aria-hidden="true"
        class="border-muted pointer-events-none absolute inset-0 hidden border-x border-dashed md:block"
      />
      <header class="flex h-16 items-center justify-between">
        <NuxtLink
          to="/"
          class="text-muted hover:text-highlighted flex items-center gap-2 font-mono text-xs transition-colors"
        >
          <svg
            aria-hidden="true"
            class="text-highlighted size-4"
            viewBox="0 0 1080 1080"
          >
            <path
              fill="currentColor"
              transform="translate(0,1080) scale(0.1,-0.1)"
              d="M900 5400 l0 -4500 4500 0 4500 0 0 2250 0 2250 -1125 0 -1125 0 0 -1125 0 -1125 -2250 0 -2250 0 0 2250 0 2250 3375 0 3375 0 0 1125 0 1125 -4500 0 -4500 0 0 -4500z"
            />
          </svg>
          gstg.fr
        </NuxtLink>
        <ThemeToggle />
      </header>
      <main class="flex flex-1 flex-col pt-14 pb-24 sm:pt-20">
        <slot />
      </main>
      <footer class="pb-10">
        <div
          aria-hidden="true"
          class="hatch h-2.5 text-(--ui-border-accented)"
        />
        <div
          class="text-dimmed mt-6 flex justify-between gap-4 font-mono text-[11px] uppercase"
        >
          <span>© {{ year }} Geoffroy Stanger</span>
          <span>Built with Nuxt</span>
        </div>
      </footer>
    </div>
  </div>
</template>
