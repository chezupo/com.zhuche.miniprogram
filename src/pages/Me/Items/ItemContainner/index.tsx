import {ReactElement} from "react";
import * as React from "react";
import {View} from "@tarojs/components";
// @ts-ignore
import style from "./style.module.scss"

export type ItemContainerType = {
  title: string
  icon: string
  noteClassName?: string
  note?: ReactElement
}
export type ItemContainerPropsType = {
  data: ItemContainerType
  onClick: (item: ItemContainerType) => void
  className?: string
}

const ItemContainer = (props: ItemContainerPropsType): React.ReactElement => {
  return (
    <View
      className={[style.itemWrapper, props.className ? props.className : ''].join(' ')}
      onClick={() => props.onClick(props.data)}
    >
      <View className={[props.data.icon, style.icon].join(' ')} />
      <View className={style.leftWrapper}>
        <View>{props.data.title}</View>
        <View className={style.noteWrapper}>
          {
            props.data.note && <View
              className={[style.subtitle, props.data.noteClassName ? props.data.noteClassName : ''].join(' ')}
            >{props.data.note}</View>
          }
          <View className={['at-icon at-icon-chevron-right', style.rightIcon].join(' ')} />
        </View>
      </View>
    </View>
  )
}

export default ItemContainer