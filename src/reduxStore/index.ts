import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import bannersReducer from "./module/banner";
import cityReducer from "./module/city";
import enhancer from "./enhancer";
import orderReducer from "./module/order"
import configurationReducer from "./module/configuration";
import carReducer from "./module/cars";
import meReducer from "./module/me";
import layoutReducer from "./module/layout";
import agreementReducer from "./module/agreement";
import userCouponReducer from "./module/userCoupons";

const store =  configureStore({
    reducer: {
      banner:bannersReducer,
      city: cityReducer,
      order: orderReducer,
      configuration: configurationReducer,
      cars: carReducer,
      me: meReducer,
      layout: layoutReducer,
      agreement: agreementReducer,
      userCoupons: userCouponReducer,
    },
  enhancers: [enhancer]
  }
)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store

