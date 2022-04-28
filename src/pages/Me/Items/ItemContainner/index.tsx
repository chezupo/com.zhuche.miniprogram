import {ReactElement} from "react";
import * as React from "react";
import {View} from "@tarojs/components";
// @ts-ignore
import style from "./style.module.scss"

export enum ItemContainerEventType  {
  VIOLATION='违章',
  WECHAT_OFFICE='公众号',
  CONTACT='联系人',
  ID_CAR='身份证',
  DRIVER_S_LICENSE='驾驶证'
}
export type ItemContainerType = {
  title: string
  icon: React.ReactElement
  noteClassName?: string
  note?: ReactElement
  eventType: ItemContainerEventType
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
      <View className={[style.icon].join(' ')} >
        {props.data.icon}
      </View>
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
