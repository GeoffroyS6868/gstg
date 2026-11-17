<template>
  <div class="flex w-full flex-col">
    <Hero />
    <div
      aria-hidden="true"
      class="hatch my-14 h-2.5 text-(--ui-border-accented)"
    />
    <div class="rise flex flex-col gap-12 [--rise-step:3]">
      <Work />
      <Projects />
    </div>
  </div>
</template>
