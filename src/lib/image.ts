/**
 * @file Image module.
 * @description Some image operations.
 * @license MIT
 * @author InkSha<git@inksha.com>
 * @created 2023-10-23
 * @updated 2023-10-23
 * @version 1.0.0
 */

import path from 'node:path'
import sharp from 'sharp'
import { computedHash } from './file'
import { Time } from './time'

export class Image {
	constructor(
		public ImageCompressionQuality = 50,
		public defaultFormat:
			| keyof sharp.FormatEnum
			| sharp.AvailableFormatInfo = 'jpeg',
		public saveBaseUrl = '/images',
	) {}

	/**
	 * 图片压缩
	 * @param options 图片压缩选项
	 * @returns
	 */
	imageCompression(buffer: Buffer): string {
		const hash = computedHash(buffer)
		const { year, month, date } = Time.formatDate()
		const filename = path.join(
			`${year}`,
			`${month}`,
			`${date}`,
			`${hash}.${this.defaultFormat}`,
		)
		sharp(buffer)
			.resize({ width: 300 })
			.toFormat(this.defaultFormat, { quality: this.ImageCompressionQuality })
			.toFile(`${this.saveBaseUrl}/${filename}`)
		return filename
	}
}
