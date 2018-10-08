import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtButton,AtAvatar } from 'taro-ui'
import './index.less'


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
  // button=()=>{
  //   Taro.redirectTo({
  //     url: '/pages/user/index'
  //   })
  // }
  render () {
    return (
      <View className='index'>
        <Text>Hello world!6666</Text>

      </View>
    )
  }
}

