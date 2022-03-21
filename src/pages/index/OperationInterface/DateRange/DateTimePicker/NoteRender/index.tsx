import * as React from "react";
import {View} from "@tarojs/components";
import style from "./style.module.scss"

type NoteItemRenderPropsType = {
  time?: Date
  subtitleTextAliceRight?: boolean
}
const NoteItemRender: React.FC<NoteItemRenderPropsType> = (props) => {
  const formatNumber = (n: number): string => {
    return n < 9 ? `0${n}` : `${n}`
  }
  const dayMapStr: Record<number, string> = {
    0: '星期日',
    1: '星期一',
    2: '星期二',
    3: '星期三',
    4: '星期四',
    5: '星期五',
    6: '星期六',
  }
  return (
    <View className={style.noteWrapper}>
      <View className={style.month}>
        {props.time && <>{props.time.getMonth() + 1}月{props.time.getDate()}日</>}
        {!props.time && (<>还车日期</>)}
      </View>
      <View className={[style.week, props.subtitleTextAliceRight ? style.textAliceRight : '' ].join(' ')}>
        {props.time && <> {dayMapStr[props.time.getDay()]} {`${ formatNumber(props.time.getHours())}:${formatNumber( props.time.getMinutes())}`} </>}
        {!props.time && (<>请选择</>)}
      </View>
    </View>
  )
}

const RightDirect: React.FC = (props) => {
  return (
      <View className={style.rightDirect}>
          <View  className={style.line} />
          <View className={style.triangle} />
      </View>
  )

}

export type NoteRenderPropsType = {
  startTime?: Date
  endTime?: Date
}
const NoteRender: React.FC<NoteRenderPropsType> = (props) => {
  return (
    <View className={style.main}>
      <NoteItemRender time={props.startTime} />
      <RightDirect />
      <NoteItemRender time={props.endTime} subtitleTextAliceRight />
    </View>
  )
}

export default NoteRender
