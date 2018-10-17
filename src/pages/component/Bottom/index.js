import Taro, { Component } from '@tarojs/taro'
import { View,Text } from '@tarojs/components'
import './index.less'


export default class App extends Component {
  componentWillMount () { }

  componentDidMount () { 
    
  }
  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  render () {
    return (
      <View className='copyright'>
        <Text>版权:aaaa</Text>
      </View>
    )
  }
}

