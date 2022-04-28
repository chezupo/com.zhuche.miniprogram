import {View} from "@tarojs/components";
import * as React from "react";
import {navigateToBalancePage, navigateToUserCoupon} from "../../../store/module/router";
// @ts-ignore
import style from "./style.module.scss"

const Balance = (): React.ReactElement => {
  const handleClickBalance = () => {
    navigateToBalancePage()
  }
  const handleClickUserCoupon = () => {
    navigateToUserCoupon()
  }

  return (
<View className={style.walletWrapper}>
  <View className={style.itemName}>我的钱包</View>
  <View className={style.itemContainer}>
    <View className={style.itemWrapper} onClick={handleClickBalance}>
      <View className={['iconfont icon-balance', style.icon].join(' ')} />
      <View className={style.item}>余额</View>
    </View>
    <View
      className={style.itemWrapper}
      onClick={handleClickUserCoupon}
    >
      <View className={['iconfont icon-youhuiquan', style.icon].join(' ')} />
      <View className={style.item}>优惠卷</View>
    </View>

  </View>
</View>

)
}

export default Balance
