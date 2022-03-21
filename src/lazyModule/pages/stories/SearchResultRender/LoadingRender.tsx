import {View} from "@tarojs/components";
import {AtIcon} from "taro-ui";
import * as React from "react";
// @ts-ignore
import style from "./style.module.scss"

const LoadingRender = () => (
  <View className={style.loading}>
    <View className={style.spinWrapper}>
      <AtIcon value='loading-3' size='30' color='#3C61FF' className={style.spin} />
      <View className={style.title}>加载中</View>
    </View>
  </View>
)

export default LoadingRender
