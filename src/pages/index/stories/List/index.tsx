import * as React from "react";
import {useState} from "react";
import {View} from "@tarojs/components";
// @ts-ignore
import style from './style.module.scss';
import GroupContainer from "./GroupContainer/groupContainer";
import useObserve from "../../../../util/useObserve";
import Attraction from "./Attraction";
import {useAppStoreSelector} from "../../../../store";
import {useAppSelector} from "../../../../reduxStore";
import {StartStoreOrEndStoreType} from "../../../../reduxStore/module/order";
import {AreaStoreType, AreaType, StoreItemType} from "../../../../typings";
import NotFound from "../../../../components/NotFound";

const defaultActiveItem: AreaType = {code:'0', name: '全部'}
const List = (): React.ReactElement => {
  const getCssId = (code: string): string => `area_${code}`
  const [activeArea, setActiveArea] = useState<AreaType>(defaultActiveItem)
  const [popularAttractions] = useObserve( useAppStoreSelector().popularAttractions );
  const {createOrder} = useAppSelector(state => state.order)
  let cityStores:AreaStoreType[]  = createOrder.startStoreOrEndStore === StartStoreOrEndStoreType.START ?
    createOrder.starCityStores : createOrder.endCityStores
  const items: AreaType[] = [
    defaultActiveItem,
    ...cityStores.map(({name, code})=> ({name, code}))
  ]
  const codeMapAreaStore: Map<string, AreaStoreType> = new Map<string, AreaStoreType>()
  cityStores.forEach(area => codeMapAreaStore.set(area.code, area) )

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
        {
          activeArea.code === defaultActiveItem.code && (<>
            <GroupContainer title='热门景点'>
              <View className={style.popularAttractionsContainer}>
                {
                  popularAttractions.map(popularAttraction => (
                    <View
                      className={style.popularAttractions}
                      key={popularAttraction.id}
                    >{popularAttraction.name}</View>
                  ))
                }
              </View>
            </GroupContainer>
            {
              cityStores.map(area =>
                <GroupContainer title={area.name}>
                  <>
                    { area.stores.length > 0 &&
                    area.stores.map(storeItem => (
                      <Attraction
                        key={storeItem.id}
                        value={storeItem}
                        isShortAddress
                      />
                    ))
                    }
                    {
                      area.stores.length === 0 && (<View className={style.emptyWrapper}><View>
                        抱歉!该地区暂未开通
                      </View></View>)
                    }
                  </>
                </GroupContainer>
              )
            }
          </>)
        }
        {
          activeArea.code !== defaultActiveItem.code && (
            <GroupContainer title={codeMapAreaStore.get( activeArea.code).name} >
              <>
                { codeMapAreaStore.get( activeArea.code).stores.length > 0 &&
                codeMapAreaStore.get( activeArea.code).stores.map(storeItem => (
                  <Attraction
                    key={storeItem.id}
                    value={storeItem}
                    isShortAddress
                  />
                ))
                }
                {
                  codeMapAreaStore.get( activeArea.code).stores.length === 0 && (<View className={style.emptyWrapper}>
                    <NotFound title='抱歉!该地区暂未开通' style={{padding: "1rem 0"}} />
                  </View>)
                }
              </>
            </GroupContainer>
          )
        }
      </View>
    </View>
  )
}

export default List;
