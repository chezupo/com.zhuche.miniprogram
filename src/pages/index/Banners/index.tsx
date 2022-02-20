import * as React from "react";
import {Image, Swiper, SwiperItem} from "@tarojs/components";
// @ts-ignore
import style from './style.module.scss'
import {BannerType} from "../../../store/module/banner";
import {navigateTo} from "../../../store/module/router";
import {useAppStoreSelector} from "../../../store";
import useObserve from "../../../util/useObserve";

type SwiperRenderPropsType = {
  className?: string
}
const Banners = (props: SwiperRenderPropsType): React.ReactElement => {
  const[banners] = useObserve(useAppStoreSelector().banners)
  const handleRedirectBannerDetail = (currentBanner:BannerType) => {
    navigateTo(`/pages/bannerDetail/index?id=${currentBanner.id}`)
  }

  return (
    <Swiper
      className={props.className ? props.className : ''}
      indicatorColor='#999'
      indicatorActiveColor='#333'
      circular
      autoplay
    >
      {banners.map((banner, key) => (
        <SwiperItem key={key}>
          <Image src={banner.imgKey} className={style.image}
            onClick={() => handleRedirectBannerDetail(banner)}
          />
        </SwiperItem>
      ))}

    </Swiper>
  )
}

export default Banners
