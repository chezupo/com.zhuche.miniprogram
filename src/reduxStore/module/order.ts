import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AreaStoreType, CityType, StoreItemType} from "../../typings";
import {AppDispatch, RootState} from "../index";
import {getAreaStores} from "../../api/area";

export enum StartCityOrEndCityType {
  START,
  END
}
export enum StartStoreOrEndStoreType {
  START,
  END
}
export type TimestampType = number
type CreateOrderType = {
  startCity: CityType | null
  endCity: CityType | null
  startCityOrEndCity: StartCityOrEndCityType
  startStoreOrEndStore: StartStoreOrEndStoreType
  isForeignCity: boolean
  starCityStores: AreaStoreType[]
  endCityStores: AreaStoreType[]
  startStore: StoreItemType | null
  endStore: StoreItemType | null
  starTime: TimestampType
  endTime: TimestampType
}

type InitialStateType = { createOrder: CreateOrderType }
const initialState: InitialStateType = {
  createOrder: {
    // startCity: null,
    startCity: {
        "code": "4602",
        "name": "三亚市",
        "pinyin": "sanya"
    },
    // startStore: null,
    startStore: {
      "id": 1,
      "name": "三亚店",
      "mark": "站内取还",
      "starAt": "00:00",
      "endAt": "23:59",
      "address": "三亚湾路168号,近海虹路",
      "servicePhone": "13427969604",
      "lat": 18.2867,
      "lng": 109.446,
      "isEnable": true,
      "isStation": true,
      "isAirport": true,
      "isSelfService": true,
      "admin": {
        "id": 3,
        "username": "三亚店",
        "isEnabled": true,
      },
      "banners": [
        {
          "id": 1,
          "imgKey": "2022-3-17-17-39-12-1647509952912-231_3.jpg",
          "prefixUrl": "https://zhuche-a1001.qiniu.wuchuheng.com"
        },
        {
          "id": 2,
          "imgKey": "2022-3-17-17-39-17-1647509957087-231_4.jpg",
          "prefixUrl": "https://zhuche-a1001.qiniu.wuchuheng.com"
        }
      ],
      "pickupGuides": [
        {
          "id": 1,
          "imgKey": "2022-3-17-17-40-1-1647510001605-806d6cd71f7141e9b2d8e1d1c8d3140c.jpg",
          "title": "取车指引图1标题",
          "prefixUrl": "https://zhuche-a1001.qiniu.wuchuheng.com"
        }
      ],
      "returnGuides": [
        {
          "id": 1,
          "imgKey": "2022-3-17-17-40-7-1647510007680-85882bc629a74de2a76e480a112f2108.jpg",
          "title": "还车指引图1标题",
          "prefixUrl": "https://zhuche-a1001.qiniu.wuchuheng.com"
        },
        {
          "id": 2,
          "imgKey": "2022-3-17-17-40-22-1647510022949-dc20ea7c29cb4dc2872bfce0905e39fa.jpg",
          "title": "还车指引图2标题",
          "prefixUrl": "https://zhuche-a1001.qiniu.wuchuheng.com"
        }
      ],
      "area": {
        "code": "460204",
        "name": "天涯区"
      },
      "city": {
        "code": "4602",
        "name": "三亚市",
        "pinyin": "sanya"
      },
      "province": {
        "code": "46",
        "name": "海南省"
      }
    } ,
    endStore: null,
    endCity: null,
    starCityStores: [ ],
    endCityStores: [],
    startCityOrEndCity: StartCityOrEndCityType.START,
    startStoreOrEndStore: StartStoreOrEndStoreType.START,
    isForeignCity: false,
    starTime: (new Date()).getTime(),
    endTime: (new Date()).getTime() + 60 * 60 * 24 * 1000 * 2
  }
}
const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setCreatedStartCity: (state, payload: PayloadAction<CityType>): InitialStateType => {
      return {
        ...state, createOrder: {
          ...state.createOrder,
          startCity: payload.payload,
        }}
    },
    setCreatedEndCity: (state, payload: PayloadAction<CityType>): InitialStateType => {
      return {
        ...state, createOrder: {
          ...state.createOrder,
          endCity: payload.payload,
        }}
    },
    setStartCityOrEndCity: (state, payload: PayloadAction<StartCityOrEndCityType>): InitialStateType => {
      return {
        ...state, createOrder: {
          ...state.createOrder,
          startCityOrEndCity: payload.payload
        }}
    },
    setStartStoreOrEndStore: (state, payload: PayloadAction<StartStoreOrEndStoreType>): InitialStateType => {
      return {
        ...state, createOrder: {
          ...state.createOrder,
          startStoreOrEndStore: payload.payload
        }}
    },
    setCreateOrderIsForeignCity: (state, payload: PayloadAction<boolean>): InitialStateType => {
      return {
        ...state, createOrder: {
          ...state.createOrder,
          isForeignCity: payload.payload
        }}
    },
    // 设置开始城市的门店数据
    setStarCityStores: (state, payload: PayloadAction<AreaStoreType[]>) => {
      return {
        ...state,
        createOrder: {
          ...state.createOrder,
          starCityStores: payload.payload
        }
      }
    },
    // 设置用于还车的商店列表
    setEndCityStores: (state, payload: PayloadAction<AreaStoreType[]>) => {
      return {
        ...state,
        createOrder: {
          ...state.createOrder,
          endCityStores: payload.payload
        }
      }
    },
    // 选择开始的商店
    setStarStore: (state, payload: PayloadAction<StoreItemType>) => {
      return {
        ...state,
        createOrder: {
          ...state.createOrder,
          startCity: payload.payload.city,
          startStore: payload.payload
        }
      }
    },
    // 选择结束的商店
    setEndStore: (state, payload: PayloadAction<StoreItemType>) => {
      return {
        ...state,
        createOrder: {
          ...state.createOrder,
          endCity: payload.payload.city,
          endStore: payload.payload
        }
      }
    },
    setTime: (state, payload: PayloadAction<{startTime: TimestampType; endTime: TimestampType}>): InitialStateType => {
      return {
        ...state,
        createOrder: {
          ...state.createOrder,
          starTime: payload.payload.startTime,
          endTime: payload.payload.endTime
        }
      }
    },
    resetStartStore: (state) => {
      return {...state, createOrder: {...state.createOrder, startStore: null}}
    },
    resetEndStore: (state) => {
      return {...state, createOrder: {...state.createOrder, endStore: null}}
    },
  }
})
const {reducer: orderReducer, actions} = orderSlice

const setStartCityThunk = (city: CityType) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(setCreatedStartCity(city))
    const areaStores = await getAreaStores(city.code)
    dispatch(setStarCityStores(areaStores))
    const {startStore} = getState().order.createOrder
    if (startStore && startStore.city.code !== city.code) {
      dispatch(resetStartStore())
    }
  }
}

const setEndCityStoresThunk = (city: CityType) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(setCreatedEndCity(city))
    const areaStores = await getAreaStores(city.code)
    dispatch(setEndCityStores(areaStores))
    const {endStore} = getState().order.createOrder
    if (endStore && endStore.city.code !== city.code) {
      dispatch(resetEndStore())
    }
  }
}

export const {
  setCreatedStartCity,
  setCreatedEndCity,
  setStartCityOrEndCity,
  setCreateOrderIsForeignCity,
  setStartStoreOrEndStore,
  setStarCityStores,
  setStarStore,
  setEndStore,
  setEndCityStores,
  setTime,
  resetEndStore,
  resetStartStore
} = actions
export {setStartCityThunk, setEndCityStoresThunk}
export default orderReducer
