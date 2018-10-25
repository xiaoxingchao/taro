import Taro, { Component } from '@tarojs/taro'
import { View,Image  } from '@tarojs/components'
// import { AtAvatar,AtList, AtListItem  } from 'taro-ui'
import Bottom from '../component/bottom/bottom'
import './signin.less'
import {getCurrentDayString,getPreMonth} from '../../utils/tools'

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
      currentDayList:[],
      active:[11,12,13]
    };
  }

  componentWillMount () { }

  componentDidMount () {
    this.setSchedule();
  }
  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  //显示签到信息
  setSign=()=>{
    
    let { active, currentDayList } = this.state;
    console.log(currentDayList);
    for (let i = 0; i < currentDayList.length; i++) {
      for (let j = 0; j < active.length; j++) {
        var date = currentDayList[i]['date'];
        if (date === active[j] && !currentDayList[i]['other']) {
          currentDayList[i]['active'] = 1;
        }
        
      }
    }
    this.setState({
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
    console.log(currentDayList);
    this.setState({
      currentDayList:currentDayList,
      Y: Y,
      m: m,
      d: d,

    },()=>{
      _this.setSign();
    })
    // that.setData({
    //   currentDayList: currentDayList,
    //   Y: Y,
    //   m: m,
    //   d: d,
    //   currentDay: currentObj.getDate(),
    // })
  }
  render () {
    let {Y,m,d}=this.state;
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
                {item.active?<Image className='item-content' src={require('../image/pmlogo.png')}  style='width:1.5rem;height:1.5rem'></Image>:<View className={cla}>{item.date}</View>} 
              </View>
            })}
          </View>
        </View>
        <Bottom />
        <View className='signin_info'></View>
      </View>
      
    )
  }
}
