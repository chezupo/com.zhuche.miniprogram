import {AtModal, AtModalAction, AtModalContent, AtModalHeader, AtNoticebar} from "taro-ui";
import * as React from "react";
import {useReducer} from "react";
import {Button} from "@tarojs/components";
import useObserve from "../../../util/useObserve";
import {noticeObserve} from "../../../store/notice";

const NoticeBar = (): React.ReactElement => {
  const [notice, noticeDispatcher] = useObserve(noticeObserve)
  const [isShowNoticeModel, isShowNoticeModelDispatch] = useReducer((state): boolean => !state , false)
  const handleGoToMore = (): void => {
    isShowNoticeModelDispatch()
  }
  const handleClose = ():void =>{
    noticeDispatcher.next({...notice, isShow: false})
  }
  return (
    <>
      {notice.isShow &&
        <AtNoticebar
          icon='volume-plus'
          close
          single
          showMore
          onGotoMore={handleGoToMore}
          onClose={handleClose}
        >
          {notice.content}
        </AtNoticebar>
      }
      <AtModal isOpened={isShowNoticeModel}>
        <AtModalHeader>公告</AtModalHeader>
        <AtModalContent>
          {notice.content}
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
