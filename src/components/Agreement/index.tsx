import * as React from "react";
import {useEffect, useState} from "preact/hooks";
import {Text, View} from "@tarojs/components";
// @ts-ignore
import style from "./style.module.scss"
import {useAppSelector} from "../../reduxStore";
import {AgreementItemType} from "../../typings";
import {getLoginAgreements} from "../../api/Agreements";
import {navigateArgumentDetail} from "../../store/module/router";

type AgreementPropsType = {
  checked: boolean
  onChange: () => void
}

const Agreement = (props: AgreementPropsType): React.ReactElement => {
  const {appName} = useAppSelector(state => state.configuration.config)
  const [agreements, setAgreements] = useState<AgreementItemType[]>([])
  useEffect(() => {
    getLoginAgreements().then((res) => {
      setAgreements(res)
    })
  },  [])
  const handleShowDetail = (id: number) => navigateArgumentDetail(id)

  return (
    <>
     {agreements.length > 0 && (
       <View className={style.main}>
         登录则默认同意
         <Text className={style.title}
           onClick={() => handleShowDetail(agreements[0].id)}
         >《{`${agreements[0].title}`}》</Text>和
         <Text className={style.title}
           onClick={() => handleShowDetail(agreements[0].id)}
         >
           《{`${agreements[1].title}`}》</Text>
       </View>
     )}
    </>
  )
}

export default Agreement
