import Taro, { Component } from '@tarojs/taro'
import { View, Text,Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { bindActionCreators } from 'redux'
import './test.less'
// import {add,minus,asyncAdd} from '../../actions/counter'
import * as Actions from '../../actions/counter'

function mapStateToProps(state) {
  return {
    counter: state.counter.toJS()
  }
}
function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(Actions, dispatch)
  }
}
@connect(mapStateToProps, mapDispatchToProps)

export default class Index extends Component {
  
  config = {
    navigationBarTitleText: 'test',
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
    const { add, minus, asyncAdd } = this.props
    return (
      <View className='todo'>
         <Button className='add_btn' onClick={add}>+</Button>
        <Button className='dec_btn' onClick={minus}>-</Button>
        <Button className='dec_btn' onClick={asyncAdd}>async</Button>
        <View>{this.props.counter.num}</View>
      </View>
    )
  }
}

