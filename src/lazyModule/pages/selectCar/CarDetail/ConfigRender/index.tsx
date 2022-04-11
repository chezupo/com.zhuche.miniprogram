import React from 'react';
import {View} from "@tarojs/components";
import Icon, {IconType} from "../../../../../components/Icon";
// @ts-ignore
import style from "./style.module.scss";

export type ConfigType = {
  icon: IconType;
  name: string;
  className?: string
}
type ConfigRenderPropsType = {
  configs: ConfigType[]
}
const ConfigRender: React.FC<ConfigRenderPropsType> = props => {
  return (
    <View className={style.containerWrapper}>
      <View>车型配置</View>
      <View className={style.container}>
        {
          props.configs.map((tag, i) => (
            <View className={style.itemWrapper} key={i}>
              <Icon value={tag.icon} className={[style.icon, tag.className || ''].join(' ')} />
              <View className={style.key}>{tag.key}</View>
            </View>
          ))
        }

      </View>
    </View>
  )
}

export default ConfigRender
