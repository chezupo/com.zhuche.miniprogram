import {View} from "@tarojs/components";
import * as taro from "@tarojs/taro";
import * as React from "react";
import {ReactElement, useState} from "react";
import {navigateToLoginOrRegister} from "../../store/module/router";
import Message from "../../components/Message";
import {useAppDispatch, useAppSelector} from "../../reduxStore";
// @ts-ignore
import style from "./style.module.scss";
import {setActiveTab, TabBarType as LayoutTabBarType} from "../../reduxStore/module/layout";

export type LayoutPropsType = {
  tabs: TabBarType[]
}
export type TabBarType = {
  name: string
  icon: React.ReactElement
  type: LayoutTabBarType
  element: ReactElement
  navTitle: string
  isPermission?: boolean
}

const Layout = (props: LayoutPropsType): React.ReactElement => {
  const dispatch = useAppDispatch()
  const currentTabBar = useAppSelector(state => state.layout.activeTab)
  const me = useAppSelector(state => state.me)
  const [permissionIndex, setPermissionIndex] = useState<TabBarType>(null)
  if (!me.data?.isNewUser && permissionIndex) {
    dispatch(setActiveTab(permissionIndex.type))
    setPermissionIndex(null)
  }
  const handleChangeTabBar = ( pickTabBar: TabBarType) => {
    if (pickTabBar.isPermission && me.data?.isNewUser) {
        setPermissionIndex(pickTabBar)
        navigateToLoginOrRegister()
    }else {
      dispatch(setActiveTab(pickTabBar.type))
      setPermissionIndex(null)
    }
  }
  const index = props.tabs.findIndex(i => i.type === currentTabBar)
  taro.setNavigationBarTitle({ title: props.tabs[index].navTitle })

  return (<View className={style.main}>
    <Message />
    <View className={style.container}>
      {props.tabs[index].element}
    </View>

    <View className={style.tabBar} style={{ gridTemplateColumns: `repeat(${props.tabs.length}, 1fr)` }} >

      {props.tabs.map((tabBar, key) => (
        <View
          className={[
            style.tabBarItemWrapper,
            currentTabBar === tabBar.type ? style.active : ''
          ].join(' ')}
          key={key}
          onClick={() => handleChangeTabBar(tabBar)}
        >
          {tabBar.icon}
          <View>{tabBar.name}</View>
        </View>
      ))}

    </View>
  </View>)
}

export default Layout
