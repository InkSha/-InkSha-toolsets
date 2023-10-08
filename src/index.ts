/**
 * @file Project enter file.
 * @description
 * In project methods and class through this file unify export for use.
 * @license MIT
 * @author InkSha<git@inksha.com>
 * @created 2023-10-04
 * @updated 2023-10-04
 * @version 1.0.0
 */

export const CURRENT_PROJECT_VERSION = '1.0.0'
import Tools from './lib'

const array1 = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]
const array2 = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]

console.log(Tools.array.RotateArray(array1, true).join('\n'), '\n')
console.log(Tools.array.RotateArray(array2).join('\n'))

export default {
  ...Tools,
  version: CURRENT_PROJECT_VERSION
}
