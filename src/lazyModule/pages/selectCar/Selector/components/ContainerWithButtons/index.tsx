import React from "react";
import {View} from "@tarojs/components";
import Button from "../../../../../../components/Button";
// @ts-ignore
import style from "./style.module.scss";

type ButtonsRenderPropsType = {
  onCancel?: () => void
  onConfirm?: () => void
  children: React.ReactNode | React.ReactChildren
  className?: string

}
const ContainerWithButtons: React.FC<ButtonsRenderPropsType> = props => {
  return (<>
    <View className={[style.main, props.className || ''].join(' ')}>
      {props.children}
      <View className={style.buttonWrapper}>
        <Button onClick={() => props.onCancel && props.onCancel()}>清空</Button>
        <Button className={style.conformButton} onClick={() => props.onConfirm && props.onConfirm()}>确定</Button>
      </View>
    </View>

  </>)
}

export default ContainerWithButtons
