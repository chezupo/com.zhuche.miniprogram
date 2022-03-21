import * as React from "react";
import {View} from "@tarojs/components";
import style from "./style.module.scss";
import {numberMapWeekStr} from "../../../../util/helper";

type DateItemPropsType = {
  className?: string
  time: Date
}
const DateItem: React.FC<DateItemPropsType> = (props) => {
  let allClassName: string = props.className ? [props.className].join(' ') : '';
  allClassName += ` ${style.dateItem}`
  const month = props.time.getMonth() + 1
  const date = props.time.getDate()
  const format = (n: number): string => n > 9 ? '' + n : '0' + n

  return (
    <View className={allClassName} >
      <View>{month < 10 ? '0' : ''}{month}月{date < 10 ? '0' : ''}{date}日</View>
      <View className={style.weekTime}>
        {numberMapWeekStr[props.time.getDay()]} {format( props.time.getHours() ) }:{format(props.time.getMinutes())}
      </View>
    </View>
  )
}

export default DateItem
