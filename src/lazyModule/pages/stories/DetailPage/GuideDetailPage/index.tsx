import React from "preact/compat";
import {useState} from "preact/hooks";
import {Image, Swiper, SwiperItem, View} from "@tarojs/components";
import {ActiveButtonType} from "../StoreInfoRender";
import {getPickUpGuides, getReturnGuides} from "../../../../../util/guideUtil";
import style from './style.module.scss';

type TabItemPropsType = {
  name: string;
  isActive: boolean
  onClick: () => void
}
const TabItem: React.FC<TabItemPropsType>  = props => (
  <View
    className={[style.tab, props.isActive ? style.activeTab : ''].join(' ')}
    onClick={() => props.onClick()}
  >
    <View>{props.name}</View>
    { props.isActive && <View className={style.line} /> }
  </View>
)
const GuideDetailPage: React.FC = () => {
  const pickupGuides = getPickUpGuides()
  const returnGuides = getReturnGuides()
  const [guides, setGuides] = useState<GuidItemType[]>(returnGuides)
  const [activeButton, setActiveButton] = useState<ActiveButtonType>(ActiveButtonType.RETURN_GUIDE)
  const handleActive = (newActiveButton: ActiveButtonType) => {
    switch (newActiveButton) {
      case ActiveButtonType.PICKUP_GUIDE:
        setGuides(pickupGuides)
        break;
      case ActiveButtonType.RETURN_GUIDE:
        setGuides(returnGuides)
        break;
    }
    setActiveButton(newActiveButton)
  }

  return (<View className={style.main}>
    <View className={style.tabWrapper}>
      <TabItem
        name='取车指引'
        isActive={activeButton === ActiveButtonType.PICKUP_GUIDE}
        onClick={() => handleActive(ActiveButtonType.PICKUP_GUIDE)}
      />
      <TabItem
        name='还车指引'
        isActive={activeButton === ActiveButtonType.RETURN_GUIDE}
        onClick={() => handleActive(ActiveButtonType.RETURN_GUIDE)}
      />
    </View>
    <View className={style.bodyWrapper}>
      <Swiper
        indicatorDots
        className={style.swiper}
        indicatorColor='white'
      >
        {
          guides.map(item => (
            <SwiperItem
              className={style.swiperWrapper}
              key={item.id}
            >
              <View className={style.itemWrapper}>
                <Image
                  src={`${item.prefixUrl}/${item.imgKey}`}
                  className={style.image}
                />
                <View className={style.notice}>{item.title}</View>
              </View>
            </SwiperItem>
          ))
        }
      </Swiper>
    </View>
  </View>)
}

export default GuideDetailPage
