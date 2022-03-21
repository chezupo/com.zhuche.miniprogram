import * as React from "react";
import {useRef, useState} from "react";
// @ts-ignore
import style from './style.module.scss'
import {View} from "@tarojs/components";
import Icon from "../../../components/Icon";
import * as Taro from "@tarojs/taro";
import {useAppDispatch, useAppSelector} from "../../../reduxStore";
import { setNoticeVisitable } from "../../../reduxStore/module/configuration";

const NoticeBar = (): React.ReactElement => {
  const  contentRef = useRef()
  const {config: {notice}, isShowNotice} = useAppSelector(state => state.configuration)
 const handleShowDetail = (): void => {
    Taro.showModal({ title: '消息公告', content: notice })
 }
 const dispatch = useAppDispatch()
 const handleCloseNotice = (): void => {
    dispatch(setNoticeVisitable(false))
 }

  return (
    <>
      {
        isShowNotice && notice.length > 0 && (
          <view className={style.main}>
            <Icon value='close' className={style.closeIcon} onClick={handleCloseNotice} />
            <Icon value='notice' className={style.noticeIcon} />
            <View
              className={style.content}
              ref={contentRef}
              onClick={handleShowDetail}
            >
              {notice}
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
