import * as React from "react";
import {CoverImage, Text, View} from "@tarojs/components";
// @ts-ignore
import style from "./style.module.scss";
import PlayIcon from "../../../../../../components/icon/PlayIcon";
import {CarItemType} from "../../../../../../typings";

export type CarPropsType = {
  data: CarItemType
  onClick?: (car: CarItemType) => void
  onShowDetail: () => void
}
const Car  = (props: CarPropsType): React.ReactElement => {
  const handleClick = () => {
    props.onClick && props.onClick(props.data)
  }

  return (
      <View className={style.main}
        onClick={handleClick}
      >
        <View className={style.firstRowWrapper}>
          <View className={style.imageWrapper}>
            <CoverImage src={props.data.cover} className={style.image} />
            <View className={style.playIconWrapper}>
              <PlayIcon />
            </View>
          </View>
          <View className={style.leftInfoWrapper}>
            <View className={style.nameWrapper}>
              <View> {props.data.name} </View>
              {
                props.data.number && <View className={style.license}>{props.data.number.substring(0, 2)}</View>
              }
            </View>
            <View className={style.configurationWrapper}>
              {props.data.shift === 'MANUAL' ? '手动' : '自动'}{props.data.gasVolume}L/
              {props.data.seats}座/
              {props.data.type ? props.data.type : ''}
            </View>

            <View className={style.tagWrapper} >
              {props.data.tags.map((tag, key) => (
                <View className={style.tag} key={key}>{tag}</View>
              ))}
            </View>
          </View>
        </View>

        <View className={style.secondRowWrapper}>
          <View
            className={style.satisfactionWrapper}
            onClick={e => {
              e.stopPropagation();
              props.onShowDetail()
            }}
          >
            <View> <Text className={style.satisfaction}>100%</Text>满意 </View>
            <View className={style.carDetail}>
              <View>
                车辆详情
              </View>
              <View className={style.directIcon} />
            </View>
          </View>

          <View >
            <Text className={style.price}>￥</Text>
            <Text className={style.price}>{props.data.rent}</Text>
            <Text className={style.price}>/均价</Text>
          </View>
        </View>
      </View>
  )

}

export default Car
