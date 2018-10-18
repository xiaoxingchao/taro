import Taro, { Component } from '@tarojs/taro'
import { View,Image} from '@tarojs/components'
// import { AtButton } from 'taro-ui'
import Luck from '../component/LuckDraw/index'
import './index.less'


export default class Index extends Component {
  
  config = {
    navigationBarTitleText: '抽奖',
    // 定义需要引入的第三方组件
    // usingComponents: {
    //   "van-button": "../../components/vant-weapp/dist/button/index" // 书写第三方组件的相对路径
    // }
  }
  componentWillMount () { }

  componentDidMount () { 
    
  }
  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  render () {
    return (
      <View className='luck_draw'>
        {/* <Image
          src={}
        ></Image> */}
        <Luck />

      </View>
    )
  }
}

