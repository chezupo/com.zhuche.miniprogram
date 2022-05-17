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
  data: CarItemType
}
const ConfigRender: React.FC<ConfigRenderPropsType> = ({data})=> {

  const configs: ConfigType[] = [
    {
      icon: 'displacement',
      name: `变速箱: ${data.shift === 'AUTO' ? '自动' : '手动'}`
    },
    {
      icon: 'power',
      name: `进气: ${data.engineType === 'SUPERCHARGED' ? '增压' : '自然吸气'}`,
      className: style.size6
    },
    {icon: 'volume',name: `油箱容量: ${data.gasVolume}L`, className: style.size6},
    {icon: 'engine',name: `排量: ${data.displacement}L`},
    {icon: 'seat',name: `座位数: ${data.seats}`},
  ]

  return (
    <View className={style.containerWrapper}>
      <View>车型配置</View>
      <View className={style.container}>
        {
          configs.map((tag, i) => (
            <View className={style.itemWrapper} key={i}>
              <Icon value={tag.icon} className={[style.icon, tag.className || ''].join(' ')} />
              <View className={style.key}>{tag.name}</View>
            </View>
          ))
        }

      </View>
    </View>
  )
}

export default ConfigRender
