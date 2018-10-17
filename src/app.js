import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'
import './app.less'

class App extends Component {
  

  config = {
    pages: [
      'pages/index/index',
      'pages/test/index',
      'pages/setup/index',
      'pages/nameapplication/index',
      'pages/addaddress/index'
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
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
