import {View} from "@tarojs/components";
import * as React from "react";
import {useEffect, useState} from "react";
import style from "./style.module.scss"
import {timeToDateTime} from "../util";
import StateRender from "./StateRender";

type DayItemRenderPropsType = {
  date?: Date
  isStart?: boolean
  isEnd?: boolean
  isRange?: boolean
  onClick?: (date: Date) => void
}
const DayItemRender: React.FC<DayItemRenderPropsType> = (props) => {
  const [date, setDate] = useState<string>('')
  const initDate = () => {
    let newDate: string = ''
    newDate = props.date ? props.date.getDate() > 9 ? props.date.getDate() + '' : `0${props.date.getDate()}` : ''
    setDate(newDate)
  }
  const handleClick = () => {
    props.onClick && props.onClick(props.date as Date)
  }
  const [isDisable, setIsDisable] = useState<boolean>(true)
  useEffect(() => {
    initDate()
    if (props.date) {
      const dateParam: Date = timeToDateTime(props.date)
      const today: Date = timeToDateTime(new Date())
      dateParam.getTime() >= today.getTime() && setIsDisable(false)
    }
  }, [])
  let subtitleDom: React.ReactNode = (<View className={style.subtitle} />)
  if (props.isEnd && props.isStart) {
    subtitleDom = <View className={style.subtitle}>取/还车</View>
  } else if (props.isEnd) {
    subtitleDom = <View className={style.subtitle}>还车</View>
  } else if (props.isStart) {
    subtitleDom = <View className={style.subtitle}>取车</View>
  }
  const active: boolean = props.isEnd || props.isEnd

  return (
    <View
      className={style.dateWrapper}
    >
      { isDisable && <View className={style.disable}>{date}</View> }
      { !isDisable && <View
        className={[
          active ? style.active : '',
          style.date,
        ].join(' ')}
        onClick={handleClick}
      >
        <StateRender
          date={props.date}
          number={date}
          isRange={props.isRange || false}
          isStart={props.isStart}
          isEnd={props.isEnd}
        />
      </View> }
      {subtitleDom}
    </View>
  )
}

export default DayItemRender
