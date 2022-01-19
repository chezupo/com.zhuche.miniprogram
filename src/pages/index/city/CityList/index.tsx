// @ts-ignore
import React, {useEffect, useReducer, useState} from "react";
// @ts-ignore
import style from './style.module.scss';
// eslint-disable-next-line import/first
import {View} from "@tarojs/components";
import CityGroup from "./CityGroup";
import SubscriptionScheduler from "../../../../services/subscriptionService/SubscriptionScheduler";
import useObserve from "../../../../services/subscriptionService/useObserve";
import Search from "../Search";
import SearchResult from "./SearchResult";

export type CityInfoType = {code: number; name: string; provinceCode: number, pinyin: string}
export enum CityCategory {
  POPULAR="热门城市",
  A = "A", B = "B", C = "C", D = "D", E = "E", F = "F",
  G = "G", H = "H", I = "I", J = "J", K = "K", L = "L",
  M = "M", N = "N", O = "O", P = "P", Q = "Q", R = "R",
  S = "S", T = "T", U = "U", V = "V", W = "W", X = "X",
  Y = "Y", Z = "Z"
}

type CategoryMapCitiesType = Map<CityCategory, CityInfoType[]>

const VisitMode = (): React.Element => {

  const categoryMapCities: CategoryMapCitiesType = new Map<CityCategory, CityInfoType[]>();
  const setCategoryMapCities = (key: CityCategory, cityInfo: CityInfoType):CategoryMapCitiesType => {
    const cites = categoryMapCities.get(key);
    cites ? categoryMapCities.set(key, [...cites, cityInfo]) : categoryMapCities.set(key, [cityInfo])

    return categoryMapCities;
  }
  setCategoryMapCities(CityCategory.POPULAR, { code: 4601,	name: "海口市", provinceCode:	46,	pinyin: "haikoushi"})
  setCategoryMapCities(CityCategory.POPULAR, { code: 4602,	name: "三亚市", provinceCode:	46,	pinyin: "sanyashi"})
  setCategoryMapCities(CityCategory.POPULAR, { code: 4603,	name: "三沙市", provinceCode:	46,	pinyin: "sanshashi"})
  setCategoryMapCities(CityCategory.POPULAR, { code: 4604,	name: "儋州市", provinceCode:	46,	pinyin: "danzhoushi"})
  setCategoryMapCities(CityCategory.POPULAR, { code: 4690,	name: "省直辖县级行政区划", provinceCode:	46,	pinyin: "shengzhixiaxianjixingzhengquhua"})
  setCategoryMapCities(CityCategory.H, { code: 4601,	name: "海口市", provinceCode:	46,	pinyin: "haikoushi"})
  setCategoryMapCities(CityCategory.S, { code: 4602,	name: "三亚市", provinceCode:	46,	pinyin: "sanyashi"})
  setCategoryMapCities(CityCategory.S, { code: 4603,	name: "三沙市", provinceCode:	46,	pinyin: "sanshashi"})
  setCategoryMapCities(CityCategory.D, { code: 4604,	name: "儋州市", provinceCode:	46,	pinyin: "danzhoushi"})
  setCategoryMapCities(CityCategory.S, { code: 4690,	name: "省直辖县级行政区划", provinceCode:	46,	pinyin: "shengzhixiaxianjixingzhengquhua"})

  let CityItemsRender = [];
  let locations: Set<CityCategory> = new Set<CityCategory>();
  categoryMapCities.forEach((v, k) => {
    locations.add(k);
    CityItemsRender.push( <CityGroup title={k} items={v} key={k} /> )
  } )
  let LocationItemsRender: React.ReactElement[] = [];
  locations.forEach((v, k) => {
    const isPopularCity = k === CityCategory.POPULAR
    LocationItemsRender.push(<View className={style.letter} key={k}>{isPopularCity ? v.substring(0, 2) : v}</View>)
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
  const [value] = useObserve(SubscriptionScheduler.isCitySearchObserve);

  return (
    <View className={style.main}>
      {!value && <VisitMode /> }
      {value && <SearchResult /> }
    </View>
  )
}

export default Index;
