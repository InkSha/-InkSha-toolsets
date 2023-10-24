/**
 * @file Array module.
 * @description Some Array operations.
 * @license MIT
 * @author InkSha<git@inksha.com>
 * @created 2023-10-07
 * @updated 2023-10-24
 * @version 1.0.0
 */

/**
 * 在原数组基础上进行旋转
 * @param array 旋转的二维数组
 * @param left 是否向左旋转
 * @returns 旋转后的数组
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
