import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import '@tarojs/async-await'
import Index from './pages/index'
import './app.less'
import configStore from './store'


const store = configStore()
class App extends Component {


  config = {
    pages: [
      'pages/index/index',
      'pages/test/test',
      'pages/setup/setup',
      'pages/signin/signin',
      'pages/nameapplication/nameapplication',
      'pages/answerrule/answerrule',
      'pages/luckdraw/luckdraw',
      'pages/answerjd/answerjd',
      'pages/addaddress/addaddress'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#4CA1FF',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: '#fff',
      // navigationStyle:'custom'
    }
  }

  componentDidMount () {
    if (process.env.TARO_ENV === "weapp") {
      require("taro-ui/dist/weapp/css/index.css")
    } else if (process.env.TARO_ENV === "h5") {
      require("taro-ui/dist/h5/css/index.css")
    }
  }

  componentDidShow () {}

  componentDidHide () {}

  componentCatchError () {}

  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
