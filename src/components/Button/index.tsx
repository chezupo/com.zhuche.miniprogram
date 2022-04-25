import * as React from "react";
import {Button as TaroButton, ITouchEvent} from "@tarojs/components";
import {ButtonProps} from "@tarojs/components/types/Button";
// @ts-ignore
import style from './style.module.scss'

type ButtonPropsType = {
  children: React.ReactChildren | React.ReactNode | React.ReactDOM
  className?: string
  type?: 'primary'
  isDisable?: boolean
  onClick?: (event: ITouchEvent) => void
} & ButtonProps
const Button: React.FC<ButtonPropsType> = ({children, className, type, isDisable, onClick, ...props}) => {

  const handleClick = (e: ITouchEvent) => {
    onClick && !isDisable && onClick(e)
  }

  return (
    <TaroButton
      onClick={handleClick}
      className={[
        style.button,
        className || '',
        type && type === 'primary' ? style.primary : '',
        isDisable ? style.disable : ''
      ].join(' ')}
      {...props}
    >
      {children}
    </TaroButton>
  )
}


export default Button

