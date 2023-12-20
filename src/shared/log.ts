import { Time, toLen, addMiddle } from './../lib'

export const wrap = '\n'
export const indent = '\t'
export const styleEnd = '\x1b[0m'

export const Font = {
  style: {
    italic: '\x1B[3m',
    underline: '\x1B[4m',
    reverse: '\x1B[7m',
    hidden: '\x1B[8m',
  },
  color: {
    bright: '\x1B[1m',
    grey: '\x1B[2m',
    black: '\x1B[30m',
    red: '\x1B[31m',
    green: '\x1B[32m',
    yellow: '\x1B[33m',
    blue: '\x1B[34m',
    magenta: '\x1B[35m',
    cyan: '\x1B[36m',
    white: '\x1B[37m',
  },
  bg: {
    black: '\x1B[40m',
    red: '\x1B[41m',
    green: '\x1B[42m',
    yellow: '\x1B[43m',
    blue: '\x1B[44m',
    magenta: '\x1B[45m',
    cyan: '\x1B[46m',
    white: '\x1B[47m',
  },
}

export const logLevel = {
  info: 'grey',
  warn: 'yellow',
  damage: 'red',
  success: 'green',
  normal: 'cyan',
  error: 'magenta',
}

export class Log {
  private text: string[] = []
  private width = process.stdout.columns - 1
  private line = false
  private lineArray: string[] = []
  private endSymbol = ''

  constructor() {}

  private cancel(char = '') {
    if (this.text.slice(-1)[0] === char) {
      this.text.pop()
    }
    return this
  }

  pushText(string = '') {
    if (this.line) {
      this.lineArray.push(string)
    } else this.text.push(string)
    return this
  }

  indent(add = true) {
    return add ? this.pushText(indent) : this.cancel(indent)
  }

  wrap(add = true) {
    return add ? this.pushText(wrap) : this.cancel(wrap)
  }

  print(noWrap = true) {
    console.log(this.text.join(noWrap ? ' ' : wrap))
    return this.reset()
  }

  reset() {
    this.text.length = 0
    return this
  }

  head(message: string, split = '-') {
    return this.pushText(addMiddle(message, split, this.width))
  }

  addTime() {
    return this.pushText(new Time().timeToString())
  }

  addDate() {
    return this.pushText(new Time().dateToString())
  }

  addTimer() {
    return this.addDate().addTime()
  }

  addHeadTime(onlyDate = false) {
    if (onlyDate) this.addDate()
    else this.addTimer()
    return this.head(
      ['[', ...this.text.splice(onlyDate ? -1 : -2), ']'].join(' '),
    )
  }

  split(char = '-', len = this.width) {
    if (this.line) this.endLine()
    return this.pushText(toLen(char, len))
  }

  inline() {
    if (this.line) this.endLine()
    this.line = true
    return this
  }

  endLine() {
    this.line = false
    this.pushText(this.lineArray.join(''))
    this.lineArray.length = 0
    return this
  }

  color(color: keyof typeof Font.color) {
    return this.pushText(Font.color[color])
  }

  bg(color: keyof typeof Font.bg) {
    return this.pushText(Font.bg[color])
  }

  style(style: keyof typeof Font.style) {
    return this.pushText(Font.style[style])
  }

  endFont() {
    return this.pushText(styleEnd)
  }

  inner(char = '[]', space = true) {
    this.endSymbol = `${space ? ' ' : ''}` + char.slice(-1)
    return this.pushText(char.charAt(0) + `${space ? ' ' : ''}`)
  }

  endInner() {
    this.pushText(this.endSymbol)
    this.endSymbol = ''
    return this
  }
}
