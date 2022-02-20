import {View} from "@tarojs/components";
import * as React from "react";
import * as router from '../../../store/module/router'
// @ts-ignore
import style from './style.module.scss'

const ComplaintFeedbackBar = (): React.ReactElement => {
  const handleGoToComplaintFeedbackPage = (): void => {
    router.navigateTo('/pages/index/complaintFeedback/index')
  }
  return (
    <View
      className={style.main}
      onClick={handleGoToComplaintFeedbackPage}
    >
      <View className={['iconfont icon-tousupingjia', style.icon].join(' ')} />
      <View>投诉建议</View>
    </View>
  )
}

export default ComplaintFeedbackBar
