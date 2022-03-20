const monthMapName: Record<number, string> = {
  0: '一月',
  1: '二月',
  2: '三月',
  3: '四月',
  4: '五月',
  5: '六月',
  6: '七月',
  7: '八月',
  8: '九月',
  9: '十月',
  10: '十一月',
  11: '十二月'
}
const isSameDate  = (time1: Date, time2: Date): boolean => {
    return time1.getFullYear() === time2.getFullYear() &&
    time1.getMonth() === time2.getMonth() &&
    time1.getDate() === time2.getDate()
}

const timeToDateTime = (time: Date) => {
  return new Date(`${time.getFullYear()}/${time.getMonth() + 1}/${time.getDate()}`)
}

const timeToMonthTime = (time: Date) => {
  return new Date(`${time.getFullYear()}/${time.getMonth() + 1}/1`)
}
const getLastDate = (time: Date): number => {
  let year: number = time.getFullYear()
  let month: number = time.getMonth()
  if (month !== 11) {
    month++
  } else {
    year++
  }
  return (new Date((new Date(year, month, 1)).getTime() - 1)).getDate()
}
const getNextMonthTime = (time: Date): Date => {
  let fullYear: number = time.getFullYear()
  let month: number = time.getMonth()
  let date: number = time.getDate()
  let hour: number = time.getHours()
  let muns: number = time.getMinutes()
  let seconds: number = time.getSeconds()
  let ms: number = time.getMilliseconds()
  if (month !== 11) {
    month++
    const lastDate = getLastDate(new Date(fullYear, month, 1))
    if (lastDate < date) date = lastDate
  } else {
    fullYear++
    month = 0
  }
  return new Date(fullYear, month, date, hour, muns, seconds, ms)
}

export {monthMapName, isSameDate, timeToDateTime, timeToMonthTime, getNextMonthTime}


