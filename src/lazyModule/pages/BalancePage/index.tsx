import React from "preact/compat";
import { View } from "@tarojs/components";
import style from "./style.module.scss";
import BalanceCarRender from "./BalanceCarRender";
import TransactionRender from "./TransactionRender";

const BalancePage: React.FC = () => {
  return (
    <>
      <View className={style.main}>
        <View className={style.container}>
          <BalanceCarRender />
          <TransactionRender />
        </View>
      </View>
    </>
  );
};
export default BalancePage;
