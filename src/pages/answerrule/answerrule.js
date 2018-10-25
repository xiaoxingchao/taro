import Taro, { Component } from '@tarojs/taro'
import { View,Text } from '@tarojs/components'
import Bottom from '../component/bottom/bottom'
import './answerrule.less'

export default class Index extends Component {
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
  render () {
    return (
      <View className='con'>
        <Text>规则;.......</Text>

        <Bottom></Bottom>
      </View>
    )
  }
}
