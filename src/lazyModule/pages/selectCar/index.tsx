import * as React from "react";
import { View } from "@tarojs/components";
import Header from "./Header";
import Selector from "./Selector";
import List from "./List";
import style from "./style.module.scss";

const SelectCar = (): React.ReactElement => {
  return (
    <>
      <View className={style.main}>
        <Header />
        <Selector />
        <List />
      </View>
    </>
  );
};

export default SelectCar;
