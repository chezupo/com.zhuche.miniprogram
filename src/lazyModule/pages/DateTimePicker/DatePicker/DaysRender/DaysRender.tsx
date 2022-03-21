import * as React from "react";
import {useEffect, useState} from "react";
import {View} from "@tarojs/components";
import style from "./style.module.scss"
import {isSameDate, monthMapName, timeToDateTime} from "../util";
import DayItemRender from "./DayItemRender";

type DaysRenderPropsType = {
  month: number
  year: number
  startDate?: Date
  endDate?: Date
  onClickDate: (date: Date) => void
}
const DaysRender: React.FC<DaysRenderPropsType> = (props) => {
  const {startDate, endDate, onClickDate} = props
  let time: Date = new Date(`${props.year}/${props.month + 1}/1`)
  const [daysDom, setDaysDom] = useState<React.ReactNode[]>([])
  const initDaysDom = () => {
    let resDom: React.ReactNode[] = []
    while (time.getMonth() === props.month) {
      for (let i: number = 0; i < 7; i++) {
        if ( time.getDay() === i && time.getMonth() === props.month) {
          let isRange: boolean = false
          if (props.startDate && props.endDate) {
            const now = timeToDateTime(time)
            isRange = now >= timeToDateTime(props.startDate) && now <= timeToDateTime(props.endDate)
          }
          resDom.push( <DayItemRender
            onClick={(newDate) => {
              onClickDate(newDate)
            }}
            isRange={isRange}
            date={time}
            isEnd={endDate && isSameDate(time, endDate)}
            isStart={startDate && isSameDate(time, startDate)}
          /> )
          time = new Date(time.getTime() + 60 * 60 * 24 * 1000)
        } else {
          resDom.push( <DayItemRender /> )
        }
      }
    }
    setDaysDom(resDom)
  }
  useEffect(() => {
    initDaysDom()
  }, [startDate, endDate])

  return (<>
    <View className={style.title}>
      {props.year}年 {monthMapName[props.month]}
    </View>
    <View className={style.daysWrapper}>
      {daysDom}
    </View>
  </>)
}

export default DaysRender
