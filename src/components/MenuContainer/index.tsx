import React from "preact/compat";
import {View} from "@tarojs/components";
import {ReactChildren, ReactNode} from "react";
// @ts-ignore
import style from './style.module.scss';

type MenuContainerPropsType = {
  children: ReactChildren | ReactNode
  menuBar: ReactChildren | ReactNode
  bodyClassName?: string
  menuBarClassName?: string
}
const MenuContainer: React.FC<MenuContainerPropsType> = props => {
  return (<>
    <View className={
      [
        style.bodyWrapper,
        props.bodyClassName || ''
      ].join(' ')
    }
    >
      {props.children}
    </View>
    <View className={[ style.menuWrapper, props.menuBarClassName ].join(' ')} >
      {props.menuBar}
    </View>
  </>)
}

export default MenuContainer
