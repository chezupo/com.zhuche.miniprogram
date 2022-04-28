import React from "preact/compat";
import {Image, View, Text} from "@tarojs/components";
// @ts-ignore
import style from './style.module.scss';

const ItemRender: React.FC = () => {
  return (
    <View className={style.main}>
      <View className={style.userWrapper}>
        <Image
          src='https://zhuche-a1001.qiniu.wuchuheng.com/2022-3-17-17-40-1-1647510001605-806d6cd71f7141e9b2d8e1d1c8d3140c.jpg'
          className={style.avatar}
        />
        <View className={style.infoWrapper}>
          <View className={style.nameWrapper}>
            <View>13427****89</View>
            <View className={style.tag}>满意</View>
          </View>
          <View className={style.date}>2022-04-09</View>
        </View>
      </View>
      <View className={style.command}>车很新，驾驶和乘坐都很nice,配置的ETC也很方便。大兴机场营业点的工作人员也很尽责，服务也很热情</View>
    </View>
  )
}

export default ItemRender
