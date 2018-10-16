import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtAvatar  } from 'taro-ui'
import InfoIcon from '../component/InfoIcon/index'
import Sign from '../component/Sign/index'
import Model from '../component/Model/index'
import './index.less'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页',
    // 定义需要引入的第三方组件
    // usingComponents: {
    //   "van-button": "../../components/vant-weapp/dist/button/index" // 书写第三方组件的相对路径
    // }
  }
  constructor(props){
    super(props);
    this.state={
      url:'',
      statusBarHeight:20,
      screenHeight:500,
      name:''
    }
  }

  componentWillMount () { }

  componentDidMount () { 
    let _this = this;
    Taro.getSystemInfo({
      success: function (res) {
        console.log(res);
        let height = res.statusBarHeight;
        _this.setState({
          statusBarHeight:height,
          screenHeight:res.screenHeight,
        })
      },
    })
    Taro.getUserInfo({
      success: function (res) {
        _this.setState({
          url:res.userInfo.avatarUrl,
          name:res.userInfo.nickName,
          info:JSON.stringify(res),
          open:true
        })
        console.log(res);
      },
      fail:function (res) {
        _this.setState({
          info:JSON.stringify(res),
          open:true
        })
        console.log(res);
      },
    })
  }
  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  button=()=>{
    Taro.navigateTo({
      url: '/pages/test/index'
    })
  }
  getinfo=()=>{
  }
  login=()=>{
    let _this = this;
    Taro.login({
      success: function (res) {
        console.log(res);
        _this.setState({
          info:JSON.stringify(res),
          open:true
        })
      }
    })
  }
  render () {
    return (
      <View className='index'>
        <View className='header_bg'>
        </View>
        <View className='header' style={{top:this.state.statusBarHeight+'px',height:'44px',lineHeight: '44px'}}>
          <Text>京环之声</Text>
        </View>
        <View className='con' style={{top:this.state.statusBarHeight+44+'px',height:this.state.screenHeight-this.state.statusBarHeight-44+'px'}}>
          <View className='con_h' >
            <View className='pri_info'>
              <View className='pri_top'>
                <View className='avatar'>
                  <AtAvatar
                    circle
                    size='small'
                    className='avatar_img'
                    customStyle='width:40px; height:40px;'
                    image={this.state.url}
                  />
                </View>
                <View className='name'>
                  <View className='name_n'><Text>{this.state.name}</Text></View>
                  <Text>积分: {60000}</Text>
                </View>
                <View className='sign'>
                  <View className='info_icon'>
                    <InfoIcon />
                  </View>
                  <View className='info_sign'>
                    <Sign />
                  </View>
                </View>
              </View>
              <View className='pri_bottom'>
                <View className='at-row'>
                  <View className='at-col apply'>冠名申请</View>
                  <View className='at-col service'>微信客服</View>
                  <View className='at-col'>答题规则</View>
                </View>
              </View>
            </View>
            <View className='madel'>
              <View className='at-row'>
                <View className='at-col at-col-6 model_left'>
                  <Model name='经典答题' url='a' bg='test' />
                  <Model name='夺宝答题' url='a' bg='test' />
                  <Model name='竞技答题' url='a' bg='test' />
                  <Model name='公益答题' url='a' bg='test' />
                </View>
                <View className='at-col at-col-6 model_right'>
                  <Model bg='test' name='幸运抽奖' url='c' />
                  <Model name='专题答题' url='a' bg='test' />
                  <Model name='积分兑换' url='a' bg='test' />
                  <Model name='京环森林' url='a' bg='test' />
                </View>
                
              </View>
              <View className='at-row'>
                <View className='at-col at-col-12'>
                  <Model name='排行榜' url='a' bg='test' />
                </View>
              </View>
            </View>
            <View className='copyright'>
              <Text>版权:aaaa</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}