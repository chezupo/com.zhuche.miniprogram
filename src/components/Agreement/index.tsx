import * as React from "react";
import {Checkbox, Text, View} from "@tarojs/components";
import {appName} from "../../config/globalConfig";
// @ts-ignore
import style from "./style.module.scss"

type AgreementPropsType = {
  checked: boolean
  onChange: () => void
}

const Agreement = (props: AgreementPropsType): React.ReactElement => {
  return (
    <View>
      <Checkbox
        checked={props.checked}
        value=''
        onChange={() => props.onChange()}
        className={style.checkBox}
      />
      我已阅读并同意
      <Text className={style.title}>《{`${appName}`}会员注册协议》</Text>和
      <Text className={style.title}>
        《{`${appName}`}租车隐私政策》</Text>
    </View>
  )
}

export default Agreement
