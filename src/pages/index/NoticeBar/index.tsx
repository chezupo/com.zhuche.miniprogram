import {AtModal, AtModalAction, AtModalContent, AtModalHeader, AtNoticebar} from "taro-ui";
import * as React from "react";
import {useReducer} from "react";
import {Button} from "@tarojs/components";
import useObserve from "../../../util/useObserve";
// @ts-ignore
import style from './style.module.scss'
import {useAppStoreSelector} from "../../../store";

const NoticeBar = (): React.ReactElement => {
  const [commonData, commonDispatcher] = useObserve( useAppStoreSelector().commonData )
  const [isShowNoticeModel, isShowNoticeModelDispatch] = useReducer((state): boolean => !state , false)
  const handleGoToMore = (): void => {
    isShowNoticeModelDispatch()
  }
  const handleClose = ():void =>{
    commonDispatcher.next({...commonData, notice: {...commonData.notice, isShow: false,}} )
  }
  return (
    <>
      {commonData.notice.isShow &&
        <AtNoticebar
          icon='volume-plus'
          close
          single
          showMore
          onGotoMore={handleGoToMore}
          onClose={handleClose}
          className={style.noticeBar}
        >
          {commonData.notice.content}
        </AtNoticebar>
      }
      <AtModal isOpened={isShowNoticeModel}>
        <AtModalHeader>公告</AtModalHeader>
        <AtModalContent>
          {commonData.notice.content}
        </AtModalContent>
        <AtModalAction>
          <Button onClick={isShowNoticeModelDispatch}>取消</Button>
          <Button onClick={isShowNoticeModelDispatch}>确定</Button>
        </AtModalAction>
      </AtModal>
    </>
  )
}

export default NoticeBar
