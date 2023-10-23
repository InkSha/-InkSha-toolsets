/**
 * @file File handling modules file.
 * @description Storage project all file handling tools.
 * @license MIT
 * @author InkSha<git@inksha.com>
 * @created 2023-10-04
 * @updated 2023-10-23
 * @version 1.0.0
 */

import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { parsePath } from './path'
import { asyncExec } from './async'

export const mkdir = (dir: string): boolean => {
	const parse = path.parse(dir)
	dir = parse.ext ? parse.dir : dir
	for (const _path of parsePath(dir)) {
		if (!fileExist(_path)) fs.mkdirSync(_path)
	}
	return fileExist(dir)
}

export const readFile = (filePath: string, binary = false): string => {
	return fileExist(filePath)
		? filePath
			? fs.readFileSync(filePath, {
					encoding: binary ? 'binary' : 'utf8',
			  })
			: ''
		: ''
}

export const writeFile = (
	filePath: string,
	data: any,
	append = true,
): boolean => {
	if (mkdir(filePath)) {
		fs.writeFileSync(filePath, data, {
			flag: append ? 'a+' : 'w+',
			encoding: typeof data === 'string' ? 'utf-8' : 'binary',
		})
	}
	return fileExist(filePath)
}

export const fileExist = (filePath: string): boolean => fs.existsSync(filePath)

export const removeFiles = (filePath: string): boolean => {
	if (fileExist(filePath)) fs.rmSync(filePath)
	return fileExist(filePath)
}

export const createStream = (filepath: string) => fs.createReadStream(filepath)

export const createSteamSync = (filepath: string) =>
	asyncExec(() => createStream(filepath))

export const mkdirAsync = (dir: string) => asyncExec(() => mkdir(dir))

export const readFileAsync = (filePath: string) =>
	asyncExec(() => readFile(filePath))

export const writeFileAsync = (filePath: string, data: any, append = true) =>
	asyncExec(() => writeFile(filePath, data, append))

export const fileExistAsync = (filePath: string) =>
	asyncExec(() => fileExist(filePath))

export const removeFilesAsync = (filePath: string) =>
	asyncExec(() => removeFiles(filePath))

export const computedHash = (buffer: Buffer, Hash?: string): string =>
	crypto
		.createHash(Hash ?? 'md5')
		.update(buffer)
		.digest('hex')
