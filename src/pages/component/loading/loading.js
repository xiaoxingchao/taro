import Taro, { Component } from '@tarojs/taro'
import { View,Image} from '@tarojs/components'

// import { connect } from '@tarojs/redux'

// import { AtIcon } from 'taro-ui'
import './loading.less'

export default class Index extends Component {
  state={
    isload:true,
  }
  componentWillMount () { }

  componentDidMount () { 
    
  }
  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  componentWillReceiveProps(nextProps){
    if(this.props.load!==nextProps.load){
      this.setState({
        isload:nextProps.load
      })
    }
  }
  render () {
    
    return (
      <View className='container-load' hidden={!this.state.isload} >
        <View className='loadBox'>
          <View className='load'>
            <Image src={require('../../image/animation_1.png')}></Image>
          </View>
          <View className='load loading'>
            <Image src={require('../../image/animation_2.png')}></Image>
          </View>
        </View>
      </View>
    )
  }
}
Index.defaultProps={
  load:true,
};

