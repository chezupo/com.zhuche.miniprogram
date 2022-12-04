import { Text, View } from "@tarojs/components";
import * as React from "react";
import Taro from "@tarojs/taro";
import style from "./style.module.scss";
import { useAppSelector } from "../../reduxStore";

const Customer = (): React.ReactElement => {
  const { servicePhone } = useAppSelector(state => state.configuration.config);
  const handleCall = (): void => {
    Taro.makePhoneCall({ phoneNumber: servicePhone }).then(() =>
      console.log("Call phone success.")
    );
  };

  return (
    <View className={style.main} onClick={handleCall}>
      客服热线: <Text className={style.phone}>{servicePhone}</Text>
    </View>
  );
};

export default Customer;
