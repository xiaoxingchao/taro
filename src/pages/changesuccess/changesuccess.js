import Taro, { Component } from '@tarojs/taro'
import { View,Image} from '@tarojs/components'
import { connect } from '@tarojs/redux'
// import {AtSearchBar } from 'taro-ui'
import Bottom from '../component/bottom/bottom'
import api from '../../service/api'
import './changesuccess.less'
import dhsuccess from '../image/dhsuccess.png'
import Login from '../component/login/login'
import Loading from '../component/loading/loading'
import {showModel} from '../../utils/tools'


/**
 *京环之声首页
 *
 * @export 
 * @class Index
 * @extends {Component}
 */
@connect(
  ({ counter }) => ({
    counter
  })
)
export default class Index extends Component {
  config = {
    navigationBarTitleText: '兑换成功',
  }
  constructor(props){
    super(props);
    this.state={
      isload:true,
      data:{},
    }
  }

  componentWillMount () { }
  componentDidMount () {
    this.setState({
      isload:false,
    })
  }
  componentWillUnmount () { }
  // 获取当前页参数
  getCurrParame=()=>{
    let par_id = '';
    let arr = Taro.getCurrentPages();
    par_id=arr[arr.length-1].options;
    return par_id;
  }
  componentDidShow () {
    let p = this.getCurrParame();
    console.log(p);
    if(p.id){
      this.getResult({id:p.id});
    }else{
      showModel('无参数!!')
    }
    
  }
  getResult=(parame)=>{
    api.post('jsonapi/iwebshop_goods/get.json', parame).then((res) => {
      if (res.data.code == 0) {
        this.setState({
          data:res.data.data?res.data.data[0]:{},
        })
      } else {
        showModel(JSON.stringify(res.errMsg))
      }
    }).catch((errMsg) => {
      showModel('网络连接失败' + JSON.stringify(errMsg))
    })
  }
  componentDidHide () { }

  render () {
    let {data} = this.state;
    return (
      <View className='con'>
        <View className='header'>
          <Image src={dhsuccess} className='header-img'></Image>
        </View>
        <View className='details'>
          <View className='details-goods'>
            <View className='goods-name'>
              兑换商品：{data.name}
            </View>
            <View className='goods-name'>
              兑换时间：{data.name}
            </View>
            <View className='goods-name'>
              联系人：{data.name}
            </View>
            {data.is_virtual==='1'?<View className='goods-name'>
            会员账户：{data.name}
            </View>:<View className='goods-name'>
              收货地址：{data.name}
            </View>}
            <View className='goods-line'>
              <View className='goods-cirL'></View>
              <View className='goods-cirR'></View>
            </View>
            <View className='say'>
              【说明】兑换的礼品根据商家时间，逾期不候
            </View>
          </View>
        </View>
        <Bottom />
        <Login />
        <Loading load={this.state.isload} />
      </View>
    )
  }
}
