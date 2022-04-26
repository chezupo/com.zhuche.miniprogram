import React from "preact/compat";
import {View} from "@tarojs/components";
import taro, {useRouter} from "@tarojs/taro";
import {useEffect, useState} from "preact/hooks";
import Loading from "../../../components/Loading";
import {AgreementItemType} from "../../../typings";
import {getAgreementDetail} from "../../../api/Agreements";

const ArgumentDetail: React.FC = () => {
  const {params} = useRouter()
  const [content, setContent] = useState<AgreementItemType | undefined>()
  useEffect(() => {
    if (params.id) {
      getAgreementDetail(parseInt(params.id)).then(res => {
        taro.setNavigationBarTitle({title: res.title}).then(() => console.log('Set agreement detail.'))
        setContent(res)
      })
    }
    console.log(params)
  }, [params])
  return (<>
    { !content && <Loading /> }
    { !!content && (
      <View
        style={{padding: '2vw'}}
        dangerouslySetInnerHTML={{__html: content.content}}
      />
    ) }
  </>)
}

export default ArgumentDetail
