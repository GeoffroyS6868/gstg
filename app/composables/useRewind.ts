/**
 * Turning the crank at the gear's hub winds the career back:
 * present → rewinding → stopped → replaying → present.
 */
export type RewindPhase = "present" | "rewinding" | "stopped" | "replaying";

/** The year the site's owner was born: the crank winds back until it is the oldest year in view. */
export const BIRTH_YEAR = 2002;

/** The crank eases in, holds its top speed, and brakes onto each end. */
/** In months per second. */
const TOP_SPEED = 228;
/** How many months it takes to reach top speed. */
const SPIN_UP_MONTHS = 48;
/** How many months before each end it starts braking. */
const BRAKE_MONTHS = 48;
/** How long it rests in the past before playing forward. */
const STOP_MS = 2000;
/** Keeps the crank moving off its start and onto its stop. */
const CREEP_SPEED = 2;
/** A frame's step is capped, so a stalled tab resumes smoothly instead of leaping. */
const MAX_FRAME_SECONDS = 1 / 30;

/**
 * Where the hub sits, in the 900×560 drawing that the gear and the crank
 * share. Both are centered on the page and anchored to its top.
 */
export const HUB = {
  radius: 20,
  viewHeight: 560,
  viewWidth: 900,
  x: 640,
  y: 262,
} as const;

/**
 * Where the crank stops. At rest the spiral starts at the first month of the
 * career, so the oldest year in view is the first January after it. Winding
 * back whole years until that slot holds the birth year keeps every year on
 * the line where a year sits at rest.
 */
const rewindTarget = (now: number, first: number): number =>
  now - MONTHS_PER_YEAR * (Math.ceil(first / MONTHS_PER_YEAR) - BIRTH_YEAR);

/**
 * One frame of the crank from one month to another. It speeds up at a constant
 * rate over its first months and brakes the same way over its last ones.
 */
const advance = (
  from: number,
  to: number,
  month: number,
  seconds: number
): number => {
  const left = Math.abs(to - month);
  const speed = Math.max(
    CREEP_SPEED,
    TOP_SPEED *
      Math.min(
        1,
        Math.sqrt(Math.abs(month - from) / SPIN_UP_MONTHS),
        Math.sqrt(left / BRAKE_MONTHS)
      )
  );
  const distance = speed * seconds;
  return left <= distance ? to : month + Math.sign(to - month) * distance;
};

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const useRewind = () => {
  const phase = useState<RewindPhase>("rewind-phase", () => "present");
  const { cursor, first, now } = useCareer();

  const drive = (from: number, to: number, done: () => void) => {
    if (prefersReducedMotion()) {
      cursor.value = to;
      done();
      return;
    }
    let month = from;
    let last = performance.now();
    const step = (time: number) => {
      // A frame's timestamp can predate the performance.now() taken while it was being queued.
      const seconds = Math.min(
        MAX_FRAME_SECONDS,
        Math.max(0, (time - last) / 1000)
      );
      last = time;
      month = advance(from, to, month, seconds);
      cursor.value = month;
      if (month === to) {
        done();
      } else {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  };

  const rewind = () => {
    if (phase.value !== "present") {
      return;
    }
    const target = rewindTarget(now.value, first.value);
    phase.value = "rewinding";
    drive(now.value, target, () => {
      phase.value = "stopped";
      setTimeout(() => {
        phase.value = "replaying";
        drive(target, now.value, () => {
          cursor.value = null;
          phase.value = "present";
        });
      }, STOP_MS);
    });
  };

  return { phase, rewind };
};
