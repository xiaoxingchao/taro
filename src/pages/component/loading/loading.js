import Taro, { Component } from '@tarojs/taro'
import { View,Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import './loading.less'


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
      <View className='sign'>
        <AtIcon value='calendar' size='12' color='#08c'></AtIcon>
        <Text className='text'>签到</Text>
      </View>
    )
  }
}

