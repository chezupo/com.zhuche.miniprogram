import React from "preact/compat";
import {Text, View} from "@tarojs/components";
import {useEffect, useState} from "preact/hooks";
import MenuContainer from "../../../../components/MenuContainer";
import Container from "../components";
// @ts-ignore
import style from "./style.module.scss";
import Icon from "../../../../components/Icon";
import Button from "../../../../components/Button";
import {useAppDispatch, useAppSelector} from "../../../../reduxStore";
import {setUserCoupon as setStoreUserCoupon} from "../../../../reduxStore/module/order"
import {UserCouponItemType} from "../../../../typings";
import {iniUserCouponThunk} from "../../../../reduxStore/module/userCoupons";
import SpinContainer from "../../../../components/SpinContainer";
import Radio from "../../../../components/Radio";
import {primaryThemeColor} from "../../../../global";
import {navigateToCheckoutOrder, navigateToCheckoutOrderAgreement} from "../../../../store/module/router";

type ItemRenderPropsType = {
  data: UserCouponItemType
  onShowRule: (rule: string) => void
  checkedUserCoupon?: UserCouponItemType
  onChange: (newUserCoupon: UserCouponItemType) => void
  onCancel: () => void
}
const ItemRender: React.FC<ItemRenderPropsType> = ({data, onShowRule, onChange, checkedUserCoupon, onCancel}) => {
  const isValidClassName = data.isValid ? '' : style.disableColor
  const dayTimeStamp = 60 * 60 * 24 * 1000;
  const now = new Date( (new Date(data.createdAt)).getTime() + data.expired * dayTimeStamp)
  const y = now.getFullYear()
  const m = now.getMonth() + 1
  const d = now.getDate()
  const checked = checkedUserCoupon && checkedUserCoupon.id === data.id
  const handleClick = () => {
    checkedUserCoupon && checkedUserCoupon.id === data.id ? onCancel() : onChange(data)
  }

  return (
    <>
      <Container className={style.item}>
        <View
          className={style.topBar}
          onClick={handleClick}
        >
          <View className={style.leftBar}>
            <View className={[style.amountWrapper].join(' ')}>
              <Text className={isValidClassName}>￥</Text>
              <Text className={[style.amount, isValidClassName].join(' ')}>{data.amount}</Text>
            </View>
            <View className={style.titleWrapper}>
              <View className={[style.title, isValidClassName].join(' ')}>{data.title}</View>
              <View className={[style.dateTime, isValidClassName].join(' ')}>有效期到{y}-{m > 9 ? m : '0' + m}-{d}</View>
            </View>
          </View>
          <View>
            {
              data.isValid &&
              (
                <Radio checked={checked} color={primaryThemeColor} />
              )
            }
          </View>
        </View>
        <View className={style.lineWrapper}>
          <View className={style.leftPoint} />
          <View className={style.rightPoint} />
          <View className={style.line} />
        </View>
        <View className={style.bottomWrapper}>
          <View className={style.reasonWrapper}>
            {
              !data.isValid && (<>
                <View className={style.title}>
                  <Icon value='exclamation-mark' className={style.icon} />
                  <View>不可用原因</View>
                </View>
                <View className={style.reason}>节假日不可用</View>
              </>)
            }
          </View>
          <View className={style.rule} onClick={() => onShowRule(data.content)}>使用规则</View>
        </View>
      </Container>
    </>
  )
}
const UserCoupon: React.FC = () => {
  const [rule, setRule] = useState<string | undefined>()
  const [userCoupon, setUserCoupon ] = useState<UserCouponItemType | undefined>()
  const {list: coupons} = useAppSelector(state => state.userCoupons)
  const {userCoupon: checkedUserCoupon} = useAppSelector(state => state.order.createOrder)
  useEffect(() => {
    setUserCoupon(checkedUserCoupon)
  }, [coupons])

  const dispatch = useAppDispatch()
  useEffect(() => {
    if (coupons.length === 0) {
      dispatch( iniUserCouponThunk() ).then(() => {
        console.log('init coupons')
      })
    }

  }, [])
  const handleChange = (newUserCoupon: UserCouponItemType) => {
    setUserCoupon(newUserCoupon)
  }
  const handleReset = () => {
    dispatch(setStoreUserCoupon(undefined))
    navigateToCheckoutOrder()
  }
  const handleConfirm = () => {
    dispatch(setStoreUserCoupon(userCoupon))
    navigateToCheckoutOrder()
  }

  return (<>
    <MenuContainer
      menuBar={(
          <View className={style.menuWrapper}>
            <Button
              isDisable={!userCoupon}
              onClick={handleReset}
            >不使用优惠卷</Button>
            <Button
              type='primary'
              isDisable={!userCoupon}
              onClick={handleConfirm}
            >绑卷</Button>
          </View>
      )}
    >
      <View className={style.bodyWrapper}>
        <View className={style.main}>
          {
            coupons.map(coupon => (
              <ItemRender
                onChange={handleChange}
                onCancel={() => setUserCoupon(undefined)}
                checkedUserCoupon={userCoupon}
                key={coupon.id}
                data={coupon}
                onShowRule={setRule}
              />
            ))
          }
        </View>
      </View>
    </MenuContainer>
    {
      rule && (
        <SpinContainer
          className={style.spinContainer}
          onClick={() => setRule(undefined)}
        >
          <View className={style.content} dangerouslySetInnerHTML={{__html: rule}} />
        </SpinContainer>
      )
    }
  </>)
}

export default UserCoupon
