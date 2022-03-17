import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {BannerType} from "../../store/module/banner";
import {AppDispatch, RootState} from "../index";
import * as Taro from "@tarojs/taro";
import {prefixUrl} from "../../util/requestClient";
import {getBanners} from "../../api/banners";

type InitialStateType = {
  banners: BannerType[]
  loading: boolean
}
const initialState: InitialStateType = {
  banners:  [],
  loading: false
}

const bannersSlice = createSlice({
  name: 'banners',
  initialState,
  reducers: {
    save: (state, action: PayloadAction<BannerType[]>) => ({...state, ...action.payload }),
    setLoading: (state, action:PayloadAction<boolean>) =>  ({...state, loading: action.payload}),
    init: (state, action:PayloadAction<BannerType[]>) =>  ({...state, banners: action.payload}),
  }
})

const bannersReducer = bannersSlice.reducer
export default bannersReducer
export const {save, setLoading, init} = bannersSlice.actions

export const initThunk = () => {
  return (dispatch: AppDispatch, getSate: () => RootState): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      dispatch(setLoading(true))
      getBanners().then(res => {
        dispatch(init(res))
        return resolve()
      })
        .catch(e => reject(e))
        .finally(() => dispatch(setLoading(false)))
    })
  }
}

