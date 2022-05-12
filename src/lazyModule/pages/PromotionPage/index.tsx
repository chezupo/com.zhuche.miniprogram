import React from 'react'
import taro from "@tarojs/taro";
import {useEffect, useState} from "preact/hooks";
import {Text, View} from "@tarojs/components";
// @ts-ignore
import style from './style.module.scss'
import Icon from "../../../components/Icon";
import Button from "../../../components/Button";
import {navigateToPromotionPosterPage, navigateToPromotionUsersPage} from "../../../store/module/router";
import {useAppSelector} from "../../../reduxStore";
import {getPromotionInfo} from "../../../api/promotion";
import OrderItem from "./OrderItem";
import TopUpRender from "../BalancePage/BalanceCarRender/TopUpRender";
import {TopUpValueType} from "../../../api/topUp";
import Loading from "../../../components/Loading";
import {createWithdraw} from "../../../api/withdraw";

const withDrawLimit = 0.1;
const PromotionPage:React.FC = () => {
  const {promotionLevel2, promotionLevel1} = useAppSelector(state => state.configuration.config)
  const [promotionInfo, setPromotionInfo] = useState<PromotionInfoType>({
    downLineCount: 0,
    orders: [],
    promotionLevel1Users: [],
    promotionLevel2Users: []
  })
  useEffect(() => {
    getPromotionInfo()
      .then(res => setPromotionInfo(res))
  }, [])
  const [loading, setLoading]  = useState<boolean>(false)
  const me = useAppSelector(state => state.me)
  const [isWithDraw, setIsWithDraw] = useState<boolean>(false)
  const handleWithdraw = (v: TopUpValueType) => {
    if (v.amount <  withDrawLimit) {
      taro.showToast({title: `提现金额不能小于${withDrawLimit}`})
      return
    }
    setLoading(true)
    createWithdraw({...v, isCommission: true})
      .then(() => {
        taro.showToast({title: '提交成功'})
      })
      .finally(() => {
        setLoading(false);
        setIsWithDraw(false)
      } )
  }
  const handleShowWithdrawPanel = async () => {
    if (me?.data?.commission < withDrawLimit) {
      await taro.showToast({title: `账户余额不足${withDrawLimit},无法提现`})
    } else {
      setIsWithDraw(true)
    }
  }
  return (<>
    {loading && <Loading />}
    { isWithDraw && <TopUpRender
      isShowWithdrawNotice
      title='提现申请'
      onCancel={() => setIsWithDraw(false)}
      onSubmit={handleWithdraw}
    /> }
    <View className={style.main}>
      <View className={style.commissionWrapper}>
        <View className={style.balanceWrapper}>
          <View className={style.balance}>{me.data?.commission || '0.00'}</View>
          <View className={style.withDraw} onClick={handleShowWithdrawPanel}>提现</View>
        </View>
        <View>佣金(元)</View>
      </View>
      <View className={style.menuBarWrapper}>
        <View className={style.itemWrapper}>
          <View>已提现佣金: <Text className={style.balance}>{me.data?.withdrawnCommission || '0.00'}</Text></View>
          <View>提现中佣金: <Text className={style.balance}>{me.data?.withdrawalInProgressCommission || '0.00'}</Text></View>
        </View>
        <View className={style.itemWrapper}>
          <View>一级返点: <Text className={style.rebatePoints}>{promotionLevel1}%</Text></View>
          <View>二级返点: <Text className={style.rebatePoints}>{promotionLevel2}%</Text></View>
        </View>
        <View
          className={style.itemWrapper}
          onClick={() => navigateToPromotionUsersPage()}
        >
          <View>我的下线: {promotionInfo.downLineCount}人</View>
          <View><Icon value='right' className={style.icon} /></View>
        </View>
      </View>
      <View className={style.ordersWrapper}>
        <View className={style.orderHeaderBar}>
          <View>下线用户的订单</View>
          {/*<View><Icon value='right' className={style.icon} /></View>*/}
        </View>
        {
          promotionInfo.orders.map(order => ( <OrderItem order={order} key={order.id} />))
        }
      </View>
      <View className={style.promotionWrapper}>
        <Button
          type='primary'
          className={style.button}
          onClick={() => navigateToPromotionPosterPage()}
        >
          <Icon
            value='promotion'
            className={style.icon}
          />
          <View>去推广</View>
        </Button>
      </View>
    </View>
  </>)
}

export default PromotionPage
