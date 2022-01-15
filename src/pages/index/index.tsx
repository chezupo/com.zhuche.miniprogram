import {Component} from 'react'
import {View} from '@tarojs/components'

import "taro-ui/dist/style/components/button.scss" // 按需引入
import './index.scss'
// eslint-disable-next-line import/first
import {AtButton} from "taro-ui";
import graphQLClient, {gql} from "../../util/apolloClient";
import errorCodesGraphql from "../../graphql/errorCodes"


export default class Index extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handlePay(): void {
    graphQLClient({
      query: errorCodesGraphql,
    }).then(res => {
      console.log(res)
    })
  }

  render () {
    return (
      <View className='index'>
        <AtButton type='primary' onClick={() => this.handlePay()} >支付1分钱</AtButton>
      </View>
    )
  }
}
