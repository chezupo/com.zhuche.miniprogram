import {View} from "@tarojs/components";
import {ReactElement, useState} from "react";
// @ts-ignore
import style from "./style.module.scss";

type LayoutPropsType = {
  tabs: ReactElement[]
}
type TabBarType = {name: string; icon: string; activeClassName: string}
const Layout = (props: LayoutPropsType): React.ReactElement => {
  const [activeBar, setActiveBar ] = useState<number>(1)
  const tabBars: TabBarType[] = [
    { name: '首页', icon: 'icon icon-car-o', activeClassName: style.active },
    { name: '订单', icon: 'icon icon-order', activeClassName: style.active },
  ]
  const handleChangeTabBar = (number: number, pickTabBar: TabBarType) => {
    setActiveBar(number)
  }

  return (<View className={style.main}>
    <View className={style.container}>
      {props.tabs[activeBar]}
    </View>


    <View className={style.tabBar}>
      {tabBars.map((tabBar, key) => (
        <View
          className={[
            style.tabBarItemWrapper,
            activeBar === key ? tabBar.activeClassName : ''
          ].join(' ')}
          key={key}
          onClick={() => handleChangeTabBar(key, tabBar)}
        >
          <View className={[ tabBar.icon, style.icon, ].join(' ')} />
          <View>{tabBar.name}</View>
        </View>
      ))}

    </View>
  </View>)
}

export default Layout
