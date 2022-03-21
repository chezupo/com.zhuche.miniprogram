import SpinContainer from "../../../components/SpinContainer";
import {Image, ITouchEvent, Swiper, SwiperItem, View} from "@tarojs/components";
import {noticeColor} from "../../../config/globalConfig";
import style from "./style.module.scss";
import * as React from "react";

type SwipperRenderPropsType = {
  onClose: () => void
  beginnerGuides: string[]
  onSelect: () => void
}
const SwipperRender: React.FC<SwipperRenderPropsType> = props => {
  const handleSelect = (e: ITouchEvent): void => {
    props.onSelect()
  }

  return (
    <SpinContainer onClick={e => {props.onClose()}} >
      <Swiper
        indicatorColor='#999'
        indicatorActiveColor={`${noticeColor}`}
        autoplay
        circular
        className={style.swiper}
        onClick={e => e.stopPropagation()}
      >
        {props.beginnerGuides.map((guid, key) => (
          <SwiperItem key={key}>
            <View className={style.swiperContainer}>
              <Image
                src={guid}
                className={style.image}
              />
            </View>
            {
              props.beginnerGuides.length === key + 1 && (
                <View className={style.buttonWrapper} onClick={handleSelect}>
                  <View className={style.button}>去选车</View>
                </View>
              )
            }
          </SwiperItem>
        ))}
      </Swiper>
    </SpinContainer>
  )
}

export default SwipperRender
