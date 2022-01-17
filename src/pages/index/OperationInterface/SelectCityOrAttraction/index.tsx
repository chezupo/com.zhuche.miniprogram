// @ts-ignore
import React from "react";
import {View} from "@tarojs/components";
import style from './style.module.scss';
import Point from "../../../../components/Point";
import {AtSwitch} from 'taro-ui'

type SelectCityOrAttractionPropsType = {
  title: string;
  pointColor?: string;
  visitButton?: boolean;
}
const SelectCityOrAttraction = (props: SelectCityOrAttractionPropsType): React.ReactElement => {
  return (
    <>
      <View className={style.titleWrapper}>
        <Point
          color={props.pointColor ? props.pointColor : '#F57015'}
          borderSize={3}
        />
        <View className={style.title}>{props.title}</View>
        <View className={style.title}>{ props.visitButton && '异地还车' }</View>
      </View>

      <View className={style.storeWrapper}>
        <View />
        <View className={style.cityAndStore}>
          <View className={style.city}>呼伦贝尔</View>
          <View className={style.store}>海拉尔火车站送车点</View>
        </View>
        <View className={style.switch}>
          { props.visitButton && <AtSwitch border={false} />}
        </View>
      </View>
    </>
  )
}

export default SelectCityOrAttraction

