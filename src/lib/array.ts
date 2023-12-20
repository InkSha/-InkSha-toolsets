/**
 * 在原数组基础上进行旋转
 * @param array 旋转的二维数组
 * @param left 是否向左旋转
 * @returns 旋转后的数组
 */
export function rotateArray<Element = number>(
  array: Element[][],
  left = false,
): Element[][] {
  for (let row = 0; row < array.length; row++) {
    for (let col = row; col < array[row].length; col++) {
      ;[array[row][col], array[col][row]] = [array[col][row], array[row][col]]
    }
  }
  return left ? array.reverse() : array.map((row) => row.reverse())
}

/**
 * 切割数组
 * @param array 源数组
 * @param split 切割数
 * @returns 切割后的数组
 */
export function splitArray<T>(array: T[], split: number) {
  const result: T[][] = []
  for (let i = 0; i < array.length; i += split) {
    const tmp: T[] = []
    for (let j = i; j < i + split; j++) {
      tmp.push(array[j])
    }
    result.push(tmp)
  }
  return result
}
