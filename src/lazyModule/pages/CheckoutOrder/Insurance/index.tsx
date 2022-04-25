import React from "react";
import {useState} from "preact/hooks";
import {ScrollView, Text, View} from "@tarojs/components";
import Container from "../components";
// @ts-ignore
import style from './style.module.scss'
import Icon from "../../../../components/Icon";
import SpinContainer from "../../../../components/SpinContainer";
import Button from "../../../../components/Button";
import {useAppSelector} from "../../../../reduxStore";
import {htmlStringConvert} from "../../../../util/htmlStringUtil";
import Radio from "../../../../components/Radio";
import {primaryThemeColor} from "../../../../global";

type InsurancePropsType = {
  checked: boolean
  onChange: (newValue: boolean) => void
  insuranceFee: number
  days: number
}
const Insurance: React.FC<InsurancePropsType> = props => {
  const [visitableDetail, setVisitableDetail] = useState<boolean>(false)
  let insuranceAgreement = useAppSelector(state => state.configuration.config.insuranceAgreement)
  insuranceAgreement = htmlStringConvert(insuranceAgreement)

  return (<>
    <Container >
      <View className={style.main}>
        <View className={style.title}>
          <Icon value='insurance' className={style.icon}  />
          <View>租车保障.安全出行</View>
        </View>
        <View className={style.itemWrapper}>
          <View>
            <View className={style.itemTitle}>
              <View>驾无忧</View>
              <Icon value='help' className={style.icon} onClick={() => setVisitableDetail(!visitableDetail)} />
            </View>
            <View className={style.subTitle}>代缴不扣分罚款，最高免600元</View>
          </View>

          <View className={style.amountWrapper}>
            <Text className={style.amount}>
              ￥{props.insuranceFee} * {props.days}
            </Text>
            ￥<Text className={style.number}>{props.insuranceFee * props.days}</Text>
            <Radio
              className={style.radio}
              checked={props.checked}
              color={primaryThemeColor}
              onChange={props.onChange}
            />
          </View>
        </View>
      </View>
    </Container>
    {
      visitableDetail && (
        <SpinContainer className={style.spinContainer}>
          <View className={style.contentContainer}>
            <ScrollView
              className={style.content}
              scrollY
            >
              <View dangerouslySetInnerHTML={{__html: insuranceAgreement}} />
            </ScrollView>
            <Button
              className={style.button}
              onClick={() => setVisitableDetail(false)}
            >我知道了</Button>
          </View>
        </SpinContainer>
      )
    }
  </>)
}

export default Insurance
