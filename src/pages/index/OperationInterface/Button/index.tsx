import * as React from "react";
import {AtButton} from "taro-ui";
import {View} from "@tarojs/components";
// @ts-ignore
import style from './style.module.scss';
import {navigateTo, navigateToSelectCarPage} from "../../../../store/module/router";

const Button = (): React.ReactElement => {
  const handleSelectCar = () => navigateToSelectCarPage()

  return(
    <View className={style.main}>
      <AtButton
        onClick={handleSelectCar}
        type='primary'
        circle
        className={style.button}
      >去选车</AtButton>
    </View>
    )
}

export default Button;
