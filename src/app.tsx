import 'taro-ui/dist/style/index.scss'
import * as React from "react";
import {Provider} from 'react-redux'
import reduxStore from './reduxStore/index'
import {AppStoreContext, store as store} from "./store";
import {loginThunk} from "./store/module/me";
import './global.scss'
import './asesst/font/iconfont/iconfont.css'


class App extends React.Component {
  componentDidShow () {
    loginThunk().then(() => { })
  }

  render () {
    return (
      <Provider store={reduxStore} >
        <AppStoreContext.Provider value={store}>
          {this.props.children}
        </AppStoreContext.Provider>
      </Provider>
    )
  }
}


export default App
