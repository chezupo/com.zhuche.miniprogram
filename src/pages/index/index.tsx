import {View} from '@tarojs/components'

import "taro-ui/dist/style/components/button.scss" // 按需引入
import './index.scss'
// eslint-disable-next-line import/first
import {AtButton} from "taro-ui";
import authCode from "../../nativeInterface/authCode";


const Index = () => {

  const handlePay = (): void => {
    authCode().then(code => {
      console.log(code)
    })
  }

    return (
      <View className='index'>
        <AtButton type='primary' onClick={handlePay} >支付1分钱</AtButton>
      </View>
    )
}

export default Index
