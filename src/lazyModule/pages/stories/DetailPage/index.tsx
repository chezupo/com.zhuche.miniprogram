import React from "preact/compat";
import {View} from "@tarojs/components";
import {useEffect, useState} from "preact/hooks";
import {useRouter} from "@tarojs/taro";
import MenuContainer from "../../../../components/MenuContainer";
// @ts-ignore
import style from './style.module.scss'
import StoreInfoRender from "./StoreInfoRender";
import CommandRender from "./CommandRender";
import Button from "../../../../components/Button";
import {getStoreById} from "../../../../api/store";
import {StoreItemType} from "../../../../typings";
import Loading from "../../../../components/Loading";

const DetailPage: React.FC = () => {
  const {params} = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [store, setStore] = useState<StoreItemType>({
    id: 0,
    name: '',
    mark: '',
    starAt: '',
    endAt: '',
    address: '',
    servicePhone: '',
    lat: 0,
    lng: 0,
    isEnable: false,
    isStation: false,
    isAirport: false,
    isSelfService: false,
    banners:[],
    pickupGuides:[],
    returnGuides:[],
    city: {
      code:  '',
      name: '',
      pinyin: '',
    },
    area: {
      code: '',
      name: '',
    },
    province: {
      code: '',
      name: '',
    },
    admin:{
      id: 0,
      username: '',
      isEnabled: false
    }
  })
  useEffect(() => {
    setLoading(true)
    getStoreById(parseInt(params.id)).then(res => {
      setStore(res)
      setLoading(false)
    }).catch(() => setLoading(false) )
  }, [])
  return (<>
    { loading && <Loading /> }
    {
      !loading && (
        <MenuContainer menuBar={
          <View className={style.bottomBar}>
            <Button className={style.button}>选此门店</Button>
          </View>
        }
        >
          <View className={style.main}>
            <StoreInfoRender store={store} />
            <CommandRender />
          </View>
        </MenuContainer>
      )
    }
  </>)
}

export default DetailPage
