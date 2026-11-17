<script lang="ts" setup>
const { active, first, now, rows, shownUntil } = useCareer();
const { phase } = useRewind();

const LAST_MONTH_OFFSET = MONTHS_PER_YEAR - 1;

const columns = computed(() => now.value - first.value + 1);
const months = computed(() =>
  Array.from({ length: columns.value }, (_, index) => first.value + index)
);

/** Roles that had started by the month shown. */
const shownRows = computed(() =>
  rows.value.filter((row) => row.from <= shownUntil.value)
);
const totalMonths = computed(() =>
  shownRows.value.reduce(
    (sum, row) => sum + Math.min(row.to, shownUntil.value) - row.from + 1,
    0
  )
);
const totalYears = computed(() =>
  (totalMonths.value / MONTHS_PER_YEAR).toFixed(1)
);

const years = computed(() => {
  const firstYear = Math.floor(first.value / MONTHS_PER_YEAR);
  const lastYear = Math.floor(now.value / MONTHS_PER_YEAR);
  return Array.from({ length: lastYear - firstYear + 1 }, (_, index) => {
    const year = firstYear + index;
    const start = Math.max(first.value, year * MONTHS_PER_YEAR);
    const end = Math.min(now.value, year * MONTHS_PER_YEAR + LAST_MONTH_OFFSET);
    return {
      century: String(year).slice(0, 2),
      column: start - first.value + 1,
      short: String(year).slice(2),
      span: end - start + 1,
      year,
    };
  });
});

const gridStyle = computed(() => ({
  gridTemplateColumns: `repeat(${columns.value}, minmax(0, 1fr))`,
}));

/** The entrance pops only once; after that, cells morph as time moves. */
const hasEntered = ref(false);
watch(phase, () => {
  hasEntered.value = true;
});

/** Where the playhead sits over the matrix while time is rewound. */
const playhead = computed(() => {
  if (phase.value === "present" || shownUntil.value < first.value) {
    return null;
  }
  return {
    left: `${((shownUntil.value - first.value + 1) / columns.value) * 100}%`,
  };
});

type Row = (typeof rows.value)[number];

const cellClass = (row: Row, month: number): string => {
  const isFilled =
    month >= row.from && month <= Math.min(row.to, shownUntil.value);
  if (!isFilled) {
    return "scale-[0.3] rounded-full bg-(--ui-text-dimmed) opacity-50";
  }
  const isHighlighted =
    active.value === null ? row.isCurrent : active.value === row.key;
  const entrance = hasEntered.value ? "" : "pop";
  if (isHighlighted) {
    return `${entrance} rounded-[1.5px] bg-primary`;
  }
  if (active.value === null) {
    return `${entrance} rounded-[1.5px] bg-(--ui-text-muted)`;
  }
  return `${entrance} rounded-[1.5px] bg-(--ui-text-dimmed) opacity-40`;
};
</script>

<template>
  <Frame label="Work">
    <div aria-hidden="true" class="mb-6 select-none">
      <div
        class="text-dimmed mb-2 grid font-mono text-[10px]"
        :style="gridStyle"
      >
        <span
          v-for="segment in years"
          :key="segment.year"
          class="border-accented overflow-hidden border-l pl-1 whitespace-nowrap"
          :style="{ gridColumn: `${segment.column} / span ${segment.span}` }"
        >
          <span class="hidden sm:inline">{{ segment.century }}</span
          >{{ segment.short }}
        </span>
      </div>
      <div class="relative flex flex-col gap-[3px]">
        <div
          v-for="row in rows"
          :key="row.key"
          class="grid gap-[2px]"
          :style="gridStyle"
        >
          <span
            v-for="month in months"
            :key="month"
            class="aspect-square"
            :class="[
              cellClass(row, month),
              {
                'transition-[background-color,opacity,scale,border-radius] duration-150':
                  phase !== 'present',
              },
            ]"
            :style="{ '--pop-step': month - first }"
          />
        </div>
        <span
          v-if="playhead"
          class="bg-primary absolute -inset-y-1 w-px"
          :style="playhead"
        />
      </div>
      <div
        class="text-dimmed mt-3 flex justify-between gap-4 font-mono text-[11px] uppercase tabular-nums"
      >
        <span>{{ shownRows.length }} roles · {{ totalYears }} years</span>
        <span class="flex items-center gap-3">
          <span class="flex items-center gap-1.5">
            <span class="bg-primary size-2 rounded-[1.5px]" />now
          </span>
          <span class="flex items-center gap-1.5">
            <span class="size-2 rounded-[1.5px] bg-(--ui-text-muted)" />past
          </span>
        </span>
      </div>
    </div>
    <TransitionGroup tag="ol" name="rewind" class="flex flex-col">
      <LinkRow
        v-for="row in shownRows"
        :key="row.key"
        :to="row.url"
        :title="row.company"
        :description="row.role"
        :meta="row.period"
        :dot-class="row.isCurrent ? 'bg-primary' : 'bg-(--ui-text-dimmed)'"
        @mouseenter="active = row.key"
        @mouseleave="active = null"
        @focusin="active = row.key"
        @focusout="active = null"
      />
    </TransitionGroup>
  </Frame>
</template>
