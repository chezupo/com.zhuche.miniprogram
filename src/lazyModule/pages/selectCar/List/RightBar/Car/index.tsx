import * as React from "react";
// @ts-ignore
import style from "./style.module.scss";
// eslint-disable-next-line import/first
import {CoverImage, Text, View} from "@tarojs/components";
import PlayIcon from "../../../../../../components/icon/PlayIcon";

export type CarInfoType = {
  id: number
  cover: string
  mp4: string
  banners: string[]
  name:string
  tags: string[]
  configurations: Set<{
    name: string
    value: string
  }>
  satisfaction: number
  price: number
  license?: string
  subtitle: string
}

export type CarPropsType = {
  carInfo: CarInfoType
  onClick?: (carInfo: CarInfoType) => void
}
const Car  = (props: CarPropsType): React.ReactElement => {
  const handleClick = () => {
    props.onClick && props.onClick(props.carInfo)
  }

  return (
      <View className={style.main}
        onClick={handleClick}
      >
        <View className={style.firstRowWrapper}>
          <View className={style.imageWrapper}>
            <CoverImage src={props.carInfo.cover} className={style.image} />
            <View className={style.playIconWrapper}>
              <PlayIcon />
            </View>
          </View>
          <View className={style.leftInfoWrapper}>
            <View className={style.nameWrapper}>
              <View> {props.carInfo.name} </View>
              {
                props.carInfo.license && <View className={style.license}>{props.carInfo.license}</View>
              }
            </View>
            <View className={style.configurationWrapper}>{props.carInfo.subtitle}</View>

            <View className={style.tagWrapper} >
              {props.carInfo.tags.map((tag, key) => (
                <View className={style.tag} key={key}>{tag}</View>
              ))}
            </View>
          </View>
        </View>

        <View className={style.secondRowWrapper}>
          <View className={style.satisfactionWrapper}>
            <View> <Text className={style.satisfaction}>{props.carInfo.satisfaction}%</Text>满意 </View>
            <View className={style.carDetail}>
              <View>
                车辆详情
              </View>
              <View className={style.directIcon} />
            </View>
          </View>

          <View >
            <Text className={style.price}>￥</Text>
            <Text className={style.price}>{props.carInfo.price}</Text>
            <Text className={style.price}>/均价</Text>
          </View>
        </View>
      </View>
  )

}

export default Car
