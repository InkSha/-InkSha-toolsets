/**
 * @file Array module.
 * @description Some Array operations.
 * @license MIT
 * @author InkSha<git@inksha.com>
 * @created 2023-10-07
 * @updated 2023-10-08
 * @version 1.0.0
 */

export function RotateArray<Element = number>(
  array: Element[][],
  left = false,
): Element[][] {
  for (let row = 0; row < array.length; row++) {
    for (let col = row; col < array[row].length; col++) {
      [array[row][col], array[col][row]] = [array[col][row], array[row][col]]
    }
  }
  return left ? array.reverse() : array.map((row) => row.reverse())
}
