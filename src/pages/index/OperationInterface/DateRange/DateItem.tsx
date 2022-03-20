import * as React from "react";
import {Picker, View} from "@tarojs/components";
import style from "./style.module.scss";

type DateItemPropsType = {
  className?: string
  onClick: () => void
}
const DateItem: React.FC<DateItemPropsType> = (props) => {
  let allClassName: string = props.className ? [props.className].join(' ') : '';
  allClassName += ` ${style.dateItem}`
  const range: {label: string; value: string}[][] = [
    [{label:"北京",value:"1"},{label:"天津",value:"2"},],
    [{label:"北京市",value:"1-1"}]
  ]

  return (
    <Picker
      mode='multiSelector'
      range={range}
      rangeKey='label'
      value={['北京', '北京市']}
      onChange={() => {}}
    >
      <View
        className={allClassName}
      >
        <View>01月18日</View>
        <View className={style.weekTime}>星期二 10:00</View>
      </View>
    </Picker>
  )
}

export default DateItem
