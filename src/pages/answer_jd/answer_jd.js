import Taro, { Component } from '@tarojs/taro'
import { View, Text,Image  } from '@tarojs/components'
import { connect } from '@tarojs/redux'
// import { AtList, AtListItem  } from 'taro-ui'
import Bottom from '../component/bottom/bottom'
import Avatar from '../component/avatar/avatar'
import bg from '../image/lookforoppobgimg.png'
import scoreBg from '../image/score.png'
import {showModel} from '../../utils/tools'
import './answer_jd.less'
import { userlist } from '../../actions/counter'

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
    navigationBarTitleText: '经典答题',
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
    
  }
  componentWillUnmount () { }

  componentDidShow () { }

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
  tojd=()=>{
    this.props.onGetUserList({},this.initData);
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
    let so = this.props.counter.jdResult?this.props.counter.jdResult.score:0;
    console.log(this.props.counter);
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
      </View>
    )
  }
}
