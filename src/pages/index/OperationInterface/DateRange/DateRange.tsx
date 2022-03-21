import {View} from "@tarojs/components";
import * as React from "react";
import style from "./style.module.scss";
import DateItem from "./DateItem";
import {navigateTimeRangePage} from "../../../../store/module/router";


type DateRangePropsType = {
  starTime: Date
  endTime: Date
}
const DateRange: React.FC<DateRangePropsType> = (props) => {
  const handleClick = (): void => navigateTimeRangePage()
  let noticeStr: string = ''
  const hours = (props.endTime.getTime() - props.starTime.getTime() ) / 60 / 60 / 1000;
  noticeStr += hours / 24 > 0 ?  (hours / 24).toFixed(0) + '天' : ''
  noticeStr += hours % 24 > 0 ? Math.round(hours % 24) + '小时' : ''

  return (
    <>
      <View className={style.main} onClick={handleClick}>
        <View />
        <View className={style.container}>
          <DateItem
            time={props.starTime}
          />
          <View className={style.item2}>{noticeStr}</View>
          <DateItem
            time={props.endTime}
            className={style.item3}
          />
        </View>
      </View>
    </>
  )
}

export default DateRange

