import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.less'
import { AtButton,AtAvatar } from 'taro-ui'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页',
    // 定义需要引入的第三方组件
    // usingComponents: {
    //   "van-button": "../../components/vant-weapp/dist/button/index" // 书写第三方组件的相对路径
    // }
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <Text>Hello world!</Text>
        <AtButton type='primary'>按钮文案</AtButton>
        <AtAvatar image='https://jdc.jd.com/img/200'></AtAvatar>
      </View>
    )
  }
}

