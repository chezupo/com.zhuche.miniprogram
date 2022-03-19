// @ts-ignore
import React, {useState} from "react";
import Search from "./Search/index";
import CityList from "./CityList";
// eslint-disable-next-line import/first
import {View} from "@tarojs/components";
// @ts-ignore
import style from "./style.module.scss";
import {CityType} from "../../../typings";
import {useAppDispatch, useAppSelector} from "../../../reduxStore";
import {setEndCityStoresThunk, setStartCityThunk, StartCityOrEndCityType} from "../../../reduxStore/module/order";
import {navigateToHome} from "../../../store/module/router";

const City = (): React.ReactElement => {
  const [value, setValue] = useState<string>('')
  const startCityOrEndCity = useAppSelector(state => state.order.createOrder.startCityOrEndCity)
  const dispatch = useAppDispatch()
  const handleChange = (city: CityType) => {
    switch (startCityOrEndCity) {
      case StartCityOrEndCityType.END:
        dispatch(setEndCityStoresThunk(city)).then(() => console.log("set end city."))
        break;
      case StartCityOrEndCityType.START:
        dispatch(setStartCityThunk(city)).then(() =>
          console.log("SetCreateStartCity.")
        );
        break;
    }
    navigateToHome()
  }
  return (
    <View className={style.main}>
      <Search
        value={value}
        onChange={setValue}
        onCancel={() => setValue('')}
      />
      <CityList value={value} onChange={handleChange} />
    </View>
  )
}

export default City;
