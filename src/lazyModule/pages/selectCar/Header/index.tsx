import * as React from "react";
import {View} from "@tarojs/components";
// @ts-ignore
import style from "./style.module.scss";

const Header = (): React.ReactElement => {
  return (
    <View className={style.headerWrapper}>
      <View>黄花机场店(站内取还)</View>
      <View className={style.dateRange}>
        <View className={style.date}>01-24 21:00</View>
        <View className={style.dateRangeBetweenBorder}></View>
        <View className={[style.date, style.endDate].join(' ')}>
          <View> 01-24 21:00 </View>
          <View className={style.triangle}></View>
        </View>
      </View>
    </View>
  )
}

export default Header
