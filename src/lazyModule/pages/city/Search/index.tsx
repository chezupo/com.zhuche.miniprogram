import * as React from "react";
import {useState} from "react";
// @ts-ignore
import {Input, View} from "@tarojs/components";
// eslint-disable-next-line import/first
import {AtIcon} from 'taro-ui'
// @ts-ignore
import style from "./style.module.scss";

const SearchIcon = () => (<AtIcon value='search' size='15' className={style.icon} />)

const InputRender:React.FC<SearchPropsType> = (props) => {
  const handleChange = (e) => {
    const value = e.currentTarget.value as string
    props.onChange(value)
  }

  return (
    <View className={style.inputRender}>
      <View className={style.iconWrapper}>
        <SearchIcon />
      </View>
      <Input
        onInput={handleChange}
        value={props.value}
        className={style.input}
        placeholder='搜索'
        placeholderStyle='font-size:13px'
        focus
      />
    </View>
  )
}

export type SearchPropsType = {
  value: string
  onChange: (value: string) => void
  onCancel?: () => void
}
const Search: React.FC<SearchPropsType>  = (props): React.ReactElement => {
  const [searchMode, setSearchMode] = useState<boolean>(false)

  const PlaceholderModel = () => (
    <View
      className={style.placeholderWrapper}
      onClick={() => setSearchMode(!searchMode)}
    >
      <View className={style.container}>
        <SearchIcon />
        <View>搜索</View>
      </View>
    </View>
  )
  const handleCancel = () => {
    setSearchMode(false)
    props.onCancel()
  }
  const InputModel = () => (
    <View className={style.main}>
      <InputRender  onChange={props.onChange} value={props.value} />
      <View className={style.cancel} onClick={handleCancel}>取消</View>
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
