/**
 * Normalize an array index into a valid positive index.
 *
 * Positive indexes count from the start:
 *   0 => first item
 *   1 => second item
 *
 * Negative indexes count from the end:
 *   -1 => last item
 *   -2 => second-to-last item
 *
 * Returns:
 *   - normalized positive index (0..length-1)
 *   - or -1 if out of bounds
 */
export const normalizedIndex = (index: number, length: number) => {
  if (!Number.isInteger(index) || !Number.isInteger(length) || length <= 0) {
    return -1;
  }

  const normalized = index < 0 ? length + index : index;

  return normalized >= 0 && normalized < length ? normalized : -1;
};
