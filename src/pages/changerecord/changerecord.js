import Taro, { Component } from '@tarojs/taro'
import { View,Image } from '@tarojs/components'

import {AtCard  } from 'taro-ui'
import Bottom from '../component/bottom/bottom'
import api from '../../service/api'
import './changerecord.less'
import Login from '../component/login/login'
import Loading from '../component/loading/loading'
import {showModel,rootUrl} from '../../utils/tools'


/**
 *京环之声首页
 *
 * @export 
 * @class Index
 * @extends {Component}
 */

export default class Index extends Component {
  config = {
    navigationBarTitleText: '兑换记录',
  }
  constructor(props){
    super(props);
    this.state={
      isload:true,
      data:[]
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

  toRecordDetail=(id)=>{
    Taro.navigateTo({
      title:"记录详情",
      url: '/pages/changedetailsSw/changedetailsSw?id='+id
    })
  }



  render () {
    let {data} = this.state;
    return (
      <View className='con'>
        <View className='intexch_productbox'>
          <View className='intexch_productul'>
            {data.map((item,index)=>{
              return <View className='intexch_productli' key={index}>
                <AtCard title='2018-08-02' onClick={this.toRecordDetail.bind(this,item.id)}> 
                  <View className='card'>
                    <Image src={rootUrl+item.img} className='proimg' mode='widthFix'></Image>
                    <View>
                      <View className='intexch_proinfor_pT'><View className='wrap'>{item.name}</View></View>
                      <View className='intexch_proinfor_pB'><View className='wrap'>{item.sell_price}积分</View></View>
                    </View>
                  </View>
                  
                </AtCard>
              </View>
            })}
          </View>
        </View>
        <Bottom />
        <Login />
        <Loading load={this.state.isload} />
      </View>
    )
  }
}