import {View} from "@tarojs/components";
import {ReactElement} from "react";
// @ts-ignore
import style from "./style.module.scss";
import useObserve from "../../util/useObserve";
import {currentTabBarObserve, TabBarType as CurrentTabBarType} from "../../store/router";

type LayoutPropsType = {
  tabs: ReactElement[]
}
type TabBarType = {name: string; icon: string; activeClassName: string; type: CurrentTabBarType}
const Layout = (props: LayoutPropsType): React.ReactElement => {
  const [currentTabBar, tabBarDispatcher] = useObserve(currentTabBarObserve)
  const tabBars: TabBarType[] = [
    { name: '首页', icon: 'icon icon-car-o', activeClassName: style.active, type: CurrentTabBarType.HOME },
    { name: '订单', icon: 'icon icon-order', activeClassName: style.active, type: CurrentTabBarType.ORDER },
  ]
  const handleChangeTabBar = ( pickTabBar: TabBarType) => tabBarDispatcher.next(pickTabBar.type)

  const index = tabBars.findIndex(i => i.type === currentTabBar)

  return (<View className={style.main}>
    <View className={style.container}>
      {props.tabs[index]}
    </View>

    <View className={style.tabBar}>
      {tabBars.map((tabBar, key) => (
        <View
          className={[
            style.tabBarItemWrapper,
            currentTabBar === tabBar.type ? tabBar.activeClassName : ''
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
