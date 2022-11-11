import React from "preact/compat";
import {useCallback, useEffect, useState} from "preact/hooks";
import {Text, View} from "@tarojs/components";
import {debounce} from "@wuchuhengtools/helper";
// @ts-ignore
import style from './style.module.scss';
import Button from "../../../../components/Button";
import Icon from "../../../../components/Icon";
import {useAppDispatch, useAppSelector} from "../../../../reduxStore";
import getPhoneNumber from "../../../../nativeInterface/getPhoneNumber";
import {updateMyPhoneNumberThunk, updateWechatPhoneNumberThunk} from "../../../../reduxStore/module/me";
import PopModal from "../../../../components/PopModal";
import AmountDetail from "./AmountDetail";
import {getDepositItems} from "../../../../util/orderUtil";
import getPlatformType, {AllPlatformType} from "../../../../util/platformType";

export type PayNowItemType = {
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
      {
        title: '车辆租金及门店服务费',
        amount: amountList.rent,
        waiverFee: amountList.waiverRent ? amountList.waiverRent + amountList.rent : 0
      },
      {
        title: '手续费',
        amount: amountList.handlingFee,
        waiverFee: amountList.waiverHandlingFee ?  amountList.handlingFee + amountList.waiverHandlingFee : 0
      },
      ...(amountList.insuranceFee ? [
        {title: '驾无忧', amount: amountList.insuranceFee},
      ] : []),
      ...(amountList.waiverHandlingFee + amountList.waiverRent > 0 ? [
        {title: '优惠卷减免', amount: -(amountList.waiverHandlingFee + amountList.waiverRent), activeColor: true }
      ] : []),
    ])
    setDepositItems( getDepositItems(amountList.deposit) )
    setAmount(amountList.rent + amountList.handlingFee + amountList.insuranceFee)
  }
  useEffect(() => handleInit(), [])
  useEffect(() => handleInit(), [amountList])

  const handleClose = () => {
    setVisible(false)
  }
  const me = useAppSelector(state => state.me)
  const dispatch = useAppDispatch()
  const handleGetPhone = async (e) => {
    setPopErrorVisible(false)
    const res = await getPhoneNumber()
    await dispatch(updateMyPhoneNumberThunk(res));
    handleSubmit(true)
  }
  const handleGetWechatPhone = async (iv: string, encryptData: string) => {
    await dispatch(updateWechatPhoneNumberThunk({iv, encryptData}));
    setPopErrorVisible(false)
    handleSubmit(true)
  }
  const getPhoneNumberOnPayButton = () => {
    const text = '立即支付';
    switch (getPlatformType()) {
      case AllPlatformType.ALIPAY:
        return (<Button
          type='primary'
          className={style.button}
          openType='getAuthorize'
          scope='phoneNumber'
          onGetAuthorize={handleGetPhone}
          onError={e => {
            setPopErrorVisible(true)
          }}
        >{text}</Button>)
      case AllPlatformType.WECHAT:
        return (<Button
          type='primary'
          className={style.button}
          openType='getPhoneNumber'
          onGetPhoneNumber={e => handleGetWechatPhone(e.detail.iv, e.detail.encryptedData)}
          onError={e => {
            setPopErrorVisible(true)
          }}
        >{text}</Button>)
      case AllPlatformType.H5:
        throw  Error('Not Found');
      case AllPlatformType.TT:
        throw  Error('Not Found');
    }
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
              !me?.data?.phone && (getPhoneNumberOnPayButton())
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
        visible && (
          <AmountDetail
            amount={amount}
            depositItems={depositItems}
            payNowItems={payNowItems}
            onClose={handleClose}
          />

        )
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
