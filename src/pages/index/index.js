import Taro, { Component } from '@tarojs/taro'
import { View, Text,Navigator,Button,Image  } from '@tarojs/components'
import { connect } from '@tarojs/redux'
// import { connect } from '@tarojs/redux'
// import { bindActionCreators } from 'redux'

import {AtIcon} from 'taro-ui'
import Sign from '../component/sign/sign'
import Model from '../component/model/model'
import Bottom from '../component/bottom/bottom'
import Avatar from '../component/avatar/avatar'
// import api from '../../service/api'
import './index.less'
import bg from '../image/indexheadimg.png'
import Login from '../component/login/login'
import Loading from '../component/loading/loading'
import {showModel} from '../../utils/tools'
import { userlist } from '../../actions/counter'


/**
 *京环之声首页
 *
 * @export 
 * @class Index
 * @extends {Component}
 */
@connect(
  ({ counter }) => ({
    counter
  }),
  (dispatch) => ({
    onGetUserList(parame,fun) {
      dispatch(userlist(parame)).then((res)=>{
        fun(res)
      })
    }
  })
)
export default class Index extends Component {
  config = {
    navigationBarTitleText: '京环之声',
  }
  constructor(props){
    super(props);
    this.state={
      isload:true,
      data:{}
    }
  }

  componentWillMount () { }
  initData=(res)=>{
    if(res.data.code===0){
      Taro.setStorageSync("userId", res.data.data[0].id);
      this.setState({
        data:res.data.data[0]
      })
    }
  }
  componentDidMount () {
    this.setState({
      isload:false,
    })
  }
  componentWillUnmount () { }

  componentDidShow () {
    this.props.onGetUserList({},this.initData);
  }

  componentDidHide () { }
  signIcon=()=>{
    Taro.navigateTo({
      title:"setup",
      url: '/pages/setup/setup'
    })
  }
  getinfo=()=>{
  }
  onShareAppMessage = (res) => {
    console.log(res)
    // if (res.from === 'button') {
    //   // 来自页面内转发按钮

    // }

  }
  clickModel=(a)=>{
    let {data} = this.state;
    if(a==='1') return;
    if(a==='../answerjd/answerjd'){
      if(data.jd_count>=3){
        showModel('超过三次')
      }else{
        Taro.navigateTo({
          url:a
        })
      }
    }else{
      Taro.navigateTo({
        url:a
      })
    }
    
  }
  render () {
    let {data} = this.state;
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
                  <View className='name_n'><open-data type='userNickName' controls='{{!canIUse}}'></open-data></View>
                  <Text>积分: {data.score}</Text>
                </View>
                <View className='sign'>
                  <View className='info_icon'>
                    <AtIcon 
                      value='user' 
                      size='30'
                      color='#fff' 
                      onClick={this.signIcon.bind(this)}
                    >
                    </AtIcon>
                  </View>
                  <View className='info_sign'>
                    <Navigator url='../signin/signin'>
                      <Sign />
                    </Navigator>
                  </View>
                </View>
              </View>
              <View className='pri_bottom'>
                <View className='at-row'>
                  {/* <View className='at-col apply'>
                    <Navigator url='../nameapplication/nameapplication'>
                      冠名申请
                    </Navigator>
                  </View> */}
                  <View className='at-col service'>
                    微信客服
                    <Button openType='contact' className='kefu'></Button>
                  </View>
                  <View className='at-col'>
                    <Navigator url='../answerrule/answerrule'>
                      答题规则
                    </Navigator>
                  </View>
                </View>
              </View>
            </View>
            <View className='madel'>
              <View className='at-row'>
                <View className='at-col at-col-6 model_left'>
                  <View onClick={this.clickModel.bind(this,'../answerjd/answerjd')} className='v'>
                    <Model name='经典答题' bg='jingdian' />
                  </View>
                  <View onClick={this.clickModel.bind(this,'1')} className='v'>
                    <Model name='夺宝答题' type='1' bg='duobao' />
                  </View>
                  <View onClick={this.clickModel.bind(this,'../luckdraw/luckdraw')} className='v'>
                    <Model name='竞技答题' url='../luckdraw/index' bg='jingji' />
                  </View>
                  <View onClick={this.clickModel.bind(this,'../luckdraw/luckdraw')} className='v'>
                    <Model name='公益答题' url='../luckdraw/index' bg='gongyi' />
                  </View>
                </View>
                <View className='at-col at-col-6 model_right'>
                  <View onClick={this.clickModel.bind(this,'../luckdraw/luckdraw')} className='v'>
                    <Model name='幸运抽奖' url='../luckdraw/index' bg='xingyun' />
                  </View>
                  <View onClick={this.clickModel.bind(this,'../luckdraw/luckdraw')} className='v'>
                    <Model name='专题答题' url='../luckdraw/index' bg='zhuanti' />
                  </View>
                  <View onClick={this.clickModel.bind(this,'../scorechange/scorechange')} className='v'>
                    <View className='v-text'>
                      {data.score}
                    </View>
                    <Model name='积分兑换' bg='jifen' />
                  </View>
                  <View onClick={this.clickModel.bind(this,'../luckdraw/luckdraw')} className='v'>
                    <Model name='京环森林' url='../luckdraw/index' bg='senlin' />
                  </View>
                </View>

              </View>
              <View className='at-row'>
                <View className='at-col at-col-12'>
                  <View onClick={this.clickModel.bind(this,'../luckdraw/luckdraw')} className='v'>
                    <Model name='排行榜' bg='paihang' />
                  </View>
                </View>
              </View>
            </View>
            <Bottom />
          </View>
        </View>
        <Login />
        <Loading load={this.state.isload} />
      </View>
    )
  }
}
