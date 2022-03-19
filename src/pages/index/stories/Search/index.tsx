import {Input, View} from "@tarojs/components";
import * as React from "react";
// @ts-ignore
import style from "./style.module.scss"


type SearchInputRenderPropsType = {
  onCancel: () => void
  onChange: (value: string) => void
  value: string
}
const SearchInputRender: React.FC<SearchInputRenderPropsType> = ({onCancel, onChange, value}) => {
  return (
    <>
      <View className={style.searchSpinner} >
        <Input
          focus
          placeholder='搜索城市或景点'
          className={style.input}
          value={value}
          onInput={(e) => onChange(e.detail.value)}
        />
      </View>
      <View className={style.button} onClick={onCancel}>
        取消
      </View>
    </>
  )
}

type SearchSpinnerRenderPropsType = {
  onChangeModel: (newSearchModel: boolean) => void
  onClickMapButton: () => void
}
const SearchSpinnerRender: React.FC<SearchSpinnerRenderPropsType> = (props) => (
  <>
    <View className={style.searchSpinner} onClick={() => props.onChangeModel(true)} >
      <View className={['at-icon', ' at-icon-search', style.icon].join(' ')} />
      <View className={style.title}>输入景点、地址寻找附近门店</View>
    </View>
    <View className={style.button} onClick={() => props.onClickMapButton()}>地图</View>
  </>
)

type SearchPropsType = {
  isSearchMode: boolean
} & SearchSpinnerRenderPropsType &  SearchInputRenderPropsType
const Search = (props: SearchPropsType): React.ReactElement=> {
  return (
    <View className={style.main}>
      <View className={style.container}>
        {
          props.isSearchMode ?
            <SearchInputRender value={props.value} onCancel={props.onCancel} onChange={props.onChange} /> :
            <SearchSpinnerRender onChangeModel={props.onChangeModel} onClickMapButton={props.onClickMapButton} />
        }
      </View>
    </View>
  )
}

export default Search;
