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
      'pages/index/index',//主页 
      'pages/test/test', //测试
      'pages/setup/setup',  //个人中心
      'pages/personal/personal', //个人信息
      'pages/address/address', //收货地址
      'pages/addaddress/addaddress', //编辑收货地址
      'pages/scoredetails/scoredetails', //积分详情
      'pages/signin/signin', //签到
      'pages/nameapplication/nameapplication', //冠名申请
      'pages/answerrule/answerrule', //答题规则
      'pages/luckdraw/luckdraw',//幸运抽奖
      'pages/answerjd/answerjd', //经典答题
      'pages/answer_jd/answer_jd', //经典答题结束
      'pages/answerreview/answerreview', //经典答题回顾
      'pages/scorechange/scorechange', //积分兑换
      'pages/productdetails/productdetails', //商品详情
      'pages/nowchange/nowchange', //立即兑换
      'pages/changerecord/changerecord', //兑换记录
      'pages/changesuccess/changesuccess', //兑换成功
      
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
