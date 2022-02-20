// @ts-ignore
import taro from "@tarojs/taro"
import {View} from "@tarojs/components";
import {ReactElement} from "react";
// @ts-ignore
import style from "./style.module.scss";
import useObserve from "../../util/useObserve";
import {TabBarType as CurrentTabBarType} from "../../store/module/router";
import {useAppStoreSelector} from "../../store";

export type LayoutPropsType = {
  tabs: TabBarType[]
}
export type TabBarType = {name: string; icon: string; type: CurrentTabBarType, element: ReactElement, navTitle: string}
const Layout = (props: LayoutPropsType): React.ReactElement => {
  const [currentTabBar, tabBarDispatcher] = useObserve( useAppStoreSelector().currentTab )
  const handleChangeTabBar = ( pickTabBar: TabBarType) => tabBarDispatcher.next(pickTabBar.type)
  const index = props.tabs.findIndex(i => i.type === currentTabBar)
  taro.setNavigationBarTitle({ title: props.tabs[index].navTitle })

  return (<View className={style.main}>
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
