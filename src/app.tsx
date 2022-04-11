import * as React from "react";
import {useEffect} from "react";
import {Provider} from 'react-redux'
import reduxStore, {useAppDispatch} from './reduxStore/index'
import {AppStoreContext, store as store} from "./store";
import './global.scss'
import './asesst/font/iconfont/iconfont.css'
import {initThunk} from "./reduxStore/module/banner";
import {initThunk as cityInitThunk} from "./reduxStore/module/city"
import permission from "./components/Permission";
import {loginThunk} from "./reduxStore/module/me";

const InitData: React.FC  = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    permission.call([
      dispatch(loginThunk()),
      dispatch(initThunk()),
      dispatch(cityInitThunk())
    ]).then(() => {
      console.log("App data init.")
    })
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
