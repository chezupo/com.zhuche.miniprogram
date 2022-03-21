const replaceStr = (str: string, start: number, length: number, character: string,): string => {
  const characters: string = Array.from( Array(length), () => character).join('')

  return str.substring(0, start) + characters + str.substring(start + length)
}

const numberMapWeekStr: Record<number, string> = {
  0: '星期日',
  1: '星期一',
  2: '星期二',
  3: '星期三',
  4: '星期四',
  5: '星期五',
  6: '星期六',
}

export {replaceStr, numberMapWeekStr}

export const debounce = <T>(callback: (params: T) => void, wait: number): (params: T) => void => {
  let timer: ReturnType<typeof setTimeout>;

  return (keyword) => {
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      callback(keyword)
    }, wait)
  }
}
