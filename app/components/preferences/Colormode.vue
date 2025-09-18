<script setup lang="ts">
const colorMode = useColorMode();

const isDark = computed(() => colorMode.value === "dark");
const nextTheme = computed(() => (isDark.value ? "light" : "dark"));

const switchTheme = () => {
  if (import.meta.client) {
    colorMode.preference = nextTheme.value;
  }
};

const startViewTransition = (event?: MouseEvent) => {
  if (!import.meta.client) {
    switchTheme();
    return;
  }

  if (!(document as any).startViewTransition || !event) {
    switchTheme();
    return;
  }

  const x = event.clientX;
  const y = event.clientY;
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  );

  const transition = (document as any).startViewTransition(() => {
    switchTheme();
  });

  transition.ready.then(() => {
    const duration = 600;
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: duration,
        easing: "cubic-bezier(.76,.32,.29,.99)",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  });
};
</script>

<template>
  <UButton
    class="w-fit"
    variant="ghost"
    color="neutral"
    :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
    size="md"
    :aria-label="`Switch to ${nextTheme} mode`"
    @click="startViewTransition"
  />
</template>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-new(root) {
  z-index: 9999;
}
::view-transition-old(root) {
  z-index: 1;
}
</style>
