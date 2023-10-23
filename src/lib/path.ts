/**
 * @file Path module.
 * @description Some Math operations.
 * @license MIT
 * @author InkSha<git@inksha.com>
 * @created 2023-10-07
 * @updated 2023-10-07
 * @version 1.0.0
 */

import path from 'node:path'

/**
 * 解析路径
 * @param _path 路径
 * @returns 路径数组
 */
export function parsePath(_path: string): string[] {
	const result: string[] = []
	if (_path) {
		const root = getRoot(_path)
		let tmpPath = path.parse(_path)
		if (root) _path = _path.slice(1)
		result.push(tmpPath.ext ? tmpPath.dir : _path)
		while (tmpPath.dir) {
			if (!tmpPath.ext) {
				result.push(`${root}${tmpPath.dir}`)
			}
			tmpPath = path.parse(tmpPath.dir)
		}
	}
	return result.reverse()
}

export function getRoot(filepath: string) {
	const char = filepath.charAt(0)
	return isRoot(char) ? char : ''
}

export function isRoot(char: string) {
	return ['/', '\\'].includes(char)
}
