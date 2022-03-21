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
    startCity: null,
    startStore: null,
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
    }
  }
})
const {reducer: orderReducer, actions} = orderSlice

const setStartCityThunk = (city: CityType) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(setCreatedStartCity(city))
    const areaStores = await getAreaStores(city.code)
    dispatch(setStarCityStores(areaStores))
  }
}

const setEndCityStoresThunk = (city: CityType) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(setCreatedEndCity(city))
    const areaStores = await getAreaStores(city.code)
    dispatch(setEndCityStores(areaStores))
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
} = actions
export {setStartCityThunk, setEndCityStoresThunk}
export default orderReducer
