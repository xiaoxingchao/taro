import Taro, { Component } from '@tarojs/taro'
import { View,Text } from '@tarojs/components'
import './bottom.less'


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
        <Text>版权所有:北京市环境保护宣传中心</Text>
      </View>
    )
  }
}

