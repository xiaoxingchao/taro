import Taro, { Component } from '@tarojs/taro'
import { View, Text,Image  } from '@tarojs/components'
import { AtList, AtListItem  } from 'taro-ui'
import Bottom from '../component/Bottom/index'
import Avatar from '../component/Avatar/index'
import bg from '../image/indexheadimg.png'
import './setup.less'



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
    }
  }

  componentWillMount () { }

  componentDidMount () {
    
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
              <View className='avatar_img'>
                <Avatar />
              </View>
            </View>
            <View className='name'>
              <View className='name_n'><open-data type='userNickName' ></open-data></View>
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
