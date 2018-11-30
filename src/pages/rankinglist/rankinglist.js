import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView,Image  } from '@tarojs/components'
// import { AtProgress   } from 'taro-ui'
import Bottom from '../component/bottom/bottom'
import api from '../../service/api'
import './rankinglist.less'
import Login from '../component/login/login'
import Loading from '../component/loading/loading'
import {showModel} from '../../utils/tools'
import pmtwo from '../image/pmtwo.png'
import pmone from '../image/pmone.png'
import pmthree from '../image/pmthree.png'
import phbbgimg from '../image/phbbgimg.png'


export default class Index extends Component {

  config = {
    navigationBarTitleText: '排行榜',
    // 定义需要引入的第三方组件
    // usingComponents: {
    //   "van-button": "../../components/vant-weapp/dist/button/index" // 书写第三方组件的相对路径
    // }
  }
  constructor(props){
    super(props);
    this.state={
      isload:true,
      type:'W',
      data:[],
      page:1,
      count:0
    }
    this.styleActive={
      backgroundColor:'#4CA1FF',
      color:'#fff',
    }
  }
  componentWillMount () { }

  componentDidMount () {
    this.setState({
      isload:false
    })
  }
  componentWillUnmount () {

  }
  getResult=(parame,more)=>{
    api.post('jsonapi/iwebshop_score/order.json', parame).then((res) => {
      if (res.data.code == 0) {
        let data = [];
        if(more===1){
          data=[...this.state.data,...res.data.data]
        }else{
          data=res.data.data;
        }
        this.setState({
          data:data,
          count:res.data.count
        })
      } else {
        showModel(JSON.stringify(res.errMsg))
      }
    }).catch((errMsg) => {
      showModel('网络连接失败' + JSON.stringify(errMsg))
    })
  }
  handleResult=(more)=>{
    let {page} = this.state;
    let p = {};
    p.__start = (page-1)*6;
    p.__size = 6;
    p.__count = true;
    this.getResult({...p,...{orderType:this.state.type}},more);
  }
  componentDidShow () { 
    this.handleResult(0);
  }

  componentDidHide () { }

  //返回顶部
  goTop=()=>{
    this.setState({
      scrollTop: 0
    })
  }
  more=()=>{
    this.setState({
      page:this.state.page+1
    },()=>{
      this.handleResult(1);
    })
  }
  rank=(type)=>{
    this.setState({
      page:1,
      type:type
    },()=>{
      this.handleResult(0);
    })
  }
  render () {
    let {data,type,count} = this.state;
    return (
      <View className='con'>
        <View className='headbox'>
          <View>
            <View className='control'>
              <View className='week-rank control-rank' style={type==='W'?this.styleActive:{}} onClick={this.rank.bind(this,'W')}>周排行</View>
              <View className='month-rank control-rank' style={type==='M'?this.styleActive:{}} onClick={this.rank.bind(this,'M')}>月排行</View>
              <View className='score-rank control-rank' style={type==='A'?this.styleActive:{}} onClick={this.rank.bind(this,'A')}>积分排名</View>
            </View>
          </View>
        </View>
        <ScrollView
          className='scrollview'
          scrollY
          scrollTop={this.state.scrollTop}
          // onScroll={this.onScroll}
        >
          <View className='control-content'>
            <View className='content-ul1'>
              <View className='content-li1 two'>
                <View className='li1-avatar'>
                  <Image src={data[1].avatarUrl} className='avatar'></Image>
                  <Image src={pmtwo} className='avatar-two'></Image>
                </View>
                <View className='li1-name'>
                  {data[1].nickName}
                </View>
                <View className='li1-score'>
                  最高积分: {data[1].allScore}
                </View>
                <View className='li1-ques'>
                  最高答题数: {data[1].allScore}
                </View>
              </View>
              <View className='content-li1 one'>
                <View className='li1-avatar'>
                  <Image src={data[0].avatarUrl} className='avatar'></Image>
                  <Image src={pmone} className='avatar-two'></Image>
                </View>
                <View className='li1-name'>
                  {data[0].nickName}
                </View>
                <View className='li1-score'>
                  最高积分: {data[0].allScore}
                </View>
                <View className='li1-ques'>
                  最高答题数: {data[0].allScore}
                </View>
              </View>
              <View className='content-li1 three'>
                <View className='li1-avatar'>
                  <Image src={data[2].avatarUrl} className='avatar'></Image>
                  <Image src={pmthree} className='avatar-two'></Image>
                </View>
                <View className='li1-name'>
                  {data[2].nickName}
                </View>
                <View className='li1-score'>
                  最高积分: {data[2].allScore}
                </View>
                <View className='li1-ques'>
                  最高答题数: {data[2].allScore}
                </View>
              </View>
            </View>
            <View className='content-ul2'>
              {
                data.map((item,index)=>{
                  return <View key={index}>
                    {index>=3?<View className='content-li2' >
                      <View className='phbimg'>
                        <Image src={phbbgimg} className='phbimg-img' />
                        NO{index+1}
                      </View>
                      <View className='li2_divL'>
                        <Image src={item.avatarUrl} />
                      </View>
                      <View className='li2_divM'>
                        <View className='li2_pT'>
                          {item.nickName}
                        </View>
                        <View className='li2_pB'>
                          最高答题数: {item.allScore}
                        </View>
                      </View>
                      <View className='li2_divR'>
                        最高积分: {item.allScore}
                      </View>
                    </View>:''}
                  </View> 
                })
              }
            </View>
          </View>
          <View>
            {
              data.length<count?<View className='more' onClick={this.more.bind(this)}>点击加载更多</View>:<View className='more'>到底了</View>
            }
          </View>
          <Bottom></Bottom>
        </ScrollView>
        <Login />
        <Loading load={this.state.isload} />
      </View>
    )
  }
}
