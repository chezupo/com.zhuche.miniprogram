import React from "preact/compat";
import {useState} from "preact/hooks";
import {Image, Swiper, SwiperItem, View} from "@tarojs/components";
// @ts-ignore
import style from './style.module.scss';
import {GuidType} from "../../../../../typings";
import {ActiveButtonType} from "../StoreInfoRender";

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
  const [guides, setGuides] = useState<GuidType[]>([
    {
      id: 1,
      imgKey: '2022-3-17-17-40-1-1647510001605-806d6cd71f7141e9b2d8e1d1c8d3140c.jpg',
      prefixUrl: 'https://zhuche-a1001.qiniu.wuchuheng.com',
      title: '见南二入口右转上坡'
    },
    {
      id: 2,
      imgKey: '2022-3-17-17-40-1-1647510001605-806d6cd71f7141e9b2d8e1d1c8d3140c.jpg',
      prefixUrl: 'https://zhuche-a1001.qiniu.wuchuheng.com',
      title: '见南二入口右转上坡'
    },
    {
      id: 3,
      imgKey: '2022-3-17-17-40-1-1647510001605-806d6cd71f7141e9b2d8e1d1c8d3140c.jpg',
      prefixUrl: 'https://zhuche-a1001.qiniu.wuchuheng.com',
      title: '见南二入口右转上坡'
    },
    {
      id: 4,
      imgKey: '2022-3-17-17-40-1-1647510001605-806d6cd71f7141e9b2d8e1d1c8d3140c.jpg',
      prefixUrl: 'https://zhuche-a1001.qiniu.wuchuheng.com',
      title: '见南二入口右转上坡'
    },
  ])
  const [activeButton, setActiveButton] = useState<ActiveButtonType>(ActiveButtonType.RETURN_GUIDE)
  const handleActive = (newActiveButton: ActiveButtonType) => {
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
