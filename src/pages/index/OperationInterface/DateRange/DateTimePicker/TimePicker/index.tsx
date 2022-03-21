import * as React from "react";
import {useCallback, useEffect, useState} from "react";
import {ScrollView, View} from "@tarojs/components";
import style from "./style.module.scss"
import {BaseEventOrig} from "@tarojs/components/types/common";
import {ScrollViewProps} from "@tarojs/components/types/ScrollView";
import {debounce} from "@wuchuhengtools/helper";

type ItemType = string
type TimePickerPropsType = {
  onChange?: (newTime: string) => void
  title: string
}
const TimePicker: React.FC<TimePickerPropsType> = (props) => {
  const spinCount: number = 2 // 遮罩数量
  const visitableItemCount: number = 3 // 可视项的数量
  const [items, setItems] = useState<ItemType[]>([])
  const [scrollTop, setScrollTop] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const initItems = (): void => {
    const newItems: ItemType[]  = []
    for (let index: number = 0; index < 48; index++) {
      const muns = index * 30;
      const hour: number = Math.floor(muns / 60)
      const hourStr: string = hour >= 10 ? `${hour}` : `0${hour}`
      const munsStr: string = muns % 60 !== 30 ? '00' : '30';
      newItems.push(`${hourStr}:${munsStr}`)
    }
    setItems(newItems)
  }
  const handleChange = useCallback(debounce(({detail}: BaseEventOrig<ScrollViewProps.onScrollDetail>) => {
      if (loading) {
        setLoading(false)
        return
      }
      // const {scrollTop, scrollHeight } = e.detail
      const itemHeight = detail.scrollHeight / (items.length + spinCount)
      const currentCenterPosition = visitableItemCount / 2 * itemHeight + detail.scrollTop
      const targetIndex = Math.ceil( (currentCenterPosition - itemHeight) / itemHeight ) - 1
      props.onChange && props.onChange(items[targetIndex])
      // 调整居中位置
      const itemToCenterPosition = Math.round(detail.scrollTop / itemHeight) * itemHeight
      setScrollTop(itemToCenterPosition)
      setLoading(true)
    }, 250)
  , [items, loading])

  useEffect(() => {
    initItems()
  }, [])

  return (
    <View className={style.main}>
      <view className={style.title}>{props.title}</view>
      <View className={style.containerWrapper}>
        <ScrollView
          showScrollbar={false}
          className={style.scrollWrapper}
          scrollTop={scrollTop}
          scrollY
          scrollWithAnimation
          onScroll={handleChange}
        >
          <View className={style.item} />
          {
            items.map((e, index) => ( <View
              key={e}
              className={style.item}
            >{e}</View>))
          }
          <View className={style.item} />
        </ScrollView>
        <View className={style.topSpin} />
        <View className={style.bottomSpin} />
      </View>
    </View>
  )
}

export default TimePicker
