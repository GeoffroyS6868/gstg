<script lang="ts" setup>
const { active, first, now, rows } = useCareer();

const CENTER_X = 640;
const CENTER_Y = 262;
const INNER_RADIUS = 44;
const OUTER_RADIUS = 230;
const HUB_RADIUS = 20;
const TEETH_GAP = 24;
const LABEL_SPOKE = 0;
const SAMPLES_PER_MONTH = 4;
const FULL_TURN = Math.PI * 2;
const QUARTER_TURN = Math.PI / 2;

/** The spiral ends at the bottom, at the end of the current month. */
const end = computed(() => now.value + 1);
const growth = computed(
  () => (OUTER_RADIUS - INNER_RADIUS) / (end.value - first.value)
);

const angleAt = (month: number): number =>
  QUARTER_TURN + (FULL_TURN * (month - end.value)) / MONTHS_PER_YEAR;

const radiusAt = (month: number): number =>
  INNER_RADIUS + growth.value * (month - first.value);

/** Rounded so server and client trig agree and hydration stays clean. */
const round = (value: number): number => Math.round(value * 10) / 10;

const pointAt = (month: number, radius = radiusAt(month)) => ({
  x: round(CENTER_X + Math.cos(angleAt(month)) * radius),
  y: round(CENTER_Y + Math.sin(angleAt(month)) * radius),
});

const spiral = (from: number, to: number): string => {
  const steps = Math.max(1, Math.round((to - from) * SAMPLES_PER_MONTH));
  return Array.from({ length: steps + 1 }, (_, step) => {
    const { x, y } = pointAt(from + ((to - from) * step) / steps);
    return `${step === 0 ? "M" : "L"}${x} ${y}`;
  }).join(" ");
};

const track = computed(() => spiral(first.value, end.value));

const spokes = computed(() =>
  Array.from({ length: MONTHS_PER_YEAR }, (_, offset) => {
    const month = end.value - offset;
    return {
      from: pointAt(month, HUB_RADIUS),
      to: pointAt(month, OUTER_RADIUS + TEETH_GAP),
    };
  })
);

const segments = computed(() =>
  rows.value.map((row, index) => ({
    d: spiral(row.from, row.to + 1),
    isLit: active.value === null ? row.isCurrent : active.value === index,
    key: row.key,
  }))
);

const yearMarks = computed(() => {
  const firstYear = Math.ceil(first.value / MONTHS_PER_YEAR);
  const lastYear = Math.floor(now.value / MONTHS_PER_YEAR);
  return Array.from({ length: lastYear - firstYear + 1 }, (_, index) => {
    const year = firstYear + index;
    const month = year * MONTHS_PER_YEAR + LABEL_SPOKE;
    const halfTurn = (growth.value * MONTHS_PER_YEAR) / 2;
    return { ...pointAt(month, radiusAt(month) + halfTurn), year };
  });
});

const tip = computed(() => pointAt(end.value));
</script>

<template>
  <svg
    aria-hidden="true"
    class="text-highlighted pointer-events-none absolute top-0 left-1/2 -z-10 w-[900px] max-w-none -translate-x-1/2 [mask-image:radial-gradient(circle_at_71%_47%,black_30%,transparent_55%)]"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 900 560"
  >
    <g class="gear" :style="{ transformOrigin: `${CENTER_X}px ${CENTER_Y}px` }">
      <g class="opacity-[0.06] dark:opacity-[0.08]">
        <circle :cx="CENTER_X" :cy="CENTER_Y" :r="HUB_RADIUS" />
        <circle :cx="CENTER_X" :cy="CENTER_Y" r="4" fill="currentColor" />
        <line
          v-for="(spoke, index) in spokes"
          :key="index"
          :x1="spoke.from.x"
          :y1="spoke.from.y"
          :x2="spoke.to.x"
          :y2="spoke.to.y"
        />
        <path :d="track" />
        <circle
          :cx="CENTER_X"
          :cy="CENTER_Y"
          :r="OUTER_RADIUS + TEETH_GAP - 6"
        />
        <circle
          :cx="CENTER_X"
          :cy="CENTER_Y"
          :r="OUTER_RADIUS + TEETH_GAP"
          pathLength="96"
          stroke-dasharray="0.5 0.5"
          stroke-width="12"
        />
      </g>
      <g
        class="font-mono text-[9px] opacity-20"
        fill="currentColor"
        stroke="none"
      >
        <text
          v-for="mark in yearMarks"
          :key="mark.year"
          :x="mark.x"
          :y="mark.y"
          dominant-baseline="middle"
          text-anchor="middle"
        >
          {{ mark.year }}
        </text>
      </g>
      <path
        v-for="segment in segments"
        :key="segment.key"
        :d="segment.d"
        class="transition-[color,opacity] duration-300"
        :class="
          segment.isLit
            ? 'text-primary opacity-25 dark:opacity-45'
            : 'opacity-[0.08] dark:opacity-[0.11]'
        "
        stroke-dasharray="1 3"
        stroke-width="14"
      />
      <circle
        class="text-primary"
        :cx="tip.x"
        :cy="tip.y"
        r="3.5"
        fill="currentColor"
        stroke="none"
      />
    </g>
  </svg>
</template>

<style scoped>
.gear {
  transform-box: view-box;
}

@keyframes gear-turn {
  to {
    rotate: 30deg;
  }
}

@supports (animation-timeline: scroll()) {
  @media (prefers-reduced-motion: no-preference) {
    .gear {
      animation: gear-turn linear both;
      animation-timeline: scroll(root);
    }
  }
}
</style>
