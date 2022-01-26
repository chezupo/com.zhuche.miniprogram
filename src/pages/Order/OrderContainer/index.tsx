import {Image, View} from "@tarojs/components";
import * as React from "react";
import style from "./style.module.scss"
import Point from "../../../components/Point";
import {noticeColor, targetAddressPointColor, warningColor} from "../../../config/globalConfig";

/*
type OrderContainerPropsType = {

}
*/

const OrderContainer = (): React.ReactElement => {
  const cover = 'https://zhuche-a1001.qiniu.wuchuheng.com/cover.jpg'

  const pointSize: number = 2;
  return (<View className={style.main}>
    <View className={style.headerWrapper}>
      <View className={style.status}>已取消</View>
      <View>￥289</View>
    </View>
    <View className={style.name}>本田新飞度</View>
    <View className={style.storeWrapper}>
      <View className={style.storeAddressWrapper}>
        <View className={style.pointWrapper}>
          <Point color={warningColor} borderSize={pointSize} />
          <View className={style.line} />
          <Point color={targetAddressPointColor} borderSize={pointSize} />
        </View>
        <View className={style.storeAddress}>
          <View>惠州 市政广场店</View>
          <View>惠州 市政广场店</View>
        </View>
      </View>

      <View className={style.imageWrapper}>
        <Image src={cover} className={style.image} />
      </View>
    </View>
    <View className={style.dateWrapper}>
      <View>01月26日 14:00</View>
      <View className={style.durationWrapper}>
        <View className={style.backgroundLine} />
        1天
        <View className={style.backgroundLine} />
      </View>
      <View>01月26日 14:00</View>
    </View>
    <View className={style.buttonWrapper}>
      <View className={style.button}>
        再次预订
      </View>
    </View>
  </View>)
}

export default OrderContainer;
