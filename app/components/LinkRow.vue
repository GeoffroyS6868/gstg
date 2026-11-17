<script lang="ts" setup>
defineProps<{
  description: string;
  dotClass: string;
  live?: boolean;
  meta: string;
  title: string;
  to: string;
}>();
</script>

<template>
  <li>
    <NuxtLink
      :to="to"
      external
      rel="noopener"
      target="_blank"
      class="group focus-visible:ring-primary/60 -mx-2 flex items-baseline gap-3 rounded-md px-2 py-1.5 outline-none focus-visible:ring-2"
    >
      <span class="relative inline-flex size-1.5 shrink-0 -translate-y-[0.2em]">
        <span
          v-if="live"
          class="absolute inset-0 animate-ping rounded-full opacity-60 motion-reduce:hidden"
          :class="dotClass"
        />
        <span class="relative size-1.5 rounded-full" :class="dotClass" />
      </span>
      <span
        class="flex min-w-0 flex-col sm:flex-row sm:items-baseline sm:gap-2"
      >
        <span class="text-highlighted font-medium">{{ title }}</span>
        <span
          class="text-muted group-hover:text-toned text-sm transition-colors sm:truncate"
        >
          {{ description }}
        </span>
        <span
          aria-hidden="true"
          class="text-dimmed mt-0.5 font-mono text-[11px] uppercase tabular-nums sm:hidden"
        >
          {{ meta }}
        </span>
      </span>
      <span
        aria-hidden="true"
        class="leader group-hover:text-primary min-w-6 flex-1 text-(--ui-border-accented) transition-colors max-sm:hidden"
      />
      <span
        class="text-dimmed group-hover:text-default shrink-0 font-mono text-xs uppercase tabular-nums transition-colors max-sm:sr-only"
      >
        {{ meta }}
      </span>
    </NuxtLink>
  </li>
</template>
