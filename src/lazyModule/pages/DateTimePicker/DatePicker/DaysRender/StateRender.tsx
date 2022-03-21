import * as React from "react";
import {View} from "@tarojs/components";
import style from "./style.module.scss"
import {useEffect, useState} from "react";
import {getNextMonthTime, timeToDateTime, timeToMonthTime} from "../util";

type StateRenderPropsType = {
  number: string
  isRange: boolean
  isStart: boolean
  isEnd: boolean
  date: Date
}
const StateRender: React.FC<StateRenderPropsType> = (props) => {
  const [isToday, setisToday] = useState<boolean>(false)
  const [number, setNumber] = useState<string>(props.number)
  const isActive = props.isStart || props.isEnd
  useEffect(() => {
    let newDate: string = ''
    if (props.date && timeToDateTime(new Date()).getTime() === timeToDateTime(props.date).getTime()) {
      newDate = '今'
      setisToday(true)
      setNumber(newDate)
    }
  }, [])
  const isSunday: boolean = props.date?.getDay() === 0
  const isSaturday: boolean = props.date?.getDay() === 6
  const [isLastMonthDate, setIsLastMonthDate] = useState<boolean>(false)
  const [isStartMonthDate, setIsStartMonthDate] = useState<boolean>(false)
  const handleInitLastDate = () => {
    props.date.getDate() === 1 && setIsStartMonthDate(true);
    const nextMonth = getNextMonthTime(props.date)
    const lastDate = (new Date(timeToMonthTime(nextMonth).getTime() - 1)).getDate()
    if (lastDate == props.date.getDate()) {
      setIsLastMonthDate(true)
    }
  }
  useEffect(() => handleInitLastDate(), [])

  return (<>
    <View className={[
      style.append,
      props.isRange && !(isSunday && isActive) && !props.isStart && !isSunday && !isStartMonthDate ? style.dateRange : ''
    ].join(' ')}
    />
    <View className={[
      style.radiusNumberWrapper,
    ].join(' ')}
    >
      <View className={[
        style.radius,
        isActive ? style.active : '',
        isToday ? style.today : '',
        (isSunday || isSaturday || isStartMonthDate || isLastMonthDate ) && props.isRange ? style.isSunday : ''
      ].join(' ')}
      >
        {number}
      </View>
    </View>
    <View className={[
      style.append,
      props.isRange && !(isSaturday && isActive) && !props.isEnd && !isSaturday && !isLastMonthDate ? style.dateRange : '',
    ].join(' ')}
    />
  </>)
}

export default StateRender
