import {AtActionSheet, AtActionSheetItem} from "taro-ui";
import * as React from "react";
import {useReducer} from "react";
import {View} from "@tarojs/components";
// @ts-ignore
import style from "./style.module.scss"
import useObserve from "../../../util/useObserve";
import {useAppStoreSelector} from "../../../store";
import {useAppDispatch} from "../../../reduxStore";
import {logout} from "../../../reduxStore/module/me";

const Logout = (): React.ReactElement => {
  const [isOpenPanel, isOpenPanelDispatcher] = useReducer((state): boolean => !state , false)
  const [,messageObserve] = useObserve(useAppStoreSelector().message)
  const dispatch = useAppDispatch()
  const handleLogout = (): void => {
    isOpenPanelDispatcher()
    dispatch(logout())
    messageObserve.next({
      title: '您已退出登录',
      type: "error"
    })
  }

  return (
    <>
      <View className={style.main} onClick={isOpenPanelDispatcher} >
        <View className={style.button}>
          退出登录
        </View>
      </View>
      <AtActionSheet
        isOpened={isOpenPanel}
        cancelText='取消'
        title='您是否要退出登录？'
        onCancel={isOpenPanelDispatcher}
      >
        <AtActionSheetItem
          onClick={handleLogout}
        >确定</AtActionSheetItem>
      </AtActionSheet>
    </>
  )
}

export default Logout
