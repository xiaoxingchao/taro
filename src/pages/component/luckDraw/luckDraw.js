import Taro, { Component } from '@tarojs/taro'
import { View, Text ,Image} from '@tarojs/components'
// import moment from 'moment'
// import { AtButton } from 'taro-ui'
import {showModel} from '../../../utils/tools'
import api from '../../../service/api'
import './luckDraw.less'


export default class Index extends Component {
  constructor(props){
    super(props);
    this.state={
      animationData:{},
      initData:{}
    }
    this.animation = Taro.createAnimation({duration: 2000,timingFunction: 'ease',});
    this.awards=[
      { 'index': 1,'deg':0, 'name': '一等奖' },
      { 'index': 5, 'deg':288,'name': '谢谢参与' },
      { 'index': 2, 'deg':216,'name': '二等奖' },
      // { 'index': 3, 'name': '欢迎再来' },
      { 'index': 4, 'deg':144,'name': '优秀奖' },
      { 'index': 3, 'deg':72,'name': '三等奖' }
    ];
    this.startFlag=true;
    this.initDeg = 0;
  }
  // 获取设置信息
  getRewardSet=()=>{
    let userId = Taro.getStorageSync('userId');
    if(!userId) return;
    api.post('jsonapi/wx_app/getRewardSet.json', {}).then((res) => {
      if (res.data.code == 0) {
        this.setState({
          initData:res.data.data?res.data.data[0]:{},
        })
      } else {
        showModel(JSON.stringify(res.errMsg))
      }
    }).catch((errMsg) => {
      showModel('网络连接失败' + JSON.stringify(errMsg))
    })
    
  }
  componentWillMount () { }

  componentDidMount () {
    this.getRewardSet();
    this.getCurrNum();
  }
  componentWillUnmount () { }

  componentDidShow () {

  }

  componentDidHide () { }
  getCurScore=(num)=>{
    let {initData} = this.state;
    let score = 0;
    if(JSON.parse(initData['conf'+num]).value){
      score = Number(JSON.parse(initData['conf'+num]).value);
    }
    return score;
  }
  getRandom=()=>{
    let num = 0;
    let {initData} = this.state;
    let conf1 = Number(JSON.parse(initData.conf1).chance);
    let conf2 = Number(JSON.parse(initData.conf2).chance);
    let conf3 = Number(JSON.parse(initData.conf3).chance);
    let conf4 = Number(JSON.parse(initData.conf4).chance);
    let conf5 = Number(JSON.parse(initData.conf5).chance);
    let conf = conf1+conf2+conf3+conf4+conf5;
    let index = Math.random()*conf;
    if(index<=conf1){
      num=1;
    }else if(index<=(conf1+conf2)){
      num=2;
    }else if(index<=(conf1+conf2+conf3)){
      num=3;
    }else if(index<=(conf1+conf2+conf3+conf4)){
      num=4;
    }else if(index<=(conf1+conf2+conf3+conf4+conf5)){
      num=5;
    }
    return num;
  }
  //获取当前抽奖次数

  getCurrNum=()=>{
    api.post('jsonapi/wx_app/rewardCount.json', {}).then((res) => {
      if (res.data.code == 0) {
        this.props.onGetNum(res.data.canZJ-res.data.count);
      }
    })
  }
  // 增加抽奖日志
  getRewardLog=(score)=>{
    let userId = Taro.getStorageSync('userId');
    if(!userId) return;
    api.post('jsonapi/reward_log/add.json', {user_id:userId,type:1,value:score}).then((res) => {
      if (res.data.code == 0) {
        this.getCurrNum();
        this.props.onGetLog();
      } else {
        showModel(JSON.stringify(res.errMsg))
      }
    }).catch((errMsg) => {
      showModel('网络连接失败' + JSON.stringify(errMsg))
    })
  }
  // 增加分数
  addScore=(score)=>{
    let userId = Taro.getStorageSync('userId');
    if(!userId) return;
    api.post('jsonapi/iwebshop_score/addScore.json', {source:1,score:score}).then((res) => {
      if (res.data.code == 0) {
        this.getRewardLog(score);
      } else {
        showModel(JSON.stringify(res.errMsg))
      }
    }).catch((errMsg) => {
      showModel('网络连接失败' + JSON.stringify(errMsg))
    })
  }
  start=()=>{
    var _this = this;
    if(this.startFlag){
      this.startFlag = false;
      let userId = Taro.getStorageSync('userId');
      if(!userId) return;
      api.post('jsonapi/wx_app/rewardCount.json', {}).then((res) => {
        if (res.data.code == 0) {
          if(res.data.count>=res.data.canZJ){
            showModel('明日再来!')
            return;
          }else{
            let randomNum = 0;
            let index = _this.getRandom();
            let score = this.getCurScore(index);
            _this.addScore(score);
            for(let i=0;i<_this.awards.length;i++){
              if(_this.awards[i].index===index){
                randomNum = _this.awards[i].deg;
              }
            }
            let aa = Math.floor(_this.initDeg/360);
            _this.initDeg = (aa*360+randomNum+720*2);
            _this.animation.rotate(_this.initDeg).step();

            _this.setState({
              animationData:_this.animation.export()
            },()=>{
              setTimeout(()=>{
                Taro.showModal({
                  title:'恭喜',
                  content:score===0?'谢谢参与':'恭喜获得积分'+score,
                  showCancel:false,
                  confirmText:'确定',
                  success:function(){
                    _this.startFlag = true;
                  }
                })
              },2000)
            })
          }
        } else {
          showModel(JSON.stringify(res.errMsg))
        }
      }).catch((errMsg) => {
        showModel('网络连接失败' + JSON.stringify(errMsg))
      })

    }

  }
  render () {
    return (
      <View className='luck'>
        <View className='animation-element' animation={this.state.animationData}>
          <Image className='animation-img' src={require('../../image/turntablebgimg4.png')}></Image>
          <View className='text'>
            {this.awards.map((ele,index)=>{
              let a = index/this.awards.length;
              return <View className='text-item' key={index} >
                <Text className='text-item-name' style={{transform: 'rotate('+a+'turn)'}}>{ele.name}</Text>
              </View>
            })}
          </View>
        </View>
        <View className='animation-start' onClick={this.start.bind(this)}>
          <Image className='start-img' src={require('../../image/turntablebgimg3.png')} ></Image>
        </View>
      </View>
    )
  }
}
Index.defaultProps={
  onGetNum:null,
  onGetLog:null
};

