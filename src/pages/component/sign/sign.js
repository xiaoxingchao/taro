import Taro, { Component } from '@tarojs/taro'
import { View,Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import './sign.less'


export default class Index extends Component {
  componentWillMount () { }

  componentDidMount () { 
    
  }
  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  toSign=()=>{
    Taro.navigateTo({
      title:"签到",
      url: '/pages/signin/signin'
    })
  }
  render () {
    return (
      <View className='sign' onClick={this.toSign.bind(this)}>
        <AtIcon value='calendar' size='12' color='#4ca1ff'></AtIcon>
        <Text className='text'>签到</Text>
      </View>
    )
  }
}

