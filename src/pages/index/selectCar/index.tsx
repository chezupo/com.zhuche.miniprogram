import * as React from "react";
import {View} from "@tarojs/components";
// @ts-ignore
import style from "./style.module.scss";
import Header from "./Header";
import Selector from "./Selector";
import List from "./List";

const SelectCar = ():React.ReactElement => {
  return (<>
    <View className={style.main}>
      <Header />
      <Selector />
      <List />
    </View>

    </>)
}

export default SelectCar
