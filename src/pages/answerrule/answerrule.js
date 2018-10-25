import Taro, { Component } from '@tarojs/taro'
import { View,Text } from '@tarojs/components'
// import { AtForm,AtInput,AtButton  } from 'taro-ui'
import Bottom from '../component/bottom/index'
import './answerrule.less'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '答题规则',
    // 定义需要引入的第三方组件
    // usingComponents: {
    //   "van-button": "../../components/vant-weapp/dist/button/index" // 书写第三方组件的相对路径
    // }
  }
  constructor(props){
    super(props);
    this.state={
      
    }
  }

  componentWillMount () { }

  componentDidMount () {

  }
  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  getinfo=()=>{
  }
  render () {
    return (
      <View className='con'>
        <Text>规则;.......</Text>

        <Bottom></Bottom>
      </View>
    )
  }
}
