<template>
  <header
    class="w-full flex flex-row items-center justify-center fixed top-0 left-0 right-0 z-50 border-b border-default px-16"
  >
    <div class="w-full flex justify-center border-x border-default bg-default">
      <nav class="w-full max-w-5xl flex justify-between items-center h-16">
        <div class="flex flex-row gap-3">
          <NuxtLink
            :to="$localePath('/')"
            class="size-8 hover:scale-110 transition-transform duration-200"
          >
            <GstgLogo />
          </NuxtLink>
          <div class="flex flex-row items-center gap-1">
            <UiLink label="Projects" :to="$localePath('/')" />
            <UiLink label="Contact" :to="$localePath('/')" />
          </div>
        </div>
        <div>
          <PreferencesColormode />
        </div>
      </nav>
    </div>
  </header>
</template>
