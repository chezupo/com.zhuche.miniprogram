import taro from "@tarojs/taro";
import * as React from "react";
import {View} from "@tarojs/components";
// @ts-ignore
import style from "./style.module.scss"
import useObserve from "../../../util/useObserve";
import {useAppStoreSelector} from "../../../store";
import {useAppDispatch} from "../../../reduxStore";
import {logout} from "../../../reduxStore/module/me";

const Logout = (): React.ReactElement => {
  const [,messageObserve] = useObserve(useAppStoreSelector().message)
  const dispatch = useAppDispatch()
  const handleLogout = async (): Promise<void> => {
    const res = await taro.showModal({
      title: '退出',
      cancelText: '取消',
      confirmText: '确定',
      content: '您是否要退出登录',
    })
    if (res.confirm) {
      dispatch(logout())
      messageObserve.next({
        title: '您已退出登录',
        type: "error"
      })
    }
  }

  return (
    <>
      <View className={style.main} onClick={() => handleLogout()} >
        <View className={style.button}>退出登录</View>
      </View>
      {/*// todo 用户自己写的 actionShell会更高级一点*/}
      {/*<AtActionSheet*/}
      {/*  isOpened={isOpenPanel}*/}
      {/*  cancelText='取消'*/}
      {/*  title='您是否要退出登录？'*/}
      {/*  onCancel={isOpenPanelDispatcher}*/}
      {/*>*/}
      {/*  <AtActionSheetItem*/}
      {/*    onClick={handleLogout}*/}
      {/*  >确定</AtActionSheetItem>*/}
      {/*</AtActionSheet>*/}
    </>
  )
}

export default Logout
