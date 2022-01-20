// @ts-ignore
import style from "./style.module.scss"
import {Input, View} from "@tarojs/components";
import * as React from "react";


type InputRenderPropsType = { onChangeState: () => void }
type SearchPropsType = { isSearchState: boolean } & InputRenderPropsType

const SearchInputRender = ({onChangeState}: InputRenderPropsType): React.ReactElement => {
  return (
    <>
      <View className={style.searchSpinner} >
        <Input focus placeholder='搜索城市或景点' className={style.input}/>
      </View>
      <View className={style.button} onClick={onChangeState}>取消</View>
    </>
  )
}

const SearchSpinnerRender = (props: InputRenderPropsType): React.ReactElement => (
  <>
    <View className={style.searchSpinner} >
      <View className={['at-icon', ' at-icon-search', style.icon].join(' ')}/>
      <View className={style.title} onClick={props.onChangeState}>输入景点、地址寻找附近门店</View>
    </View>
    <View className={style.button} >地图</View>
  </>
)
const Search = (props: SearchPropsType): React.ReactElement=> {
  const Render = props.isSearchState ?
    <SearchInputRender onChangeState={props.onChangeState} />
    : <SearchSpinnerRender onChangeState={props.onChangeState} />

  return (
    <View className={style.main}>
      <View className={style.container}>
        {Render}
      </View>
    </View>
  )
}

export default Search;
