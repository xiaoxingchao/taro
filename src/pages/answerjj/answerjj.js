import Taro, { Component } from '@tarojs/taro'
import { View, Text,Image  } from '@tarojs/components'
import { connect } from '@tarojs/redux'
// import { AtList, AtListItem  } from 'taro-ui'
import Bottom from '../component/bottom/bottom'
// import Avatar from '../component/avatar/avatar'
import bg from '../image/lookforoppobgimg.png'
import scoreBg from '../image/score.png'
import startmatch from '../image/starmatch.png'
import waitintoMatch from '../image/waitintoMatch.png'
import lookfor from '../image/lookformatchotherimg.png'

import {showModel} from '../../utils/tools'
import './answerjj.less'
import { userlist } from '../../actions/counter'
import Loading from '../component/loading/loading'
import Login from '../component/login/login'

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
    navigationBarTitleText: '竞技答题',
    // 定义需要引入的第三方组件
    // usingComponents: {
    //   "van-button": "../../components/vant-weapp/dist/button/index" // 书写第三方组件的相对路径
    // }
  }
  constructor(props){
    super(props);
    this.state={
      isload:true,
      type:'1'
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
    
  }

  componentDidHide () { }
  
  backIndex=()=>{
    Taro.redirectTo({
      url: '../index/index',
    })
  }
  
  render () {
    let {type} = this.state;
    return (
      <View className='con'>
        <View>
          <View className='name_n'><open-data type='userNickName' ></open-data></View>
          <View className='avatar'>
            <View className='avatar_img'>
              <open-data type='userAvatarUrl' ></open-data>
            </View>
          </View>
          {
            type==='2'?<View style={{marginBottom:'50px'}}>
              <View className='start-match'>   
                <Image
                  src={startmatch}
                  className='start_img'
                >
                </Image>
              </View>
              <View className='avatar'>
                <View className='avatar_img'>
                  <open-data type='userAvatarUrl' ></open-data>
                </View>
              </View>
              <View className='name_n'><open-data type='userNickName' ></open-data></View>
            </View>:<View>
              <View className='wait-match'>   
                <Image
                  src={waitintoMatch}
                  className='wait_img'
                >
                </Image>
              </View>

              <View className='lookfor'>
                <Image
                  src={lookfor}
                  className='look_img'
                >
                </Image>
                <View className='look_text'>寻找中<View className='dotting'>...</View></View>
              </View>
              <View className='leaveanswer' onClick={this.backIndex.bind(this)}>退出</View>
            </View>
          }
          
        </View>
        <Image
          src={bg}
          className='img'
        >
        </Image>
        <Bottom></Bottom>
        <Login />
        <Loading load={this.state.isload} />
      </View>
    )
  }
}
