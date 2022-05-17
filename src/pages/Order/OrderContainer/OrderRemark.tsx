import React from "preact/compat";
import {View} from "@tarojs/components";
import {getStatusMapInfo} from "../../../util/orderUtil";
// @ts-ignore
import style from "./style.module.scss";
import {OrderPropsType} from "../../../lazyModule/pages/OrderDetailPage/Transaction";

const OrderRemark: React.FC<OrderPropsType> = ({order: data}) => {
  return (
    <>
      {
        getStatusMapInfo(data).notice &&
        (
          <View className={style.notice}>{
            getStatusMapInfo(data).notice
          }</View>
        )
      }
    </>
  )

}

export default OrderRemark
