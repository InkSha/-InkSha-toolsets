import { generatorRandom } from './math'

/**
 * 在原数组基础上进行旋转
 * @param array 旋转的二维数组
 * @param left 是否向左旋转
 * @returns 旋转后的数组
 */
export const rotateArray = <Element = number> (
  array: Element[][],
  left = false,
): Element[][] => {
  for (let row = 0; row < array.length; row++) {
    for (let col = row; col < array[row].length; col++) {
      [array[row][col], array[col][row]] = [array[col][row], array[row][col]]
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
export const splitArray = <T> (array: T[], split: number) => {
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

/**
 * 获取一个随机数组元素
 * @param array 需要获取随机元素的数组
 * @returns 随机数组元素
 */
export const randomElement = <T = number> (array: T[]) => {
  return array[generatorRandom(0, array.length - 1)]
}


/**
 * 获取一个指定元素范围的随机元素数组
 * @param array 随机数组元素范围列表
 * @param repeat 是否允许重复
 * @param max 随机最大次数
 * @returns 一个只含有传入随机元素列表元素的随机数组
 */
export const randomArray = <T = number> (array: T[], repeat = false, max = array.length) => {
  const result: T[] = []
  if (!repeat) array = Array.from(new Set(array))

  if (array.length <= max) result.push(...array)
  else {
    let index = 0
    const len = generatorRandom(0, max)
    while (index < len) {
      const element = array[generatorRandom(0, array.length - 1)]
      if (repeat) {
        result.push(element)
        index++
      }
      else {
        if (result.includes(element)) continue
        else {
          result.push(element)
          index++
        }
      }
    }
  }

  return result
}
