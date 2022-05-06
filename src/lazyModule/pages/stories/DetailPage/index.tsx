import React from "preact/compat";
import {View} from "@tarojs/components";
import {useEffect, useState} from "preact/hooks";
import {useRouter} from "@tarojs/taro";
import MenuContainer from "../../../../components/MenuContainer";
// @ts-ignore
import style from './style.module.scss'
import StoreInfoRender from "./StoreInfoRender";
import Button from "../../../../components/Button";
import {getStoreById} from "../../../../api/store";
import {StoreItemType} from "../../../../typings";
import Loading from "../../../../components/Loading";
import {useCheckedStore} from "../../../../util/storeHook";
import CommandRender from "./CommandRender";

const DetailPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const {params} = useRouter();
  const [store, setStore] = useState<StoreItemType | undefined>()
  useEffect(() => {
    setLoading(true)
    getStoreById(parseInt(params.id)).then(res => {
      setStore(res)
      setLoading(false)
    }).catch(() => setLoading(false) )
  }, [])
  const body = (
    <View className={style.main}>
      {
        !!store  && (<>
          <StoreInfoRender store={store} />
          <CommandRender store={store} />
        </>)
      }
    </View>
  )
  const handleCheckStore = useCheckedStore(store)

  return (<>
    { loading && <Loading /> }
    {
      !params.isFromOrder && (
        <>
          {
            !loading && (
              <MenuContainer menuBar={
                <View className={style.bottomBar}>
                  <Button className={style.button}
                    onClick={handleCheckStore}
                  >选此门店</Button>
                </View>
              }
              >
                {body}
              </MenuContainer>
            )
          }
        </>
      )
    }
    {
      params.isFromOrder && (
        <>
          {body}
        </>
      )
    }
  </>)
}

export default DetailPage
