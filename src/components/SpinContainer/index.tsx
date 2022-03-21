import {ReactNode} from "react";
import * as React from "preact/compat";
import {ITouchEvent, View} from "@tarojs/components";
import style from './style.module.scss'

type SpinContainerPropsType = {
  children:  ReactNode | ReactNode[]
  onClick?: (e: ITouchEvent) => void
}
const SpinContainer: React.FC<SpinContainerPropsType> = props => {
  return (
    <View
      className={style.spinContainer}
      onClick={e => props.onClick && props.onClick(e)}
    >{props.children}</View>
  )
}

export default SpinContainer
