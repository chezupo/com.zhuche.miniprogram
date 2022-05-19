const convertDateToStr = (date: Date): string => {
  const formatNum = (num: number): string =>  num > 9 ? `${num}`: `0${num}`

  return  `${formatNum( date.getMonth() + 1)}月${formatNum(date.getDate())}日 ${formatNum(date.getDate())}:${formatNum(date.getMinutes())}`
}

export {convertDateToStr}
