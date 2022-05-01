import React from "preact/compat";
import {useState} from "preact/hooks";
import {View} from "@tarojs/components";
// @ts-ignore
import style from './style.module.scss'
import Button from "../../../../components/Button";
import TopUpRender from "./TopUpRender";
import {createToUpOrder} from "../../../../api/topUp";
import Loading from "../../../../components/Loading";
import tradePay from "../../../../nativeInterface/tradePay";
import {useAppDispatch, useAppSelector} from "../../../../reduxStore";
import {refreshThunk} from "../../../../reduxStore/module/me";
import taro from "@tarojs/taro";


const BalanceCarRender: React.FC = () => {
  const [isTopUp, setIsTopUp] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const me = useAppSelector(state => state.me.data)
  const dispatch = useAppDispatch()
  const handleTopUp =  async (amount: number) => {
    setLoading(true)
    try {
      const tradeNo = await createToUpOrder(amount)
      await tradePay(tradeNo)
      await dispatch(refreshThunk())
      setIsTopUp(false)
    }finally {
      setLoading(false)
    }
  }
  const handleShowWithDraw = async () => {
    await taro.showToast({title: '您金额暂不能提现'})
  }

  return (<>
    {loading && <Loading />}
    { isTopUp && <TopUpRender onCancel={() => setIsTopUp(false)} onSubmit={handleTopUp} /> }
    <View className={style.main}>
      <View className={style.balanceWrapper}>
        <View className={style.title}>可用余额(CNY)</View>
        <View className={style.balance}>{me?.balance.toFixed(2) || '0.00'}</View>
        <View className={style.buttonWrapper}>
          <Button onClick={handleShowWithDraw}>提现</Button>
          <Button
            type='primary'
            onClick={() => setIsTopUp(true)}
          >充值</Button>
        </View>
      </View>
      <View>
      </View>
    </View>
  </>)
}

export default BalanceCarRender
