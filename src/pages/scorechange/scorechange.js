import Taro, { Component } from '@tarojs/taro'
import { View, Text,Input,Image,Navigator } from '@tarojs/components'
import { connect } from '@tarojs/redux'

// import {AtSearchBar } from 'taro-ui'
import Bottom from '../component/bottom/bottom'
import api from '../../service/api'
import './scorechange.less'
import seachimg from '../image/seachimg.png'
import Login from '../component/login/login'
import Loading from '../component/loading/loading'
import {showModel,rootUrl} from '../../utils/tools'
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
      data:[]
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
    this.getResult({is_del:0,is_score:1});
  }
  getResult=(parame)=>{
    api.post('jsonapi/iwebshop_goods/get.json', parame).then((res) => {
      if (res.data.code == 0) {
        this.setState({
          data:res.data.data?res.data.data:[],
        })
      } else {
        showModel(JSON.stringify(res.errMsg))
      }
    }).catch((errMsg) => {
      showModel('网络连接失败' + JSON.stringify(errMsg))
    })
  }
  componentDidHide () { }
  toDetail=()=>{
    Taro.navigateTo({
      title:"详情",
      url: '/pages/scoredetails/scoredetails'
    })
  }
  toChangeRecord=()=>{
    Taro.navigateTo({
      title:"兑换记录",
      url: '/pages/changerecord/changerecord'
    })
  }
  onChange=(value)=>{
    this.setState({
      value:value.detail.value
    })
  }
  toSearch=()=>{
    let p ={is_del:0,is_score:1};
    p['*name'] = this.state.value;
    this.getResult(p);
    console.log(this.state.value);
  }
  toNowchange=(id,virtual)=>{
    Taro.navigateTo({
      title:"立即兑换",
      url: '/pages/nowchange/nowchange?id='+id+'&is_virtual='+virtual
    })
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
            <View className='detail' onClick={this.toDetail.bind(this)}>
              详情
            </View>
          </View>
          <View className='change-record' >
            <View className='record' onClick={this.toChangeRecord.bind(this)}>
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
              return <View className='intexch_productli' key={index}>
                <Navigator url='../productdetails/productdetails?id={{item.id}}'><Image src={rootUrl+item.img} className='intexch_proimg'></Image></Navigator>
                <View className='intexch_proinfor displayflex_between'>
                  <View className='intexch_proinfor_divL'>
                    <View className='intexch_proinfor_pT'><View className='wrap'>{item.name}</View></View>
                    <View className='intexch_proinfor_pB'><View className='wrap'>{item.sell_price}</View></View>
                  </View>
                  <View className='intexchangebtn' onClick={this.toNowchange.bind(this,item.id,item.is_virtual)}>兑换</View>
                </View>
              </View>
            })}
          </View>
        </View>
        <Bottom />
        <Login />
        <Loading load={this.state.isload} />
      </View>
    )
  }
}
