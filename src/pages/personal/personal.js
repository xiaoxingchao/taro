import Taro, { Component } from '@tarojs/taro'
import { View,  } from '@tarojs/components'
import { AtList, AtListItem  } from 'taro-ui'
import Bottom from '../component/bottom/bottom'
import './personal.less'
// import Loading from '../component/loading/loading'


export default class Index extends Component {

  config = {
    navigationBarTitleText: '个人信息',
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
  address=()=>{
    Taro.navigateTo({
      title:"收货地址",
      url: '/pages/address/address'
    })
  }
  render () {
    return (
      <View className='con'>
        <View className='list'>
          <AtList >
            <AtListItem
              title='收货地址'
              arrow='right'
              onClick={this.address.bind(this)}
            />
          </AtList>
        </View>
        <Bottom></Bottom>
        {/* <Loading load={this.state.isload} /> */}
      </View>
    )
  }
}
