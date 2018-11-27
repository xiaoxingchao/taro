import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView,Image  } from '@tarojs/components'
// import { AtProgress   } from 'taro-ui'
import Bottom from '../component/bottom/bottom'
import api from '../../service/api'
import './rankinglist.less'
import Login from '../component/login/login'
import Loading from '../component/loading/loading'
import {showModel,rootUrl} from '../../utils/tools'
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
      type:'1',
      data:[],
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

  componentDidShow () { 
    api.post('jsonapi/iwebshop_question_zt/getA.json', {}).then((res) => {
      if (res.data.code == 0) {
        this.setState({
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

  //返回顶部
  goTop=()=>{
    this.setState({
      scrollTop: 0
    })
  }
  rank=(type)=>{
    this.setState({
      type:type
    })
  }
  render () {
    let {data,type} = this.state;
    return (
      <View className='con'>
        <View className='headbox'>
          <View>
            <View className='control'>
              <View className={`week-rank control-rank+${type==='1'?' rank-active':''}`} onClick={this.rank.bind(this,'1')}>周排行</View>
              <View className={`month-rank control-rank+${type==='2'?' rank-active':''}`} onClick={this.rank.bind(this,'2')}>月排行</View>
              <View className={`score-rank control-rank+${type==='3'?' rank-active':''}`} onClick={this.rank.bind(this,'3')}>积分排名</View>
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
                  <Image src='https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoyU4qpD8MmuIGUpaHVdBXPpCVuiayToyzicUTYlSVVIkiaTBa5lzsCgpMXIKy2ArQB2sWan2rKX43Tg/132' className='avatar'></Image>
                  <Image src={pmtwo} className='avatar-two'></Image>
                </View>
                <View className='li1-name'>
                  live
                </View>
                <View className='li1-score'>
                  最高积分: 100
                </View>
                <View className='li1-ques'>
                  最高答题数: 100
                </View>
              </View>
              <View className='content-li1 one'>
                <View className='li1-avatar'>
                  <Image src='https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoyU4qpD8MmuIGUpaHVdBXPpCVuiayToyzicUTYlSVVIkiaTBa5lzsCgpMXIKy2ArQB2sWan2rKX43Tg/132' className='avatar'></Image>
                  <Image src={pmone} className='avatar-two'></Image>
                </View>
                <View className='li1-name'>
                  live
                </View>
                <View className='li1-score'>
                  最高积分: 100
                </View>
                <View className='li1-ques'>
                  最高答题数: 100
                </View>
              </View>
              <View className='content-li1 three'>
                <View className='li1-avatar'>
                  <Image src='https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoyU4qpD8MmuIGUpaHVdBXPpCVuiayToyzicUTYlSVVIkiaTBa5lzsCgpMXIKy2ArQB2sWan2rKX43Tg/132' className='avatar'></Image>
                  <Image src={pmthree} className='avatar-two'></Image>
                </View>
                <View className='li1-name'>
                  live
                </View>
                <View className='li1-score'>
                  最高积分: 100
                </View>
                <View className='li1-ques'>
                  最高答题数: 100
                </View>
              </View>
            </View>
            <View className='content-ul2'>
              <View className='content-li2'>
                <View className='phbimg'>
                  <Image src={phbbgimg} className='phbimg-img' />
                  NO100
                </View>
                <View className='li2_divL'>
                  <Image src='https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoyU4qpD8MmuIGUpaHVdBXPpCVuiayToyzicUTYlSVVIkiaTBa5lzsCgpMXIKy2ArQB2sWan2rKX43Tg/132' />
                </View>
                <View className='li2_divM'>
                  <View className='li2_pT'>
                    live
                  </View>
                  <View className='li2_pB'>
                    最高答题数: 4
                  </View>
                </View>
                <View className='li2_divR'>
                  最高积分: 8
                </View>
              </View>
            </View>
          </View>
          
            
          
          <Bottom></Bottom>
        </ScrollView>
        <Login />
        <Loading load={this.state.isload} />
      </View>
    )
  }
}
