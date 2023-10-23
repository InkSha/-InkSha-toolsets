/**
 * @file All modules entries file.
 * @description All modules through this file export and use.
 * @license MIT
 * @author InkSha<git@inksha.com>
 * @created 2023-10-08
 * @updated 2023-10-08
 * @version 1.0.0
 */

import * as _Array from './array'
import * as _Async from './async'
import * as _Math from './math'
import * as _Path from './path'
import * as _Time from './time'
import * as _File from './file'
import * as _Image from './image'
import * as _Express from './express'

export default {
	array: _Array,
	async: _Async,
	math: _Math,
	path: _Path,
	time: _Time,
	file: _File,
	image: _Image,
	express: _Express,
}
