import {Input, View} from "@tarojs/components";
import taro from "@tarojs/taro";
import {useState} from "preact/hooks";
import React from "preact/compat";
import SpinContainer from "../../../../../components/SpinContainer";
import Button from "../../../../../components/Button";
// @ts-ignore
import style from "../style.module.scss";

type TopUpRenderPropsType = {
  onSubmit:(amount: number) => void
  onCancel:() => void
}
const TopUpRender: React.FC<TopUpRenderPropsType> = props => {
  const [topUp, setTopUp] = useState<number | undefined>(undefined)
  const handleChangeTopUp = (e) => {
    setTopUp( Math.round( e.currentTarget.value * 100 ) / 100.0
    )
  }
  const handleSubmit = async () => {
    if (topUp < 0.01) {
      await taro.showToast({
        title: '充值额度不能小于0.01',
        duration: 3000
      })
      return
    }
    props.onSubmit(topUp)
  }

  return (
    <>
      <SpinContainer>
        <View className={style.topUpWrapper}>
          <View>充值金额</View>
          <View className={style.inputWrapper}>
            <View>¥</View>
            <Input
              type='number'
              onInput={handleChangeTopUp}
              placeholder='输入金额'
              {...(topUp ? {value: topUp + ''} : {})}
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
