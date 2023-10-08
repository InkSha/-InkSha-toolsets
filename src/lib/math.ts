/**
 * @file Math module.
 * @description Some Math operations.
 * @license MIT
 * @author InkSha<git@inksha.com>
 * @created 2023-10-07
 * @updated 2023-10-07
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
