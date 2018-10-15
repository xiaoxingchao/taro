import Taro, { Component } from '@tarojs/taro'
import { View, Text,Button } from '@tarojs/components'
import { AtButton,AtForm,AtInput,AtAvatar,AtToast  } from 'taro-ui'
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
      info:'',
      open:false,
      statusBarHeight:20
    }
  }

  componentWillMount () { }

  componentDidMount () {
    let _this = this;
    Taro.getSystemInfo({
      success: function (res) {
        console.log(res);
        let height = res.statusBarHeight*100/res.screenHeight+'vh';
        _this.setState({
          statusBarHeight:height
        })
      },
    })
    Taro.getUserInfo({
      success: function (res) {
        _this.setState({
          url:res.userInfo.avatarUrl,
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
        <View className='header' style={{top:this.state.statusBarHeight,height:'44px',lineHeight: '44px'}}>
          京环之声
        </View>
        <View className='con'>
          <View className='con_h' >
            <View className=''>

            </View>
            <AtToast
              isOpened={this.state.open}
              text={this.state.info}
            >
            </AtToast>
            <Button onClick={this.login.bind(this)}>login</Button>
            <Button open-type='contact' >77777777</Button>
            <Button open-type='getUserInfo' >2222</Button>
            <AtButton type='primary' onClick={this.button.bind(this)} >返回</AtButton>
            <AtAvatar
              circle
              size='small'
              className='avatar'
              customStyle='width:80px; height:80px;'
              image={this.state.url}
            />
            <Text>
              怎了
            </Text>
            {/* <AtButton>77</AtButton> */}
            <AtButton type='primary' onClick={this.button.bind(this)} >按钮文案</AtButton>
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
          11111111111
        </View>


      </View>
    )
  }
}
