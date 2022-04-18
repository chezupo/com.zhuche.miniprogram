import React from "preact/compat";
import {useState} from "preact/hooks";
import {ITouchEvent, Text, View} from "@tarojs/components";
// @ts-ignore
import style from './style.module.scss';
import Button from "../../../../components/Button";
import Icon from "../../../../components/Icon";
import SpinContainer from "../../../../components/SpinContainer";
import {navigateToCheckoutOrderAgreement} from "../../../../store/module/router";

type PayNowItemType = {
  title: string
  amount: number
}

const MenuRender: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false)
  const [payNowItems, setPayNowItems] = useState<PayNowItemType[]>([
    { title: '车辆租金及门店服务费', amount: 2726 },
    { title: '基本保障服务费', amount: 1450 },
    {title: '手续费', amount: 20},
    {title: '驾无忧', amount: 130}
  ])
  const [depositItems, setDepositItems] = useState<PayNowItemType[]>([
    { title: '车辆保证金(可退)', amount: 3000 },
    { title: '违章押金(可退)', amount: 2000 },
  ])
  const [amount, setAmount] = useState<number>(4341)
  const handleClose = () => {
    setVisible(false)
  }
  const handleShowAgreement = (e: ITouchEvent) => {
    e.stopPropagation();
    navigateToCheckoutOrderAgreement(3)
  }

  return (
    <>
      <View className={style.main}>
        <View className={style.noticeWrapper}>
          <View className={style.notice}>
            <Icon value='notice' className={style.icon} />
            取车前可免费取消,无惧计划有变!
          </View>
        </View>
        <View className={style.container}>
          <View>
            <Text className={style.amountTitle}>总价</Text>
            <Text className={style.themeColor}>￥<Text className={style.amount}>{amount}</Text>
            </Text>
          </View>
          <View className={style.rightWrapper}>
            <View className={style.detailTitle} onClick={() => setVisible(true)}>费用明细</View>
            <Button type='primary' className={style.button}>立即支付</Button>
          </View>
        </View>
      </View>
      {
        visible && ( <SpinContainer className={style.spinWrapper}
          onClick={handleClose}
        >
          <View className={style.spinContainer}>
            <View className={style.header}>
              <Icon value='close' className={style.icon}
                onClick={handleClose}
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
                    <View className={style.amount}>￥{item.amount}</View>
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
                    <View className={style.amount}>￥{item.amount}</View>
                  </View>
                )
              }
              <View className={[style.itemWrapper, style.amountItemWrapper].join(' ')} >
                <View className={style.title}>订单总额</View>
                <View className={style.amount}>￥<Text className={style.amountNumber}>{amount}</Text></View>
              </View>
            </View>

          </View>
        </SpinContainer>)
      }
    </>
  )
}

export default MenuRender
