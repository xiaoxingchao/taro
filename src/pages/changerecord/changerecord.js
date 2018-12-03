import Taro, { Component } from '@tarojs/taro'
import { View,Image } from '@tarojs/components'
import moment from 'moment'
import {AtCard  } from 'taro-ui'
import Bottom from '../component/bottom/bottom'
import api from '../../service/api'
import './changerecord.less'
import Login from '../component/login/login'
import Loading from '../component/loading/loading'
import {showModel,rootUrl,compare} from '../../utils/tools'


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
    this.getResult({});
  }
  componentWillUnmount () { }

  componentDidShow () {
    
  }
  getResult=(parame)=>{
    api.post('jsonapi/cashPrize/log.json', parame).then((res) => {
      if (res.data.code == 0) {
        let data = res.data.data;
        if(data){
          data.sort(compare('create_time')).reverse();
          this.setState({
            isload:false,
            data:data,
          })
        }
      } else {
        showModel(JSON.stringify(res.errMsg))
      }
    }).catch((errMsg) => {
      showModel('网络连接失败' + JSON.stringify(errMsg))
    })
  }
  componentDidHide () { }

  toRecordDetail=(item)=>{
    Taro.navigateTo({
      title:"记录详情",
      url: '/pages/changedetailsSw/changedetailsSw?data='+JSON.stringify(item)
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
                <AtCard title={moment.parseZone(item.create_time).format('YYYY-MM-DD HH:mm:ss')} onClick={this.toRecordDetail.bind(this,item)}> 
                  <View className='card'>
                    <Image src={rootUrl+item.goods_img} className='proimg' mode='widthFix'></Image>
                    <View>
                      <View className='intexch_proinfor_pT'><View className='wrap'>{item.goods_name}</View></View>
                      <View className='intexch_proinfor_pB'><View className='wrap'>{item.goods_sell_price}积分</View></View>
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
