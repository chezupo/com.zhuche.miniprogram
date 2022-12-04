import React from "preact/compat";
import { useEffect, useState } from "preact/hooks";
import { Text, View } from "@tarojs/components";
import Container from "../components";
import style from "./style.module.scss";
import Icon from "../../../../components/Icon";
import { useAppDispatch, useAppSelector } from "../../../../reduxStore";
import { iniUserCouponThunk } from "../../../../reduxStore/module/userCoupons";
import { navigateToUserCoupon } from "../../../../store/module/router";
import { AmountListType } from "../MenuRender";

type CouponPropsType = {
  checkedCoupon?: UserCouponItemType;
  amountList: AmountListType;
};
const Coupon: React.FC<CouponPropsType> = props => {
  const {
    handlingFee, //   手续费
    insuranceFee, // 驾无忧(保险)
    rent // 租金
  } = props.amountList;
  const amount = handlingFee + rent + insuranceFee;
  const { list } = useAppSelector(state => state.userCoupons);
  const count = list.filter(item => item.isValid && item.meetAmount <= amount)
    .length;
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(iniUserCouponThunk()).then(() => {
      console.log("Init userCoupons");
    });
  }, []);

  return (
    <>
      <Container className={style.main}>
        <View className={style.title}>更多优惠</View>
        <View
          className={style.itemWrapper}
          style={{
            gridTemplateColumns: !props.checkedCoupon
              ? "27% auto"
              : "27% auto 23%"
          }}
          onClick={() => navigateToUserCoupon(amount)}
        >
          <View className={style.nameWrapper}>
            <View>优惠卷折扣</View>
            <Icon value="coupon" className={style.icon} />
          </View>
          {!props.checkedCoupon && (
            <View className={style.validCoupon}>
              <View className={style.hasCouponNotice}>{count}张优惠卷可用</View>
              <Icon value="right" className={style.icon} />
            </View>
          )}
          {props.checkedCoupon && (
            <>
              <View className={style.title}>{props?.checkedCoupon.title}</View>
              <View className={style.priceWrapper}>
                <Text className={style.price}>
                  -￥{props?.checkedCoupon.amount}
                </Text>
                <Icon value="right" className={style.icon} />
              </View>
            </>
          )}
        </View>
      </Container>
    </>
  );
};

export default Coupon;
