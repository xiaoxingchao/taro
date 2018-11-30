import Taro, { Component } from '@tarojs/taro'
import { View,Image,Text } from '@tarojs/components'
// import { AtAvatar,AtList, AtListItem  } from 'taro-ui'
import moment from 'moment'
import Bottom from '../component/bottom/bottom'
import api from '../../service/api'
import './signin.less'
import {getCurrentDayString,getPreMonth,showModel} from '../../utils/tools'
import day from '../image/daydaysgin.png'
import pmlogo from '../image/pmlogo.png'
import Loading from '../component/loading/loading'
import Login from '../component/login/login'

const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
export default class Index extends Component {

  config = {
    navigationBarTitleText: '签到',
    // 定义需要引入的第三方组件
    // usingComponents: {
    //   'van-button': '../../components/vant-weapp/dist/button/index' // 书写第三方组件的相对路径
    // }
  }
  constructor(props){
    super(props);
    this.state={
      isload:true,
      currentDayList:[],
      active:[],
      // data:[],
      today:{flag:false}
    };
  }

  componentWillMount () { }

  componentDidMount () {
    this.getResult();
  }
  componentWillUnmount () { }

  componentDidShow () { 
    
  }

  componentDidHide () { }
  // 获取签到信息
  getResult=()=>{
    let userId = Taro.getStorageSync('userId');
    if(!userId) return;
    let p = {};
    p.user_id = userId;
    p['^sign_time'] = moment().format('YYYY-MM-01');
    api.post('jsonapi/iwebshop_sign/get.json', p).then((res) => {
      if (res.data.code == 0) {
        let activeARR = [];
        let today = this.state.today;
        for(let i=0;i<res.data.data.length;i++){
          let time = res.data.data[i].sign_time;
          if(time){
            if(Number(moment.parseZone(time).format('DD'))===Number(moment().format('DD'))){
              today={...res.data.data[i],...{flag:true}}
            }
            activeARR.push(Number(moment.parseZone(time).format('DD')));
          }
        }
        this.setState({
          today:today,
          active:activeARR,
          // isload:false,
          // data:res.data.data?res.data.data:[],
        },()=>{
          this.setSchedule();
        })
      } else {
        showModel(JSON.stringify(res.errMsg))
      }
    }).catch((errMsg) => {
      showModel('网络连接失败' + JSON.stringify(errMsg))
    })
  }
  //显示签到信息
  setSign=()=>{
    let { active, currentDayList } = this.state;
    for (let i = 0; i < currentDayList.length; i++) {
      for (let j = 0; j < active.length; j++) {
        var date = currentDayList[i]['date'];
        if (date === active[j] && !currentDayList[i]['other']) {
          currentDayList[i]['active'] = 1;
        }
      }
    }
    this.setState({
      isload:false,
      currentDayList: currentDayList,
    })
  }
  //输出日历
  setSchedule=()=>{
    var _this=this;
    var currentObj = getCurrentDayString();
    var m = currentObj.getMonth() + 1
    var Y = currentObj.getFullYear()
    var d = currentObj.getDate();
    var dayString = Y + '/' + m + '/' + currentObj.getDate();
    var currentDayNum = new Date(Y, m, 0).getDate()
    var currentDayWeek = currentObj.getUTCDay() + 1;
    var result = currentDayWeek - (d % 7 - 1);
    var firstKey = result <= 0 ? 7 + result : result;
    var currentDayList = [];
    var f = 0;
    var pre_d = getPreMonth(dayString) - firstKey+1;//上一个月的天数
    var next_d=1;
    for (var i = 0; i < 42; i++) {
      if (i < firstKey) {
        currentDayList[i] = { date: pre_d, other: 1};
        pre_d++;
      } else {
        if (f < currentDayNum) {
          currentDayList[i] = { date: f + 1};
          if(d===(f + 1)){
            currentDayList[i].now = 1;
          }
          f = currentDayList[i]['date'];
        } else if (f >= currentDayNum) {
          currentDayList[i] = { date: next_d,other:1};
          next_d++;
        }
      }
    }
    this.setState({
      currentDayList:currentDayList,
      Y: Y,
      m: m,
      d: d,
    },()=>{
      _this.setSign();
    })
  }
  sign=()=>{
    let userId = Taro.getStorageSync('userId');
    if(!userId) return;
    let p = {};
    p.user_id = userId;
    api.post('jsonapi/iwebshop_sign/addA.json', p).then((res) => {
      if (res.data.code == 0) {
        this.getResult();
      } else {
        showModel(JSON.stringify(res.errMsg))
      }
    }).catch((errMsg) => {
      showModel('网络连接失败' + JSON.stringify(errMsg))
    })
  }
  render () {
    let {Y,m,d,today}=this.state;
    return (
      <View className='all'>
        <View className='day-title'>{Y}年{m}月{d}日</View>
        <View className='day-list'>
          {/* 显示星期 */}
          <View className='week'>
            {weeks_ch.map((item,index)=>{
              return <View className='flex-item' key={index}>
              <View className='item-content'>{item}</View>
            </View>
            })}
          </View>
          <View className='days'>
            {this.state.currentDayList.map((item,index)=>{
              let  cla='item-content';
              let clai = 'flex-item';
              if(item.other){
                cla+=' grey';
              }
              if(item.now){
                cla+=' nowbg';
              }
              return <View className={clai} key={index}>
                {item.active?<Image className='item-content' src={pmlogo}  style='width:1.5rem;height:1.5rem'></Image>:<View className={cla}>{item.date}</View>}
              </View>
            })}
          </View>
        </View>
        <Bottom />
        <View className='signin_info'>
          <View className='left-img'>
            <Image src={day} className='day-img'></Image>
          </View>
          <View className='right-info'>
            <View className='top-score'>
              <View className='over'>
                今日签到积分:<Text className='overscore score'>10积分</Text>
              </View>
              {
                today.flag?<View className='daysginsta'>
                已签到
              </View>:<View className='daysginsta' onClick={this.sign.bind(this)}>
                签到
              </View>
              }  
            </View>
            <View className='bottom-text'>
              {
                today.flag?<View style={{fontSize:'12px'}}>
                <Text>今日签到已奖励</Text>
                <Text className='score'>{today.score}积分</Text>
              </View>:''
              }  
              <Text>连续签到7天可额外奖励</Text>
              <Text className='score'>50积分</Text>
            </View>
          </View>
        </View>
        <Login />
        <Loading load={this.state.isload} />
      </View>
      
    )
  }
}
