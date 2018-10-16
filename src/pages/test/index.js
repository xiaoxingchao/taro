import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import './index.less'


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
    Taro.redirectTo({
      url: '/pages/index/index'
    })
  }
  render () {
    return (
      <View className='header'>
        <Text>
          怎了8888888
        </Text>
        {/* <AtButton>77</AtButton> */}
        <AtButton type='primary' onClick={this.button.bind(this)}>按钮文案</AtButton>
        {/* <AtForm>
          <AtInput
            name='value1'
            title='文本'
            type='text'
            placeholder='单行文本'
            value={this.state.value1}
            onChange={this.handleChange.bind(this)}
          />
        </AtForm> */}

      </View>
    )
  }
}

