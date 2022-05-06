import React from "preact/compat";
import taro from "@tarojs/taro";
import {View} from "@tarojs/components";
import {useState} from "preact/hooks";
// @ts-ignore
import style from './style.module.scss';
import SwiperRender from "./SwiperRender";
import Icon from "../../../../../components/Icon";
import BannerRender from "./BannerRender";
import NameRender from "./NameRender";
import LineRender from "../components/LineRender";
import {StoreItemType} from "../../../../../typings";

export enum ActiveButtonType {
  RETURN_GUIDE,
  PICKUP_GUIDE,
}
type StoreInfoRenderPropsType = {
   store: StoreItemType
}
const StoreInfoRender: React.FC<StoreInfoRenderPropsType> = props => {
  const [activeButton, setActiveButton] = useState<ActiveButtonType>(ActiveButtonType.PICKUP_GUIDE)
  const handleCallPhone = () => {
    taro.makePhoneCall({phoneNumber: props.store.servicePhone}).then(() => console.log("Call phone."))
  }
  const {store} = props
  const handleOpenLocation = async () => {
    await taro.openLocation({
      longitude: store.lng,
      latitude: store.lat,
      name: store.name,
      scale: 12,
      address: `${store.city.name} ${store.area.name} ${store.address}`
    })
  }

  return (
    <View className={style.main}>
      <BannerRender banners={props.store.banners} />
      <NameRender
        rate={5}
        name={store.name}
        mark={store.mark}
        isAirport={store.isAirport}
        isH24={store.starAt === '00:00' && store.endAt === '23:59'}
        isTrain={store.isStation}
      />
      <LineRender />
      <View className={style.switchWrapper}>
        <View className={style.buttonWrapper}>
          <View
            className={[style.button, activeButton=== ActiveButtonType.PICKUP_GUIDE? style.active : ''].join(' ')}
            onClick={() => setActiveButton(ActiveButtonType.PICKUP_GUIDE)}
          >取车指引</View>
          <View
            className={[style.button, activeButton=== ActiveButtonType.RETURN_GUIDE ? style.active : ''].join(' ')}
            onClick={() => setActiveButton(ActiveButtonType.RETURN_GUIDE)}
          >还车指引</View>
        </View>
        { activeButton === ActiveButtonType.PICKUP_GUIDE && ( <SwiperRender images={props.store.pickupGuides} store={store} /> ) }
        { activeButton === ActiveButtonType.RETURN_GUIDE && ( <SwiperRender images={props.store.returnGuides} store={store} /> ) }
      </View>
      <View className={style.addressWrapper}>
        <View className={style.address}>
          <View>{props.store.city.name}{store.area.name}{store.address}</View>
          <View>营业时间: {store.starAt} - {store.endAt}</View>
        </View>
        <View className={style.iconWrapper}>
         <View
           className={style.tipWrapper}
           onClick={handleOpenLocation}
         >
           <Icon value='navigation' className={style.icon} />
           <View className={style.tip}>导航</View>
         </View>
          <Icon
            value='phone'
            className={style.icon}
            onClick={() => handleCallPhone()}
          />
        </View>
      </View>
    </View>
  )
}

export default StoreInfoRender;
