export type YearMonth = `${number}-${number}`;

interface Experience {
  company: string;
  end: YearMonth | null;
  role: string;
  start: YearMonth;
  url: string;
}

const experiences: Experience[] = [
  {
    company: "Join Stories",
    end: null,
    role: "Software Engineer",
    start: "2025-11",
    url: "https://join-stories.com",
  },
  {
    company: "Gojob",
    end: "2025-08",
    role: "Software Engineer Intern",
    start: "2025-03",
    url: "https://www.gojob.com",
  },
  {
    company: "Schaeffer Productique",
    end: "2025-02",
    role: "Frontend Engineer Intern",
    start: "2024-09",
    url: "https://www.schaeffer-productique.com",
  },
  {
    company: "Final Advanced Materials",
    end: "2024-08",
    role: "Software Engineer Intern",
    start: "2024-05",
    url: "https://www.final-materials.com",
  },
  {
    company: "Kiwi Backup",
    end: "2023-07",
    role: "Go Developer Intern",
    start: "2023-04",
    url: "https://www.kiwi-backup.com",
  },
  {
    company: "Systancia",
    end: "2023-03",
    role: "Python Developer Intern",
    start: "2022-10",
    url: "https://www.systancia.com",
  },
  {
    company: "Kiwi Backup",
    end: "2021-12",
    role: "Go Developer Intern",
    start: "2021-08",
    url: "https://www.kiwi-backup.com",
  },
];

export const MONTHS_PER_YEAR = 12;
const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

/** Months since year 0, so ranges and durations are plain integer math. */
const toMonth = (value: YearMonth): number =>
  Number(value.slice(0, 4)) * MONTHS_PER_YEAR + Number(value.slice(5, 7)) - 1;

const formatMonth = (month: number): string => {
  const label = MONTH_LABELS[month % MONTHS_PER_YEAR] ?? "";
  const year = String(Math.floor(month / MONTHS_PER_YEAR)).slice(2);
  return `${label} ${year}`;
};

export const useCareer = () => {
  const now = useState("career-now", () => {
    const today = new Date();
    return today.getFullYear() * MONTHS_PER_YEAR + today.getMonth();
  });
  const active = useState<number | null>("career-active", () => null);

  const rows = computed(() =>
    experiences.map((experience) => {
      const from = toMonth(experience.start);
      const to = experience.end ? toMonth(experience.end) : now.value;
      const until = experience.end ? formatMonth(to) : "Now";
      return {
        ...experience,
        from,
        isCurrent: experience.end === null,
        key: `${experience.company}-${experience.start}`,
        meta: `${formatMonth(from)} → ${until}`,
        to,
      };
    })
  );

  const first = computed(() => Math.min(...rows.value.map((row) => row.from)));

  return { active, first, now, rows };
};
