import Taro, { Component } from '@tarojs/taro'
import { View, Text,Image  } from '@tarojs/components'
import { AtAvatar,AtList, AtListItem  } from 'taro-ui'
import Bottom from '../component/Bottom/index'
import Avatar from '../component/Avatar/index'
import './index.less'
import bg from '../image/indexheadimg.png'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '经典答题',
    // 定义需要引入的第三方组件
    // usingComponents: {
    //   "van-button": "../../components/vant-weapp/dist/button/index" // 书写第三方组件的相对路径
    // }
  }
  constructor(props){
    super(props);
    this.state={
      url:'',
      name:''
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
  personalint=()=>{

  }
  personalinfor=()=>{

  }
  render () {
    return (
      <View className='con'>
        <View className='avatar'>
          <Avatar />
        </View>
        <View className='pri_info'>
          <View className='pri_top'>
            
            
          </View>
        </View>
        <View className='list'>
          
        </View>

        <Bottom></Bottom>
      </View>
    )
  }
}
