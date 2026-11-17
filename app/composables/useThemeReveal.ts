const REVEAL_MS = 650;
const REVEAL_EASING = "cubic-bezier(0.65, 0, 0.35, 1)";

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Switches between light and dark by revealing the new theme in a circle
 * that grows from the gear's hub. Without view transitions, or with reduced
 * motion, it just switches.
 */
export const useThemeReveal = () => {
  const colorMode = useColorMode();
  const { phase } = useRewind();

  const toggle = async () => {
    const apply = async () => {
      colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
      await nextTick();
    };
    const hub = document.querySelector("[data-hub]");
    const canAnimate =
      "startViewTransition" in document &&
      hub &&
      phase.value === "present" &&
      !prefersReducedMotion();
    if (!canAnimate) {
      await apply();
      return;
    }

    const transition = document.startViewTransition(apply);
    try {
      await transition.ready;
    } catch {
      // Skipped by the browser (a hidden tab, for one): the theme still applied, without the reveal.
      return;
    }

    const dial = hub.getBoundingClientRect();
    const x = dial.left + dial.width / 2;
    const y = dial.top + dial.height / 2;
    const reach = Math.max(
      Math.hypot(x, y),
      Math.hypot(window.innerWidth - x, y),
      Math.hypot(x, window.innerHeight - y),
      Math.hypot(window.innerWidth - x, window.innerHeight - y)
    );
    document.documentElement.animate(
      {
        clipPath: [
          `circle(${dial.width / 2}px at ${x}px ${y}px)`,
          `circle(${reach}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: REVEAL_MS,
        easing: REVEAL_EASING,
        pseudoElement: "::view-transition-new(root)",
      }
    );
  };

  return { toggle };
};
