import Taro, { Component } from '@tarojs/taro'
import { View,Image } from '@tarojs/components'
import moment from 'moment'
// import {AtCard  } from 'taro-ui'
import Bottom from '../component/bottom/bottom'

import Login from '../component/login/login'
import Loading from '../component/loading/loading'
import {showModel,rootUrl} from '../../utils/tools'
import './changedetailsSw.less'

/**
 *京环之声首页
 *
 * @export
 * @class Index
 * @extends {Component}
 */

export default class Index extends Component {
  config = {
    navigationBarTitleText: '兑换详情',
  }
  constructor(props){
    super(props);
    this.state={
      isload:true,
      data:{}
    }
  }

  componentWillMount () { }
  componentDidMount () {
    this.setState({
      isload:false,
    })
    
  }
  // 获取当前页参数
  getCurrParame=()=>{
    let par_id = '';
    let arr = Taro.getCurrentPages();
    par_id=arr[arr.length-1].options;
    return par_id;
  }
  componentWillUnmount () { }

  componentDidShow () {
    let data = JSON.parse(this.getCurrParame().data);
    if(data){
      this.setState({
        data:data
      })
    }else{
      showModel('缺少参数!')
    }
  }
  componentDidHide () { }
  render () {
    const {data} = this.state;
    return (
      <View className='con'>
        <View className='exchprodetailsbox'>
          <Image src={rootUrl+data.goods_img} className='proimg' mode='widthFix'></Image>
          <View className='exchproname'>
            {data.goods_name}
          </View>
        </View>
        <View className='goods-info'>
          <View className='exchdetails_infor'>
            <View>商品价格</View>
            <View>{data.goods_sell_price}</View>
          </View>
          <View className='exchdetails_infor'>
            <View>兑换时间</View>
            <View>{moment.parseZone(data.create_time).format('YYYY-MM-DD HH:mm:ss')}</View>
          </View>
        </View>
        <View className='goods-info'>
          <View className='exchdetails_infor'>
            <View>联系人</View>
            <View>{data.accept_name}</View>
          </View>
          <View className='exchdetails_infor'>
            <View>电话</View>
            <View>{data.tel}</View>
          </View>
          <View className='exchdetails_infor'>
            <View>收货地址</View>
            <View>{data.addr}</View>
          </View>
        </View>
        <View className='goods-info'>
          <View className='exchdetails_infor'>
            <View>快递公司</View>
            <View>{data.logistics}</View>
          </View>
          <View className='exchdetails_infor'>
            <View>收货单号</View>
            <View>{data.logistics_no}</View>
          </View>
        </View>
        <Bottom />
        <Login />
        <Loading load={this.state.isload} />
      </View>
    )
  }
}
