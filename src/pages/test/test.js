import Taro, { Component } from '@tarojs/taro'
import { View,Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './test.less'
import { add, minus, asyncAdd, list } from '../../actions/counter'

@connect(
  ({ counter }) => ({
    counter
  }),
  (dispatch) => ({
    onGetList(params) {
      dispatch(list(params))
    },
    add () {
      dispatch(add())
    },
    minus () {
      dispatch(minus())
    },
    asyncAdd () {
      dispatch(asyncAdd())
    }
  })
)

export default class Index extends Component {
  
  config = {
    navigationBarTitleText: 'test',
    // 定义需要引入的第三方组件
    // usingComponents: {
    //   "van-button": "../../components/vant-weapp/dist/button/index" // 书写第三方组件的相对路径
    // }
  }
  componentWillMount () { 
    
  }

  componentDidMount () { 
    this.props.onGetList({a:1});
  }
  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  button=()=>{
    // Taro.navigateBack()
    // Taro.redirectTo({
    //   url: '/pages/index/index'
    // })
    Taro.navigateTo({
      title:"goback",
      url: '/pages/addaddress/index'
    })
  }
  render () {
    console.log(this.props);
    return (
      <View className='todo'>
        <Button className='add_btn' onClick={this.props.add}>+</Button>
        <Button className='dec_btn' onClick={this.props.minus}>-</Button>
        <Button className='dec_btn' onClick={this.props.asyncAdd}>async</Button>
        <View>{this.props.counter.num}</View>
        <View>{JSON.stringify(this.props.counter.list)}</View>
      </View>
    )
  }
}

