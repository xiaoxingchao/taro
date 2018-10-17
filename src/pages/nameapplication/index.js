import Taro, { Component } from '@tarojs/taro'
import { View, Text,Image  } from '@tarojs/components'
import { AtAvatar,AtList, AtListItem  } from 'taro-ui'
import Bottom from '../component/Bottom/index'
import './index.less'
import bg from '../image/indexheadimg.png'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '个人中心',
    // 定义需要引入的第三方组件
    // usingComponents: {
    //   "van-button": "../../components/vant-weapp/dist/button/index" // 书写第三方组件的相对路径
    // }
  }
  constructor(props){
    super(props);
    this.state={
      url:'',
      name:''
    }
  }

  componentWillMount () { }

  componentDidMount () { 
    let _this = this;
    Taro.getUserInfo({
      success: function (res) {
        _this.setState({
          url:res.userInfo.avatarUrl,
          name:res.userInfo.nickName,
          info:JSON.stringify(res),
          open:true
        })
        console.log(res);
      },
      fail:function (res) {
        _this.setState({
          info:JSON.stringify(res),
          open:true
        })
        console.log(res);
      },
    })
  }
  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  button=()=>{
    Taro.navigateTo({
      title:"goback",
      url: '/pages/test/index'
    })
  }
  getinfo=()=>{
  }
  personalint=()=>{

  }
  personalinfor=()=>{

  }
  render () {
    return (
      <View className='con'>
        <View className='pri_info'>
          <Image
            src={bg}
            className='img' 
          >
          </Image>
          <View className='pri_top'>
            <View className='avatar'>
              <AtAvatar
                circle
                size='small'
                className='avatar_img'
                customStyle='width:40px; height:40px;'
                image={this.state.url}
              />
            </View>
            <View className='name'>
              <View className='name_n'><Text>{this.state.name}</Text></View>
              <Text>积分: {60000}</Text>
            </View>
          </View>
        </View>
        <View className='list'>
          <AtList >
            <AtListItem
              title='个人信息'
              thumb={require('../image/personalinfor.png')}
              onClick={this.personalinfor.bind(this)}
            />
            <AtListItem
              title='积分详情'
              thumb={require('../image/personalint.png')}
              onClick={this.personalint.bind(this)}
            />
            {/* <AtListItem
              title='标题文字'
              note='描述信息'
              extraText='详细信息'
              arrow='right'
              thumb='http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png'
            /> */}
          </AtList>
        </View>
        
        <Bottom></Bottom>
      </View>
    )
  }
}