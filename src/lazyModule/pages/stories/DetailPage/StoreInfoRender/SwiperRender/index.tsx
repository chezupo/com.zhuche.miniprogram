import React from "preact/compat";
import {Image, Swiper, SwiperItem} from "@tarojs/components";
import {ReactNode} from "react";
// @ts-ignore
import style from './style.module.scss'
import {GuidType} from "../../../../../../typings";

type SwiperRenderPropsType = {
  images: GuidType[]
}
const SwiperRender: React.FC<SwiperRenderPropsType> = ({images}) => {
  const dom: ReactNode[] = []
  let tmpDom: ReactNode[] = []
  images.forEach((item, index) => {
    tmpDom.push(
      <Image
        key={item.id}
        src={`${item.prefixUrl}/${item.imgKey}`}
        className={style.image}
        mode='scaleToFill'
      />
    )
    if ((index + 1) % 3 === 0) {
      dom.push(
        <SwiperItem  className={style.itemWrapper}>
          {tmpDom}
        </SwiperItem>
      )
      tmpDom = []
    } else if (index + 1 === images.length) {
      dom.push(
        <SwiperItem  className={style.itemWrapper}>
          {tmpDom}
        </SwiperItem>
      )
    }
  })

  return (<>
    <Swiper
      indicatorColor='#999'
      indicatorActiveColor='#333'
      circular
      displayMultipleItems={3}
    >
      {dom}
    </Swiper>
    </>)
}

export default SwiperRender
