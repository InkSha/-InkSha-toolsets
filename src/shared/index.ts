import { IndexObject, isArray, isPrototype } from './types'
export * from './types'
export * from './log'

/**
 * 深拷贝对象
 *
 * 除对象和数组外的实例 如 Set, Map 等会被保留
 * @param data 可索引对象
 * @returns 深拷贝后对象
 */
export function deepCopy(data: IndexObject | unknown[]): typeof data {
  const result: typeof data = isArray(data) ? [] : {}

  const utils = (element: unknown) =>
    isPrototype<IndexObject>(element, 'object') || isArray(element)
      ? deepCopy(element)
      : element

  if (isArray(result) && isArray(data)) {
    for (let i = 0; i < data.length; i++) {
      result.push(utils(data[i]))
    }
  } else {
    for (const [key, val] of [
      ...Object.entries(data),
      ...Object.getOwnPropertySymbols(data).map((s) => [s, data[s]]),
    ]) {
      result[key] = utils(val)
    }
  }
  return result
}
