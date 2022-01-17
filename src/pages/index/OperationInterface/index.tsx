// @ts-ignore
import React from "react";
import {View} from "@tarojs/components";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// 引入 Swiper, SwiperItem 组件
import style from "./style.module.scss"
import SelectCityOrAttraction from "./SelectCityOrAttraction";
import DateRange from "./DateRange/DateRange";
import {AtButton} from "taro-ui";
import Button from "./Button";

const OperationInterface = (): React.ReactElement => {
  return (
    <View className={style.main}>
      <View className={style.container}>
        <SelectCityOrAttraction title='取车地点' visitButton />
        <SelectCityOrAttraction title='还车地点' pointColor='#405DFF' />
        <DateRange/>
        <Button/>
      </View>
    </View>
    )

}

export default OperationInterface;
