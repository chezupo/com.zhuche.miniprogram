import React from 'react';
import {Image, View} from "@tarojs/components";
// @ts-ignore
import style from "./style.module.scss";

type BaseInfoRenderPropsType = {
  data: CarItemType
}
const BaseInfoRender: React.FC<BaseInfoRenderPropsType> = props => {
  const {tags} = props.data
  return (
    <View className={style.baseInfoWrapper}>
      <View className={style.imageContainer}>
        <Image src={props.data.cover} />
        <View className={style.tag}>*图片仅供参考，以门店提供实物为准</View>
      </View>
      <View className={style.nameWrapper}>
        <View className={style.key}></View>
        <View className={style.tags}>
          {
            tags.map((tag, i) => (
              <View className={style.tag} key={i}>{tag}</View>
            ))
          }
        </View>
      </View>
    </View>
  )
}

export default BaseInfoRender
