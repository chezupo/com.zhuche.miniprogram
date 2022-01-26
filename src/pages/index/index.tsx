import "taro-ui/dist/style/components/button.scss" // 按需引入
// eslint-disable-next-line import/first
import authCode from "../../nativeInterface/authCode";
import graphQLClient, {gql} from "../../util/apolloClient";
import quthrizationGQL from "../../graphql/mutaion/authorization";
import OperationInterface from "./OperationInterface";
import Layout from "../../container/Layout";
import Order from "../Order";
import * as React from "react";
import {TabBarType} from "../../store/router";
import Me from "../Me";
import {appName} from "../../config/globalConfig";


const Index = () => {
  const handleCode = async (): Promise<void> => {
    const code = await authCode();
    const res = await graphQLClient({
      query: quthrizationGQL,
      variables: {
        input: {
          platform: "ALIPAY",
          code
        }
      }
    })

    console.log(res)
  }

  const handlePay = () => {
    graphQLClient({
      query: gql`
        mutation CREATEORDER {
          createOrder
        }
      `,
    }).then(({data: {createOrder}}) => {
      console.log(createOrder)
      my.tradePay({
        // 调用统一收单交易创建接口（alipay.trade.create），获得返回字段支付宝交易号trade_no
        tradeNO: `${createOrder}`,
        success: (res) => {
          my.alert({
            content: JSON.stringify(res),
          });
        },
        fail: (res) => {
          my.alert({
            content: JSON.stringify(res),
          });
        }
      });
    })
  }

  const handleFreezeOrder = (): void => {
    graphQLClient({
      query: gql`
        mutation CREATEORDER {
          createFreezeOrder
        }
      `,
    }).then(({data: {createFreezeOrder}}) => {
      console.log(createFreezeOrder)
      my.tradePay({
        // 调用资金冻结接口（alipay.fund.auth.order.app.freeze），获取支付宝预授权参数
        orderStr: createFreezeOrder,
        success: (res) => {
          console.log("success")
          console.log(JSON.stringify(res))
          my.alert({
            content: JSON.stringify(res),
          });
        },
        fail: (res) => {
          console.log("fail")
          console.log(JSON.stringify(res))
          my.alert({
            content: JSON.stringify(res),
          });
        }
      });


    })
  }
  return (
    <Layout
      tabs={[
          { name: '首页', icon: 'iconfont icon-car-o',  type: TabBarType.HOME, element: <OperationInterface /> , navTitle: appName},
          { name: '订单', icon: 'iconfont icon-order',  type: TabBarType.ORDER, element: <Order /> , navTitle: '全部订单'},
          { name: '我的', icon: 'iconfont icon-user', type: TabBarType.ME, element: <Me />, navTitle: '我的' },
      ]}
    />
  )
}

export default Index
