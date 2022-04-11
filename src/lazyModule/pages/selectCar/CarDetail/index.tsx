import React from 'react';
import {View} from "@tarojs/components";
import BaseInfoRender from "./BaseInfoRender";
import ConfigRender, {ConfigType} from "./ConfigRender";
import CommonRender, {CommonTagItemType} from "./CommonRender/CommonRender";
// @ts-ignore
import style from "./style.module.scss"
import {useAppSelector} from '../../../../reduxStore';
import Button from "../../../../components/Button";

const CarDetail: React.FC = () => {
  const data = useAppSelector(state => state.cars.showCarItemDetail!)
  const commonTags: CommonTagItemType[] = [
    {key: '全部', total: 4},
    {key: '全部', total: 4},
    {key: '全部', total: 4},
  ]
  const configs: ConfigType[] = [
    {
      icon: 'displacement',
      key: `变速箱: ${data.shift === 'AUTO' ? '自动' : '手动'}`
    },
    {
      icon: 'power',
      key: `进气: ${data.engineType === 'SUPERCHARGED' ? '增压' : '自然吸气'}`,
      className: style.size6
    },
    {icon: 'volume', key: `油箱容量: ${data.gasVolume}L`, className: style.size6},
    {icon: 'engine', key: `排量: ${data.displacement}L`},
    {icon: 'seat', key: `座位数: ${data.seats}`},
  ]
  return (<>
    <View className={style.main}>
      <BaseInfoRender
        tags={data.tags}
        name={data.key}
        cover={data.cover}
      />
      <ConfigRender configs={configs} />
      <CommonRender commonTags={commonTags} id={data.id} />
      <View className={style.buttonWrapper}>
        <Button className={style.button}>立即预订</Button>
      </View>
    </View>
  </>)
}

export default CarDetail
