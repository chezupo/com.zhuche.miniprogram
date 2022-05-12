import React from "preact/compat";
import taro from "@tarojs/taro";
import {useEffect, useState} from "preact/hooks";
import {Image, Swiper, SwiperItem, View} from "@tarojs/components";
// @ts-ignore
import style from './style.module.scss';
import {getPosters} from "../../../../api/poster";
import Loading from "../../../../components/Loading";
import {getMyQr} from "../../../../api/me";

type ItemRenderPropsType = {
  data: PosterItemType
  qr: string
}
const ItemRender:React.FC<ItemRenderPropsType> = props => {
  const {
    url,
    positionX,
    positionY,
  } = props.data
  const radio = 768 / 2 / 100;
  const height = 1024 / 2 / radio;
  const size = props.data.size * 50 / radio;
  const left = positionX / radio;
  const top = height - positionY / radio;

  return (
    <View
      className={style.imageContainer}
      style={{
        height: `${height}vw`,
        width: '100vw'
      }}
    >
      <Image
        src={url}
        style={{
          height: `${height}vw`,
          width: '100vw'
        }}
      />
      <Image
        src={props.qr}
        className={style.qr}
        style={{
          height: `${size}vw`,
          width: `${size}vw`,
          top: `-${top}vw`,
          left: `${left}vw`
        }}
      />
  </View>)
}
const PromotionPosterPage: React.FC = () => {
  const [data, setData] = useState<PosterItemType[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [qr, setQr] = useState<string>('')
  useEffect(() => {
    getMyQr()
      .then(res => setQr(res))
    getPosters()
      .then(res => setData(res))
      .finally(() => setLoading(false))
  }, [])
 useEffect(() => {
   taro.showModal({
     title: '请截屏然后分享给新用户挚友'
   })
 }, [])

  return (<>
    {loading && (<Loading />)}
    <Swiper className={style.main} >
      {
        data.map(item => (
          <SwiperItem key={item.id}>
            <ItemRender
              data={item}
              qr={qr}
            />
          </SwiperItem>
        ))
      }
    </Swiper>
  </>)
}

export default PromotionPosterPage
