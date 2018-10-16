import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import './index.less'


export default class Index extends Component {
  componentWillMount () { }

  componentDidMount () { 
    
  }
  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  button=()=>{
    Taro.redirectTo({
      url: '/pages/index/index'
    })
  }
  render () {
    return (
      <View className='info_icon'>
        <AtIcon value='user' size='30' color='#fff'></AtIcon>
      </View>
    )
  }
}

