import * as _async from './../../src/lib/async'

describe('Async Module', () => {
  test('asyncExec', async () => {
    const data = await _async.asyncExec(() => true)
    expect(data).toBe(true)
  })

  test('tryAndCatch Success', () => {
    _async.tryAndCatch(() => true, data => {
      expect(data).toBe(true)
    }, error => {
      expect(() => error).toThrow('test')
    })
  })
  test('tryAndCatch Fail', () => {
    expect.assertions(1)
    _async.tryAndCatch(() => {
      throw Error('test')
    }, data => {
      expect(data).toBe(true)
    }, e => {
      expect(() => {
        throw e
      }).toThrow('test')
    })
  })
  test('asyncExecList race', async () => {
    expect(
      await _async.asyncExecList([
        () => new Promise((resolve, reject) => setTimeout(() => resolve(true), 50)),
        () => new Promise((resolve, reject) => setTimeout(() => resolve(false), 30))
      ], true)
    ).toStrictEqual(false)
  })
  test('asyncExecList order', async () => {
    expect(
      await _async.asyncExecList([
        () => new Promise((resolve, reject) => setTimeout(() => resolve(true), 50)),
        () => new Promise((resolve, reject) => setTimeout(() => resolve(false), 30))
      ])
    ).toStrictEqual([true, false])
  })
})
