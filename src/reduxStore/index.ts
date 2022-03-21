import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import bannersReducer from "./module/banner";
import cityReducer from "./module/city";
import enhancer from "./enhancer";
import orderReducer from "./module/order"
import configurationReducer from "./module/configuration";

const store =  configureStore({
    reducer: {
      banner:bannersReducer,
      city: cityReducer,
      order: orderReducer,
      configuration: configurationReducer
    },
  enhancers: [enhancer]
  }
)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store

