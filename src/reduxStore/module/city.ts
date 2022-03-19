import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CityType} from "../../typings";
import {AppDispatch, RootState} from "../index";
import {getCity} from "../../api/city";

type LetterMapCitiesType = {
  key: string
  list: CityType[]
}[]
type InitialStateType = {
  loading: boolean
  list: LetterMapCitiesType
}

const initialState:InitialStateType = {
  loading: false,
  list: []
}

const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    init: (state, payload: PayloadAction<LetterMapCitiesType>): InitialStateType => {
      return {...state, list: payload.payload}
    },
    loading: (state, payload: PayloadAction<boolean>) => {
      return {...state, loading: payload.payload}
    }
  }
})
const cityReducer = citySlice.reducer

export const initThunk = () => {
  return async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
    dispatch(loading(true))
    try {
      const cities = await getCity()
      const result: LetterMapCitiesType = []
      const letterMapIndex: Map<string, number> = new Map<string, number>()
      cities.forEach(city => {
        const key = city.pinyin.substr(0, 1).toUpperCase()
        if (letterMapIndex.has(key)) {
          const index = letterMapIndex.get(key)
          result[index].list = [...result[index].list, city]
        } else {
          result.push({key, list:[city]})
          letterMapIndex.set(key, result.length - 1)
        }
      })
      dispatch(init([...result]))
      return
    }catch(e) {
      throw new Error(e)
    }finally {
      dispatch(loading(false))
    }
  }
}

export const {init, loading} = citySlice.actions
export default cityReducer
