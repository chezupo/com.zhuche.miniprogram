import React from "react";
import {useRouter} from "@tarojs/taro"
import {useState,useEffect} from "preact/hooks";
import {View} from "@tarojs/components";
import Icon from "../../../../components/Icon";
import style from "./style.module.scss";
import {getCheckoutOrderAgreements} from "../../../../api/Agreements";
import Loading from "../../../../components/Loading";

const Agreements: React.FC = () => {
  const [data, setData] = useState<AgreementItemType[]>([])
  const [detail, setDetail] = useState<string>('')
  const {params} = useRouter()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    getCheckoutOrderAgreements().then(res => {
      setData(res)
      if (params.index) {
        setDetail(res[parseInt(params.index)].content)
      }
      setLoading(false)
    }).catch(() => {
      setLoading(false)
    })
  }, [])

  return (
    <>
      {
        loading && <Loading />
      }
      {
        !loading && (
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
    </>

  )
}

export default Agreements
