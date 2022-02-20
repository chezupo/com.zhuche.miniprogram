import {Component} from 'react'
import './global.scss'
import 'taro-ui/dist/style/index.scss'
import './asesst/font/iconfont/iconfont.css'
import {store, AppStoreContext} from "./store";

class App extends Component {

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 是将要会渲染的页面

  render () {
    return (
      <AppStoreContext.Provider value={store}>
        {this.props.children}
      </AppStoreContext.Provider>
    )
  }
}


export default App
