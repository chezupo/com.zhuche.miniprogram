// @ts-ignore
import React from "react";
// @ts-ignore
import style from './style.module.scss';
// eslint-disable-next-line import/first
import {View} from "@tarojs/components";
import CityGroup from "./CityGroup";
import useObserve from "../../../../util/useObserve";
import SearchResult from "./SearchResult";
import {CategoryMapCitiesType, CityCategory} from "../../../../store/module/cities";
import {useAppStoreSelector} from "../../../../store";


const VisitMode = (): React.Element => {
  const [categoryMapCities] = useObserve<CategoryMapCitiesType>( useAppStoreSelector().city.cityCategoriesObserve )

  let CityItemsRender = [];
  let locations: Set<CityCategory> = new Set<CityCategory>();
  categoryMapCities.forEach((v, k) => {
    locations.add(k);
    CityItemsRender.push( <CityGroup title={k} items={v} key={k} /> )
  } )
  let LocationItemsRender: React.ReactElement[] = [];
  locations.forEach((v, k) => {
    const isPopularCity = k === CityCategory.POPULAR
    LocationItemsRender.push(
      <View
        className={style.letter}
        key={k}
      >
        {isPopularCity ? v.substring(0, 2) : v}
      </View>
    )
  })

  return (<>
    <View className={style.leftBarWrapper}>
      {CityItemsRender}
    </View>
    <View className={style.locationBarWrapper}>
      <View className={style.tmp}></View>
      <View className={style.locationListWrapper}>
        {LocationItemsRender}
      </View>
    </View>
  </>)
}



const Index = (): React.ReactElement => {
  const [value] = useObserve( useAppStoreSelector().isCitySearch );

  return (
    <View className={style.main}>
      {!value && <VisitMode /> }
      {value && <SearchResult /> }
    </View>
  )
}

export default Index;
