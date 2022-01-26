import {View} from "@tarojs/components";
import * as React from "react";
// @ts-ignore
import style from "./style.module.scss"
import UserInfo from "./UserInfo";
import Balance from "./Balance";
import Items from "./Items";
import Customer from "../../components/Customer";
import Logout from "./Logout";

const Me = (): React.ReactElement => {
  return (<View className={style.main}>
    <UserInfo />
    <View className={style.itemsWrapper}>
      <Balance />
      <Items />
      <Logout />
      <Customer />
    </View>
  </View>)
}

export default Me
