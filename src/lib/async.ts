/**
 * @file Async module.
 * @description Some async operations.
 * @license MIT
 * @author InkSha<git@inksha.com>
 * @created 2023-10-07
 * @updated 2023-10-24
 * @version 1.0.0
 */

/**
 * 异步执行
 * @param callback 回调函数
 * @returns 包含回调结果的 Promise
 */
export function asyncExec<Returns = void>(
  callback: (...arg: any[]) => Returns,
) {
  return new Promise<Returns>((resolve, reject) => {
    tryAndCatch(callback, resolve, reject)
  })
}

/**
 * 尝试执行函数并捕获异常
 * @param execFunction 执行函数
 * @param success 成功回调
 * @param error 失败回调
 */
export function tryAndCatch<Result>(
  execFunction: () => Result,
  success?: (arg: Result) => void,
  error?: (error: Error) => void,
) {
  try {
    const result = execFunction()
    if (success) success(result)
  } catch (e) {
    if (error) error(new Error(`${e}`))
  }
}

/**
 * 异步执行列表
 * @param list 执行函数列表
 * @param race 是否按顺序执行
 * @returns 包含执行结果列表的 Promise
 */
export function asyncExecList<Result>(
  list: ((...arg: any[]) => Result)[],
  race = false,
) {
  return new Promise((resolve, reject) => {
    tryAndCatch(
      () => {
        const result: Promise<Result>[] = []
        for (const execFunction of list) {
          result.push(asyncExec(execFunction))
        }
        return race ? Promise.race(result) : Promise.all(result)
      },
      resolve,
      reject,
    )
  })
}
