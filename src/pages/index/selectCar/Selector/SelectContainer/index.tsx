import * as React from "react";
import {ReactElement, useRef, useState} from "react";
import {View} from "@tarojs/components";
// @ts-ignore
import style from './style.module.scss'
// eslint-disable-next-line import/first
import {selectorQueryClientRect} from "../../../../../nativeInterface/selectorQueryClientRect";
import { useReady } from "@tarojs/taro";

enum ItemIdType {
  ORDER,
  BRAND,
  PRICE,
  MORE
}
type ItemType = {
  id: ItemIdType
  name: string
}
type SelectorContainerPropsType = {
  orderComponent: ReactElement
  brandComponent: ReactElement
  priceComponent: ReactElement
  moreComponent: ReactElement
}
const SelectorContainer = (props: SelectorContainerPropsType): React.ReactElement => {
  const [activeId, setActiveId] = useState<ItemIdType>(null)
  const items:ItemType[] = [
    { id: ItemIdType.ORDER, name: "综合排序"},
    { id: ItemIdType.BRAND, name: "品牌"},
    { id: ItemIdType.PRICE, name: "价格"},
    { id: ItemIdType.MORE, name: "更多"}
  ]
  let DropDownRender;
  switch (activeId) {
    case ItemIdType.ORDER:
      DropDownRender = (
        <View
          className={style.itemContainer}
          onClick={(e) =>  e.stopPropagation()}
        >
          {props.orderComponent}
        </View>
      )
      break
    case ItemIdType.BRAND:
      DropDownRender = (
        <View className={style.itemContainer}
          onClick={(e) => e.stopPropagation()}
        >
          {props.brandComponent}
        </View>
    )
      break
    case ItemIdType.PRICE:
      DropDownRender = (
        <View className={style.itemContainer}
          onClick={(e) => e.stopPropagation()}
        >
          {props.priceComponent}
        </View>
      )
      break
    case ItemIdType.MORE:
      DropDownRender = (
      <View className={style.itemContainer}
        onClick={(e) => e.stopPropagation()}
      >
        {props.moreComponent}
      </View>
    )
      break
  }
  const mainRef = useRef(null);
  const dropdownRef = useRef(null)

  useReady(() => {
    setTimeout(() => {
      selectorQueryClientRect('.' + style.main).
      then((res) => {
        dropdownRef.current.style.top = res.top + res.height + 'px';
        // handleClick(items[2])
      })
    }, 10)
  })

  const handleClick = (activeItem: ItemType): void => {
    if (activeItem.id === activeId ) {
      setActiveId(null)
      dropdownRef.current.style.display = 'none'
    } else {
      setActiveId(activeItem.id)
      dropdownRef.current.style.display = 'block'
    }
  }
  const handleClickDropdownWrapper = () => activeId !== null && setActiveId(null)

  return (<>
    <View className={style.main} ref={mainRef} >
      {items.map((item) => (
        <View
          onClick={() => handleClick(item)}
          className={[style.selectorItem, activeId === item.id ? style.activeItem : ''].join(' ')}
          key={item.id}
        >
          {item.name}
          <View className={style.triangle} />
        </View>
      ))}
    </View>

    <View
      className={[style.dropdownWrapper, activeId === null ? style.hidden : style.show].join(' ')}
      ref={dropdownRef}
      onClick={handleClickDropdownWrapper}
    >
        {DropDownRender}
    </View>
  </>)

}

export default SelectorContainer
