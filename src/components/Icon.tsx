import {ITouchEvent, View} from "@tarojs/components";
import * as React from "react";

type IconPropsType = {
  value: 'close' | 'right' | 'notice' | 'tousupingjia'
  className?: string
  onClick?: (evnet: ITouchEvent) => void
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
    />
  )
}

export default Icon
