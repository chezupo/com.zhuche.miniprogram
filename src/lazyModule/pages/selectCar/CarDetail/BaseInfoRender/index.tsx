import React from 'react';
import {Image, View} from "@tarojs/components";
// @ts-ignore
import style from "./style.module.scss";

type BaseInfoRenderPropsType = {
  tags: string[]
  name: string
  cover: string

}
const BaseInfoRender: React.FC<BaseInfoRenderPropsType> = props => {
  return (
    <View className={style.baseInfoWrapper}>
      <View className={style.imageContainer}>
        <Image src={props.cover} />
        <View className={style.tag}>*图片仅供参考，以门店提供实物为准</View>
      </View>
      <View className={style.nameWrapper}>
        <View className={style.key}>{props.key}</View>
        <View className={style.tags}>
          {
            props.tags.map((tag, i) => (
              <View className={style.tag} key={i}>{tag}</View>
            ))
          }
        </View>
      </View>
    </View>
  )
}

export default BaseInfoRender
