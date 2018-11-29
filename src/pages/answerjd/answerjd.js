import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView,Image  } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtProgress   } from 'taro-ui'
import Bottom from '../component/bottom/bottom'
import Avatar from '../component/avatar/avatar'
import api from '../../service/api'
import './answerjd.less'
import Login from '../component/login/login'
import Loading from '../component/loading/loading'
import { jdlist } from '../../actions/counter'
// import bg from '../image/indexheadimg.png'


@connect(
  ({ counter }) => ({
    counter
  }),
  (dispatch) => ({
    onGetJdList(parame,fun) {
      dispatch(jdlist(parame)).then((res)=>{
        fun(res)
      })
    },
    onGetJdSelect(parame){
      dispatch(parame)
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
    api.post('jsonapi/iwebshop_score/addScore.json',{score:-2,source:3})
      .then((res)=>{
        if(res.data.code===0){
          this.props.onGetJdList({},this.initData);
        }
      })
  }
  initData=(res)=>{
    if(res.data.code===0){
      this.setState({
        data:res.data.data,
        quTime:10,
        isload:false
      },()=>{
        this.countdown();
      })
    }
  }
  componentWillUnmount () {
    clearInterval(this.intervalId);
  }

  componentDidShow () { 
    
  }

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
        _this.setState({
          select_ans:[..._this.state.select_ans,...[0]],
          right_ans:[..._this.state.right_ans,...JSON.parse(_this.state.data[_this.state.now_num-1].answer)],
        },()=>{
          _this.validationQuestion(JSON.parse(_this.state.data[_this.state.now_num-1].answer));
        })
        
      }
    }, 1000);
  }
  //验证答案
  validationQuestion=(right)=>{
    let _this = this;
    let {select_ans,now_num, data,right_ans} = this.state;
    clearInterval(this.intervalId);
    let score = _this.state.now_score;
    if(select_ans[_this.state.now_num-1]===Number(right[0])){
      score = score+2;
    }
    _this.setState({
      now_score:score
    },()=>{
      if(now_num===data.length){
        //答题结束
        api.post('jsonapi/iwebshop_score/addScore.json',{score:_this.state.now_score,source:3})
          .then((res)=>{
            if(res.data.code===0){
              setTimeout(function () { 
                _this.props.onGetJdSelect({
                  type:'jdResult',
                  payload:{select_ans:select_ans,right_ans:right_ans,score:_this.state.now_score}
                })
                Taro.redirectTo({
                  url: '../answer_jd/answer_jd',
                })
              }, 1000);
            } 
          })
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
      quTime:10,
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
        select_ans:[...this.state.select_ans,...[index+1]],
        right_ans:[...this.state.right_ans,...right],
        flagClick:false,
        // scrollTop:0
      },()=>{
        this.validationQuestion(right);
      });
      
    }
  }
  render () {
    // let data = this.props.counter.JDLIST.data?this.props.counter.JDLIST.data.data:[{options:"[]"}];
    let {now_num,now_score,right_ans,select_ans,data} = this.state;
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
                <AtProgress percent={this.state.percent} strokeWidth={12} isHidePercent={true?true:false} color='#40b740' />
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
              if(select_ans[now_num-1]&&select_ans[now_num-1]===index+1){
                flagtype = 2; //选择
              }
              // for(let i=0;i<this.state.select_ans.length;i++){
              //   if(this.state.select_ans[i]===index+1){
              //     flagtype = 2; //选择
              //   }
              // }
              if(right_ans[now_num-1]&&Number(right_ans[now_num-1])===index+1){
                flagtype = 3; //正确答案
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
        <Login />
        <Loading load={this.state.isload} />
      </View>
    )
  }
}
