import React from 'react';
import {PickerView, PickerViewColumn, View} from "@tarojs/components";
import {useEffect, useState} from "preact/hooks";
// @ts-ignore
import style from './style.module.scss'

const PanelRenderer: React.FC = () => {
  const [days, setDays] = useState<number[]>([])
  const [value, setValue] = useState<[number]>([1])
  useEffect(() => {
    const initYear: number[] = []
    for (let i = 1; i <= 30; i++) {
      initYear.push(i)
    }
    setDays(initYear)
  }, [])
  const handleChange = v => {
    console.log(v)
  }
  return (<>
    <View className={style.main}>
      <View>续组: { days[ value[0] ] }天</View>
      <View>费用: ￥100.00</View>
      <View>费用: 100.00</View>
      <PickerView
        indicatorClass={style.indicator}
        className={style.picker}
        value={value}
        onChange={e => setValue([e.detail.value[0]])}
      >
        <PickerViewColumn>
          {days.map(item => {
            return (
              <View>{item}天</View>
            );
          })}
        </PickerViewColumn>

      </PickerView>
    </View>
  </>)
}

export default PanelRenderer
