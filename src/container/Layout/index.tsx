import {View} from "@tarojs/components";
import {ReactElement, useState} from "react";
// @ts-ignore
import style from "./style.module.scss";
import useObserve from "../../util/useObserve";
import {navigateToLoginOrRegister, TabBarType as CurrentTabBarType} from "../../store/module/router";
import {store, useAppStoreSelector} from "../../store";
import * as taro from "@tarojs/taro";
import Message from "../../components/Message";
import * as React from "react";


export type LayoutPropsType = {
  tabs: TabBarType[]
}
export type TabBarType = {name: string; icon: string; type: CurrentTabBarType, element: ReactElement, navTitle: string; isPermission?: boolean}
const Layout = (props: LayoutPropsType): React.ReactElement => {
  const [currentTabBar, tabBarDispatcher] = useObserve( useAppStoreSelector().currentTab )
  const [me] = useObserve(useAppStoreSelector().me)
  const [permissionIndex, setPermissionIndex] = useState<TabBarType>(null)
  if (!me.isNewUser && permissionIndex) {
    tabBarDispatcher.next(permissionIndex.type)
    setPermissionIndex(null)
  }
  const handleChangeTabBar = ( pickTabBar: TabBarType) => {
    if (pickTabBar.isPermission && store.me.value.isNewUser) {
        setPermissionIndex(pickTabBar)
        navigateToLoginOrRegister()
    }else {
      tabBarDispatcher.next(pickTabBar.type)
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
          <View className={[ tabBar.icon, style.icon, ].join(' ')} />
          <View>{tabBar.name}</View>
        </View>
      ))}

    </View>
  </View>)
}

export default Layout
