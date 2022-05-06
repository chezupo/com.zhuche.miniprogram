import * as React from "react";
import {View} from "@tarojs/components";
// @ts-ignore
import style from './style.module.scss';
import {navigateToSelectCarPage} from "../../../../store/module/router";
import CommonButton from "../../../../components/Button"
import {useAppSelector} from "../../../../reduxStore";
import {messageObserve} from "../../../../store/module/message";

const Button = (): React.ReactElement => {
  const {createOrder} = useAppSelector(state => state.order)
  const handleErrorMessage = (message: string): void => {
    messageObserve.next({
      title: message,
      type: 'error',
      duration: 10000
    })
  }
  const handleSelectCar = () => {
    if ( !createOrder.startCity || !createOrder.startStore) {
      handleErrorMessage('请选择取车城市和门店')
    } else if (!createOrder.startStore) {
      handleErrorMessage('请选择取车门店')
    }else if (!createOrder.isForeignCity) {
      const {endStore, endCity} = createOrder
      if (!endCity) handleErrorMessage('请选择异地还车的城市')
      else if (!endStore) handleErrorMessage('请选择异地还车的商店')
    } else {
      navigateToSelectCarPage()
    }
  }

  return(
    <View className={style.main}>
      <CommonButton
        onClick={handleSelectCar}
        type='primary'
        className={style.button}
      >去选车</CommonButton>
    </View>
    )
}

export default Button;
