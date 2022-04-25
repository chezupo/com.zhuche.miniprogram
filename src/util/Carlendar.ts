const convertDate = (date: Date): string => {
  const formatNum = (value: number): string => {
    return value > 9 ? value + '' : '0' + value
  }
  const m = formatNum( date.getMonth() + 1)
  const d = formatNum( date.getDate())
  const h = formatNum(date.getHours())
  const minutes = formatNum( date.getMinutes())

  return `${m}月${d}日 ${h}:${minutes}`
}

export {convertDate}
