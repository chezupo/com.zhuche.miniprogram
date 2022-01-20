import * as React from "react";
import {View} from "@tarojs/components";
// @ts-ignore
import style from "./style.module.scss";
// @ts-ignore
import {CityCategory, pickCity} from "../../../../../store/cities";
import {CityInfoType} from "../../../../../store/getters";

type CityGroupPropsType = {
  title: CityCategory;
  items: CityInfoType[];
}
const CityGroup = (props: CityGroupPropsType): React.ReactElement => {
  const isPopularCity = props.title === CityCategory.POPULAR ? {background: 'white'} : {}
  return (
    <View className={style.main}>
      <View className={style.locationLetter} style={isPopularCity}>{props.title}</View>
      <View className={style.cityNameGroup}>
        {props.items.map(i =>
          <View
            className={style.cityName}
            key={i.code}
            onClick={() => pickCity(i)}
          >{i.name}</View>
        )}
      </View>
    </View>
  )
}

export default CityGroup;
