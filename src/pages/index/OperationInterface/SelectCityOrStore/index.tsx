// @ts-ignore
import React from "react";
import {AtSwitch} from 'taro-ui'
import {View} from "@tarojs/components";
// @ts-ignore
import style from './style.module.scss';
import Point from "../../../../components/Point";
import {useAppDispatch, useAppSelector} from "../../../../reduxStore";
import {setCreateOrderIsForeignCity} from "../../../../reduxStore/module/order";

type SelectCityOrAttractionPropsType = {
  title: string;
  pointColor?: string;
  visitButton?: boolean;
  onClickCity: () => void;
  cityName: string;
  onClickStore: () => void
  storeName: string
}
const SelectCityOrAttraction = (props: SelectCityOrAttractionPropsType): React.ReactElement => {
  const {isForeignCity} = useAppSelector(state => state.order.createOrder)
  const dispatch = useAppDispatch()
  const handleChange = (newIsForeignCity: boolean): void => {
    dispatch(setCreateOrderIsForeignCity(newIsForeignCity))
  }
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
          {
            props.cityName ? (
              <View className={style.city} onClick={() => props.onClickCity()}>{props.cityName}</View>
            ) : (
              <View className={[style.city, style.noticeColor].join(' ')} onClick={() => props.onClickCity()}>请选择</View>
            )
          }
          {
            props.storeName ? (
              <View className={style.store} onClick={props.onClickStore}>
                {props.storeName}
              </View>
            ) : (
              <View className={[style.store, !props.storeName ? style.noticeColor : ''].join(' ')} onClick={props.onClickStore}>
                请选择门店
              </View>
            )
          }

        </View>
        <View className={style.switch}>
          { props.visitButton && <AtSwitch
            className={style.atSwitch}
            border={false}
            checked={isForeignCity}
            onChange={handleChange}
          />}
        </View>
      </View>
    </>
  )
}

export default SelectCityOrAttraction;
