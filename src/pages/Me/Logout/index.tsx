import {AtActionSheet, AtActionSheetItem} from "taro-ui";
import {useReducer} from "react";
import * as React from "react";
import {View} from "@tarojs/components";
// @ts-ignore
import style from "./style.module.scss"

const Logout = (): React.ReactElement => {
  const [isOpenPanel, isOpenPanelDispatcher] = useReducer((state): boolean => !state , false)
  const handleLogout = (): void => {
    isOpenPanelDispatcher()
  }

  return (
    <>
      <View className={style.main} onClick={isOpenPanelDispatcher} >
        <View className={style.button} >
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
