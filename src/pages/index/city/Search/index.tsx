// @ts-ignore
import React, {useReducer} from "react";
import {Input, View} from "@tarojs/components";
import style from "./style.module.scss";
import {AtIcon} from 'taro-ui'

const SearchIcon = () => (<AtIcon value='search' size='15' className={style.icon} />)

const InputRender = (): React.ReactElement => {
  return (
    <View className={style.inputRender}>
      <View className={style.iconWrapper}>
        <SearchIcon />
      </View>
      <Input
        className={style.input}
        placeholder='搜索'
        placeholderStyle='font-size:13px'
        focus
      />
    </View>
  )

}

const Search = (): React.ReactElement => {
  const [cancel, dispatcher] = useReducer((state): boolean => !state , true);
  const PlaceholderModel = () => (
    <View
      className={style.placeholderWrapper}
      onClick={dispatcher}
    >
      <View className={style.container}>
        <SearchIcon />
        <View>搜索</View>
      </View>
    </View>
  )
  const InputModel = () => (
    <View className={style.main}>
      <InputRender />
      <View className={style.cancel} onClick={dispatcher}>取消</View>
    </View>
  )

  return (
    <>
      {cancel && <PlaceholderModel />}
      {!cancel && <InputModel />}
    </>
  )

}

export default Search;
