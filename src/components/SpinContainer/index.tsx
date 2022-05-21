import {CSSProperties, ReactNode} from "react";
import * as React from "preact/compat";
import {ITouchEvent, View} from "@tarojs/components";
// @ts-ignore
import style from './style.module.scss'

type SpinContainerPropsType = {
  children:  ReactNode | ReactNode[]
  onClick?: (e: ITouchEvent) => void
  className?: string
  style?: CSSProperties
}
const SpinContainer: React.FC<SpinContainerPropsType> = props => {
  return (
    <View
      className={[style.spinContainer, props.className].join(' ')}
      style={props.style}
      onClick={e => props.onClick && props.onClick(e)}
    >{props.children}</View>
  )
}

export default SpinContainer
