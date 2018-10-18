import Taro, { Component } from '@tarojs/taro'
import { View, Text,Navigator,Button,Image  } from '@tarojs/components'
import { AtAvatar,AtIcon  } from 'taro-ui'
import Sign from '../component/Sign/index'
import Model from '../component/Model/index'
import Bottom from '../component/Bottom/index'
import './index.less'
import bg from '../image/indexheadimg.png'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '京环之声',
    // 定义需要引入的第三方组件
    // usingComponents: {
    //   "van-button": "../../components/vant-weapp/dist/button/index" // 书写第三方组件的相对路径
    // }
  }
  constructor(props){
    super(props);
    this.state={
      url:'',
      name:''
    }
  }

  componentWillMount () { }

  componentDidMount () {
    let _this = this;
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
      title:"setup",
      url: '/pages/setup/index'
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
  onShareAppMessage = (res) => {
    console.log(res)
    // if (res.from === 'button') {
    //   // 来自页面内转发按钮

    // }

  }
  render () {
    return (
      <View className='index'>
        <View className='header_bg'>
        </View>
        <View className='con' >
          <View className='con_h' >
            <View className='pri_info'>
              <Image
                src={bg}
                className='img'
              >
              </Image>
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
                    {/* <Navigator url='../setup/index'> */}
                      <AtIcon value='user' size='30' color='#fff' onClick={this.button.bind(this)}></AtIcon>
                    {/* </Navigator> */}
                  </View>
                  <View className='info_sign'>
                    <Sign />
                  </View>
                </View>
              </View>
              <View className='pri_bottom'>
                <View className='at-row'>
                  <View className='at-col apply'>
                    <Navigator url='../nameapplication/index'>
                      冠名申请
                    </Navigator>
                  </View>
                  <View className='at-col service'>
                    微信客服
                    <Button openType='contact' className='kefu'></Button>
                  </View>
                  <View className='at-col'>
                    <Navigator url='../answerrule/index'>
                      答题规则
                    </Navigator>
                  </View>
                </View>
              </View>
            </View>
            <View className='madel'>
              <View className='at-row'>
                <View className='at-col at-col-6 model_left'>
                  <Model name='经典答题' url='../luckdraw/index' bg='jingdian' />
                  <Model name='夺宝答题' url='../luckdraw/index' bg='duobao' />
                  <Model name='竞技答题' url='../luckdraw/index' bg='jingji' />
                  <Model name='公益答题' url='../luckdraw/index' bg='gongyi' />
                </View>
                <View className='at-col at-col-6 model_right'>
                  <Model name='幸运抽奖' url='../luckdraw/index' bg='xingyun' />
                  <Model name='专题答题' url='../luckdraw/index' bg='zhuanti' />
                  <Model name='积分兑换' url='../luckdraw/index' bg='jifen' />
                  <Model name='京环森林' url='../luckdraw/index' bg='senlin' />
                </View>

              </View>
              <View className='at-row'>
                <View className='at-col at-col-12'>
                  <Model name='排行榜' url='a' bg='paihang' />
                </View>
              </View>
            </View>
            <Bottom />
          </View>
        </View>
      </View>
    )
  }
}
