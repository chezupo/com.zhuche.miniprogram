import React from "preact/compat";
import {Image, Swiper, SwiperItem} from "@tarojs/components";
import {ReactNode} from "react";
// @ts-ignore
import style from './style.module.scss'
import {GuidItemType, StoreItemType} from "../../../../../../typings";
import {navigateToGuideDetailPage} from "../../../../../../store/module/router";
import {setPickUpGuides, setReturnGuides} from "../../../../../../util/guideUtil";

type SwiperRenderPropsType = {
  images: GuidItemType[]
  store: StoreItemType
}
const SwiperRender: React.FC<SwiperRenderPropsType> = ({images, store}) => {
  const dom: ReactNode[] = []
  let tmpDom: ReactNode[] = []
  const handleShowGuideDetailPage = () => {
    setPickUpGuides(store.pickupGuides)
    setReturnGuides(store.returnGuides)
    navigateToGuideDetailPage()
  }
  images.forEach((item, index) => {
    tmpDom.push(
      <Image
        onClick={handleShowGuideDetailPage}
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
