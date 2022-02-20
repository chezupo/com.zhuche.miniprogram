// @ts-ignore
import React from "react";
import {Input, View} from "@tarojs/components";
// eslint-disable-next-line import/first
import {AtIcon} from 'taro-ui'
// @ts-ignore
import style from "./style.module.scss";
import {store, useAppStoreSelector} from "../../../../store";
import useObserve from "../../../../util/useObserve";

const SearchIcon = () => (<AtIcon value='search' size='15' className={style.icon} />)

const InputRender = (): React.ReactElement => {
  const [cityName, observe] = useObserve( useAppStoreSelector().citySearch );
  const handleChange = (e): void => {
    observe.next(e.target.value)
  }

  return (
    <View className={style.inputRender}>
      <View className={style.iconWrapper}>
        <SearchIcon />
      </View>
      <Input
        onInput={handleChange}
        value={cityName}
        className={style.input}
        placeholder='搜索'
        placeholderStyle='font-size:13px'
        focus
      />
    </View>
  )
}

const Search = (): React.ReactElement => {
  const [searchMode, observe] = useObserve( store.isCitySearch )

  const PlaceholderModel = () => (
    <View
      className={style.placeholderWrapper}
      onClick={() => observe.next(!searchMode)}
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
      <View className={style.cancel} onClick={() => observe.next(!searchMode)}>取消</View>
    </View>
  )

  return (
    <>
      {!searchMode && <PlaceholderModel />}
      {searchMode && <InputModel />}
    </>
  )

}

export default Search;
