import {View} from "@tarojs/components";
import {ITouchEvent} from "@tarojs/components/types/common";
import * as React from "react";
// @ts-ignore
import style from "./style.module.scss"
import BusIcon from "../../../../../components/icon/BusIcon";
import {noticeColor} from "../../../../../config/globalConfig";
import MenuIcon from "../../../../../components/icon/MenuIcon";
import GuidIcon from "../../../../../components/icon/GuidIcon";
import {StoreItemType} from "../../../../../typings";
import {navigateStoreDetail} from "../../../../../store/module/router";
import {useCheckedStore} from "../../../../../util/storeHook";

type AttractionPropsType = {
  value: StoreItemType
  classname?: string
  keyword?: string
  isShortAddress?: boolean
}
const Attraction: React.FC<AttractionPropsType> = ({
                                                     isShortAddress,
                                                     classname,
                                                     value,
                                                     keyword,
}) => {
  const html: string = `<span style="color: red">${keyword || ''}</span>`
  const name = keyword ? value.name.replace(keyword, html) : value.name
  const cityName = keyword ? value.city.name.replace(keyword, html) : value.city.name
  const areaName = keyword ? value.area.name.replace(keyword, html) : value.area.name
  const address = keyword ? value.address.replace(keyword, html) : value.address
  const  handleClick = useCheckedStore(value)
  const handleClickMap = (e: ITouchEvent) => {
    console.log("Show map.")
    console.log(e)
    e.stopPropagation()
  }
  const handleClickDetail = (e: ITouchEvent) => {
    navigateStoreDetail(value.id)
    e.stopPropagation()
  }

  return (
    <View
      className={[style.main, classname || ''].join(' ')}
      onClick={handleClick}
    >

      <View className={style.titleWrapper} >
        <View className={style.title}>
          <View>
            <View style={{display: 'inline'}} dangerouslySetInnerHTML={{__html: name}} />
            {value.mark.length > 0 ? `(${value.mark})` : ''}
          </View>
          {value.isStation && <BusIcon className={style.icon} color={noticeColor} /> }
        </View>
        <MenuIcon
          className={style.menuIcon}
          onClick={handleClickDetail}
        />
      </View>
      <View className={style.tagWrapper}>
        { value.starAt === '00:00' && value.endAt === "23:59" && <View className={style.tag}>24h</View> }
        { value.isSelfService && <View className={style.tag}>???????????????</View> }
      </View>
      <View className={style.addressWrapper}>
        <View className={style.address}>??????:
          {
            !isShortAddress && (
              <>
                <View style={{display: 'inline'}} dangerouslySetInnerHTML={{__html: cityName}} />
                <View style={{display: 'inline'}} dangerouslySetInnerHTML={{__html: areaName}} />
              </>
            )
          }
          <View style={{display: 'inline'}} dangerouslySetInnerHTML={{__html: address}} />
        </View>
        <GuidIcon
          className={style.guidIcon}
          color={noticeColor}
          onClick={handleClickMap}
        />
      </View>
      <View className={style.businessHours}>
        ????????????: {value.starAt} - {value.endAt}
      </View>
    </View>
  )
}

export default Attraction;
