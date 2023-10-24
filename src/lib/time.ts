/**
 * @file Time module.
 * @description Some time operations.
 * @license MIT
 * @author InkSha<git@inksha.com>
 * @created 2023-10-07
 * @updated 2023-10-07
 * @version 1.0.0
 */

export interface DifferenceTime {
  sec: number
  min: number
  hour: number
  day: number
  month: number
  year: number
}

export class Time {
  constructor(private date = new Date()) {}

  getHours() {
    return this.date.getHours()
  }

  getMinutes() {
    return this.date.getMinutes()
  }

  getSeconds() {
    return this.date.getSeconds()
  }

  getYear() {
    return this.date.getFullYear()
  }

  getMonth() {
    return this.date.getMonth()
  }

  getDay() {
    return this.date.getDay()
  }

  getDate() {
    return this.date.getDate()
  }

  changeDate(date = new Date()) {
    this.date = date
  }

  getNowTime() {
    return this.date
  }

  computedDateDifference(old = new Date(), now = this.date) {
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

  formatTime() {
    return Time.formatTime(
      this.getHours(),
      this.getMinutes(),
      this.getSeconds(),
    )
  }

  formatDate() {
    return Time.formatDate(
      this.getYear(),
      this.getMonth(),
      this.getDate(),
      this.getDay(),
    )
  }

  static formatTime(hour = 0, min = 0, sec = 0) {
    return { hour, min, sec }
  }
  static formatDate(year = 0, month = 0, date = 0, day = 0) {
    return { year, month, date, day }
  }
}
