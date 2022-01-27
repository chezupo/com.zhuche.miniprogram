// @ts-ignore
import React, {useState} from "react";
import {View} from "@tarojs/components";
// @ts-ignore
import style from './style.module.scss'
import SelectCityOrAttraction from "./SelectCityOrStore";
import DateRange from "./DateRange/DateRange";
import Button from "./Button";
import useObserve from "../../../util/useObserve";
import {navigateTo} from "../../../store/router";
import {
  currentPickCityPointObserve,
  CurrentPickCityPointType,
  endCityObserve, isForeignCityObserve,
  startCityObserve
} from "../../../store/cities";
type OperationInterfacePropsType = {
  className?: string
}
const OperationInterface = (props: OperationInterfacePropsType): React.ReactElement => {
  const [, dispatcher] = useObserve(currentPickCityPointObserve)
  const redirectPickCityPage = () => navigateTo('/pages/index/city/index')
  const handleClickStartCity = () => {
    dispatcher.next(CurrentPickCityPointType.START)
    redirectPickCityPage()
  }
  const handleClickEndCity = () => {
    dispatcher.next(CurrentPickCityPointType.END)
    redirectPickCityPage()
  }
  const [startCity] = useObserve(startCityObserve)
  const [endCity] = useObserve(endCityObserve)
  const [isForeignCity] = useObserve(isForeignCityObserve)

  const ForeignCityRender = isForeignCity ? (
    <SelectCityOrAttraction
      title='还车地点'
      pointColor='#405DFF'
      onClickCity={() => handleClickEndCity()}
      cityName={endCity.name}
    />
  ) : (<></>)

  return (
    <View className={[style.main, props.className ? props.className : ''].join(' ')}>
      <View className={style.container}>
        <SelectCityOrAttraction
          title='取车地点'
          visitButton
          onClickCity={() => handleClickStartCity()}
          cityName={startCity.name}
        />
        {ForeignCityRender}
        <DateRange />
        <Button />
      </View>
    </View>
    )

}

export default OperationInterface;
