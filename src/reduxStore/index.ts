import {applyMiddleware, compose, configureStore, createStore} from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import bannersReducer from "./module/banner";

const composeEnhancers =
  // @ts-ignore
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ }) : compose
const middlewares = [
  thunkMiddleware
]

if (process.env.NODE_ENV === 'development' && process.env.TARO_ENV !== 'quickapp') {
  middlewares.push(require('redux-logger').createLogger())
}

const enhancer = composeEnhancers(
  applyMiddleware(...middlewares),
  // other store enhancers if any
)

const store =  configureStore({
    reducer: {
      banner:bannersReducer
    },
  enhancers: [enhancer]
  }
)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

