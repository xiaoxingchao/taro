import Taro, { Component } from '@tarojs/taro'
import { View, Text,Image  } from '@tarojs/components'
import { connect } from '@tarojs/redux'
// import { AtList, AtListItem  } from 'taro-ui'
import Bottom from '../component/bottom/bottom'
import Avatar from '../component/avatar/avatar'
import bg from '../image/lookforoppobgimg.png'
import scoreBg from '../image/score.png'
import {showModel} from '../../utils/tools'
import './answer_jj.less'
import { userlist } from '../../actions/counter'
import Loading from '../component/loading/loading'

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
      isload:true,
    }
  }

  componentWillMount () { }

  componentDidMount () {
    this.setState({
      isload:false,
    })
    
  }
  componentWillUnmount () { }

  componentDidShow () {
    this.setState({

    })
  }

  componentDidHide () { }
  initData=(res)=>{
    if(res.data.code===0){
      if(res.data.data[0].jd_count>=3){
        showModel('超过三次')
      }else{
        Taro.redirectTo({
          url: '../answerjj/answerjj',
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
    // let {so} = this.state;
    return (
      <View className='con'>
        <View>
          <View className='con-result'>
            <View className='left-con'>
              <View className='name_n'><open-data type='userNickName' ></open-data></View>
              <View className='avatar'>
                <View className='avatar_img'>
                  <Avatar />
                </View>
              </View>
              <View className='right_num'>
                最对答对5题
              </View>
              <View className='answer_goodsbox'>
                <Image
                  src={scoreBg}
                  className='score_img'
                >
                </Image>
                <View className='answer_tit'>
                  <Text>20分</Text>
                </View>
              </View>
            </View>
            <View className='left-con'>
              <View className='name_n'><open-data type='userNickName' ></open-data></View>
              <View className='avatar'>
                <View className='avatar_img'>
                  <Avatar />
                </View>
              </View>
              <View className='right_num'>
                最对答对5题
              </View>
              <View className='answer_goodsbox'>
                <Image
                  src={scoreBg}
                  className='score_img'
                >
                </Image>
                <View className='answer_tit'>
                  <Text>20分</Text>
                </View>
              </View>
            </View>
          </View>
          
          
          <View className='onceagain' onClick={this.tojj.bind(this)}>再来一次</View>
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
