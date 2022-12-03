import React from "preact/compat";
import {View} from "@tarojs/components";
import {CSSProperties, LegacyRef, ReactChildren, ReactNode, useEffect, useRef} from "react";
// @ts-ignore
import style from './style.module.scss';

type MenuContainerPropsType = {
  children: ReactChildren | ReactNode
  menuBar: ReactChildren | ReactNode
  bodyClassName?: string
  menuBarClassName?: string
  bodyHeight?: number
}
const MenuContainer: React.FC<MenuContainerPropsType> = props => {
  const {bodyHeight} = props
  const [bodyStyle, bottomStyle]: [CSSProperties, CSSProperties] = bodyHeight ? [{height: `${bodyHeight}vh`}, {height: `${100 - bodyHeight}vh`}] : [{}, {}]
  return (<>
    <View
      ref={props.ref}
      style={bodyStyle}
      className={
      [
        style.bodyWrapper,
        props.bodyClassName || ''
      ].join(' ')
    }
    >
      {props.children}
    </View>
    <View
      style={bottomStyle}
      className={[ style.menuWrapper, props.menuBarClassName ].join(' ')}
    >
      {props.menuBar}
    </View>
  </>)
}

export default MenuContainer
