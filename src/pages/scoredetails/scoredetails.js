import Taro, { Component } from '@tarojs/taro'
import { View,Image,Picker } from '@tarojs/components'
import moment from 'moment'
import Bottom from '../component/bottom/bottom'
import api from '../../service/api'
import {showModel,compare} from '../../utils/tools'
import './scoredetails.less'
// import { userlist } from '../../actions/counter'
import Loading from '../component/loading/loading'
import Login from '../component/login/login'
import intsginimg from '../image/intsginimg.png'
import intexchangeimg from '../image/intexchangeimg.png'
import intcjimg from '../image/intcjimg.png'
import intanswerimg from '../image/intanswerimg.png'
import intscreen from '../image/intscreen.png'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '积分详情',
  }
  constructor(props){
    super(props);
    this.state={
      isload:true,
      data:[],
      style:{display:'none'},
      parame:{
        '^create_time':moment().format('YYYY-MM-01')
      },
      // time:''
    }
  }

  componentWillMount () { }

  componentDidMount () {
    this.getResult(this.state.parame);
  }
  componentWillUnmount () { }

  componentDidShow () { 
    
  }
  
  getResult=(parame)=>{
    let userId = Taro.getStorageSync('userId');
    if(!userId) return;
    api.post('jsonapi/iwebshop_score_list/get.json', {...{use_id:userId},...parame}).then((res) => {
      if(res.data.data){
        res.data.data.sort(compare('create_time')).reverse();
      }
      if (res.data.code == 0) {
        this.setState({
          isload:false,
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
  showSearch=()=>{
    this.setState({
      style:{display:'block'}
    })
  }
  screening=()=>{
    this.setState({
      style:{display:'none'}
    })
  }
  search=(type)=>{
    if(type==='4'){
      this.getResult({});
    }else{
      this.getResult({...{source:Number(type)}});
    }
    this.setState({
      style:{display:'none'}
    })
  }
  onDateChange=(e)=>{
    let value = e.detail.value;
    console.log(e.detail.value)
    let p={};
    p['^create_time']=value+'-01';
    p['~create_time']=value+'-31 23:59:59';
    this.getResult(p);
    this.setState({
      style:{display:'none'}
    })
  }
  render () {
    let {data} = this.state;
    return (
      <View className='con'>
        <View className='header'>
          <View>
            
          </View>
          <View className='btn' onClick={this.showSearch}>
            <Image src={intscreen} className='intscreen' />
          </View>
        </View>
        <View className='intDetailsbox'>
          {
            data.map((item,index)=>{
              let src;
              let type='';
              if(item.source===0){
                src = intsginimg;
                type = '签到';
              }else if(item.source===1){
                src = intexchangeimg;
                type = '抽奖';
              }else if(item.source===2){
                src = intcjimg;
                type = '兑换';
              }else{
                src = intanswerimg;
                type = '答题';
              }
              return <View className='intDetailsli' key={index}>
                <View className='intDetails_divL'>
                  <Image src={src} />
                </View>
                <View className='intDetails_divM'>
                  <View className='intDetails_pT'>
                    {type}
                  </View>
                  <View className='intDetails_pB'>
                    {moment.parseZone(item.create_time).format('YYYY-MM-DD HH:mm:ss')}
                  </View>
                </View>
                <View className='intDetails_divR' style={{color:'#007AFF'}}>
                  {item.score}
                </View>
              </View>
            })
          }
        </View>
        <View className='topPopover' style={this.state.style}>
          <View class='popover-arrow'></View>
          <View className='scroll'>
            <View className='table-view'>
              <View className='table-view-cell' onClick={this.search.bind(this,'4')}>全部</View>
              <View className='table-view-cell' onClick={this.search.bind(this,'0')}>签到</View>
              <View className='table-view-cell' onClick={this.search.bind(this,'1')}>抽奖</View>
              <View className='table-view-cell' onClick={this.search.bind(this,'2')}>兑换</View>
              <View className='table-view-cell' onClick={this.search.bind(this,'3')}>答题</View>
              <Picker mode='date' onChange={this.onDateChange.bind(this)} fields='month'>
                <View className='picker table-view-cell'>
                  时间筛选
                </View>
              </Picker>
              
            </View>
          </View>
        </View>
        <View className='screening' style={this.state.style} onClick={this.screening.bind(this)}></View>
        <Bottom></Bottom>
        <Login />
        <Loading load={this.state.isload} />
      </View>
    )
  }
}