<script lang="ts" setup>
const { active, cursor, first, now, rows } = useCareer();

const CENTER_X = HUB.x;
const CENTER_Y = HUB.y;
const INNER_RADIUS = 44;
const OUTER_RADIUS = 230;
const HUB_RADIUS = HUB.radius;
const TEETH_GAP = 24;
/** Things coming out of the vortex fade in over this many pixels past the inner radius. */
const EMERGE_FADE = 28;
const LABEL_SPOKE = 0;
/** A year fades out over its last months before it slides past the rim. */
const LABEL_EXIT_MONTHS = 6;
const SAMPLES_PER_MONTH = 4;
const FULL_TURN = Math.PI * 2;
const QUARTER_TURN = Math.PI / 2;
const origin = `${CENTER_X}px ${CENTER_Y}px`;

/**
 * The spiral is a window on time: the past lies toward the vortex, the month
 * shown sits on the rim. Its span is the whole career, as seen from today.
 */
const span = computed(() => now.value + 1 - first.value);
/** The month on the rim: the end of the present month, or wherever the crank has wound time to. */
const rim = computed(() => (cursor.value ?? now.value) + 1);
/** The month swallowed by the vortex, at the inner end of the spiral. */
const core = computed(() => rim.value - span.value);
const growth = computed(() => (OUTER_RADIUS - INNER_RADIUS) / span.value);

const angleAt = (month: number): number =>
  QUARTER_TURN + (FULL_TURN * (month - rim.value)) / MONTHS_PER_YEAR;

const radiusAt = (month: number): number =>
  OUTER_RADIUS - growth.value * (rim.value - month);

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

const track = computed(() => spiral(core.value, rim.value));

/** The gear itself never turns with time: twelve fixed spokes, one per month. */
const spokes = Array.from({ length: MONTHS_PER_YEAR }, (_, index) => {
  const angle = QUARTER_TURN + (FULL_TURN * index) / MONTHS_PER_YEAR;
  return {
    x1: round(CENTER_X + Math.cos(angle) * HUB_RADIUS),
    x2: round(CENTER_X + Math.cos(angle) * (OUTER_RADIUS + TEETH_GAP)),
    y1: round(CENTER_Y + Math.sin(angle) * HUB_RADIUS),
    y2: round(CENTER_Y + Math.sin(angle) * (OUTER_RADIUS + TEETH_GAP)),
  };
});

/** Each role, cut to the window: it leaves past the rim, or is still inside the vortex. */
const segments = computed(() =>
  rows.value.flatMap((row) => {
    const from = Math.max(row.from, core.value);
    const to = Math.min(row.to + 1, rim.value);
    if (to <= from) {
      return [];
    }
    return {
      d: spiral(from, to),
      isLit: active.value === null ? row.isCurrent : active.value === row.key,
      key: row.key,
    };
  })
);

/**
 * The years sit on one fixed line, at the angle they have in the present.
 * The spiral turns under them; they only slide along the line, outward when
 * time is rewound and inward when it plays forward.
 */
const labelAngle = computed(
  () =>
    QUARTER_TURN +
    (FULL_TURN * (LABEL_SPOKE - ((now.value + 1) % MONTHS_PER_YEAR))) /
      MONTHS_PER_YEAR
);

/** Every year inside the window. */
const yearMarks = computed(() => {
  const firstYear = Math.ceil(core.value / MONTHS_PER_YEAR);
  const lastYear = Math.floor((rim.value - 1) / MONTHS_PER_YEAR);
  const halfTurn = (growth.value * MONTHS_PER_YEAR) / 2;
  return Array.from(
    { length: Math.max(0, lastYear - firstYear + 1) },
    (_, index) => {
      const year = firstYear + index;
      const month = year * MONTHS_PER_YEAR + LABEL_SPOKE;
      const radius = radiusAt(month) + halfTurn;
      return {
        opacity: Math.min(1, (rim.value - month) / LABEL_EXIT_MONTHS),
        x: round(CENTER_X + Math.cos(labelAngle.value) * radius),
        y: round(CENTER_Y + Math.sin(labelAngle.value) * radius),
        year,
      };
    }
  );
});

const tip = computed(() => pointAt(rim.value));

const fadeFrom = INNER_RADIUS / (OUTER_RADIUS + TEETH_GAP);
const fadeTo = (INNER_RADIUS + EMERGE_FADE) / (OUTER_RADIUS + TEETH_GAP);
</script>

<template>
  <svg
    aria-hidden="true"
    class="text-highlighted pointer-events-none absolute top-0 left-1/2 -z-10 w-[900px] max-w-none -translate-x-1/2 [mask-image:radial-gradient(circle_at_71%_47%,black_30%,transparent_55%)]"
    fill="none"
    stroke="currentColor"
    :viewBox="`0 0 ${HUB.viewWidth} ${HUB.viewHeight}`"
  >
    <defs>
      <radialGradient
        id="vortex-emerge"
        :cx="CENTER_X"
        :cy="CENTER_Y"
        :r="OUTER_RADIUS + TEETH_GAP"
        gradientUnits="userSpaceOnUse"
      >
        <stop :offset="fadeFrom" stop-color="black" />
        <stop :offset="fadeTo" stop-color="white" />
      </radialGradient>
      <mask id="vortex-mask">
        <rect
          :width="HUB.viewWidth"
          :height="HUB.viewHeight"
          fill="url(#vortex-emerge)"
        />
      </mask>
    </defs>
    <g class="gear" :style="{ transformOrigin: origin }">
      <g class="opacity-[0.06] dark:opacity-[0.08]">
        <line v-for="(spoke, index) in spokes" :key="index" v-bind="spoke" />
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
      <g mask="url(#vortex-mask)">
        <path class="opacity-[0.06] dark:opacity-[0.08]" :d="track" />
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
            :opacity="mark.opacity"
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
