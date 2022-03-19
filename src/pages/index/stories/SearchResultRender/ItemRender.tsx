import * as React from "react";
import style from "./style.module.scss"
import {View} from "@tarojs/components";
import {AtIcon} from "taro-ui";

type ItemRenderPropsType = {
  keyword: string
  cityName: string
  areaName: string
  name: string
  address: string
  onClick?: () => void

}
const ItemRender: React.FC<ItemRenderPropsType> = (props) => {
  const html = `<span style="color: red">${props.keyword}</span>`
  const name = props.name.replace(props.keyword, html)
  const address = `${props.address.replace(props.keyword, html)}`
  const cityName = props.cityName.replace(props.keyword, html)
  const areaName = props.areaName.replace(props.keyword, html)


  return (

    <View
      className={style.itemWrapper}
      onClick={() => {
        props.onClick && props?.onClick();
      }}
    >
      <View>
        <View className={style.name} dangerouslySetInnerHTML={{__html: `${name}`}} />
        <View className={style.address} dangerouslySetInnerHTML={{__html: `${address}`}} />
      </View>
      <View className={style.cityAreaWrapper}>
        <AtIcon value='chevron-right' className={style.rightIcon} size={20} />
        <View className={style.cityArea} dangerouslySetInnerHTML={{__html: `<span>${cityName}${areaName}</span>`}} />
      </View>
    </View>
  )
}

export default ItemRender
