import * as React from "react";
import {ITouchEvent, View} from "@tarojs/components";
// @ts-ignore
import style from './style.module.scss'

type ButtonPropsType = {
  children: React.ReactChildren | React.ReactNode | React.ReactDOM
  className?: string
  type?: 'primary'
  isDisable?: boolean
  onClick?: (event: ITouchEvent) => void
}
const Button: React.FC<ButtonPropsType> = (props) => {
  const handleClick = (e: ITouchEvent) => {
    props.onClick && !props.isDisable && props.onClick(e)
  }

  return (
    <View
      onClick={handleClick}
      className={[
        style.button,
        props.className || '',
        props.type && props.type === 'primary' ? style.primary : '',
        props.isDisable ? style.disable : ''
      ].join(' ')}
    >
      {props.children}
    </View>
  )
}


export default Button

