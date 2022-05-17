import React from "preact/compat";
import {ITouchEvent, Text, View} from "@tarojs/components";
import SpinContainer from "../../../../../components/SpinContainer";
import Icon from "../../../../../components/Icon";
// @ts-ignore
import style from "../style.module.scss";
import {navigateToCheckoutOrderAgreement} from "../../../../../store/module/router";
import {PayNowItemType} from "../index";

type AmountDetailPropsType = {
  onClose: () => void
  depositItems: PayNowItemType[]
  payNowItems: PayNowItemType[]
  amount: number
}
const AmountDetail: React.FC<AmountDetailPropsType> = ({amount, onClose, depositItems, payNowItems})  => {
  const handleShowAgreement = (e: ITouchEvent) => {
    e.stopPropagation();
    navigateToCheckoutOrderAgreement(3)
  }
  return (<>
    <SpinContainer
      className={style.spinWrapper}
      onClick={onClose}
    >
      <View className={style.spinContainer}>
        <View className={style.header}>
          <Icon value='close' className={style.icon}
            onClick={onClose}
          />
          <View>费用明细</View>
          <View
            className={style.rule}
            onClick={handleShowAgreement}
          >费用规则</View>
        </View>
        <View className={style.itemsWrapper}>
          {
            payNowItems.map((item) =>
              <View
                className={style.itemWrapper}
                key={item.title}
              >
                <View className={style.title}>{item.title}</View>
                <View className={style.amount}>
                  {
                    !!item.waiverFee && ( <Text className={[style.wrapperAmount].join(' ')}>￥{Math.round(item.waiverFee * 100) / 100}</Text> )
                  }
                  <Text className={item.activeColor ? style.activeAmount : ''}>￥{Math.round(item.amount * 100) / 100}</Text>
                </View>
              </View>
            )
          }
        </View>
        <View className={style.line} />
        <View className={style.itemsWrapper}>
          {
            depositItems.map((item) =>
              <View
                className={style.itemWrapper}
                key={item.title}
              >
                <View className={style.title}>{item.title}</View>
                <View className={style.amount}>
                  <Text>￥{Math.round(item.amount * 100) / 100}</Text>
                </View>
              </View>
            )
          }
          <View className={[style.itemWrapper, style.amountItemWrapper].join(' ')} >
            <View className={style.title}>订单总额</View>
            <View className={style.amount}>￥<Text className={style.amountNumber}>{amount.toFixed(2)}</Text></View>
          </View>
        </View>

      </View>
    </SpinContainer>
  </>)
}

export default AmountDetail
