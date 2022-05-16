import React from "preact/compat";
import {useCallback, useEffect, useState} from "preact/hooks";
import {ITouchEvent, Text, View} from "@tarojs/components";
import {debounce} from "@wuchuhengtools/helper";
// @ts-ignore
import style from './style.module.scss';
import Button from "../../../../components/Button";
import Icon from "../../../../components/Icon";
import SpinContainer from "../../../../components/SpinContainer";
import {navigateToCheckoutOrderAgreement} from "../../../../store/module/router";
import {useAppDispatch, useAppSelector} from "../../../../reduxStore";
import getPhoneNumber from "../../../../nativeInterface/getPhoneNumber";
import {updateMyPhoneNumberThunk} from "../../../../reduxStore/module/me";
import PopModal from "../../../../components/PopModal";

type PayNowItemType = {
  title: string
  amount: number
  waiverFee?: number
  activeColor?: boolean
}

export type AmountListType = Pick<CarItemType,"insuranceFee" |  "handlingFee" | "deposit" | 'rent'> & {
  waiverHandlingFee: number // 减免手续费额度
  waiverRent: number // 减免租金额度
}

type MenuRenderPropsType = {
  amountList: AmountListType
  onSubmit: () => void
  allowed: boolean
}

const MenuRender: React.FC<MenuRenderPropsType> = ({amountList, ...props}) => {
  const [visible, setVisible] = useState<boolean>(false)
  const [popErrorVisible, setPopErrorVisible] = useState<boolean>(false)
  const [payNowItems, setPayNowItems] = useState<PayNowItemType[]>([])
  const [depositItems, setDepositItems] = useState<PayNowItemType[]>([])
  const [amount, setAmount] = useState<number>(0)
  const handleSubmit = useCallback( debounce((isOk: boolean) => {
      props.onSubmit()
    }, 1000)
    , [amountList, props.allowed])

  const handleInit = () => {
    setPayNowItems([
      { title: '车辆租金及门店服务费', amount: amountList.rent, waiverFee: amountList.waiverRent ? amountList.waiverRent + amountList.rent : 0 },
      {title: '手续费', amount: amountList.handlingFee, waiverFee: amountList.waiverHandlingFee ?  amountList.handlingFee + amountList.waiverHandlingFee : 0},
      ...(amountList.insuranceFee ? [
        {title: '驾无忧', amount: amountList.insuranceFee},
      ] : []),
      ...(amountList.waiverHandlingFee + amountList.waiverRent > 0 ? [
        {title: '优惠卷减免', amount: -(amountList.waiverHandlingFee + amountList.waiverRent), activeColor: true }
      ] : []),
    ])
    setDepositItems([
      { title: '车辆保证金(可退)', amount:  amountList.deposit},
    ])
    setAmount(amountList.rent + amountList.handlingFee + amountList.insuranceFee)
  }
  useEffect(() => handleInit(), [])
  useEffect(() => handleInit(), [amountList])

  const handleClose = () => {
    setVisible(false)
  }
  const handleShowAgreement = (e: ITouchEvent) => {
    e.stopPropagation();
    navigateToCheckoutOrderAgreement(3)
  }
  const me = useAppSelector(state => state.me)
  const dispatch = useAppDispatch()
  const handleGetPhone = async (e) => {
    setPopErrorVisible(false)
    const res = await getPhoneNumber()
    await dispatch(updateMyPhoneNumberThunk(res));
    handleSubmit(true)
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
            <Text className={style.themeColor}>￥<Text className={style.amount}>{amount.toFixed(2)}</Text>
            </Text>
          </View>
          <View className={style.rightWrapper}>
            <View className={style.detailTitle} onClick={() => setVisible(true)}>费用明细</View>
            {
              !me?.data?.phone && (
                <Button
                  type='primary'
                  className={style.button}
                  openType='getAuthorize'
                  scope='phoneNumber'
                  onGetAuthorize={handleGetPhone}
                  onError={e => {
                    setPopErrorVisible(true)
                  }}
                >立即支付</Button>
              )
            }
            {
              me?.data?.phone && (
                <Button
                  type='primary'
                  className={style.button}
                  onClick={() => handleSubmit(true)}
                >立即支付</Button>
              )
            }
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
        </SpinContainer>)
      }
      {
        popErrorVisible && (
          <PopModal
            title='提示'
            content='取消授权，可能会导致门店的服务人员无法联系您，从而无法提供送车上门和上门取车等服务'
            onConfirm={() => {
              setPopErrorVisible(false)
            }}
            onCancel={() => {
              setPopErrorVisible(false)
            }}
            confirm={
              <Button
                className={style.popConfirmButton}
                openType='getAuthorize'
                scope='phoneNumber'
                onGetAuthorize={handleGetPhone}
                onError={e => {
                  setPopErrorVisible(true)
                }}
              >重新授权</Button>
            }
          />
        )
      }
    </>
  )
}

export default MenuRender
