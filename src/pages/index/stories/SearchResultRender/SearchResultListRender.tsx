import {View} from "@tarojs/components";
import * as React from "react";
import {StoreItemType} from "../../../../typings";
import style from "./style.module.scss";
import LoadingRender from "./LoadingRender";
import EmptyRender from "./EmptyRender";
import Attraction, {Tmp} from "../List/Attraction";
import {useAppDispatch, useAppSelector} from "../../../../reduxStore";
import {setEndStore, setStarStore, StartStoreOrEndStoreType} from "../../../../reduxStore/module/order";
import {navigateToHome} from "../../../../store/module/router";

type SearchResultPropsType = {
  stores: StoreItemType[]
  keyword: string
  loading: boolean
  onClick: (store: StoreItemType) => void
}
const SearchResult:React.FC<SearchResultPropsType> = ({onClick, stores, keyword, loading}) => {
  const handleClickDetail = (storeItem: StoreItemType) => {
    console.log("Click detail.")

  }
  const handleClickMap = (storeItem: StoreItemType) => {
    console.log("Click map.")
  }
  const SearchResultListRender = () => (
   <>
       {
         stores.map(store=> (
           <Attraction
             value={store}
             key={store.id}
             classname={style.itemRender}
             keyword={keyword}
             onSelect={() => console.log("hello")}
             onClickDetail={() => handleClickDetail(store)}
             onClickMap={() => handleClickMap(store)}
           />
         ))
       }
       <View className={style.bottom}>-- 到底了 --</View>
   </>
  )


  return (
    <>
      {loading && <LoadingRender />}
      {!loading &&
      <View>
        { stores.length > 0 && <SearchResultListRender /> }
        {stores.length === 0 && <EmptyRender /> }
      </View>
      }
    </>
  )
}

export default SearchResult
