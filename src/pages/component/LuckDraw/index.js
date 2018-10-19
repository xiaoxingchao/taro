import Taro, { Component } from '@tarojs/taro'
import { View, Text ,Image} from '@tarojs/components'
import { AtButton } from 'taro-ui'
import './index.less'


export default class Index extends Component {
  constructor(props){
    super(props);
    this.state={
      animationData:{}
    }
    this.animation = Taro.createAnimation({duration: 1000,timingFunction: 'ease',});
    this.awards=[
      { 'index': 0,'deg':0, 'name': '一等奖' },
      { 'index': 1, 'deg':288,'name': '谢谢参与' },
      { 'index': 2, 'deg':216,'name': '二等奖' },
      // { 'index': 3, 'name': '欢迎再来' },
      { 'index': 4, 'deg':144,'name': '优秀奖' },
      { 'index': 5, 'deg':72,'name': '三等奖' }
    ];
    this.startFlag=true;
    this.initDeg = 0;
  }
  componentWillMount () { }

  componentDidMount () { 
    
  }
  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  start=()=>{
    var _this = this;

    if(this.startFlag){
      this.startFlag = false;
      let randomNum = [];
      let index = Math.floor(Math.random() * 5+1);
      let tit = '';
      
      for(let i=0;i<this.awards.length;i++){
        randomNum.push(i*360/this.awards.length);
        
      }
      this.initDeg += (-randomNum[index-1]+720);
      for(let j=0;j<this.awards.length;j++){
        if(this.awards[j].deg===(this.initDeg%360)){
          tit=this.awards[j].name;
        }
      }
      this.animation.rotate(this.initDeg).step();
      this.setState({
        animationData:this.animation.export()
      },()=>{
        Taro.showModal({
          title:tit,
          content:'nizhongjiangle',
          showCancel:false,
          confirmText:'确定',
          success:function(){
            // _this.animation.rotate(0).step();
            // _this.setState({
            //   animationData:_this.animation.export()
            // })
            _this.startFlag = true;
            console.log('ppp');
          }
        })
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

