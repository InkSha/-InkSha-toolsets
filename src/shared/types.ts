/** 原型类型 */
export type PrototypeType = 'map' | 'date' | 'set' | 'regexp' | 'object'

/** 索引对象 */
export interface IndexObject<V = unknown> {
  [index: string | number | symbol]: V
}

/**
 * 判断是否是字符串
 * @param data 需要判断是否字符串的数据
 * @returns 是否是字符串
 */
export const isString = (data: unknown): data is string =>
  typeof data === 'string'

/**
 * 判断是否是数字
 * @param data 需要判断是否是数字的数据
 * @returns 是否是数字
 */
export const isNumber = (data: unknown): data is number =>
  typeof data === 'number'

/**
 * 判断是否是 undefined
 * @param data 需要判断是否是 undefined 的数据
 * @returns 是否是 undefined
 */
export const isUndefined = (data: unknown): data is undefined =>
  typeof data === 'undefined'

/**
 * 判断是否是 null
 * @param data 需要判断是否是 null 的数据
 * @returns 是否是 null
 */
export const isNull = (data: unknown): data is null => data === null

/**
 * 判断是否是布尔值
 * @param data 需要判断是否是布尔值的数据
 * @returns 是否是布尔值
 */
export const isBoolean = (data: unknown): data is boolean =>
  typeof data === 'boolean'

/**
 * 判断是否是符号
 * @param data 需要判断是否是符号的数据
 * @returns 是否是符号
 */
export const isSymbol = (data: unknown): data is symbol =>
  typeof data === 'symbol'

/**
 * 判断是否是对象
 * @param data 需要判断是否是对象的数据
 * @returns 是否是对象
 */
export const isObject = <R = Record<string | number | symbol, unknown>>(
  data: unknown,
): data is R => {
  return !isNull(data) && typeof data === 'object'
}

/**
 * 判断是否是 BigInt
 * @param data 需要判断是否是 BigInt 的数据
 * @returns 是否是 BigInt
 */
export const isBigint = (data: unknown): data is bigint =>
  typeof data === 'bigint'

/**
 * 判断是否是函数
 * @param data 需要判断是否是函数的数据
 * @returns 是否是函数
 */
export const isFunction = (
  data: unknown,
): data is (...args: any[]) => unknown => typeof data === 'function'

/**
 * 获取原型数据
 * @param data 需要获取原型的数据
 * @returns 原型数据 `'[object object]'`
 */
export const typeofPrototype = (data: unknown): string =>
  Object.prototype.toString.call(data)

/**
 * 切割原型数据
 * @param prototype 切割的原型数据
 * @returns 转为小写的原型名称
 */
export const splitTypeofPrototype = (prototype: string): string =>
  prototype.split(' ')[1].slice(0, -1).toLocaleLowerCase()

/**
 * 判断数据是否是某个原型类型
 * @param data 需要判断的数据
 * @param type 数据原型
 * @returns 是否是原型
 */
export const isPrototype = <Proto = IndexObject>(
  data: unknown,
  type: PrototypeType,
): data is Proto => {
  return splitTypeofPrototype(typeofPrototype(data)) === type
}

/**
 * 判断是否是数组
 * @param data 需要判断是否是数组的数据
 * @returns 是否是数组
 */
export const isArray = (data: unknown): data is Array<unknown> =>
  Array.isArray(data)

/**
 * 判断是否是 map
 * @param data 需要判断是否是 map 的数据
 * @returns 是否是 map
 */
export const isMap = (data: unknown): data is Map<unknown, unknown> =>
  isPrototype(data, 'map')

/**
 * 判断是否是 date
 * @param data 需要判断是否是 date 的数据
 * @returns 是否是 date
 */
export const isDate = (data: unknown): data is Date => isPrototype(data, 'date')

/**
 * 判断是否是 set
 * @param data 需要判断是否是 set 的数据
 * @returns 是否是 set
 */
export const isSet = (data: unknown): data is Set<unknown> =>
  isPrototype(data, 'set')

/**
 * 判断是否是 regexp
 * @param data 需要判断是否是 regexp 的数据
 * @returns 是否是 regexp
 */
export const isRegExp = (data: unknown): data is RegExp =>
  isPrototype(data, 'regexp')

/**
 * 判断是否是 promise
 * @param data 需要判断是否是 promise 的数据
 * @returns 是否是 promise
 */
export const isPromise = <T = unknown>(data: unknown): data is Promise<T> => {
  return isObject(data) && isFunction(data.then) && isFunction(data.catch)
}
