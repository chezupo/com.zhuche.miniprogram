import React from "preact/compat";
import {Image, Swiper, SwiperItem} from "@tarojs/components";
// @ts-ignore
import style from './style.module.scss';
import {StoreBannerType} from "../../../../../../typings";

type BannerRenderPropsType = {
  banners:StoreBannerType[]
}
const BannerRender: React.FC<BannerRenderPropsType> = props => {

  return (<>
    <Swiper
      className={style.main}
      indicatorDots
      autoplay
      indicatorColor='white'
    >
      {
        props.banners.map((item, index) => {
          return (<SwiperItem key={index}>
            <Image
              src={`${item.prefixUrl}/${item.imgKey}`}
              mode='scaleToFill'
              className={style.image}
            />
          </SwiperItem>)
        })
      }
    </Swiper>
  </>)
}

export default BannerRender
