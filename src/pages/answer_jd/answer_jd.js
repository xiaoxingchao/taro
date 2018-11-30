import Taro, { Component } from '@tarojs/taro'
import { View, Text,Image  } from '@tarojs/components'
import { connect } from '@tarojs/redux'
// import { AtList, AtListItem  } from 'taro-ui'
import Bottom from '../component/bottom/bottom'
import api from '../../service/api'
import Avatar from '../component/avatar/avatar'
import bg from '../image/lookforoppobgimg.png'
import scoreBg from '../image/score.png'
import {showModel} from '../../utils/tools'
import './answer_jd.less'
import Loading from '../component/loading/loading'

@connect(
  ({ counter }) => ({
    counter
  })
)

export default class Index extends Component {

  config = {
    navigationBarTitleText: '经典答题',
    // 定义需要引入的第三方组件
    // usingComponents: {
    //   "van-button": "../../components/vant-weapp/dist/button/index" // 书写第三方组件的相对路径
    // }
  }
  constructor(props){
    super(props);
    this.state={
      isload:true,
      so:0
    }
  }

  componentWillMount () { }

  componentDidMount () {
    this.setState({
      so:this.props.counter.jdResult?this.props.counter.jdResult.score:0,
      isload:false,
    })
    
  }
  componentWillUnmount () { }

  componentDidShow () {
  }

  componentDidHide () { }
  initData=(res)=>{
    if(res.data.code===0){
      if(res.data.data[0].jd_count>=3){
        showModel('超过三次')
      }else{
        Taro.redirectTo({
          url: '../answerjd/answerjd',
        })
      }
    }
  }
  // 获取答题次数
  getCount=()=>{
    api.post('jsonapi/wx_app/rewardCount.json', {}).then((res) => {
      if (res.data.code == 0) {
        if(res.data.JD_count>=res.data.JD_can){
          showModel('超过三次')
        }else{
          Taro.redirectTo({
            url: '../answerjd/answerjd',
          })
        }
      } else {
        showModel(JSON.stringify(res.errMsg))
      }
    }).catch((errMsg) => {
      showModel('网络连接失败' + JSON.stringify(errMsg))
    })
  }
  tojd=()=>{
    this.getCount();
  }
  backIndex=()=>{
    Taro.redirectTo({
      url: '../index/index',
    })
  }
  backSee=()=>{
    Taro.redirectTo({
      url: '../answerreview/answerreview',
    })
  }
  render () {
    let {so} = this.state;
    return (
      <View className='con'>
        <View>
          <View className='name_n'><open-data type='userNickName' ></open-data></View>
          <View className='avatar'>
            <View className='avatar_img'>
              <Avatar />
            </View>
          </View>
          <View className='title'>   
            <Text>答题结束</Text>
          </View>
          <View className='right_num'>
            {so/2===0?'答题失败':'恭喜你答对'+so/2+'题'}
          </View>
          <View className='answer_goodsbox'>
            <Image
              src={scoreBg}
              className='score_img'
            >
            </Image>
            <View className='answer_tit'>
              <Text>获得{so}积分</Text>
            </View>
          </View>
          <View className='onceagain' onClick={this.tojd.bind(this)}>再来一次</View>
          <View className='backsee' onClick={this.backSee.bind(this)}>答题回顾</View>
			    <View className='leaveanswer' onClick={this.backIndex.bind(this)}>离开答题</View>
        </View>
        <Bottom></Bottom>
        <Image
          src={bg}
          className='img'
        >
        </Image>
        <Loading load={this.state.isload} />
      </View>
    )
  }
}
