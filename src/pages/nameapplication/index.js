import Taro, { Component } from '@tarojs/taro'
import { View  } from '@tarojs/components'
import { AtForm,AtInput,AtButton  } from 'taro-ui'
import Bottom from '../component/Bottom/index'
import './index.less'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '冠名申请',
    // 定义需要引入的第三方组件
    // usingComponents: {
    //   "van-button": "../../components/vant-weapp/dist/button/index" // 书写第三方组件的相对路径
    // }
  }
  constructor(props){
    super(props);
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
      title:"goback",
      url: '/pages/test/index'
    })
  }
  getinfo=()=>{
  }
  personalint=()=>{

  }
  personalinfor=()=>{

  }
  render () {
    return (
      <View className='con'>
        <AtForm
          onSubmit={this.onSubmit.bind(this)}
          onReset={this.onReset.bind(this)}
        >
          <AtInput
            name='value1'
            title='公司名称'
            type='text'
            placeholder='请输入...'
            value={this.state.value1}
            onChange={this.handleChange.bind(this)}
          />
          <AtInput
            name='value2'
            title='联系人'
            type='text'
            placeholder='请输入...'
            value={this.state.value1}
            onChange={this.handleChange.bind(this)}
          />
          <AtInput
            name='value3'
            title='联系方式'
            type='text'
            placeholder='请输入...'
            value={this.state.value1}
            onChange={this.handleChange.bind(this)}
          />
          <View style={{paddingLeft:'10px',color:'#aaa'}}>注意:</View>
          <View className='submit'>
            <AtButton type='primary' size='normal'>提交申请</AtButton>
          </View>

        </AtForm>

        <Bottom></Bottom>
      </View>
    )
  }
}
