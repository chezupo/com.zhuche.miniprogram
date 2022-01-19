// @ts-ignore
import React from "react";
import Search from "./Search/index";
import CityList from "./CityList";
// eslint-disable-next-line import/first
import {View} from "@tarojs/components";
// @ts-ignore
import style from "./style.module.scss";

const City = (): React.ReactElement => {
  return (
    <View className={style.main}>
      <Search />
      <CityList />
    </View>
  )
}

export default City;
