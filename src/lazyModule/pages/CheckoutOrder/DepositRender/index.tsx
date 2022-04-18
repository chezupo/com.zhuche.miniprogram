import React from "preact/compat";
import {View} from "@tarojs/components";
import Container from "../components";
import {useAppSelector} from "../../../../reduxStore";
import {getPlatformName} from "../../../../util/platformType";
// @ts-ignore
import style from "./style.module.scss";

const DepositRender: React.FC = () => {
  const {appName} = useAppSelector(state => state.configuration.config)
  let platformName: string = getPlatformName();

  return (
      <Container className={style.main}>
        <View className={style.title}>免车辆押金</View>
        <View className={style.itemWrapper}>
          {appName}提供{platformName}信用免押方式，具体免押额度以用户实际信用为准.
        </View>
      </Container>
  )

}

export default DepositRender
