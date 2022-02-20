// @ts-ignore
import React from "react";
import {View} from "@tarojs/components";
// @ts-ignore
import style from './style.module.scss'
import SelectCityOrAttraction from "./SelectCityOrStore";
import DateRange from "./DateRange/DateRange";
import Button from "./Button";
import useObserve from "../../../util/useObserve";
import {navigateTo} from "../../../store/module/router";
import {CurrentPickCityPointType} from "../../../store/module/cities";
import {useAppStoreSelector} from "../../../store";

type OperationInterfacePropsType = {
  className?: string
}
const OperationInterface = (props: OperationInterfacePropsType): React.ReactElement => {
  const [, dispatcher] = useObserve( useAppStoreSelector().city.currentPickCityPoint )
  const redirectPickCityPage = () => navigateTo('/pages/index/city/index')
  const handleClickStartCity = () => {
    dispatcher.next(CurrentPickCityPointType.START)
    redirectPickCityPage()
  }
  const handleClickEndCity = () => {
    dispatcher.next(CurrentPickCityPointType.END)
    redirectPickCityPage()
  }
  const [startCity] = useObserve( useAppStoreSelector().city.startCity )
  const [endCity] = useObserve( useAppStoreSelector().city.endCity )
  const [isForeignCity] = useObserve( useAppStoreSelector().city.isForeignCityObserve )

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
