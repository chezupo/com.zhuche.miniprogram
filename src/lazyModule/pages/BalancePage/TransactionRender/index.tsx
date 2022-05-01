import React from "preact/compat";
import {useEffect} from "preact/hooks";
import {View} from "@tarojs/components";
// @ts-ignore
import style from './style.module.scss';
import Icon from "../../../../components/Icon";
import ItemRender from "./ItemRender";
import {useAppDispatch, useAppSelector} from "../../../../reduxStore";
import {getTransactionThunk} from "../../../../reduxStore/module/me";
import NotFound from "../../../../components/NotFound";
import {navigateToTransactionPage} from "../../../../store/module/router";

const TransactionRender: React.FC = () => {
  const transactionItems   = useAppSelector(state => state.me.data?.transactions || [])
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getTransactionThunk()).then(() => {
      console.log("Get transactions.")
    })
  }, [])

  return (<>
    <View className={style.main}>
      <View className={style.header}>
        <View>我的账单</View>
        <View
          className={style.right}
          onClick={() => navigateToTransactionPage()}
        >
          <View>全部</View>
          <Icon value='right' className={style.icon} />
        </View>
      </View>
      <View className={style.container}>
        {
          transactionItems.filter((_, index) => index < 6 ).map(item => (
            <ItemRender
              key={item.id}
              data={item}
            />
          ))
        }
        {
          transactionItems.length === 0 && (
              <NotFound className={style.notFount} title='没有账单数据' />
          )
        }
      </View>
    </View>
  </>)
}

export default TransactionRender
