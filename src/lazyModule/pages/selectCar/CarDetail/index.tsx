import React from 'react';
import {View} from "@tarojs/components";
import BaseInfoRender from "./BaseInfoRender";
import ConfigRender, {ConfigType} from "./ConfigRender";
import CommonRender, {CommonTagItemType} from "./CommonRender/CommonRender";
import {useAppSelector} from '../../../../reduxStore';
import Button from "../../../../components/Button";
// @ts-ignore
import style from "./style.module.scss"
import {useCheckedCar} from "../../../../util/carUtil";

const CarDetail: React.FC = () => {
  const data = useAppSelector(state => state.cars.showCarItemDetail!)
  const handleSelectCar = useCheckedCar()
  const commonTags: CommonTagItemType[] = [
    {name: '全部', total: 4},
    {name: '全部', total: 4},
    {name: '全部', total: 4},
  ]
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
  return (<>
    <View className={style.main}>
      <BaseInfoRender
        tags={data.tags}
        name={data.name}
        cover={data.cover}
      />
      <ConfigRender configs={configs} />
      <CommonRender commonTags={commonTags} id={data.id} />
      <View className={style.buttonWrapper}>
        <Button
          className={style.button}
          onClick={() => handleSelectCar(data)}
        >立即预订</Button>
      </View>
    </View>
  </>)
}

export default CarDetail
