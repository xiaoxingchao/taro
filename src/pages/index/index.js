
import Taro, { Component } from '@tarojs/taro'
import { View, Text,Navigator,Button,Image  } from '@tarojs/components'
import { AtAvatar,AtIcon,AtModal  } from 'taro-ui'
import Sign from '../component/Sign/index'
import Model from '../component/Model/index'
import Bottom from '../component/Bottom/index'
import Avatar from '../component/Avatar/index'
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
      name:'',
      openModel:false
    }
    this.num = 0;
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
  clickModel=(a)=>{
    if(this.num){
      this.setState({
        openModel:true
      })
    }else{
      Taro.navigateTo({
        url:a
      })
    }
  }
  handleConfirm=()=>{
    this.setState({
      openModel:false
    })
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
                  <View className='avatar_img'>
                    <Avatar />
                  </View>
                </View>
                <View className='name'>
                  <View className='name_n'><open-data type="userNickName" ></open-data></View>
                  <Text>积分: {60000}</Text>
                </View>
                <View className='sign'>
                  <View className='info_icon'>
                    <AtIcon 
                      value='user' 
                      size='30'
                      color='#fff' 
                      onClick={this.button.bind(this)}
                    >
                    </AtIcon>
                  </View>
                  <View className='info_sign'>
                    <Navigator url='../signin/index'>
                      <Sign />
                    </Navigator>
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
                  <View onClick={this.clickModel.bind(this,'../answerjd/index')} className='v'>
                    <Model name='经典答题' url='../answerjd/index' bg='jingdian' />
                  </View>
                  <View onClick={this.clickModel.bind(this,'../luckdraw/index')} className='v'>
                    <Model name='夺宝答题' url='../luckdraw/index' bg='duobao' />
                  </View>
                  <View onClick={this.clickModel.bind(this,'../luckdraw/index')} className='v'>
                    <Model name='竞技答题' url='../luckdraw/index' bg='jingji' />
                  </View>
                  <View onClick={this.clickModel.bind(this,'../luckdraw/index')} className='v'>
                    <Model name='公益答题' url='../luckdraw/index' bg='gongyi' />
                  </View>
                </View>
                <View className='at-col at-col-6 model_right'>
                  <View onClick={this.clickModel.bind(this,'../luckdraw/index')} className='v'>
                    <Model name='幸运抽奖' url='../luckdraw/index' bg='xingyun' />
                  </View>
                  <View onClick={this.clickModel.bind(this,'../luckdraw/index')} className='v'>
                    <Model name='专题答题' url='../luckdraw/index' bg='zhuanti' />
                  </View>
                  <View onClick={this.clickModel.bind(this,'../luckdraw/index')} className='v'>
                    <Model name='积分兑换' url='../luckdraw/index' bg='jifen' />
                  </View>
                  <View onClick={this.clickModel.bind(this,'../luckdraw/index')} className='v'>
                    <Model name='京环森林' url='../luckdraw/index' bg='senlin' />
                  </View>
                </View>

              </View>
              <View className='at-row'>
                <View className='at-col at-col-12'>
                  <View onClick={this.clickModel.bind(this,'../luckdraw/index')} className='v'>
                    <Model name='排行榜' bg='paihang' />
                  </View>
                 
                </View>
              </View>
            </View>
            <Bottom />
          </View>
        </View>
        <AtModal
          isOpened={this.state.openModel}
          title='标题'
          // cancelText='取消'
          confirmText='确认'
          // onCancel={ this.handleCancel }
          onConfirm={ this.handleConfirm.bind(this) }
          content='超过三次'
        />
      </View>
    )
  }
}
