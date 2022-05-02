import React from "preact/compat";
import taro from "@tarojs/taro";
import {useState} from "preact/hooks";
import {View} from "@tarojs/components";
import {getTransactionThunk, refreshThunk} from "../../../../reduxStore/module/me";
import Button from "../../../../components/Button";
import TopUpRender from "./TopUpRender";
import {createToUpOrder, TopUpValueType} from "../../../../api/topUp";
import Loading from "../../../../components/Loading";
import tradePay from "../../../../nativeInterface/tradePay";
import {useAppDispatch, useAppSelector } from "../../../../reduxStore";
// @ts-ignore
import style from './style.module.scss'
import {createWithdraw} from "../../../../api/withdraw";

enum ModalType {
  NONE,
  TOP_UP,
  WITHDRAW
}

const BalanceCarRender: React.FC = () => {
  const [modal, setModal] = useState<ModalType>(ModalType.NONE)
  const [loading, setLoading] = useState<boolean>(false)
  const me = useAppSelector(state => state.me.data)
  const dispatch = useAppDispatch()
  const handleTopUp =  async (amount: TopUpValueType) => {
    setLoading(true)
    try {
      const tradeNo = await createToUpOrder(amount)
      await tradePay(tradeNo)
      await Promise.all([
        dispatch(refreshThunk()),
        dispatch(getTransactionThunk())
      ])
      setModal(ModalType.NONE)
    }finally {
      setLoading(false)
    }
  }
  const handleShowWithDraw = async (value: TopUpValueType) => {
    if (value.amount < 0.1)  {
      await taro.showToast({title: '提现金额不能小于0.1'})
      return
    }
    if (value.amount > me.balance) {
      await taro.showToast({title: '提现金额不能大于账户余额'})
    }
    await createWithdraw(value)
    await Promise.all([
      dispatch(refreshThunk()),
      dispatch(getTransactionThunk())
    ])
    setModal(ModalType.NONE)
    await taro.showToast({title: "提交审核成功", duration: 5000})
  }

  return (<>
    {loading && <Loading />}
    { modal !== ModalType.NONE && <TopUpRender
      isShowWithdrawNotice={modal === ModalType.WITHDRAW}
      title={modal === ModalType.TOP_UP ? '充值金额' : '提现申请'}
      onCancel={() => setModal(ModalType.NONE)}
      onSubmit={(e) =>  modal === ModalType.TOP_UP ? handleTopUp(e) : handleShowWithDraw(e)}
    /> }
    <View className={style.main}>
      <View className={style.balanceWrapper}>
        <View className={style.title}>可用余额(CNY)</View>
        <View className={style.balance}>{me?.balance?.toFixed(2) || '0.00'}</View>
        <View className={style.buttonWrapper}>
          <Button onClick={() => setModal(ModalType.WITHDRAW)}>提现</Button>
          <Button
            type='primary'
            onClick={() => setModal(ModalType.TOP_UP)}
          >充值</Button>
        </View>
      </View>
      <View>
      </View>
    </View>

  </>)
}

export default BalanceCarRender
