import React from "react";
import {View} from "@tarojs/components";
import {useAppSelector} from "../../../../reduxStore";
import {htmlStringConvert} from "../../../../util/htmlStringUtil";

const OrderAgreement: React.FC = () => {
  let {orderAgreement} = useAppSelector(state => state.configuration.config)
  orderAgreement = htmlStringConvert(orderAgreement)

  return (<>
    <View dangerouslySetInnerHTML={{__html: orderAgreement}} />
  </>)

}

export default OrderAgreement
