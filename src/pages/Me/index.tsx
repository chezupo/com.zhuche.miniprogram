import {View} from "@tarojs/components";
import * as React from "react";
// @ts-ignore
import style from "./style.module.scss"
import UserInfo from "./UserInfo";
import Balance from "./Balance";
import Items from "./Items";
import Customer from "../../components/Customer";
import Logout from "./Logout";
import useObserve from "../../util/useObserve";
import {useAppStoreSelector} from "../../store";

const Me = (): React.ReactElement => {
  const [me] = useObserve(useAppStoreSelector().me)
  return (<View className={style.main}>
    <UserInfo />
    <View className={style.itemsWrapper}>
      <Balance />
      <Items />
      {me.accessToken && <Logout /> }
      <Customer />
    </View>
  </View>)
}

export default Me
