<script lang="ts" setup>
const { active, first, now, rows } = useCareer();

const LAST_MONTH_OFFSET = MONTHS_PER_YEAR - 1;

const columns = computed(() => now.value - first.value + 1);
const months = computed(() =>
  Array.from({ length: columns.value }, (_, index) => first.value + index)
);
const totalMonths = computed(() =>
  rows.value.reduce((sum, row) => sum + row.to - row.from + 1, 0)
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

const filledClass = (index: number, isCurrent: boolean): string => {
  const isHighlighted =
    active.value === null ? isCurrent : active.value === index;
  if (isHighlighted) {
    return "bg-primary";
  }
  if (active.value === null) {
    return "bg-(--ui-text-muted)";
  }
  return "bg-(--ui-text-dimmed) opacity-40";
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
      <div class="flex flex-col gap-[3px]">
        <div
          v-for="(row, index) in rows"
          :key="row.key"
          class="grid gap-[2px]"
          :style="gridStyle"
        >
          <template v-for="month in months" :key="month">
            <span
              v-if="month >= row.from && month <= row.to"
              class="pop aspect-square rounded-[1.5px] transition-[background-color,opacity] duration-200"
              :class="filledClass(index, row.isCurrent)"
              :style="{ '--pop-step': month - first }"
            />
            <span
              v-else
              class="aspect-square scale-[0.3] rounded-full bg-(--ui-text-dimmed) opacity-50"
            />
          </template>
        </div>
      </div>
      <div
        class="text-dimmed mt-3 flex justify-between gap-4 font-mono text-[11px] uppercase"
      >
        <span>{{ rows.length }} roles · {{ totalMonths }} months</span>
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
    <ol class="flex flex-col">
      <LinkRow
        v-for="(row, index) in rows"
        :key="row.key"
        :to="row.url"
        :title="row.company"
        :description="row.role"
        :meta="row.meta"
        :live="row.isCurrent"
        :dot-class="row.isCurrent ? 'bg-emerald-500' : 'bg-(--ui-text-dimmed)'"
        @mouseenter="active = index"
        @mouseleave="active = null"
        @focusin="active = index"
        @focusout="active = null"
      />
    </ol>
  </Frame>
</template>
