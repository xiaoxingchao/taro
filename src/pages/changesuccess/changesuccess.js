import Taro, { Component } from '@tarojs/taro'
import { View,Image} from '@tarojs/components'
// import {AtSearchBar } from 'taro-ui'
import moment from 'moment'
import Bottom from '../component/bottom/bottom'
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
    let data = JSON.parse(p.data);
    console.log(data);
    if(data){
      this.setState({
        data:data
      })
    }else{
      showModel('无参数!!')
    }
    
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
              兑换商品：{data.goods_name}
            </View>
            <View className='goods-name'>
              兑换时间：{moment.parseZone(data.create_time).format('YYYY-MM-DD HH:mm:ss')}
            </View>
            <View className='goods-name'>
              联系人：{data.accept_name}
            </View>
            {data.is_virtual==='1'?<View className='goods-name'>
            会员账户：{data.order_no}
            </View>:<View className='goods-name'>
              收货地址：{data.addr}
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
