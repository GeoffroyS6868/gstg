<script lang="ts" setup>
defineProps<{ label: string }>();

const corners = [
  "-top-[5px] -left-[5px]",
  "-top-[5px] -right-[5px]",
  "-bottom-[5px] -left-[5px]",
  "-bottom-[5px] -right-[5px]",
] as const;
</script>

<template>
  <section
    class="border-accented relative border border-dashed px-4 pt-9 pb-5 sm:px-6"
  >
    <h2
      class="bg-default text-primary absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 font-mono text-xs tracking-widest whitespace-nowrap uppercase"
    >
      <span aria-hidden="true">[ </span>{{ label
      }}<span aria-hidden="true"> ]</span>
    </h2>
    <svg
      v-for="corner in corners"
      :key="corner"
      aria-hidden="true"
      class="text-dimmed absolute size-[9px]"
      :class="corner"
      viewBox="0 0 9 9"
    >
      <path d="M4.5 0v9M0 4.5h9" stroke="currentColor" />
    </svg>
    <slot />
  </section>
</template>
