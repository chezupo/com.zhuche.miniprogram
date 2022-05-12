import * as React from "react";
import {View} from "@tarojs/components";
import {useRouter} from "@tarojs/taro";
import {useEffect} from "preact/hooks";
import OperationInterface from "./OperationInterface";
import Layout from "../../container/Layout";
import Order from "../Order";
import Me from "../Me";
import Banners from "./Banners";
// @ts-ignore
import style from './style.module.scss'
import Guilds from "./Guids";
import NoticeBar from "./NoticeBar";
import ComplaintFeedbackBar from "./ComplaintFeedbackBar";
import {useAppDispatch, useAppSelector} from "../../reduxStore";
import {TabBarType} from "../../reduxStore/module/layout";
import Icon from "../../components/Icon";
import {loginThunk} from "../../reduxStore/module/me";

const Index = () => {
  const {configuration} = useAppSelector(state => state)
  const {params} = useRouter()
  const dispatch = useAppDispatch()
  useEffect(() => {
    const userId = params.userId ? parseInt(params.userId) : undefined
      dispatch(loginThunk(userId)).then(() => { })
  }, [])
  const IndexRender = () => (
    <>
      <ComplaintFeedbackBar />
      <NoticeBar />
      <View className={style.main}>
        <Banners className={style.swiperRender} />
        <View className={style.operationInterface}>
          <OperationInterface />
          <Guilds />
        </View>
      </View>
    </>
  )

  return (
    <Layout
      tabs={[
          { name: '首页', icon: <Icon value='car-o' style={{fontSize: '7vw'}} />,  type: TabBarType.HOME, element:  <IndexRender />, navTitle: configuration.config.appName},
          { name: '订单', icon: <Icon value='order' style={{fontSize: '7vw'}} /> ,  type: TabBarType.ORDER, element: <Order /> , navTitle: '全部订单', isPermission: true},
          { name: '我的', icon: <Icon value='user' style={{fontSize: '7vw'}} />, type: TabBarType.ME, element: <Me />, navTitle: '我的' },
      ]}
    />
  )
}

export default Index
