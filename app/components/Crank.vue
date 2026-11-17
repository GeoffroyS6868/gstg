<script lang="ts" setup>
const { phase, rewind } = useRewind();
const { shownUntil } = useCareer();

const HIT_RADIUS = 28;
const QUARTER_TURN = Math.PI / 2;

/** Pointed at, by mouse or keyboard. */
const isTargeted = ref(false);
const isAimed = computed(() => isTargeted.value || phase.value !== "present");

/** In the present the dial offers to rewind; otherwise it reads the date. */
const readout = computed(() =>
  phase.value === "present" ? "rewind" : formatYearMonth(shownUntil.value)
);

/** Radii of the reticle drawn around the hub, measured from its center. */
const RETICLE = {
  crosshairIn: HUB.radius + 13,
  crosshairOut: HUB.radius + 21,
  label: HUB.radius + 50,
  ring: HUB.radius + 4,
  ticks: HUB.radius + 8,
} as const;

/** Rounded so server and client trig agree and hydration stays clean. */
const round = (value: number): number => Math.round(value * 10) / 10;

const crosshair = [0, 1, 2, 3].map((quarter) => {
  const angle = quarter * QUARTER_TURN;
  return {
    x1: round(HUB.x + Math.cos(angle) * RETICLE.crosshairIn),
    x2: round(HUB.x + Math.cos(angle) * RETICLE.crosshairOut),
    y1: round(HUB.y + Math.sin(angle) * RETICLE.crosshairIn),
    y2: round(HUB.y + Math.sin(angle) * RETICLE.crosshairOut),
  };
});

const origin = `${HUB.x}px ${HUB.y}px`;

const hitStyle = {
  height: `${HIT_RADIUS * 2}px`,
  left: `calc(50% + ${HUB.x - HUB.viewWidth / 2 - HIT_RADIUS}px)`,
  top: `${HUB.y - HIT_RADIUS}px`,
  width: `${HIT_RADIUS * 2}px`,
};
</script>

<template>
  <svg
    aria-hidden="true"
    class="text-primary pointer-events-none absolute top-0 left-1/2 z-20 w-[900px] max-w-none -translate-x-1/2"
    fill="none"
    stroke="currentColor"
    :viewBox="`0 0 ${HUB.viewWidth} ${HUB.viewHeight}`"
  >
    <circle class="opacity-25" :cx="HUB.x" :cy="HUB.y" :r="RETICLE.ring" />
    <circle
      data-hub
      :cx="HUB.x"
      :cy="HUB.y"
      :r="HUB.radius"
      fill="var(--ui-bg)"
      stroke-opacity="0.6"
    />
    <g
      class="reticle transition-[opacity,scale] duration-300 ease-out"
      :class="isAimed ? 'scale-100 opacity-100' : 'scale-110 opacity-0'"
      :style="{ transformOrigin: origin }"
    >
      <circle
        class="opacity-70"
        :cx="HUB.x"
        :cy="HUB.y"
        :r="RETICLE.ticks"
        pathLength="48"
        stroke-dasharray="0.3 0.7"
        stroke-width="4"
      />
      <line
        v-for="mark in crosshair"
        :key="`${mark.x1}-${mark.y1}`"
        v-bind="mark"
      />
      <text
        class="font-mono text-[9px] tracking-[0.2em] uppercase tabular-nums"
        :x="HUB.x"
        :y="HUB.y - RETICLE.label"
        dominant-baseline="middle"
        fill="currentColor"
        stroke="none"
        text-anchor="middle"
      >
        [ {{ readout }} ]
      </text>
    </g>
  </svg>
  <button
    type="button"
    aria-label="Rewind the timeline"
    class="absolute z-30 cursor-crosshair rounded-full outline-none disabled:cursor-default"
    :style="hitStyle"
    :disabled="phase !== 'present'"
    @click="rewind"
    @pointerenter="isTargeted = true"
    @pointerleave="isTargeted = false"
    @focus="isTargeted = true"
    @blur="isTargeted = false"
  />
</template>

<style scoped>
.reticle {
  transform-box: view-box;
}
</style>
