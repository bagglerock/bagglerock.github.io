/** Wrap a position in a nonempty circular collection. */
export function wrapIndex(index, count) {
  if (!Number.isInteger(count) || count < 1)
    throw new RangeError("count must be a positive integer");
  return ((index % count) + count) % count;
}

export function carouselSlot(index, active, count) {
  const slot = wrapIndex(index - active, count);
  return slot > count / 2 ? slot - count : slot;
}

export const clamp = (value) => Math.min(1, Math.max(0, value));

export function projectProgress({
  top,
  bottom,
  height,
  viewport,
  pinTop,
  pinned,
}) {
  return {
    reveal: clamp(
      (viewport * 0.94 - top) / Math.max(1, viewport * 0.94 - pinTop),
    ),
    exit: pinned ? clamp((pinTop + height - bottom) / (viewport * 0.55)) : 0,
  };
}

export function fitLabelSize(available, measured, cap) {
  if (available <= 0 || measured <= 0 || cap <= 0) return 0;
  return Math.min(((available * 0.97) / measured) * 100, cap);
}
