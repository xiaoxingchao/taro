import Taro, { Component } from '@tarojs/taro'
import { View,Image} from '@tarojs/components'

import { connect } from '@tarojs/redux'
import { bindActionCreators } from 'redux'

// import { AtIcon } from 'taro-ui'
import './loading.less'

import * as Actions from '../../../actions/counter'

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
  state={
    isload:true,
  }
  componentWillMount () { }

  componentDidMount () { 
    let {dispatch} = this.props;
    dispatch({
      type:'ADD',
      payload: {'aaaa': ['222']}
    });
    console.log(this.props);
  }
  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  button=()=>{
    Taro.redirectTo({
      url: '/pages/index/index'
    })
  }
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

