/** Explicit preferences may override device hints, but never missing capabilities. */
export function shouldEnhance({
  capable,
  choice = "auto",
  constrained = false,
  reduced = false,
}) {
  return Boolean(
    capable &&
    (choice === "enhanced" ||
      (choice !== "simple" && !constrained && !reduced)),
  );
}
