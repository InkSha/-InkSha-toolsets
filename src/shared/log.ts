import { Time } from './../lib'

export enum logColor {
  italic = '\x1B[3m',
  underline = '\x1B[4m',
  reverse = '\x1B[7m',
  hidden = '\x1B[8m',

  bright = '\x1B[1m',
  grey = '\x1B[2m',
  black = '\x1B[30m',
  red = '\x1B[31m',
  green = '\x1B[32m',
  yellow = '\x1B[33m',
  blue = '\x1B[34m',
  magenta = '\x1B[35m',
  cyan = '\x1B[36m',
  white = '\x1B[37m',
}

export enum logBackground {
  black = '\x1B[40m',
  red = '\x1B[41m',
  green = '\x1B[42m',
  yellow = '\x1B[43m',
  blue = '\x1B[44m',
  magenta = '\x1B[45m',
  cyan = '\x1B[46m',
  white = '\x1B[47m',
}

export class Log {
  private text: string[] = []
  private needClose = false
  private cols = process.stdout.columns
  private autoWrap = true
  private tmpToggle = false

  color (color: keyof typeof logColor) {
    return this.changeColor(logColor[color])
  }

  background (bg: keyof typeof logBackground) {
    return this.changeColor(logBackground[bg])
  }

  changeWrap (tmp = false) {
    if (tmp) this.tmpToggle = true
    this.autoWrap = !this.autoWrap
    return this
  }

  addText (message: string) {
    this.text.push(message)
    if (this.autoWrap) {
      this.text.push('\n')
    }
    if (this.tmpToggle) {
      this.autoWrap = !this.autoWrap
      this.tmpToggle = false
    }
    return this
  }

  wrap () {
    return this.addText('\n')
  }

  print () {
    console.log(this.text.join(''))
    return this.reset()
  }

  reset () {
    this.text.length = 0
    return this.changeColor()
  }

  warn (message: string) {
    return this.color('yellow').addText(message).changeColor()
  }

  info (message: string) {
    return this.color('white').addText(message).changeColor()
  }

  primary (message: string) {
    return this.color('blue').addText(message).changeColor()
  }

  damage (message: string) {
    return this.color('red').addText(message).changeColor()
  }

  addTimer (split = '-') {
    const now = new Time()
    const head = [now.dateToString(), `  ${now.timeToString()}`]
    const odd = this.cols % 2 !== 0
    const len = (this.cols / 2) - 10
    const row = new Array(odd ? Math.floor(len) : len).fill(split).join('')
    return this.addText(
      `${row}${head.join(odd ? '' : ' ')}}${row}`
    )
  }

  split (split = '-') {
    return this.addText(new Array(this.cols).fill(split).join(''))
  }

  private changeColor (color?: string) {
    if (color) {
      if (this.needClose) this.text.pop()
      this.text.push(color)
      this.needClose = true
    }
    else if (this.needClose) {
      this.text.push('\x1b[0m')
      this.needClose = false
    }
    return this
  }
}
