import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './avatar.less'


export default class App extends Component {
  componentWillMount () { }

  componentDidMount () { 
    
  }
  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  render () {
    return (
      <View className='avatar'>
        <View className='avatar_img'>
          <open-data type='userAvatarUrl' ></open-data>
        </View>
      </View>
    )
  }
}

