// @ts-ignore
import React, {useReducer} from "react";
import {View} from "@tarojs/components";
// @ts-ignore
import style from "./style.module.scss";
import Search from "./Search";
import List from "./List";

const Stories = (): React.ReactElement => {
  const [isSearchState, dispatch] = useReducer((state): boolean => !state, true)
  return (
    <View className={style.main}>
      <View className={style.header}>
        <Search isSearchState={isSearchState} onChangeState={dispatch}/>
      </View>
      <View className={style.body}>
        <List />
      </View>
    </View>
  )
}

export default Stories;
