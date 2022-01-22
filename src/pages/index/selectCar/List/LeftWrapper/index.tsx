import {View} from "@tarojs/components";
import * as React from "react";
import {useMemo, useRef, useState} from "react";
// @ts-ignore
import style from './style.module.scss';
import {useReady} from "@tarojs/taro";
import {CategoryType, ItemType} from "../index";

type LeftWrapperPropsType = {
  items: ItemType[]
}
const LeftWrapper = ({items}: LeftWrapperPropsType): React.ReactElement => {
  const [activeItemId, setActiveItemId] = useState<number>(0)
  const prevSiblingId = useMemo<number>(() => {
    let prevItem: ItemType;
    for(const item of items) {
      if(item.id === activeItemId && prevItem) {
        return prevItem.id
      } else {
        prevItem = item
      }
    }

    return null;
  }, [activeItemId])

  const handleActiveCategory = (activeItem: ItemType) => {
    setActiveItemId(activeItem.id)
  }
  const leftContainerRef = useRef(null)
  return (

    <View className={style.leftWrapper}>
      <View
        className={style.leftContainer}
        ref={leftContainerRef}
      >
        {
          items.map(item => (
            <View
              className={
                [
                  style.item, activeItemId === item.id ? style.active : '',
                  prevSiblingId === item.id ? style.prevSiblingItem : ''
                ].join(' ')}
              key={item.id}
              onClick={() => handleActiveCategory(item)}
            >
              {item.type === CategoryType.RECOMMAND&& (
                <View className={style.recommand}>{item.name}</View>
              )}
              {item.type === CategoryType.CATEGORY && (
                <>
                  <View className={style.categoryName}>{item.name}</View>
                  <View className={style.subtitle}>¥{item.miniPrice}起</View>
                </>
              )}

            </View>
          ))
        }
        <View className={style.item}> </View>
      </View>

    </View>

  )
}

export default LeftWrapper;
