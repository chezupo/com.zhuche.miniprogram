import * as React from "react";
import {useRef, useState} from "react";
// @ts-ignore
import style from './style.module.scss'
import {View} from "@tarojs/components";
import Icon from "../../../components/Icon";
import * as Taro from "@tarojs/taro";

const NoticeBar = (): React.ReactElement => {
  const [isVisitable, setIsVisitable] = useState<boolean>(true)
  const  contentRef = useRef()
  const content: string = 'hello1 hello2 hello3 hello4 hello5 hello6 hello7 hello8 hello9 hello10 hello11 hello12 hello13 hello14'
 const handleShowDetail = (): void => {
    Taro.showModal({ title: '消息公告', content })
 }

  return (
    <>
      {
        isVisitable && (
          <view className={style.main}>
            <Icon value='close' className={style.closeIcon} onClick={() => setIsVisitable(false) } />
            <Icon value='notice' className={style.noticeIcon} />
            <View
              className={style.content}
              ref={contentRef}
              onClick={handleShowDetail}
            >
              {content}
            </View>
            <view
              className={style.more}
              onClick={handleShowDetail}
            >
              查看详情<Icon value='right' className={style.rightIcon} />
            </view>
          </view>
        )
      }
    </>
  )
}

export default NoticeBar
