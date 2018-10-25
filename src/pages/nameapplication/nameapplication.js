import Taro, { Component } from '@tarojs/taro'
import { View,Form,Button,Input } from '@tarojs/components'
import { AtForm,AtInput,AtButton  } from 'taro-ui'
import Bottom from '../component/Bottom/index'
import './nameapplication.less'

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
    this.state={
      
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
      title:"goback",
      url: '/pages/test/index'
    })
  }
  getinfo=()=>{
  }
  formSubmit=(event)=>{
    console.log('000');
    console.log('a: ', event);
  }
  render () {
    return (
      <View className='con'>
        {/* <Form onSubmit={this.formSubmit} onReset={this.formReset} >
          <AtInput
            name='value1'
            title='公司名称'
            type='text'
            placeholder='请输入...'
            // value={this.state.value1}
            // onChange={this.handleChange.bind(this)}
          />
          <Button type='primary' size='normal' circle formType='submit' >提交申请</Button>
        </Form> */}
        <Form
          onSubmit={this.formSubmit.bind(this)}
          onReset={this.onReset.bind(this)}
          className='form'
        >
          <AtInput
            name='value1'
            title='公司名称'
            type='text'
            placeholder='请输入...'
            // value={this.state.value1}
            // onChange={this.handleChange.bind(this)}
          />
          <AtInput
            name='value2'
            title='联系人'
            type='text'
            placeholder='请输入...'
            // value={this.state.value1}
            // onChange={this.handleChange.bind(this)}
          />
          <AtInput
            name='value3'
            title='联系方式'
            type='text'
            placeholder='请输入...'
            // value={this.state.value1}
            // onChange={this.handleChange.bind(this)}
          />
          <View style={{paddingLeft:'10px',color:'#aaa'}}>注意:</View>
          <Button size='normal' formType='submit' className='nalsubmitapply'>提交申请</Button>

        </Form>

        <Bottom></Bottom>
      </View>
    )
  }
}
