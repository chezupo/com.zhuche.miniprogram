import React from "preact/compat";
import {View} from "@tarojs/components";
// @ts-ignore
import style from './style.module.scss'
import Button from "../../../../components/Button";


const BalanceCarRender: React.FC = () => {
  return (<>
    <View className={style.main}>
      <View className={style.balanceWrapper}>
        <View className={style.title}>可用余额(CNY)</View>
        <View className={style.balance}>0.00</View>
        <View className={style.buttonWrapper}>
          <Button>提现</Button>
          <Button type='primary'>充值</Button>
        </View>
      </View>
      <View>
      </View>
    </View>
  </>)
}

export default BalanceCarRender
