import {View} from "@tarojs/components";
import {useState} from "react";
// @ts-ignore
import style from "./style.module.scss"
import {OrderCategoryType} from "../index";

type TabsPropsType = {
  tabs:  OrderCategoryType[];
  activeId: number;
  onChange: (activeId: number) => void;
  className?: string;
}
const Tabs = ({tabs, activeId, onChange, className}: TabsPropsType): React.ReactElement => {

  return (<View className={[style.main].join(' ')}>
    {tabs.map(tab => (
      <View
        key={tab.id}
        className={[style.itemWrapper, activeId === tab.id ? style.active : ''].join(' ')}
        onClick={() => onChange(tab.id)}
      >
        <View>{tab.name}</View>
        <View
          className={[
            style.underLine,
            activeId === tab.id ? style.activeUnderLine : ''

          ].join(' ')}
        />

      </View>
    ))}

  </View>)

}

export default Tabs
