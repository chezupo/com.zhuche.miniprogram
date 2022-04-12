import {View} from "@tarojs/components";
import * as React from "react";
import {useReducer} from "react";
import style from './style.module.scss';
import bookSvg from "../../../asesst/images/undraw_book_lover_re_rwjy.svg";
import towingSvg from "../../../asesst/images/undraw_towing_-6-yy4.svg";
import GuidContainer, {ContainerType} from "./GuidContainer";
import {AtCurtain} from "taro-ui";
import SwipperRender from "./SwipperRender";
import {useAppSelector} from "../../../reduxStore";
import taro from "@tarojs/taro";

const Guilds = (): React.ReactElement => {
  const guids: ContainerType[] = [
    {title: '新手指引', subTitle: '三步租车不用愁', svg: bookSvg, backgroundColor: '#bfdbfe'},
    {title: '道路救援', subTitle: '道路救援指南', svg: towingSvg, backgroundColor: '#d1fae5'},
  ]
  const [isOpenCurtain, isOpenCurtainDispatch] = useReducer((state): boolean => !state,false)
  const handleCloseCurtain = (): void => {
    isOpenCurtainDispatch()
  }
  const handleSelect = () => {
    isOpenCurtainDispatch()
  }

  const beginnerGuides: string[] = [
    'https://zhuche-a1001.qiniu.wuchuheng.com/guid1.png',
    'https://zhuche-a1001.qiniu.wuchuheng.com/guid2.png',
    'https://zhuche-a1001.qiniu.wuchuheng.com/guid3.png',
    'https://zhuche-a1001.qiniu.wuchuheng.com/guid5.png',
    'https://zhuche-a1001.qiniu.wuchuheng.com/guid7.png',
  ]
  const {config} = useAppSelector(state => state.configuration)
  const handleCallServicePhone = async () => {
    const res = await taro.showModal({
      title: '道路救援',
      content: '您正在拨打道路救援客服电话，是否确定呼叫?',
    })
    if (res.confirm) {
      await taro.makePhoneCall({
        phoneNumber: config.servicePhone
      })
    }
  }

  return (
    <>
      <View className={style.main}>
        <GuidContainer
          data={guids[0]}
          onClick={handleCloseCurtain}
        />
        <GuidContainer
          data={guids[1]}
          onClick={handleCallServicePhone}
        />
      </View>

      <AtCurtain
        isOpened={isOpenCurtain}
        onClose={handleCloseCurtain}
      >
        { isOpenCurtain && <SwipperRender
          onClose={handleCloseCurtain}
          onSelect={handleSelect}
          beginnerGuides={beginnerGuides}
        />}
      </AtCurtain>
    </>
  )

}
export default Guilds
