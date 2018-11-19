import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView,Image  } from '@tarojs/components'
import { AtAvatar,AtList, AtProgress   } from 'taro-ui'
import Bottom from '../component/bottom/bottom'
import Avatar from '../component/avatar/avatar'
import api from '../../service/api'
import './answerjd.less'
// import bg from '../image/indexheadimg.png'

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
      quTime:0,
      now_score:0,
      now_num:1,
      select_ans:[],
      right_ans:[],
      flagClick:true,
      percent:20,
      data:[{options:"[]"}],
    }
  }

  componentWillMount () { }

  componentDidMount () {
    api.post('jsonapi/iwebshop_question/getA.json',{})
      .then((ret)=>{
        if(ret.data.code===0){
          this.setState({
            data:ret.data.data,
            quTime:10,
          },()=>{
            this.countdown();
          })
        }
        console.log(ret);
      })
  }
  componentWillUnmount () {
    clearInterval(this.intervalId);
   }

  componentDidShow () { }

  componentDidHide () { }
  //倒计时
  countdown=()=>{
    let _this = this;
    let time = this.state.quTime;
    clearInterval(this.intervalId);
    this.intervalId = setInterval(function () {
      time = time - 1;
      _this.setState({
        quTime: time,
      })
      if (time == 0) {
        clearInterval(_this.intervalId);
        _this.validationQuestion(JSON.parse(_this.state.data[_this.state.now_num-1].answer));
      }
    }, 1000);
  }
  //验证答案
  validationQuestion=(right)=>{
    let _this = this;
    let {select_ans,now_num, data} = this.state;
    clearInterval(this.intervalId);
    for(let i=0;i<right.length;i++){
      if(select_ans[0]===Number(right[i])){
        _this.setState({
          now_score:_this.state.now_score+2
        })
      }
    }
    this.setState({
      right_ans:right
    },()=>{
      if(now_num===data.length){
        //答题结束
        setTimeout(function () { 
          Taro.redirectTo({
            url: '../index/index',
          })
        }, 2000);
        
      }else{
        setTimeout(function () { _this.next_question()}, 2000 );
      }
    })
    
  }

  //下一题
  next_question=()=>{
    this.goTop();
    let {now_num, data} = this.state;
    now_num = now_num+1
    var percent = (now_num / data.length) * 100;
    this.setState({
      now_num:now_num,
      scrollTop:0,
      flagClick:true,
      percent:percent,
      select_ans:[],
      quTime:10,
      right_ans:[]
    },()=>{
      this.countdown();
    })
    
  }
  //返回顶部
  goTop=()=>{
    this.setState({
      scrollTop: 0
    })
  }
  selectAnswer=(item,index,right)=>{
    if(this.state.flagClick){
      this.setState({
        select_ans:[index+1],
        // right_ans:[1],
        flagClick:false,
        // scrollTop:0
      },()=>{
        this.validationQuestion(right);
      });
      
    }
  }
  render () {
    let {data,now_num,now_score,right_ans} = this.state;
    return (
      <View className='con'>
        <ScrollView
          className='scrollview'
          scrollY
          scrollTop={this.state.scrollTop}
          // onScroll={this.onScroll}
        >
          <View className='avatar'>
            <Avatar />
          </View>
          <View className='question'>
            <View className='qu_title'>
              第{now_num}题
            </View>
            <View className='qu_pro'>
              <View className='qu_num'>
                {now_num}/{data.length}
              </View>
              <View className='qu_score'>
                {now_score}分
              </View>
              <View className='qu_per'>
                <AtProgress percent={this.state.percent} strokeWidth={12} isHidePercent={true} color='#40b740' />
              </View>
            </View>
            <View className='qu_con'>
              {this.state.isMore?<View>[多选]{data[now_num-1].subject}</View>:<View>{data[now_num-1].subject}</View>}
            </View>
            <View className='qu_time'>
              {this.state.quTime}秒
            </View>
          </View>
          <View className='answer'>
            {data.length!==1?JSON.parse(data[now_num-1].options).map((item,index)=>{
              let cla = 'answer_item';
              let claImgRight = "answer_img";
              let claImgError = "answer_img";
              let flagtype = 1;
              for(let i=0;i<this.state.select_ans.length;i++){
                if(this.state.select_ans[i]===index+1){
                  flagtype = 2; //选择
                }
              }
              for(let j=0;j<right_ans.length;j++){
                if(Number(right_ans[j])===index+1){
                  flagtype = 3; //正确答案
                }
              }
              if(flagtype===2){
                cla+=' error_bg';
                claImgError+=' show_img';
              }else if(flagtype===3){
                cla+=' right_bg';
                claImgRight+=' show_img';
              }
              return item?<View className={cla} onClick={this.selectAnswer.bind(this,item,index,JSON.parse(data[now_num-1].answer))} key={index}>
                <Image src={require('../image/answerright.png')} class={claImgRight} ></Image> 
                <Image src={require('../image/answererror.png')} class={claImgError} ></Image> 
              {item}
              </View>:<View key={index}></View>;
            }):''}
          </View>

          <Bottom></Bottom>
        </ScrollView>
        
      </View>
    )
  }
}
