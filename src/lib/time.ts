/**
 * @file Time module.
 * @description Some time operations.
 * @license MIT
 * @author InkSha<git@inksha.com>
 * @created 2023-10-07
 * @updated 2023-11-26
 * @version 1.0.5
 */

/** 时间格式 */
export interface DifferenceTime {
  /** 秒 */
  sec: number
  /** 分 */
  min: number
  /** 时 */
  hour: number
  /** 日 */
  day: number
  /** 月 */
  month: number
  /** 年 */
  year: number
}

/**
 * @class
 * @description 时间处理类
 */
export class Time {
  /**
   * @param date 处理的日期 默认为当前日期
   */
  constructor (private date = new Date()) {}

  /**
   * 获取当前日期的小时
   * @returns 当前日期的小时
   */
  getHours () {
    return this.date.getHours()
  }

  /**
   * 获取当前日期的分钟
   * @returns 当前日期的分钟
   */
  getMinutes () {
    return this.date.getMinutes()
  }

  /**
   * 获取当前日期的秒
   * @returns 当前日期的秒
   */
  getSeconds () {
    return this.date.getSeconds()
  }

  /**
   * 获取当前日期的年
   * @returns 当前日期的年
   */
  getYear () {
    return this.date.getFullYear()
  }

  /**
   * 获取当前日期的月
   * @returns 当前日期的月
   */
  getMonth () {
    return this.date.getMonth()
  }

  /**
   * 获取当前日期的星期几
   * @returns 当前日期为星期几
   */
  getDay () {
    return this.date.getDay() + 1
  }

  /**
   * 获取当前日期的日期
   * @returns 当前日期的日期
   */
  getDate () {
    return this.date.getDate()
  }

  /**
   * 变更当前日期
   * @param date 变更的日期
   */
  changeDate (date = new Date()) {
    this.date = date
  }

  /**
   * 获取当前日期对象
   * @returns 当前日期对象
   */
  getNowTime () {
    return this.date
  }

  /**
   * 计算日期的差
   * @param old 旧的时间
   * @param now 新的时间 默认当前时间
   * @returns 两个时间的差
   */
  computedDateDifference (old = new Date(), now = this.date) {
    const difference = +now - +old
    const result: Partial<DifferenceTime> = {}
    result.sec = difference / 1000
    result.min = result.sec / 60
    result.hour = result.min / 60
    result.day = result.hour / 24
    result.month = Math.floor(result.day / 30)
    result.year = Math.floor(result.day / 365)
    return result as DifferenceTime
  }

  /**
   * 获取当前日期的格式化的时间
   * @returns 格式化的时间
   */
  formatTime () {
    return Time.formatTime(
      this.getHours(),
      this.getMinutes(),
      this.getSeconds(),
    )
  }

  /**
   * 获取当前日期的格式化的日期
   * @returns 格式化的日期
   */
  formatDate () {
    return Time.formatDate(
      this.getYear(),
      this.getMonth(),
      this.getDate(),
      this.getDay(),
    )
  }

  /**
   * 加零
   * @param time 需要增加零的数字
   * @returns '09' | '12'
   */
  static addZero (time: number) {
    return `${time < 10 ? '0' : ''}${time}`
  }

  /**
   * 格式化时间
   * @param hour 格式化的时
   * @param min 格式化的分钟
   * @param sec 格式化的秒
   * @returns 格式化的时间对象
   */
  static formatTime (hour = -1, min = -1, sec = -1) {
    const now = new Time()
    if (!(~hour)) hour = now.getHours()
    if (!(~min)) min = now.getMinutes()
    if (!(~sec)) sec = now.getSeconds()
    return { hour, min, sec }
  }

  /**
   * 格式化日期
   * @param year 格式化的年
   * @param month 格式化的月
   * @param date 格式化的日
   * @param day 格式化的星期几
   * @returns 格式化的日期对象
   */
  static formatDate (year = -1, month = -1, date = -1, day = -1) {
    const now = new Time()
    if (!(~year)) year = now.getYear()
    if (!(~month)) month = now.getMonth()
    if (!(~date)) date = now.getDate()
    if (!(~day)) day = now.getDay()
    return { year, month, date, day }
  }

  /**
   * 日期转字符串
   * @param split 分割符 默认 /
   * @param noDay 是否取消星期几
   * @returns 'yyyy/mm/dd' | 'yyyy/mm/dd/day'
   */
  static dateToString (split = '/', noDay = true) {
    const { year, month, date, day } = this.formatDate()
    return [
      year,
      this.addZero(month),
      this.addZero(date),
      noDay ? this.addZero(day) : ''
    ].join(split)
  }

  /**
   * 时间转字符串
   * @param split 分隔符 默认 :
   * @returns 'hh:mm:ss'
   */
  static timeToString (split = ':') {
    const { hour, min, sec } = this.formatTime()
    return [
      this.addZero(hour),
      this.addZero(min),
      this.addZero(sec)
    ].join(split)
  }
}
