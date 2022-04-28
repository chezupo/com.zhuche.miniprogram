import React from "preact/compat";
import {View, Text} from "@tarojs/components";
// @ts-ignore
import style from './style.module.scss'
import LineRender from "../components/LineRender";
import Icon from "../../../../../components/Icon";
import ItemRender from "./ItemRender";

const CommandRender: React.FC = () => {
  return (
    <View className={style.main}>
      <View className={style.header}>
        <View>门店评价<Text className={style.count}>(201)</Text> </View>
        <Icon value='right' className={style.icon} />
      </View>
      <LineRender />
      <View className={style.commandWrapper}>
        { Array.from(Array(8)).map((_, i) => <ItemRender key={i} /> ) }
      </View>
    </View>
  )
}

export default CommandRender
