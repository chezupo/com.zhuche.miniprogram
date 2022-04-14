import React from "react";
import {View} from "@tarojs/components";
// @ts-ignore
import style from "./style.module.scss";

type CarContainerPropsType = {
  children: React.ReactChildren | React.ReactNode
  className?: string
}
const Container: React.FC<CarContainerPropsType> = props => {
  return (
    <View className={[style.main, props.className || ''].join(' ')}>
      {props.children}
    </View>
  )
}

export default Container
