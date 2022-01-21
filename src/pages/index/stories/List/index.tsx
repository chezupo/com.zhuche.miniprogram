import * as React from "react";
import {useState} from "react";
import {View} from "@tarojs/components";
// @ts-ignore
import style from './style.module.scss';
import GroupContainer from "./GroupContainer/groupContainer";
import useObserve from "../../../../util/useObserve";
import {popularAttractionsObserve} from "../../../../store/stores";
import Attraction from "./Attraction";

type AreaType = {code: number; name: string}
const List = (): React.ReactElement => {
  const items: AreaType[] = [
    {code: 1, name: '热门景点'},
    {code: 2, name: '热门景点2'},
    {code: 3, name: '热门景点3'},
    {code: 4, name: '热门景点4'},
    {code: 5, name: '热门景点5'},
    {code: 6, name: '热门景点6'},
    {code: 7, name: '热门景点7'},
    {code: 8, name: '热门景点8'},
    {code: 9, name: '热门景点9'},
    {code: 10, name: '热门景点10dsfdsfsfsdf'},
    {code: 11, name: '热门景点11'},
    {code: 12, name: '热门景点12'},
  ]
  const getCssId = (code: number): string => `area_${code}`
  const [activeArea, setActiveArea] = useState<AreaType>({code: 1, name: "热门景点"})
  const [popularAttractions] = useObserve(popularAttractionsObserve);

  return (
    <View className={style.main}>
      <View className={style.leftBar}>
        {
          items.map((item, key) => (
            <view
              id={`${getCssId(item.code)}`}
              className={[style.itemWrapper, activeArea.code === item.code ? style.activeItem : ''].join(' ')}
              key={item.code}
              onClick={() => setActiveArea(item)}
            >{item.name}
            </view>
          ))
        }
      </View>
      <View className={style.rightBar}>
        <GroupContainer title='热门景点'>
          <View className={style.popularAttractionsContainer}>
            {
              popularAttractions.map(popularAttraction => (
                <View className={style.popularAttractions}
                  key={popularAttraction.id}
                >{popularAttraction.name}</View>
              ))
            }
          </View>
        </GroupContainer>

        <GroupContainer title='常用门店'>
          <>
            <Attraction />
            <Attraction />
            <Attraction />
            <Attraction />
          </>
        </GroupContainer>
        <GroupContainer title='常用门店'>
          <>
            <Attraction />
            <Attraction />
            <Attraction />
            <Attraction />
          </>
        </GroupContainer>
        <GroupContainer title='常用门店'>
          <>
            <Attraction />
            <Attraction />
            <Attraction />
            <Attraction />
          </>
        </GroupContainer>
        <GroupContainer title='常用门店'>
          <>
            <Attraction />
            <Attraction />
            <Attraction />
            <Attraction />
          </>
        </GroupContainer>
      </View>
    </View>
  )
}

export default List;
