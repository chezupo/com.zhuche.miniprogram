// @ts-ignore
import React, {useState} from "react";
import Search from "./Search/index";
import CityList from "./CityList";
// eslint-disable-next-line import/first
import {View} from "@tarojs/components";
// @ts-ignore
import style from "./style.module.scss";

const City = (): React.ReactElement => {
  const [value, setValue] = useState<string>('')
  return (
    <View className={style.main}>
      <Search
        value={value}
        onChange={setValue}
        onCancel={() => setValue('')}
      />
      <CityList value={value} />
    </View>
  )
}

export default City;
