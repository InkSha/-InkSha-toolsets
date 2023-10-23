/**
 * @file Async module.
 * @description Some async operations.
 * @license MIT
 * @author InkSha<git@inksha.com>
 * @created 2023-10-07
 * @updated 2023-10-23
 * @version 1.0.0
 */

export function asyncExec<Returns = void> (callback: (...arg: any) => Returns) {
  return new Promise<Returns>((resolve, reject) => {
    tryAndCatch(callback, resolve, reject)
  })
}

export function tryAndCatch<Result> (
  execFunction: () => Result,
  success?: (arg: Result) => void,
  error?: (error: Error) => void
) {
  try {
    const result = execFunction()
    success && success(result)
  } catch (e: any) {
    error && error(new Error(e))
  }
}

export function asyncExecList (list: ((...arg: any) => any)[], race = false) {
  return new Promise((resolve, reject) => {
    tryAndCatch(() => {
      const result: Promise<any>[] = []
      for (const execFunction of list) {
        result.push(asyncExec(execFunction))
      }
      return race
        ? Promise.race(result)
        : Promise.all(result)
    }, resolve, reject)
  })
}
