import React from "react";
import {AtButton} from "taro-ui";
import {View} from "@tarojs/components";
import style from "./style.module.scss";

const Button = (): React.ReactElement => {
  return(
    <View className={style.main}>
      <AtButton
        type='primary'
        circle
        className={style.button}
      >去选车</AtButton>
    </View>
    )
}

export default Button;
