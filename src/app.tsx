import * as React from "react";
import {useEffect} from "react";
import {Provider} from 'react-redux'
import reduxStore, {useAppDispatch} from './reduxStore/index'
import {AppStoreContext, store as store} from "./store";
import {loginThunk} from "./store/module/me";
import './global.scss'
import './asesst/font/iconfont/iconfont.css'
import {initThunk} from "./reduxStore/module/banner";
import {initThunk as cityInitThunk} from "./reduxStore/module/city"

const InitData: React.FC  = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    loginThunk().then(() => { })
    dispatch(initThunk()).then(() => console.log("Init the banners."))
    dispatch(cityInitThunk()).then(() => console.log("Init the cities."))
  }, [])
  return <></>
}

const App: React.FC = (props) => {
  return (
    <AppStoreContext.Provider value={store}>
      <Provider store={reduxStore} >
        <InitData />
        {props.children}
      </Provider>
    </AppStoreContext.Provider>
  )
}


export default App
