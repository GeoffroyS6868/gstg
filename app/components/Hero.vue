<template>
  <section class="flex flex-col gap-6">
    <h1 class="rise text-highlighted font-serif leading-[0.95] tracking-tight">
      <span class="block text-5xl sm:text-6xl">
        Geoffroy <em class="text-muted">Stanger</em>
      </span>
      <span class="mt-2 block text-3xl sm:text-4xl">
        <span class="text-2xl sm:text-3xl">a</span> Software
        <em>Engineer.</em>
      </span>
    </h1>
    <p class="rise text-muted [--rise-step:1]">
      Currently at
      <NuxtLink
        to="https://join-stories.com"
        external
        rel="noopener"
        target="_blank"
        class="text-highlighted hover:decoration-primary underline decoration-(--ui-border-accented) underline-offset-4"
      >
        Join Stories</NuxtLink
      >
    </p>
    <div class="rise [--rise-step:2]">
      <Contact />
    </div>
  </section>
</template>
