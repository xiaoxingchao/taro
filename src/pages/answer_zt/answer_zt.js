import Taro, { Component } from '@tarojs/taro'
import { View, Text,Image,Button } from '@tarojs/components'
// import { AtList, AtListItem  } from 'taro-ui'
import Bottom from '../component/bottom/bottom'
import Avatar from '../component/avatar/avatar'
import bg from '../image/lookforoppobgimg.png'
import duobaoimg from '../image/jingdianimg.png'
import {showModel} from '../../utils/tools'
import './answer_zt.less'
import Loading from '../component/loading/loading'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '专题答题',
    // 定义需要引入的第三方组件
    // usingComponents: {
    //   "van-button": "../../components/vant-weapp/dist/button/index" // 书写第三方组件的相对路径
    // }
  }
  constructor(props){
    super(props);
    this.state={
      isload:true,
      success:0
    }
  }

  componentWillMount () { }
  // 获取当前页参数
  getCurrParame=()=>{
    let par_id = '';
    let arr = Taro.getCurrentPages();
    par_id=arr[arr.length-1].options;
    return par_id;
  }
  componentDidMount () {
    this.setState({
      isload:false,
    })
    
  }
  componentWillUnmount () { }

  componentDidShow () {
    this.setState({
      success:this.getCurrParame().success
    })
  }

  componentDidHide () { }
  backIndex=()=>{
    Taro.redirectTo({
      url: '../index/index',
    })
  }
  toLuckdraw=()=>{
    Taro.redirectTo({
      url: '../luckdraw/luckdraw',
    })
  }
  onShareAppMessage = (res) => {
    console.log(res)
    // if (res.from === 'button') {
    //   // 来自页面内转发按钮

    // }

  }
  render () {
    let {success} = this.state;
    return (
      <View className='con'>
        <View>
          <View className='name_n'><open-data type='userNickName' ></open-data></View>
          <View className='avatar'>
            <View className='avatar_img'>
              <Avatar />
            </View>
          </View>
          <View className='title'>   
            {success==='0'?'答题失败':'答题结束'}
          </View>
          <View className='answer_goodsbox'>
            {success==='0'?<Image
              src={duobaoimg}
              className='score_img'
            >
            </Image>:<Image
              src={duobaoimg}
              className='score_img'
            >
            </Image>}
            
            <View className='answer_tit'>
              <Text>{success==='0'?'下次再接再厉':'恭喜你获得一次抽奖机会'}</Text>
            </View>
          </View>
          {success==='0'?<Button open-type='share' className='onceagain'>分享给好友</Button>:<View className='onceagain' onClick={this.toLuckdraw.bind(this)}>立即抽奖</View>}
			    <View className='leaveanswer' onClick={this.backIndex.bind(this)}>返回首页</View>
        </View>
        <Bottom></Bottom>
        <Image
          src={bg}
          className='img'
        >
        </Image>
        <Loading load={this.state.isload} />
      </View>
    )
  }
}
