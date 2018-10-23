import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView,Image  } from '@tarojs/components'
import { AtAvatar,AtList, AtProgress   } from 'taro-ui'
import Bottom from '../component/Bottom/index'
import Avatar from '../component/Avatar/index'
import './index.less'
import bg from '../image/indexheadimg.png'
const data = {
  "code": 0,
  "message": "成功",
  "result": {
      "result": [
          {
              "id": "14650",
              "cards": "",
              "categorys": "",
              "subject": "新时代中国特色社会主义思想，明确坚持和发展中国特色社会主义，总任务是实现社会主义现代化和中华民族伟大复兴，在全面建成小康社会的基础上，分( )在本世纪中叶建成富强民主文明和谐美丽的社会主义现代化强国。",
              "subject_img": "",
              "options": [
                  "两步走fdhjkgbdhjkf和大家开发布会差不多和基本的快捷回复就开始对方会传送到讲课费和司法和第三款",
                  "三步走",
                  "四步走",
                  null
              ],
              "options_img": null,
              "status": "1",
              "options_type": "0",
              "create_time": "2018-09-21 16:21:44",
              "answer_num": 1,
              "answer_img_num": 0
          },
          {
              "id": "14483",
              "cards": "",
              "categorys": "",
              "subject": "以下4个选项中哪一个不是温室效应产生的主要原因？( )",
              "subject_img": "",
              "options": [
                  "氟利昂",
                  "破坏森林",
                  "太阳黑子活动频繁",
                  "各国工业迅速发展"
              ],
              "options_img": null,
              "status": "1",
              "options_type": "0",
              "create_time": "2018-09-21 16:21:44",
              "answer_num": 1,
              "answer_img_num": 0
          },
          {
              "id": "14170",
              "cards": "",
              "categorys": "",
              "subject": "甲醛有害健康，因此我国对该类气体的室内浓度做出了严格的限定。根据我国标准，甲醛室内浓度在每立方米空气中不超过( )毫克。",
              "subject_img": "",
              "options": [
                  "0.03",
                  "0.06",
                  "0.08",
                  "0.10"
              ],
              "options_img": null,
              "status": "1",
              "options_type": "0",
              "create_time": "2018-09-21 16:21:44",
              "answer_num": 1,
              "answer_img_num": 0
          },
          {
              "id": "14160",
              "cards": "",
              "categorys": "",
              "subject": "( )的问世，使得人们不管驾车出行还是乘坐公共汽车或者地铁，都可以到网上算算出去这一趟温室气体和污染物的排放量是多少。",
              "subject_img": "",
              "options": [
                  "“绿色出行计算器”",
                  "“绿色出行计程器”",
                  "“绿色出行计算机”",
                  "以上都是"
              ],
              "options_img": null,
              "status": "1",
              "options_type": "0",
              "create_time": "2018-09-21 16:21:44",
              "answer_num": 1,
              "answer_img_num": 0
          },
          {
              "id": "14355",
              "cards": "",
              "categorys": "",
              "subject": "从全面建成小康社会到基本实现现代化，再到全面建成( )，是新时代中国特色社会主义发展的战略安排。",
              "subject_img": "",
              "options": [
                  "创新型国家",
                  "社会主义现代化强国",
                  "社会主义现代化大国",
                  null
              ],
              "options_img": null,
              "status": "1",
              "options_type": "0",
              "create_time": "2018-09-21 16:21:44",
              "answer_num": 1,
              "answer_img_num": 0
          }
      ],
      "num": "5",
      "time": "8",
      "score": "2",
      "session_id": 1514
  }
}
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
      url:'',
      name:'',
      quTime:0,
      now_score:0,
      now_num:1,
      sum_num:5,
      select_ans:[],
      right_ans:[],
      flagClick:true,
      percent:20,
    }
  }

  componentWillMount () { }

  componentDidMount () {
    this.setState({
      quTime:10,
    },()=>{

      this.countdown();
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
        _this.validationQuestion();
      }
    }, 1000);
  }
  //验证答案
  validationQuestion=()=>{
    let _this = this;
    let {select_ans,now_num, sum_num} = this.state;
    clearInterval(this.intervalId);
    
    if(select_ans[0]===1){
      _this.setState({
        now_score:_this.state.now_score+2
      })
    }
    _this.setState({
      right_ans:[1],
    },()=>{
      if(now_num===sum_num){
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
    let {now_num, sum_num} = this.state;
    now_num = now_num+1
    var percent = (now_num / sum_num) * 100;
    this.setState({
      now_num:now_num,
      scrollTop:0,
      flagClick:true,
      percent:percent,
      select_ans:[],
      right_ans:[],
      quTime:10
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
  selectAnswer=(item,index)=>{
    if(this.state.flagClick){
      this.setState({
        select_ans:[index],
        // right_ans:[1],
        flagClick:false,
        // scrollTop:0
      },()=>{
        this.validationQuestion();
      });
      
    }
    
    console.log(item);
  }
  render () {
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
              第{this.state.now_num}题
            </View>
            <View className='qu_pro'>
              <View className='qu_num'>
                {this.state.now_num}/{this.state.sum_num}
              </View>
              <View className='qu_score'>
                {this.state.now_score}分
              </View>
              <View className='qu_per'>
                <AtProgress percent={this.state.percent} strokeWidth={12} isHidePercent={true} color='#4fed44' />
              </View>
            </View>
            <View className='qu_con'>
              {this.state.isMore?<View>[多选]{data.result.result[this.state.now_num-1].subject}</View>:<View>{data.result.result[this.state.now_num-1].subject}</View>}
            </View>
            <View className='qu_time'>
              {this.state.quTime}秒
            </View>
          </View>
          <View className='answer'>
            {data.result.result[this.state.now_num-1].options.map((item,index)=>{
              let cla = 'answer_item';
              let claImgRight = "answer_img";
              let claImgError = "answer_img";
              let flagtype = 1;
              for(let i=0;i<this.state.select_ans.length;i++){
                if(this.state.select_ans[i]===index){
                  flagtype = 2;
                }
              }
              for(let j=0;j<this.state.right_ans.length;j++){
                if(this.state.right_ans[j]===index){
                  flagtype = 3;
                }
              }
              if(flagtype===2){
                cla+=' error_bg';
                claImgError+=' show_img';
              }else if(flagtype===3){
                cla+=' right_bg';
                claImgRight+=' show_img';
              }
              return item?<View className={cla} onClick={this.selectAnswer.bind(this,item,index)} key={index}>
                <Image src={require('../image/answerright.png')} class={claImgRight} ></Image> 
                <Image src={require('../image/answererror.png')} class={claImgError} ></Image> 
              {item}
              </View>:<View key={index}></View>;
            })}
          </View>

          <Bottom></Bottom>
        </ScrollView>
        
      </View>
    )
  }
}
