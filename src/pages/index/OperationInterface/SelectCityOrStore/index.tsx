// @ts-ignore
import React from "react";
import {AtSwitch} from 'taro-ui'
import {View} from "@tarojs/components";
// @ts-ignore
import style from './style.module.scss';
import Point from "../../../../components/Point";
import useObserve from "../../../../util/useObserve";
import {isForeignCityObserve} from "../../../../store/cities";

type SelectCityOrAttractionPropsType = {
  title: string;
  pointColor?: string;
  visitButton?: boolean;
  onClickCity: () => void;
  cityName: string;
}
const SelectCityOrAttraction = (props: SelectCityOrAttractionPropsType): React.ReactElement => {
  const [isForeignCity, isForeignDispatcher] = useObserve(isForeignCityObserve)
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
          <View className={style.city} onClick={() => props.onClickCity()}>{props.cityName}</View>
          <View className={style.store}>海拉尔火车站送车点</View>
        </View>
        <View className={style.switch}>
          { props.visitButton && <AtSwitch
            border
            checked={isForeignCity}
            onChange={(v) => isForeignDispatcher.next(v)}
          />}
        </View>
      </View>
    </>
  )
}

export default SelectCityOrAttraction;
