import * as React from "react";
import {View} from "@tarojs/components";
// @ts-ignore
import style from './style.module.scss';
import {navigateToSelectCarPage} from "../../../../store/module/router";
import CommonButton from "../../../../components/Button"

const Button = (): React.ReactElement => {
  const handleSelectCar = () => navigateToSelectCarPage()

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
