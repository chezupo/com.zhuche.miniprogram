import * as React from "react";
import {Image, Swiper, SwiperItem} from "@tarojs/components";
// @ts-ignore
import style from './style.module.scss'

type SwiperRenderPropsType = {
  className?: string
}
const Banners = (props: SwiperRenderPropsType): React.ReactElement => {
  const banners: {id: number; imageUrl: string; target: string}[] = [
    {id: 1, imageUrl: 'https://zhuche-a1001.qiniu.wuchuheng.com/banner1.jpeg', target: '' },
    {id: 2, imageUrl: 'https://zhuche-a1001.qiniu.wuchuheng.com/banner2.jpeg', target: '' }
  ]

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
          <Image src={banner.imageUrl} className={style.image} />
        </SwiperItem>
      ))}

    </Swiper>
  )
}

export default Banners
