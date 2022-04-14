import React from "react";
import {useState} from "preact/hooks";
import {Radio, ScrollView, Text, View} from "@tarojs/components";
import Container from "../components";
// @ts-ignore
import style from './style.module.scss'
import Icon from "../../../../components/Icon";
import {primaryThemeColor} from "../../../../global";
import SpinContainer from "../../../../components/SpinContainer";
import Button from "../../../../components/Button";
import {useAppSelector} from "../../../../reduxStore";
import {htmlStringConvert} from "../../../../util/htmlStringUtil";

const Insurance: React.FC = props => {
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
              ￥25 * 24
            </Text>
            ￥<Text className={style.number}>1276</Text>
            <Radio
              className={style.radio}
              color={primaryThemeColor}
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
