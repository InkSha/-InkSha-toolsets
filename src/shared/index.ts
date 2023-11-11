/**
 * @file All shared methods entries file.
 * @description All shared methods through this file export and use.
 * @license MIT
 * @author InkSha<git@inksha.com>
 * @created 2023-10-25
 * @updated 2023-11-11
 * @version 1.0.2
 */

import { IndexObject, isArray, isPrototype } from './types'

/**
 * 深拷贝对象
 *
 * 除对象和数组外的实例 如 Set, Map 等会被保留
 * @param data 可索引对象
 * @returns 深拷贝后对象
 */
export const deepCopy = (data: IndexObject | unknown[]): typeof data => {
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
