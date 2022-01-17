import {View} from '@tarojs/components'

import "taro-ui/dist/style/components/button.scss" // 按需引入
import style from './index.module.scss'
// eslint-disable-next-line import/first
import {AtButton} from "taro-ui";
import authCode from "../../nativeInterface/authCode";
import graphQLClient, {gql} from "../../util/apolloClient";
import quthrizationGQL from "../../graphql/mutaion/authorization";
import OperationInterface from "./OperationInterface";


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
    <View >
      <OperationInterface />
    </View>
  )
}

export default Index
