/** Kurzes Tast-Feedback – auf iOS oft still, auf Android spürbar. */
export function haptic(duration = 12) {
  try {
    navigator.vibrate?.(duration);
  } catch {
    /* ignore */
  }
}
