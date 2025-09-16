<template>
  <div class="min-h-svh flex flex-col">
    <NavHeader />
    <main
      class="flex-1 w-full flex flex-col items-center justify-center pt-16 px-16"
    >
      <slot />
    </main>
    <NavFooter />
  </div>
</template>
