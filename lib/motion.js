// Central motion tokens (DESIGN.md §3). Import these instead of hardcoding
// durations or eases in components. Values are GSAP-ready; CSS consumers use
// the matching custom properties defined in app/globals.css :root.

export const EASE = {
  out: "power4.out", // hard deceleration, the "expensive" curve
  in: "power4.in",
  inOut: "expo.inOut",
  ui: "power3.out",
  hop: "power4.inOut",
};

export const DUR = {
  micro: 0.35, // hover states, cursor, toggles
  base: 0.9, // standard element reveal
  slow: 1.25, // section headlines, hero elements
  epic: 1.8, // preloader exit, curtain wipes
};

export const STAGGER = {
  char: 0.025,
  word: 0.05,
  line: 0.09,
  card: 0.11,
};
