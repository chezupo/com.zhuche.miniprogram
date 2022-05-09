// @ts-ignore
import React from "react";
import {View} from "@tarojs/components";
// @ts-ignore
import style from './style.module.scss'
import SelectCityOrAttraction from "./SelectCityOrStore";
import DateRange from "./DateRange/DateRange";
import Button from "./Button";
import {navigateToCity, navigateToStore} from "../../../store/module/router";
import {useAppDispatch, useAppSelector} from "../../../reduxStore";
import {
  setStartCityOrEndCity,
  setStartStoreOrEndStore,
  StartCityOrEndCityType,
  StartStoreOrEndStoreType
} from "../../../reduxStore/module/order"
import {messageObserve} from "../../../store/module/message";

type OperationInterfacePropsType = {
  className?: string
}
const OperationInterface = (props: OperationInterfacePropsType): React.ReactElement => {
  const dispatch = useAppDispatch()
  const handleClickStartCity = () => {
    dispatch(setStartCityOrEndCity(StartCityOrEndCityType.START))
    navigateToCity()
  }
  const handleClickEndCity = () => {
    dispatch(setStartCityOrEndCity(StartCityOrEndCityType.END))
    navigateToCity()
  }
  const createOrder = useAppSelector(state => state.order.createOrder)
  const handleRedirect = (cityType:CityType | null, setStartStoreOrStoreCity: StartStoreOrEndStoreType) => {
    if (cityType === null) {
      messageObserve.next({type: 'error', title: '请先选择城市'})
    } else {
      dispatch(setStartStoreOrEndStore(setStartStoreOrStoreCity))
      navigateToStore()
    }
  }
  const handleClickStartStore = () => {
    if (!createOrder.startCity) {
      messageObserve.next({type: 'error', title: '请先选择取车的城市'})
    } else {
      handleRedirect(createOrder.startCity, StartStoreOrEndStoreType.START)
    }
  }
  const handleClickEndStore = () => {
    if (!createOrder.endCity) {
      messageObserve.next({type: 'error', title: '请先选择还车的城市'})
    } else {
      handleRedirect(createOrder.endCity, StartStoreOrEndStoreType.END)
    }
  }

  return (
    <View className={[style.main, props.className ? props.className : ''].join(' ')}>
      <View className={style.container}>
        <SelectCityOrAttraction
          title='取车地点'
          visitButton
          onClickCity={() => handleClickStartCity()}
          onClickStore={handleClickStartStore}
          cityName={createOrder.startCity?.name || ''}
          storeName={createOrder.startStore?.name ? `${createOrder.startStore?.name}${createOrder.startStore.mark ? `(${createOrder.startStore.mark})` : ''}` : ''}
        />
        {
          createOrder.isForeignCity && <SelectCityOrAttraction
            onClickStore={handleClickEndStore}
            title='还车地点'
            pointColor='#405DFF'
            onClickCity={() => handleClickEndCity()}
            cityName={createOrder.endCity?.name || ''}
            storeName={createOrder.endStore?.name ? `${createOrder.endStore?.name}${createOrder.endStore.mark ? `(${createOrder.endStore.mark})` : ''}` : ''}
          />
        }
        <DateRange
          starTime={new Date(createOrder.starTime)}
          endTime={new Date(createOrder.endTime)}
        />
        <Button />
      </View>
    </View>
    )

}

export default OperationInterface;
