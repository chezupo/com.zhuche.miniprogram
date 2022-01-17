import {View} from "@tarojs/components";
import  React from "react";
import style from "./style.module.scss";

type DateItemPropsType = {className?: string}

const DateItem = (props: DateItemPropsType): React.ReactElement => {
  let allClassName: string = props.className ? [props.className].join(' ') : '';
  allClassName += ` ${style.dateItem}`
  return (
    <View className={allClassName}>
      <View>01月18日</View>
      <View className={style.weekTime}>星期二 10:00</View>
    </View>
    )
}

const DateRange = (): React.ReactElement => {
  return (
    <View className={style.main}>
      <View></View>
    <View className={style.container}>
      <DateItem />
      <View className={style.item2}>2天</View>
      <DateItem className={style.item3} />
    </View>
    </View>
  )
}

export default DateRange

