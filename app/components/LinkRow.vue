<script lang="ts" setup>
/** A plain label, or a period whose ends are lined up from row to row. */
type Meta = string | { from: string; until: string };

const props = defineProps<{
  description: string;
  dotClass: string;
  meta: Meta;
  title: string;
  to: string;
}>();

const metaText = computed(() =>
  typeof props.meta === "string"
    ? props.meta
    : `${props.meta.from} – ${props.meta.until}`
);
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
      <span
        class="size-1.5 shrink-0 -translate-y-[0.2em] rounded-full"
        :class="dotClass"
      />
      <span
        class="flex min-w-0 flex-col sm:flex-row sm:items-baseline sm:gap-2"
      >
        <span class="text-highlighted font-medium">{{ title }}</span>
        <span class="text-muted group-hover:text-toned text-sm sm:truncate">
          {{ description }}
        </span>
        <span
          aria-hidden="true"
          class="text-dimmed mt-0.5 font-mono text-[11px] tabular-nums sm:hidden"
          :class="{ uppercase: typeof meta !== 'string' }"
        >
          {{ metaText }}
        </span>
      </span>
      <span
        aria-hidden="true"
        class="leader group-hover:text-primary min-w-6 flex-1 text-(--ui-border-accented) max-sm:hidden"
      />
      <span
        class="text-dimmed group-hover:text-default shrink-0 font-mono text-xs tabular-nums max-sm:sr-only"
      >
        <template v-if="typeof meta === 'string'">{{ meta }}</template>
        <span v-else class="uppercase"
          >{{ meta.from }} –
          <!-- Every end is as wide as "Aug 25", so the dashes line up down the list. -->
          <span class="inline-block w-[6ch]">{{ meta.until }}</span></span
        >
      </span>
    </NuxtLink>
  </li>
</template>
