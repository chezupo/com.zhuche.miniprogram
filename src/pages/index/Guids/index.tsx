import {Image, Swiper, SwiperItem, View} from "@tarojs/components";
import * as React from "react";
import {useReducer} from "react";
import style from './style.module.scss';
import bookSvg from "../../../asesst/images/undraw_book_lover_re_rwjy.svg";
import towingSvg from "../../../asesst/images/undraw_towing_-6-yy4.svg";
import GuidContainer, {ContainerType} from "./GuidContainer";
import {AtCurtain} from "taro-ui";
import {noticeColor} from "../../../config/globalConfig";

const Guilds = (): React.ReactElement => {
  const guids: ContainerType[] = [
    {title: '新手指引', subTitle: '三步租车不用愁', svg: bookSvg, backgroundColor: '#bfdbfe'},
    {title: '道路救援', subTitle: '道路救援指南', svg: towingSvg, backgroundColor: '#d1fae5'},
  ]
  const [isOpenCurtain, isOpenCurtainDispatch] = useReducer((state): boolean => !state,false)
  const handleCloseCurtain = (): void => {
    isOpenCurtainDispatch()
  }
  const beginnerGuids: string[] = [
    'https://zhuche-a1001.qiniu.wuchuheng.com/guid1.png',
    'https://zhuche-a1001.qiniu.wuchuheng.com/guid2.png',
    'https://zhuche-a1001.qiniu.wuchuheng.com/guid3.png',
    'https://zhuche-a1001.qiniu.wuchuheng.com/guid5.png',
    'https://zhuche-a1001.qiniu.wuchuheng.com/guid7.png',
  ]

  const SwiperRender = () => (
    <Swiper
      indicatorColor='#999'
      indicatorActiveColor={`${noticeColor}`}
      autoplay
      circular
      className={style.swiper}
    >
      {beginnerGuids.map((guid, key) => (
        <SwiperItem key={key}>
          <View className={style.swiperContainer}>
            <Image
              src={guid}
              className={style.image}
            />
          </View>
          {
            beginnerGuids.length === key + 1 && (
              <View className={style.buttonWrapper} onClick={handleCloseCurtain}>
                <View className={style.button}>去选车</View>
              </View>
            )
          }
        </SwiperItem>
      ))}
    </Swiper>

  )
  return (
    <>
      <View className={style.main}>
        <GuidContainer
          data={guids[0]}
          onClick={handleCloseCurtain}
        />
        <GuidContainer
          data={guids[1]}
          onClick={() => {}}
        />
      </View>

      <AtCurtain
        isOpened={isOpenCurtain}
        onClose={handleCloseCurtain}
      >
        { isOpenCurtain && <SwiperRender />}
      </AtCurtain>
    </>
  )

}
export default Guilds
