import Taro, { Component } from '@tarojs/taro'
import { View,Image } from '@tarojs/components'

// import {AtCard  } from 'taro-ui'
import Bottom from '../component/bottom/bottom'
import api from '../../service/api'

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
  componentWillUnmount () { }

  componentDidShow () {
    this.getResult({is_del:0,is_score:1});
  }
  getResult=(parame)=>{
    api.post('jsonapi/iwebshop_goods/get.json', parame).then((res) => {
      if (res.data.code == 0) {
        this.setState({
          data:res.data.data?res.data.data[0]:[],
        })
      } else {
        showModel(JSON.stringify(res.errMsg))
      }
    }).catch((errMsg) => {
      showModel('网络连接失败' + JSON.stringify(errMsg))
    })
  }
  componentDidHide () { }

  toRecordDetail=(id)=>{
    Taro.navigateTo({
      title:"记录详情",
      url: '/pages/changedetailsSw/changedetailsSw?id='+id
    })
  }



  render () {
    const {data} = this.state;
    return (
      <View className='con'>
        <View className='exchprodetailsbox'>
          <Image src={rootUrl+data.img} className='proimg' mode='widthFix'></Image>
          <View className='exchproname'>
            {data.name}
          </View>
        </View>
        <View className='goods-info'>
          <View className='exchdetails_infor'>
            <View>商品价格</View>
            <View>{data.sell_price}</View>
          </View>
          <View className='exchdetails_infor'>
            <View>兑换时间</View>
            <View>{data.sell_price}</View>
          </View>
        </View>
        <View className='goods-info'>
          <View className='exchdetails_infor'>
            <View>联系人</View>
            <View>{data.sell_price}</View>
          </View>
          <View className='exchdetails_infor'>
            <View>电话</View>
            <View>{data.sell_price}</View>
          </View>
          <View className='exchdetails_infor'>
            <View>收货地址</View>
            <View>{data.sell_price}</View>
          </View>
        </View>
        <View className='goods-info'>
          <View className='exchdetails_infor'>
            <View>快递公司</View>
            <View>{data.sell_price}</View>
          </View>
          <View className='exchdetails_infor'>
            <View>收货单号</View>
            <View>{data.sell_price}</View>
          </View>
        </View>
        <Bottom />
        <Login />
        <Loading load={this.state.isload} />
      </View>
    )
  }
}