/**
 * @file Math module.
 * @description Some Math operations.
 * @license MIT
 * @author InkSha<git@inksha.com>
 * @created 2023-10-07
 * @updated 2023-10-23
 * @version 1.0.0
 */

export function generatorRandom (start = 0, end = 100) {
  return Math.floor(Math.random() * end + start + 1)
}

export function generatorRandomList (start = 0, end = 100, quantity = 1, repeat = false) {
  if (end - start < quantity && repeat) return -1
  const list: number[] = []
  for (let i = 0; i < quantity; i++) {
    const random = generatorRandom(start, end)
    if (repeat && list.includes(random)) i--
    else list.push(random)
  }
  return list
}

export const addition = (num1: number, num2: number): number => num1 + num2
export const subtraction = (num1: number, num2: number): number => num1 - num2
export const multiplication = (num1: number, num2: number): number => num1 * num2
export const division = (num1: number, num2: number): number => num1 / num2
export const power = (base: number, power: number): number => base ** power
