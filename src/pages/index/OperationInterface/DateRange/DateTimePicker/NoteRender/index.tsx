import * as React from "react";
import {View} from "@tarojs/components";
import style from "./style.module.scss"

const NoteItemRender: React.FC = () => {
  return (
    <View className={style.noteWrapper}>
      <View className={style.month}>3月22日</View>
      <View className={style.week}>星期二 00:00</View>
    </View>
  )
}

const NoteRender: React.FC = () => {
  return (
    <View className={style.main}>
      <NoteItemRender />
      <View> -- </View>
      <NoteItemRender />
    </View>
  )
}

export default NoteRender
