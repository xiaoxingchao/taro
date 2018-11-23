import Taro, { Component } from '@tarojs/taro'
import { View, Text,Input,Button,Image  } from '@tarojs/components'
import { connect } from '@tarojs/redux'
// import { connect } from '@tarojs/redux'
// import { bindActionCreators } from 'redux'

import {AtSearchBar } from 'taro-ui'
import Sign from '../component/sign/sign'
import Model from '../component/model/model'
import Bottom from '../component/bottom/bottom'
import Avatar from '../component/avatar/avatar'
// import api from '../../service/api'
import './scorechange.less'
import seachimg from '../image/seachimg.png'
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
    navigationBarTitleText: '积分兑换',
  }
  constructor(props){
    super(props);
    this.state={
      isload:true,
      userData:{},
      value:'',
      data:[
        {id:568,name:'纯天然蔬菜大礼包',sell_price:'2000',img:'upload/2018/09/04/20180904224212855.jpg'},
      ]
    }
  }

  componentWillMount () { }
  initData=(res)=>{
    if(res.data.code===0){
      this.setState({
        userData:res.data.data[0]
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
  toDetail=()=>{
    Taro.navigateTo({
      title:"详情",
      url: '/pages/scoredetails/scoredetails'
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
  onChange=(value)=>{
    this.setState({
      value:value.detail.value
    })
  }
  toSearch=()=>{
    console.log(this.state.value);
  }
  render () {
    let {userData,data} = this.state;
    return (
      <View className='con'>
        <View className='header'>
          <View className='avatar'>
            <View className='avatar_img'>
              <View className='name_n'><open-data type='userAvatarUrl' controls='{{!canIUse}}'></open-data></View>
            </View>
          </View>
          <View className='name'>
            <View className='name_n'>
              <open-data type='userNickName' controls='{{!canIUse}}'></open-data>
            </View>
            <View className='crr-core'>
              当前积分:<Text className='name_text'> {userData.score}</Text>
            </View>
            <View className='detail' onClick={this.toDetail}>
              详情
            </View>
          </View>
          <View className='change-record'>
            <View className='record'>
              兑换记录
            </View>
          </View>
        </View>
        <View class='intexch_seachbox'>
          <Image src={seachimg} />
          <Input type='text'  onInput={this.onChange.bind(this)} class='intexch_seach' placeholder='请输入关键词' />
          <View class='intexch_seach_btn' onClick={this.toSearch.bind(this)}>查询</View>
        </View>
        <View className='intexch_productbox'>
          <View className='intexch_productul'>
            {data.map((item,index)=>{
              return <View key={index} className='intexch_productli'>
                {item.name}
              </View>
            })}
          </View>
        </View>
            {/* <View>
              <AtSearchBar
                fixed={true?true:false}
                className='search-custom'
                actionName='搜一下'
                value={this.state.value}
                onChange={this.onChange.bind(this)}
                onActionClick={this.onActionClick.bind(this)}
              />
            </View> */}
            
        <Bottom />
        <Login />
        <Loading load={this.state.isload} />
      </View>
    )
  }
}
