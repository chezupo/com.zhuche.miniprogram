import React from "react";
import {useState,useEffect} from "preact/hooks";
import {View} from "@tarojs/components";
import Icon from "../../../../components/Icon";
// @ts-ignore
import style from "./style.module.scss";
import {AgreementItemType} from "../../../../typings";
import {getCheckoutOrderAgreements} from "../../../../api/Agreements";

const Agreements: React.FC = () => {
  const [data, setData] = useState<AgreementItemType[]>([])
  const [detail, setDetail] = useState<string>('')
  useEffect(() => {
    getCheckoutOrderAgreements().then(res => {
      setData(res)
      // setDetail(res[3].content)
    })
  }, [])

  return (
    <>
      {
        detail.length > 0 && (
          <View className={style.detail} dangerouslySetInnerHTML={{__html: detail}} />
        )
      }
      {
        detail.length === 0 && (
          <View className={style.main}>
            {
              data.map(agreement => (
                <View
                  className={style.itemWrapper}
                  key={agreement.id}
                  onClick={() => setDetail(agreement.content)}
                >
                  <View>{agreement.title}</View>
                  <Icon value='right' className={style.icon} />
                </View>
              ))
            }
            <View className={style.notice}>
              <Icon value='exclamation-mark' className={style.icon} />
              <View>
                本订单仅为客户租车预约登记，提交该订单后，客户需要到门店办理具体的租车手续，具体权利义务以签署的合同为准。
              </View>
            </View>
          </View>
        )
      }
    </>
  )
}

export default Agreements
