/**
 * @file Async module.
 * @description Some async operations.
 * @license MIT
 * @author InkSha<git@inksha.com>
 * @created 2023-10-07
 * @updated 2023-10-23
 * @version 1.0.0
 */

export function asyncExec<Returns = void>(callback: (...arg: any[]) => Returns) {
  return new Promise<Returns>((resolve, reject) => {
    tryAndCatch(callback, resolve, reject)
  })
}

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

export function asyncExecList<Result>(list: ((...arg: any[]) => Result)[], race = false) {
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
