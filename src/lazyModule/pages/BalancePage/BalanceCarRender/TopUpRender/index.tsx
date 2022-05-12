import {Input, Textarea, View} from "@tarojs/components";
import taro, {useTabItemTap} from "@tarojs/taro";
import {useState} from "preact/hooks";
import React from "preact/compat";
import SpinContainer from "../../../../../components/SpinContainer";
import Button from "../../../../../components/Button";
// @ts-ignore
import style from "../style.module.scss";
import {TopUpValueType} from "../../../../../api/topUp";

export type TopUpRenderPropsType = {
  onSubmit:(newValue:TopUpValueType) => void
  onCancel:() => void
  title: string
  isShowWithdrawNotice?: boolean
}
const TopUpRender: React.FC<TopUpRenderPropsType> = props => {
  const [topUp, setTopUp] = useState<number | undefined>(undefined)
  const [remark, setRemark] = useState<string>('')
  const handleChangeTopUp = (e) => {
    setTopUp( Math.round( e.currentTarget.value * 100 ) / 100.0
    )
  }
  const handleChangeRemark = (e) => {
    setRemark(e.currentTarget.value)
  }
  const handleSubmit = async () => {
    if (topUp < 0.01) {
      await taro.showToast({
        title: '充值额度不能小于0.01',
        duration: 3000
      })
      return
    }
    props.onSubmit({
      amount: topUp,
      remark
    })
  }

  return (
    <>
      <SpinContainer>
        <View className={style.topUpWrapper}>
          <View>{props.title}</View>
          {props.isShowWithdrawNotice && <View className={style.notice}>提现将在2个工作日内完成</View> }
          <View className={style.inputWrapper}>
            <View>¥</View>
            <Input
              type='number'
              onInput={handleChangeTopUp}
              placeholder='输入金额'
              {...(topUp ? {value: topUp + ''} : {})}
            />
          </View>
          <View className={style.textarea}>
            <View>备注</View>
            <Textarea
              onInput={handleChangeRemark}
              placeholder='添加备注'
              {...(remark ? {value: remark} : {})}
            />
          </View>
          <View className={style.buttonWrapper}>
            <Button onClick={() => props.onCancel()}>取消</Button>
            <Button
              type='primary'
              onClick={handleSubmit}
            >确定</Button>
          </View>
        </View>
      </SpinContainer>
    </>

  )
}

export default TopUpRender
