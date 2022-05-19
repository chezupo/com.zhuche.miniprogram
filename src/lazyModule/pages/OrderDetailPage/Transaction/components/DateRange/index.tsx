import React from 'react';
import {View} from "@tarojs/components";
import {convertDate} from "../../../../../../util/Carlendar";
import {getDays} from "../../index";
// @ts-ignore
import style from "../../style.module.scss";

type DateRangePropsType = {
  order: OrderItemType
}
const DateRange: React.FC<DateRangePropsType> = ({order}) => {
  return (<>
    <View className={style.dateWrapper}>
      <View>{convertDate(new Date(order.startTimeStamp))}</View>
      <View className={style.day}>
        <View>共{getDays(order)}天</View>
        <View className={style.line} />
      </View>
      <View>{convertDate(new Date(order.endTimeStamp))}</View>
    </View>
  </>)
}

export default DateRange
