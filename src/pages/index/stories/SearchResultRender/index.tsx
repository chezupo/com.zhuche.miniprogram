import * as React from "react";
import {useEffect, useState} from "react";
import {debounce} from "@wuchuhengtools/helper";
import {View} from "@tarojs/components";
// @ts-ignore
import style from "./style.module.scss"
import {getStores} from "../../../../api/store";
import {StoreItemType} from "../../../../typings";
import {EmptyNoticeRender} from "./NotFoundRender";
import SearchResult from "./SearchResultListRender";
import {useAppDispatch, useAppSelector} from "../../../../reduxStore";
import {setEndStore, setStarStore, StartStoreOrEndStoreType} from "../../../../reduxStore/module/order";
import {navigateToHome} from "../../../../store/module/router";

type SearchResultRenderPropsType = {
  value: string
}
const handleSearch = debounce( ({value, success}: {value: string; success: (stores: StoreItemType[]) => void}) => {
  value.length > 0 && getStores(value).then(res => success(res))
}, 1000)
const SearchResultRender: React.FC<SearchResultRenderPropsType> = (props) => {
  const [stores, setStores] = useState<StoreItemType[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  useEffect(() => {
    const keyword = props.value.trim()
    if (keyword.length > 0) {
      setLoading(true)
      handleSearch({
        value: keyword,
        success: (newStores) => {
          setLoading(false)
          setStores(newStores)
        }
      })
    }
  }, [props.value])
  const dispatch = useAppDispatch()
  const {createOrder} = useAppSelector(state => state.order)
  const handleSelectStore = (store: StoreItemType): void => {
    switch (createOrder.startStoreOrEndStore) {
      case StartStoreOrEndStoreType.START:
        dispatch(setStarStore(store))
        break;
      case StartStoreOrEndStoreType.END:
        dispatch(setEndStore(store))
        break
    }
    navigateToHome()
  }

  return (
    <View className={style.main}>
      { props.value.length === 0 &&  <EmptyNoticeRender /> }
      { props.value.length > 0 &&
      <SearchResult
        stores={stores}
        keyword={props.value}
        loading={loading}
        onClick={handleSelectStore}
      /> }
    </View>
  )
}

export default SearchResultRender
