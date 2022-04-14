import React from "react";
import {Image, Text, View} from "@tarojs/components";
import Container from "../components";
import Point from "../../../../components/Point";
import {primaryThemeColor} from "../../../../global";
import Icon from "../../../../components/Icon";
// @ts-ignore
import style from './style.module.scss'

const Car: React.FC = props => {
  return (
    <Container className={style.main}>
      <View className={style.baseInfo}>
        <Image
          src='https://zhuche-a1001.qiniu.wuchuheng.com/2022-4-10-22-22-23-1649600543498-cover.jpg'
          className={style.image}
          mode='widthFix'
        />
        <View className={style.info}>
          <View className={style.name}>本田凌派</View>
          <View className={style.tags}>自动 | 5座</View>
        </View>
      </View>
      <View className={style.storeWrapper}>
        <View className={style.lineWrapper}>
          <Point color='#F57015' borderSize={3} />
          <View className={style.line} />
          <Point color={primaryThemeColor} borderSize={3} />
        </View>
        <View className={style.storeNameWrapper}>
          <View className={style.storeName}>
            <View className={style.name}>
              <View>惠州-市面广场店 </View>
              <Icon value='right' className={style.icon} />
            </View>
            <View className={style.date}>04月20日 09：00</View>
          </View>
          <View className={style.storeName}>
            <View className={style.name}>
              <View>惠州-市面广场店 </View>
              <Icon value='right' className={style.icon} />
            </View>
            <View className={style.date}>04月20日 09：00</View>
          </View>
        </View>
      </View>
      <View className={style.commentWrapper}>
        <View className={style.rateWrapper}>
          <Text className={[style.rate, style.color].join(' ')}>100</Text><Text className={style.color}>%</Text>满意
        </View>
        <View className={style.comment}>
          <View>
            共有<Text className={style.color}>10</Text>条用户评价
          </View>
          <Icon value='right' className={style.icon} />
        </View>
      </View>
    </Container>
  )
}

export default Car
