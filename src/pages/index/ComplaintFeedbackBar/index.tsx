import {View} from "@tarojs/components";
import * as React from "react";
import * as router from '../../../store/module/router'
// @ts-ignore
import style from './style.module.scss'
import Icon from "../../../components/Icon";

const ComplaintFeedbackBar = (): React.ReactElement => {
  const handleGoToComplaintFeedbackPage = (): void => {
    router.navigateToFeedbackPage()
  }
  return (
    <View
      className={style.main}
      onClick={handleGoToComplaintFeedbackPage}
    >
      <Icon value='tousupingjia' className={style.icon} />
      <View>投诉建议</View>
    </View>
  )
}

export default ComplaintFeedbackBar
