import Taro, { Component } from '@tarojs/taro'
import { View,Image } from '@tarojs/components'
import moment from 'moment'
import Bottom from '../component/bottom/bottom'
import api from '../../service/api'
import {showModel} from '../../utils/tools'
import './luckdraw.less'
// import { userlist } from '../../actions/counter'
import LuckDraw from '../component/luckDraw/luckDraw'
import Loading from '../component/loading/loading'
import Login from '../component/login/login'
import turnbgimg from '../image/turnbgimg.jpg'
import turntitimg from '../image/turntitimg.png'
import cjrecordimg from '../image/cjrecordimg.png'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '抽奖',
  }
  constructor(props){
    super(props);
    this.state={
      isload:true,
      logData:[],
      count:0
    }
  }

  componentWillMount () { }

  componentDidMount () {
    this.getRewardLog();
  }
  componentWillUnmount () { }
  getRewardLog=()=>{
    let userId = Taro.getStorageSync('userId');
    if(!userId) return;
    api.post('jsonapi/reward_log/get.json', {user_id:userId,type:1}).then((res) => {
      if (res.data.code == 0) {
        this.setState({
          isload:false,
          logData:res.data.data?res.data.data:[],
        })
      } else {
        showModel(JSON.stringify(res.errMsg))
      }
    }).catch((errMsg) => {
      showModel('网络连接失败' + JSON.stringify(errMsg))
    })
  }
  componentDidShow () {
   
  }
  getNum=(value)=>{
    this.setState({
      count:value
    })
  }
  componentDidHide () { }
  render () {
    let {logData,count} = this.state;
    return (
      <View className='con'>
        <View className='run'>
          <View className='draw'>
            <LuckDraw  onGetNum={this.getNum} onGetLog={this.getRewardLog} />
          </View>
          <Image src={turnbgimg} className='turnbg' mode='widthFix' />
          <Image src={turntitimg} className='turntit' />
        </View>
        <View className='log'>
          <View className='times'>
            抽奖机会: {count} 次
          </View>
          <View className='log-record'>
            <Image src={cjrecordimg} className='log-img' mode='widthFix' />
          </View>
          <View className='log-con'>
            <View className='log-detail'>
              {logData.map((item,index)=>{
                return <View key={index} className='log-item'>
                  <View className='log-col'>{moment.parseZone(item.create_time).format('YYYY-MM-DD HH:mm:ss')}</View>
                  <View className='log-col'>积分{item.value}分</View>
                </View>
              })}
            </View>
            <Bottom></Bottom>
          </View>
        </View>
        <Login />
        <Loading load={this.state.isload} />
      </View>
    )
  }
}
