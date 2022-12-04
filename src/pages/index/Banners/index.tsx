import * as React from "react";
import { Image, Swiper, SwiperItem } from "@tarojs/components";
import style from "./style.module.scss";
import { BannerType } from "../../../store/module/banner";
import { navigateTo } from "../../../store/module/router";
import { useAppSelector } from "../../../reduxStore";

type SwiperRenderPropsType = {
  className?: string;
};
const Banners = (props: SwiperRenderPropsType): React.ReactElement => {
  const banners = useAppSelector(state => state.banner.banners);
  const handleRedirectBannerDetail = (currentBanner: BannerType) => {
    navigateTo(`/pages/bannerDetail/index?id=${currentBanner.id}`);
  };

  return (
    <Swiper
      className={props.className ? props.className : ""}
      indicatorColor="#999"
      indicatorActiveColor="#333"
      circular
      autoplay
    >
      {banners.map((banner, key) => (
        <SwiperItem key={key}>
          <Image
            src={`${banner.prefixUrl}/${banner.imgKey}`}
            className={style.image}
            onClick={() => handleRedirectBannerDetail(banner)}
          />
        </SwiperItem>
      ))}
    </Swiper>
  );
};

export default Banners;
