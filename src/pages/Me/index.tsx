import {View} from "@tarojs/components";
import * as React from "react";
// @ts-ignore
import style from "./style.module.scss"
import UserInfo from "./UserInfo";
import Balance from "./Balance";
import Items from "./Items";
import Customer from "../../components/Customer";
import {useIsLogin} from "../../util/authUtilHook";
import Logout from "./Logout";

const Me = (): React.ReactElement => {
  const isLogin = useIsLogin()
  return (<View className={style.main}>
    <UserInfo />
    <View className={style.itemsWrapper}>
      <Balance />
      <Items />
      { isLogin && <Logout /> }
      <Customer />
    </View>
  </View>)
}

export default Me
