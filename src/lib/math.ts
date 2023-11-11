/**
 * @file Math module.
 * @description Some Math operations.
 * @license MIT
 * @author InkSha<git@inksha.com>
 * @created 2023-10-07
 * @updated 2023-10-24
 * @version 1.0.0
 */

/**
 * 生成随机数
 * @param start 开始值
 * @param end 结束值
 * @returns 在范围内的随机数
 */
export function generatorRandom(start = 0, end = 100) {
  return Math.floor(Math.random() * end + start + 1)
}

/**
 * 生成随机数列表
 * @param start 开始值
 * @param end 结束值
 * @param quantity 生成的数量
 * @param repeat 是否允许重复
 * @returns 指定范围内的随机数列表
 */
export function generatorRandomList(
  start = 0,
  end = 100,
  quantity = 1,
  repeat = false,
) {
  if (end - start < quantity && repeat) return -1
  const list: number[] = []
  for (let i = 0; i < quantity; i++) {
    const random = generatorRandom(start, end)
    if (repeat && list.includes(random)) i--
    else list.push(random)
  }
  return list
}

/**
 * 计算加法
 * @param num1 加数
 * @param num2 被加数
 * @returns 和
 */
export const computedAddition = (num1: number, num2: number): number =>
  num1 + num2

/**
 * 计算减法
 * @param num1 减数
 * @param num2 被减数
 * @returns 差
 */
export const computedSubtraction = (num1: number, num2: number): number =>
  num1 - num2

/**
 * 计算乘法
 * @param num1 乘数
 * @param num2 被乘数
 * @returns 积
 */
export const computedMultiplication = (num1: number, num2: number): number =>
  num1 * num2

/**
 * 计算除法
 * @param num1 除数
 * @param num2 被除数
 * @returns 商
 */
export const computedDivision = (num1: number, num2: number): number =>
  num1 / num2

/**
 * 计算幂
 * @param base 基数
 * @param power 幂
 * @returns 基数的幂次方数
 */
export const computedPower = (base: number, power: number): number =>
  base ** power


/**
 * 生成一个在指定开始和结束范围内的随机数字
 * @param start 开头范围
 * @param end 结束范围
 * @returns 在规定范围内的随机生成的数字
 */
function genRandom (start = 0, end = 100) {
  return Math.floor(Math.random() * end + start) + 1
}

/**
 * 生成指定长度的字符
 * @param len 字符长度
 * @returns 指定长度的字符串
 */
function genChar (len = 5) {
  const result: string[] = []
  for (let i = 0; i < len; i++) {
    result.push(genRandom(0, 36).toString(36))
  }
  return result.join('')
}

/**
 * 生成布尔标识
 * @returns 一个布尔标识
 */
function genFlag () {
  return genRandom() >= 50
}
