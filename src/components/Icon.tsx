import {ITouchEvent, View} from "@tarojs/components";
import * as React from "react";
import {CSSProperties} from "react";

export type IconType = 'close' |
  'right' |
  'notice' |
  'tousupingjia' |
  'engine' |
  'volume' |
  'seat' |
  'power' |
  'displacement' |
  'user' |
  'wechat' |
  'weizhangshigujilu' |
  'lianxiren' |
  'shenfenzheng' |
  'kaojiazhao' |
  'car-o' |
  'order' |
  'users' |
  'insurance' |
  'help' |
  'exclamation-mark' |
  'coupon' |
  'copy' |
  'phone' |
  'navigation' |
  'train' |
  'airport'|
  'delete'|
  'edit' |
  'transaction' |
  'star-empty' |
  'start' |
  'time' |
  'location' |
  'distance' |
  'promotion' |
  'backOfIdCard' |
  'idCardFrontal' |
  'DriverLicense'

type IconPropsType = {
  value: IconType
  className?: string
  onClick?: (evnet: ITouchEvent) => void
  style?: CSSProperties | string
}
const Icon: React.FC<IconPropsType> = props => {
  return (
    <View
      className={[
        'iconfont',
        `icon-${props.value}`,
        props.className || ''
      ].join(' ')}
      onClick={e => props.onClick && props.onClick(e)}
      {...(props.style ? {style: props.style} : {})}
    />
  )
}

export default Icon
