/**
 * @file File handling modules file.
 * @description Storage project all file handling tools.
 * @license MIT
 * @author InkSha<git@inksha.com>
 * @created 2023-10-04
 * @updated 2023-10-04
 * @version 1.0.0
 */

import fs from 'node:fs'
import path from 'node:path'

export class Files {

  /**
   * 创建文件夹
   * @param dir 文件夹路径
   * @returns 文件夹是否存在
   */
  static mkdir (dir: string): boolean {
    const parse = path.parse(dir)
    dir = parse.ext ? parse.dir : dir
    for (const _path of this.parsePath(dir)) {
      if (!Files.fileExist(_path)) fs.mkdirSync(_path)
    }
    return Files.fileExist(dir)
  }

  /**
   * 异步的创建文件夹
   * @param dir 文件夹路径
   * @returns 文件夹是否建立的 Promise
   */
  static mkdirAsync (dir: string) {
    return new Promise<boolean>((resolve, reject) => {
      try {
        resolve(this.mkdir(dir))
      } catch (e) {
        reject(e)
      }
    })
  }

  /**
   * 解析路径
   * @param _path 路径
   * @returns 路径数组
   */
  static parsePath (_path: string): string[] {
    if (!_path) return []
    const root = _path.charAt(0)
    const hasRoot = ['/', '\\'].includes(root)
    const result: string[] = []
    hasRoot && (_path = _path.slice(1))
    let tmpPath = path.parse(_path)
    result.push(tmpPath.ext ? tmpPath.dir : _path)
    while (tmpPath.dir) {
      if (!tmpPath.ext) {
        result.push(`${(hasRoot ? root : '')}${tmpPath.dir}`)
      }
      tmpPath = path.parse(tmpPath.dir)
    }
    return result.reverse()
  }

  /**
   * 读取文件
   * @param filePath 文件路径
   * @param binary 是否是二进制文件
   * @returns 文件内容
   */
  readFile (filePath: string, binary = false): string {
    return Files.fileExist(filePath)
      ? filePath
        ? fs.readFileSync(filePath, {
          encoding: binary
            ? 'binary'
            : 'utf8'
        })
        : ''
      : ''
  }

  readFileAsync (filePath: string) {
    return new Promise<string>((resolve, reject) => {
      try {
        resolve(this.readFile(filePath))
      } catch (e) {
        reject(e)
      }
    })
  }

  /**
   * 写入文件
   * @param filePath 文件路径
   * @param data 写入内容
   * @returns 文件是否存在
   */
  writeFile (filePath: string, data: any, append = true): boolean {
    if (Files.mkdir(filePath)) {
      fs.writeFileSync(filePath, data, {
        flag: append
          ? 'a+'
          : 'w+',
        encoding: typeof data === 'string'
          ? 'utf-8'
          : 'binary'
      })
    }
    return Files.fileExist(filePath)
  }

  writeFileAsync (filePath: string, data: any, append = true) {
    return new Promise<boolean>((resolve, reject) => {
      try {
        resolve(this.writeFile(filePath, data, append))
      } catch (e) {
        reject(e)
      }
    })
  }

  /**
   * 路径是否存在
   * @param path 路径
   * @returns 是否存在
   */
  static fileExist (path: string): boolean {
    return fs.existsSync(path)
  }

  static fileExistAsync (path: string) {
    return new Promise<boolean>((resolve, reject) => {
      try {
        resolve(this.fileExist(path))
      } catch (e) {
        reject(e)
      }
    })
  }

  /**
   * 删除路径
   * @param path 路径
   * @returns 路径是否存在
   */
  static removeFiles (path: string): boolean {
    if (this.fileExist(path)) {
      fs.rmSync(path)
    }
    return this.fileExist(path)
  }

  static removeFilesAsync (path: string) {
    return new Promise<boolean>((resolve, reject) => {
      try {
        resolve(this.removeFiles(path))
      } catch (e) {
        reject(e)
      }
    })
  }

}
