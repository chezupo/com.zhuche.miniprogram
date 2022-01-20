// @ts-ignore
import React, {useReducer} from "react";
import {View} from "@tarojs/components";
// @ts-ignore
import style from "./style.module.scss";
import Search from "./Search";
// @ts-ignore

export enum SearchStateType {
  LIST,
  SEARCH
}
const Stories = (): React.ReactElement => {
  const [searchState, dispatch] = useReducer((state): SearchStateType => {
    if (state === SearchStateType.LIST)  return SearchStateType.SEARCH
    else return SearchStateType.LIST
  }, SearchStateType.LIST)
  return (
    <View className={style.main}>
      <View className={style.header}>
        <Search searchState={searchState} onChangeState={dispatch}/>
      </View>
      <View className={style.body}>body</View>
    </View>
  )
}

export default Stories;
