import './global.scss'
import 'taro-ui/dist/style/index.scss'
import './asesst/font/iconfont/iconfont.css'
import {AppStoreContext, store} from "./store";
import * as React from "react";
import {useEffect} from "react";
import {loginThunk} from "./store/module/me";

const App: React.FC = (props) => {
  useEffect(() => {
    loginThunk().then(() => {

    })
  }, [])
  return (
    <AppStoreContext.Provider value={store}>
      {props.children}
    </AppStoreContext.Provider>
  )
}


export default App
