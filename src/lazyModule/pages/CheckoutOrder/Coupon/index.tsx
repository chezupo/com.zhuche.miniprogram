import React from "preact/compat";
import {useEffect} from "preact/hooks";
import {Text, View} from "@tarojs/components";
import Container from "../components";
// @ts-ignore
import style from './style.module.scss';
import Icon from "../../../../components/Icon";
import {UserCouponItemType} from "../../../../typings";
import {useAppDispatch, useAppSelector} from "../../../../reduxStore";
import {iniUserCouponThunk} from "../../../../reduxStore/module/userCoupons";
import {navigateToUserCoupon} from "../../../../store/module/router";

type CouponPropsType = {
  checkedCoupon?: UserCouponItemType
}
const Coupon: React.FC<CouponPropsType> = props => {
  const dispatch = useAppDispatch()
  let {loading, list} = useAppSelector(state => state.userCoupons)
  useEffect(() => {
    dispatch(iniUserCouponThunk()).then(() => {
      console.log("Init userCoupons")
    })
  }, [])
  list = list.filter(coupon => coupon.isValid)
  const handleClickCoupon = () => {
    navigateToUserCoupon()
  }

  return (<>
    <Container className={style.main}>
      <View className={style.title}>更多优惠</View>
          <View className={style.itemWrapper}
            style={{gridTemplateColumns: !props.checkedCoupon ? '27% auto' : '27% auto 23%'}}
            onClick={handleClickCoupon}
          >
            <View className={style.nameWrapper}>
              <View >优惠卷折扣</View>
              <Icon value='coupon' className={style.icon} />
            </View>
            {
              !props.checkedCoupon && ( <View className={style.validCoupon}>
                  <View className={style.hasCouponNotice}>{list.length}张优惠卷可用</View>
                  <Icon value='right' className={style.icon} />
                </View>
              )
            }
            {
              props.checkedCoupon && (
                <>
                  <View className={style.title}>{props?.checkedCoupon.title}</View>
                  <View className={style.priceWrapper}>
                    <Text className={style.price}>-￥{props?.checkedCoupon.amount}</Text>
                    <Icon value='right' className={style.icon} />
                  </View>
                </>
              )
            }
          </View>
    </Container>
  </>)
}

export default Coupon
