import { splitNumber } from './math'

/**
 * 增加字符到指定长度
 * @param char 原始字符
 * @param len 增长长度
 * @returns 增长的字符串
 */
export const toLen = (char = '', len = 80) => {
  if (len <= 0) return ''
  return new Array(len).fill(char).join('').slice(0, len)
}

/**
 * 填充指定长度字符到字符串头部
 * @param str 原始字符串
 * @param char 填充字符
 * @param len 填充后的长度
 * @returns 增加后的字符串
 */
export const addHead = (str = '', char = '-', len = 80) => (toLen(char, len - str.length) + str)

/**
 * 填充指定长度字符到字符串尾部
 * @param str 原始字符串
 * @param char 填充字符
 * @param len 填充后的长度
 * @returns 增加后的字符串
 */
export const addTail = (str = '', char = '-', len = 80) => (str + toLen(char, len - str.length))

/**
 * 填充指定长度字符到字符串两侧
 * @param str 原始字符串
 * @param char 填充字符
 * @param len 填充后的长度
 * @returns 增加后的字符串
 */
export const addMiddle = (str = '', char = '-', len = 80) => {
  let shortLen = splitNumber(len, 2) + splitNumber(str.length, 2)
  return addTail(addHead(str, char, shortLen), char, len)
}
/**
 * 切割字符串
 * @param str 原始字符串
 * @param len 切割份数
 * @returns 切割后的字符串列表
 */
export const splitString = (str = '', len = 2) => {
  const result: string[] = []
  let tmp = ''
  for (const char of str.split('')) {
    if (tmp.length === len) {
      result.push(tmp)
      tmp = ''
    }
    tmp += char
  }
  if (tmp) result.push(tmp)
  return result
}
