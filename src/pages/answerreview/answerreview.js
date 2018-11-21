import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView,Image  } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtProgress   } from 'taro-ui'
import Bottom from '../component/bottom/bottom'
import Avatar from '../component/avatar/avatar'
import './answerreview.less'
import Login from '../component/login/login'
// import bg from '../image/indexheadimg.png'


@connect(
  ({ counter }) => ({
    counter
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
      now_num:1,
      // flagClick:true,
      percent:20,
      data:[{options:"[]"}],
    }
  }

  componentWillMount () { }

  componentDidMount () {
    this.setState({
      data:this.props.counter.JDLIST.data.data
    })
   
  }
  componentWillUnmount () {
   }

  componentDidShow () { }

  componentDidHide () { }

  //下一题
  next_question=()=>{
    this.goTop();
    let {now_num, data} = this.state;
    if(now_num===data.length){
      Taro.redirectTo({
        url: '../answer_jd/answer_jd',
      })
    }else{
      now_num = now_num+1
      var percent = (now_num / data.length) * 100;
      this.setState({
        now_num:now_num,
        scrollTop:0,
        // flagClick:true,
        percent:percent,
      })
    }
  }
  // 上一题
  pre_question=()=>{
    this.goTop();
    let {now_num, data} = this.state;
    if (now_num===1) return;
    now_num = now_num-1;
    var percent = (now_num / data.length) * 100;
    this.setState({
      now_num:now_num,
      scrollTop:0,
      // flagClick:true,
      percent:percent,
    })
  }
  //返回顶部
  goTop=()=>{
    this.setState({
      scrollTop: 0
    })
  }
  render () {
    // let data = this.props.counter.JDLIST.data.data;
    let {right_ans,select_ans} = this.props.counter.jdResult;
    let {now_num,data} = this.state;
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
              <View className='qu_per'>
                <AtProgress percent={this.state.percent} strokeWidth={12} isHidePercent={true?true:false} color='#40b740' />
              </View>
            </View>
            <View className='qu_con'>
              {this.state.isMore?<View>[多选]{data[now_num-1].subject}</View>:<View>{data[now_num-1].subject}</View>}
            </View>
            <View className='qu_time'>
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
              return item?<View className={cla} key={index}>
                <Image src={require('../image/answerright.png')} class={claImgRight} ></Image> 
                <Image src={require('../image/answererror.png')} class={claImgError} ></Image> 
              {item}
              </View>:<View key={index}></View>;
            }):''}
          </View>
          <View className='opa'>
            {now_num===1?'':<View className='pre' onClick={this.pre_question.bind(this)}>上一题</View>}
            
            <View className='next' onClick={this.next_question.bind(this)}>{now_num===data.length?'关闭':'下一题'}</View>
          </View>
          
          <Bottom></Bottom>
        </ScrollView>
        <Login />
      </View>
    )
  }
}
Index.defaultProps={
  counter:{}
};